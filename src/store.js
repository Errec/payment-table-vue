import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from 'firebase'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userTable: [],
    resultTable: [],
    userBaseTable: [],
    user: null,
    sorted: false,
    sortedReverse: false
  },
  mutations: {
    setUser (state, payload) {
      state.user = payload
    },
    setTable (state, payload) {
      state.userTable = payload
    },
    setBaseTable (state, payload) {
      state.userBaseTable = payload
    },
    setSorted (state, payload) {
      state.sorted = payload
    },
    reverseSort (state, payload) {
      state.sortedReverse = payload
    }
  },
  actions: {
    signUserIn ({commit}, payload) {
      Vue.swal({
        title: 'Logging...'
      });
      Vue.swal.showLoading();
      firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
        .then(
          user => {
            const newUser = {
              id: user.uid
            }

            commit('setUser', newUser)

            Vue.swal({
              title: 'Loading Table'
            })
            Vue.swal.showLoading();
            
            firebase.database().ref('/payments').on('value', snapshot => {
              Vue.swal.close()
              const loadedTable = snapshot.val()
              commit('setTable', loadedTable)
              commit('setBaseTable', loadedTable)
            })

          }
        )
        .catch(
          error => {
            Vue.swal({
              type: 'error',
              title: 'Oops...',
              text: error
            })
          }
        )
    },
    sortTable ({commit, state}, payload){
      const sortedUserTable = [...state.userTable].sort((a,b) => {
        if(a[payload.category] > b[payload.category]){return 1}
        if(a[payload.category] < b[payload.category]){return -1}
        return 0
      })
      if(state.sortedReverse && payload.reverse){
        sortedUserTable.reverse()
      }

      commit('setSorted', true)
      commit('setTable', sortedUserTable)
      commit('reverseSort', !state.sortedReverse)
    },
    filterTable ({commit, state}, payload) {
      commit('setTable', state.userBaseTable)
      state.resultTable = state.userTable

        let currentResult = state.resultTable.filter( (row) => {
          return row['Name'].toLowerCase().indexOf(payload.toLowerCase()) > -1
        })

        commit('setTable', currentResult)
    }
  },
  getters: {
    userTable (state) {
      return state.userTable
    },
    user (state) {
      return state.user
    },
    isSorted (state) {
      return state.sorted
    }
  }
})
