import Vue from 'vue';
import Vuex from 'vuex';
import notifications from './modules/notifications';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    notifications: {
      namespaced: true,
      ...notifications
    }
  },
  state: {
    links: [
      {
        title: 'Home',
        url: '/#/',
        icon: 'home',
        blank: false,
      },
      {
        title: 'Your Favorite Recipes',
        url: '/#/favorites',
        icon: 'heart',
        blank: false,
      },
      {
        title: 'Recipes Api',
        url: 'https://www.themealdb.com/api.php',
        icon: 'link',
        blank: true,
      },
      {
        title: 'GitHub',
        url: 'https://github.com/kleberMRocha',
        icon: 'user',
        blank: true,
      }
    ],
    favMeals: JSON.parse(localStorage.getItem('@RecipesApp')) || [],
    modalVisible: false,
    selectMeal: 'VVnZd8A84z4',
    details: null,
  },
  mutations: {
    updateFavMeals(state, value) {
      state.favMeals = value;
    },
    showModal(state, youtubeId) {
      state.selectMeal = youtubeId;
      state.modalVisible = true;
    },
    closeModal(state) {
      state.modalVisible = false;
      state.selectMeal = '';
      state.details = null;
    },
    setDetails(state, info) {
      state.details = info;
    },
  },
  actions: {
    clearFavorites({ commit, state }) {
      if (!state.favMeals.length) return;
      localStorage.setItem('@RecipesApp', JSON.stringify([]));
      commit('updateFavMeals', []);
    }
  }
});

export default store;
