export default {
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
    setTableState (state, payload) {
      state.tableState = payload
    }
  }