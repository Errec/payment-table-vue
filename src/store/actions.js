import * as firebase from 'firebase'
import Vue from 'vue'
import sortTable from '../helpers/sort-table'
import formatDate from '../helpers/format-date'

export default {
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

            loadedTable.forEach( person => {
              person.Amount = "$" + person.Amount
              person.Date = formatDate(person.Date)
            })

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
    let sortedUserTable = []

    if (payload.type === 'edit') {
      if (state.tableState === 'unreversed') {
        sortedUserTable = sortTable(state.userTable, payload.category)
        commit('setTable', sortedUserTable)
      } else {
          sortedUserTable = sortTable(state.userTable, payload.category)
          sortedUserTable.reverse()
          commit('setTable', sortedUserTable)
      }
      return 0
    }

    if (state.tableState === 'unsorted') {
        commit('setTableState','unreversed')
        sortedUserTable = sortTable(state.userTable, payload.category)
        commit('setTable', sortedUserTable)
      } else if (state.tableState === 'unreversed') {
          commit('setTableState','reversed')
          sortedUserTable = sortTable(state.userTable, payload.category)
          sortedUserTable.reverse()
          commit('setTable', sortedUserTable)
      } else if (state.tableState === 'reversed') {
          commit('setTableState','unreversed')
          sortedUserTable = sortTable(state.userTable, payload.category)
          commit('setTable', sortedUserTable)
      }

    commit('setSorted', true)
  },
  filterTable ({commit, state}, payload) {
    commit('setTable', state.userBaseTable)
    state.resultTable = state.userTable

      let currentResult = state.resultTable.filter( (row) => {
        return row['Name'].toLowerCase().indexOf(payload.toLowerCase()) > -1
      })

      commit('setTable', currentResult)
  }
}