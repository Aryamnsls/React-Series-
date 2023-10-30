<template>
  <div class="favContainer">
    <h1 class="title-recipe">
      {{ !meals.length ? 'Nothing here 😕' : '' }}
    </h1>
    <ul class="favList">
      <li v-for="meal in meals" v-bind:key="`${meal.idMeal}`">
        <FoodCard
          :meal="meal"
          @showModal="showModal"
          @showDetails="showDetails"
        />
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import FoodCard from './FoodCard';
import modal from '../mixin/modal';

export default {
  props: {
    meal: Object,
  },
  components: {
    FoodCard,
  },
  mixins: [modal],
  computed: {
    ...mapState({
      meals: (state) => state.favMeals,
    }),
    youtubeId: function() {
      const splitedUrl = this.meal.strYoutube.split('watch');
      return splitedUrl[1].replace('?v=', '');
    },
  },
};
</script>

<style scoped>
@keyframes slidein {
  from {
    transform: scale(0);
    opacity: 0;
  }

  to {
    transform: scale(1);
  }
}

.favContainer {
  min-height: calc(100vh - 278px);
  background-color: #ebfff0;
  border: white solid 4px;
  margin: 8px;
  text-align: center;
  width: 80%;
  margin: 0 auto;
  border-radius: 16px;
  padding: 16px;
  filter: brightness(0.9);
  box-shadow: 1px 1px 5px rgb(177, 177, 177);
}
.favContainer:hover {
  filter: brightness(1);
}

.containerFood:hover {
  background-color: #313131;
  transition: background-color 0.5s;
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
}
.playVideo:hover {
  transition: color 0.5s;
  color: #ffffff;
}

.favButton {
  margin-top: 2px;
  font-size: 20px;
  color: #ffffff;
  border: none;
  background: none;
  outline: none;
  position: absolute;
  left: 0;
  cursor: pointer;
}
.favButton:hover {
  color: tomato;
  transition: 0.5s;
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

.title-recipe {
  width: 100%;
  color: #689f77;
  font-weight: bold;
  margin: 16px;
}

.favList {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  color: #ffffff;
}

.favList img {
  width: 150px;
}
</style>
