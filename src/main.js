import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Vuetable from 'vuetable-2'
import store from './store'

Vue.config.productionTip = false

Vue.use(Vuetable)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
