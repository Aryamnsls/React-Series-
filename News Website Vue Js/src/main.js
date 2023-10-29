import Vue from 'vue'
import App from './App.vue'
import VueResource from 'vue-resource'
import Bootstrap from 'bootstrap'

Vue.config.productionTip = false

Vue.use(VueResource)
Vue.prototype.Bootstrap = Bootstrap

new Vue({
  render: h => h(App),
}).$mount('#app')
