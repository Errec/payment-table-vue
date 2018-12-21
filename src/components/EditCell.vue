<template>
  <span class="edit-cell">
    <button v-if="!edit" type="button" @click="edit=!edit">edit</button>
    <button v-else type="button" @click="saveDescription">save</button>
    <span v-if="!edit">
      {{dataRow.rows.Description}}
    </span>
    <input v-else type="text" name="" v-model="description">
  </span>
</template>
<script>

import * as firebase from 'firebase'

export default {
  props: ['dataRow'],
  data () {
    return {
      edit: false,
      description: this.dataRow.rows.Description

    }
  },
  methods: {
    saveDescription () {
      let childNode = {}

      const nodeVal = firebase.database().ref('/payments').orderByChild('ID').equalTo(this.dataRow.rows.ID).on('value', snapshot => {
        childNode = Object.keys(snapshot.val())[0]
      })

      firebase.database().ref(`/payments/${childNode}`).update({ Description: this.description })
      .then(() => {
        if (this.sorted) {

        }
        console.log(`DB updated at position /payments/${childNode}`)})
      .catch((error) => {
        Swal({
          type: 'error',
          title: 'DB error',
          text: error,
          timer: 2000
        })
      })

      this.edit = false
      if (this.dataRow.sorted) {
        let payload = {
          sortReverse: !this.dataRow.sortReverse,
          category: 'Name'
        }
        this.$store.dispatch('sortTable', payload)
      }
    }

  }
}

</script>