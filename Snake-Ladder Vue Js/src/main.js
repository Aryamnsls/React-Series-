import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'animate.css'


createApp(App).use(router).mount('#app')


// new Audio(require("./assets/audio/sound.mp3")).play();