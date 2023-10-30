import VueRouter from 'vue-router';
import Favorites from '../src/components/Favorites.vue';

const routes = [
  {
    path: '/favorites',
    name: 'favoritos',
    component: Favorites,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
