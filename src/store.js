import Vue from 'vue'
import Vuex from 'vuex'
import actions from './store/actions'
import mutations from './store/mutations'
import getters from './store/getters'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userTable: [],
    resultTable: [],
    userBaseTable: [],
    user: null,
    sorted: false,
    tableState: 'unsorted'
  },
  actions: actions,
  mutations: mutations,
  getters: getters
})
