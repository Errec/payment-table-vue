import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loadedTable: [{
      name: 'one',
      age: '1'
    },{
      name: 'two',
      age: '2'
    }],
    user: {
      email: 'britecode@britecode.com',
      password: 'britecode'
    }
  },
  mutations: {

  },
  actions: {

  },
  getters: {
    loadedTable (state) {
      return state.loadedTable
    }
  }
})
