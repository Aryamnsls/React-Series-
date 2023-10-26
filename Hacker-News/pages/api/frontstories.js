import getStories from "../../lib/getStories";

export default async (req, res) => {
  const data = await getStories(`frontstories?page=${req.query.page}`);
  res.send(data);
};
