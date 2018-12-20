import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from 'firebase'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userTable: [],
    user: null
  },
  mutations: {
    setUser (state, payload) {
      state.user = payload
    },
    setTable (state, payload) {
      state.userTable = payload
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
            });
            Vue.swal.showLoading();
            firebase.database().ref('/payments').on('value', snapshot => {
              Vue.swal.close()
              const loadedTable = snapshot.val()
              commit('setTable', loadedTable)
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
    }
  },
  getters: {
    userTable (state) {
      return state.userTable
    },
    user (state) {
      return state.user
    }
  }
})
