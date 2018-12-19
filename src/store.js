import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from 'firebase'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userTable: [{
      name: 'one',
      age: '1'
    },{
      name: 'two',
      age: '2'
    }],
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
            setTimeout(() => {
              Vue.swal.close()
            }, 500)
            const newUser = {
              id: user.uid
            }

            commit('setUser', newUser)

            firebase.database().ref('/payments').on('value', snapshot => {
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
