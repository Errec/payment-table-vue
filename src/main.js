import Vue from 'vue'
import App from './App.vue'
import router from './router.js'
import store from './store.js'
import * as firebase from 'firebase'
import Vuetable from 'vuetable-2'
import VueFormGenerator from "vue-form-generator"

Vue.config.productionTip = false

Vue.use(Vuetable)
Vue.use(VueFormGenerator)

new Vue({
  router,
  store,
  render: h => h(App),
  created() {
    firebase.initializeApp({
      apiKey: "AIzaSyDN1cpkP5p_01RKEGxf2rAMqxg_ce4ecEQ",
      authDomain: "brite-core-db.firebaseapp.com",
      databaseURL: "https://brite-core-db.firebaseio.com",
      projectId: "brite-core-db",
      storageBucket: "brite-core-db.appspot.com"
    })
  }
}).$mount('#app')
