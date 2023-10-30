import { createWebHistory, createRouter } from "vue-router";
import Home from "./pages/Home"
import Game from "./pages/Game"

const routes = [
    { path: "/", name: "Home", component: Home },
    { path: "/game", name: "Game", component: Game }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;