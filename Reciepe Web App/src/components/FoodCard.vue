<template>
  <div class="containerFood">
    <div class="card-header">
      <h3>{{ getName(meal) }}</h3>
      <button :class="isFavorited(isFav)" @click="saveFavRecipe(meal)">
        <font-awesome-icon icon="heart" />
      </button>
    </div>

    <div class="imgContainer">
      <img :src="meal.strMealThumb" :alt="meal.strMeal" loading="lazy" />
    </div>

    <div class="options">
      <p class="fullName">{{ meal.strMeal }}</p>
      <button class="details" @click="$emit('showDetails', meal)">
        See Details
      </button>
      <button class="playVideo" @click="$emit('showModal', youtubeId)">
        <font-awesome-icon icon="play-circle" />
      </button>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex';
import {mapMutations as mapMutationsNotification} from '../vuex/nameSpaceNotification';
export default {
  props: {
    meal: Object,
  },
  methods: {
    ...mapMutationsNotification(['setNotificationsInfos']),
    ...mapMutations(['updateFavMeals']),
    saveFavRecipe(value) {
      this.handleNotification();
      if (this.isFav) {
        const favRecipes = JSON.parse(localStorage.getItem('@RecipesApp'));
        const isfavoriteyet = favRecipes.filter(
          (fav) => fav.idMeal !== value.idMeal
        );
        localStorage.setItem('@RecipesApp', JSON.stringify(isfavoriteyet));
        this.updateFavMeals(isfavoriteyet);
        return;
      }
      value.fav = true;
      const favRecipes = JSON.parse(localStorage.getItem('@RecipesApp'));
      const isfavoriteyet = favRecipes
        ? favRecipes.find((fav) => fav.idMeal === value.idMeal)
        : null;

      if (isfavoriteyet) {
        return;
      }
      if (favRecipes) {
        const newFavRecipes = [value, ...favRecipes];
        localStorage.setItem('@RecipesApp', JSON.stringify(newFavRecipes));
        this.updateFavMeals(newFavRecipes);
      } else {
        localStorage.setItem('@RecipesApp', JSON.stringify([value]));
        this.updateFavMeals([value]);
      }
    },
    isFavorited(isFav) {
      return isFav ? 'favButton red' : 'favButton';
    },
    getName: function(meal) {
      return meal.strMeal.length > 20
        ? `${meal.strMeal.substring(0, 20)} ...`
        : meal.strMeal;
    },
    handleNotification() {
      this.setNotificationsInfos({
        meal: this.meal,
        isFav: (() => {
          const isFavorite = !!this.isFav;
          return !isFavorite;
        })(),
      });
    },
  },
  computed: {
    ...mapState({
      favRecipes: (state) => state.favMeals,
    }),
    youtubeId: function() {
      const splitedUrl = this.meal.strYoutube.split('watch');
      return splitedUrl[1].replace('?v=', '');
    },
    isFav: function() {
      return this.favRecipes
        ? this.favRecipes.find((recipe) => recipe.idMeal === this.meal.idMeal)
        : false;
    },
  },
};
</script>

<style scoped>
@keyframes slidein {
  from {
    transform: rotatey(150deg);
    opacity: 0;
  }
  to {
    transform: rotate(0);
  }
}
@keyframes imgEntrance {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
.card-header {
  position: relative;
  display: flex;
  justify-content: space-around;
  width: 100%;
}
.containerFood {
  position: relative;
  border-radius: 15px;
  margin: 8px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #ffffff;
  width: 250px;
  height: 300px;
  max-height: 300px;
  max-width: 300px;
  overflow: hidden;
  color: #645a5a;
  font-weight: bold;
  text-align: center;
  cursor: pointer;
  position: relative;
  border: olive 2px double;
  animation: slidein cubic-bezier(0.65, 0, 0.35, 1) 1s;
}
.imgContainer {
  margin-bottom: -16px;
  height: 100%;
  width: 100%;
  border-top: rgb(240, 233, 233) dashed 1.5px;
  object-fit: cover;
  animation: imgEntrance ease-in-out 1.5s;
}
.details {
  margin-top: 50px;
  font-weight: bold;
  color: #ffffff;
  background: none;
  border: 1px solid #ffffff;
  cursor: pointer;
  padding: 12px;
  transition: 0.5s;
}

.details:hover {
  color: #000000;
  background: #ffffff;
}

.imgContainer img {
  width: 100%;
}

.containerFood:hover {
  filter: grayscale(0.5);
  background-color: #313131;
  transition: background-color 0.5s;
  -webkit-box-shadow: 3px 5px 7px 1px rgba(0, 0, 0, 0.33);
  box-shadow: 3px 5px 7px 1px rgba(0, 0, 0, 0.33);
}
.containerFood img {
  max-width: 100%;
  height: 100%;
  object-fit: fill;
}
.options {
  position: absolute;
  background-color: #00000098;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  opacity: 0;
}

.options:hover {
  opacity: 1;
  transition: 0.9s opacity;
}

.options .fullName {
  color: #ffffff;
  position: absolute;
  bottom: 0;
  margin: 8px;
}
h3 {
  margin: 8px;
}
.playVideo {
  outline: none;
  background: none;
  border: none;
  color: #aaaaaa;
  font-size: 85px;
  cursor: pointer;
  margin: auto;
}
.playVideo:hover {
  transition: color 0.5s;
  color: #ffffff;
}
.favButton {
  margin-top: 2px;
  font-size: 20px;
  z-index: 1;
  color: #c4c4c4;
  border: none;
  background: none;
  outline: none;
  cursor: pointer;
}
.favButton:hover {
  color: tomato;
  transition: 0.5s;
}
.red {
  color: tomato;
}
.red:hover {
  color: #ffffff;
}
.alternativeName {
  margin-top: 25px;
  font-weight: bold;
  outline: none;
  background: none;
  border: none;
  color: #ffffff;
  font-size: 15px;
  cursor: pointer;
}
</style>
