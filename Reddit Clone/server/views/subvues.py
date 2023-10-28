from app import app
from flask import jsonify, request
from models import Subvue, User, Post
from authorization import login_required


@app.route("/api/subvues/<string:permalink>")
def subvues_item(permalink: str):
    subvue = Subvue.objects(permalink__iexact=permalink).first()

    if not subvue:
        return jsonify({"error": "Subvue not found"}), 404

    return jsonify(subvue.to_public_json())


@app.route("/api/subvues/<string:permalink>/posts")
def subvues_posts(permalink: str):
    subvue = Subvue.objects(permalink__iexact=permalink).first()

    if not subvue:
        return jsonify({"error": "Subvue not found"}), 404

    posts = Post.objects(subvue=subvue)
    return jsonify([post.to_public_json() for post in posts])


@app.route("/api/subvues", methods=["POST"])
@login_required
def subvues_create(username: str):
    if not request.json:
        return jsonify({"error": "Data not specified"}), 409
    if not request.json.get("name"):
        return jsonify({"error": "Name not specified"}), 409
    if not request.json.get("description"):
        return jsonify({"error": "Description not specified"}), 409

    moderators = []
    for i in request.json.get("moderators").split(","):
        moderator = User.objects(username__iexact=i.strip()).first()
        if moderator:
            moderators.append(moderator)
        else:
            return jsonify({"error": f"Moderator '{i.strip()}' not found"}), 409

    permalink = request.json.get("name")\
        .lower()\
        .replace(" ", "-")\
        .replace(".", "")\
        .replace(",", "")\
        .replace("!", "")\
        .replace("?", "")

    if Subvue.objects(permalink=permalink):
        return jsonify({"error": f"There is already a subvue called '{permalink}'"}), 409

    subvue = Subvue(
        name=request.json.get("name"),
        description=request.json.get("description"),
        moderators=moderators,
        permalink=permalink
    ).save()

    return jsonify(subvue.to_public_json())


@app.route("/api/subvues/<string:permalink>/subscribe", methods=["POST"])
@login_required
def subvues_subscribe(username: str, permalink: str):
    user = User.objects(username=username).first()
    subvue = Subvue.objects(permalink__iexact=permalink).first()

    if subvue not in user.subscribed:
        user.subscribed.append(subvue)
        # Sort subvues by permalink
        user.subscribed = sorted(user.subscribed, key=lambda k: k["permalink"])

    user.save()

    return jsonify({
        "subscribed": [subvue.to_public_json() for subvue in user.subscribed]
    })


@app.route("/api/subvues/<string:permalink>/unsubscribe", methods=["POST"])
@login_required
def subvues_unsubscribe(username: str, permalink: str):
    user = User.objects(username=username).first()
    subvue = Subvue.objects(permalink__iexact=permalink).first()

    if subvue in user.subscribed:
        subscribed_index = user.subscribed.index(subvue)
        user.subscribed.pop(subscribed_index)

    user.save()

    return jsonify({
        "subscribed": [subvue.to_public_json() for subvue in user.subscribed]
    })
