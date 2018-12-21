<template>
  <span class="edit-cell">
    <button v-if="!edit" type="button" @click="edit=!edit">edit</button>
    <button v-else type="button" @click="saveDescription">save</button>
    <span v-if="!edit">
      {{dataRow.Description}}
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
      description: this.dataRow.Description

    }
  },
  methods: {
    saveDescription () {
      let childNode = {}

      const nodeVal = firebase.database().ref('/payments').orderByChild('ID').equalTo(this.dataRow.ID).on('value', snapshot => {
        childNode = Object.keys(snapshot.val())[0]
      })

      firebase.database().ref(`/payments/${childNode}`).update({ Description: this.description })
      .then(() => {
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
      if (this.$store.getters.isSorted) {
        const payload = {
          category: 'Name',
          reverse: false
        }
        this.$store.dispatch('sortTable', payload)
      }
    }
  }
}

</script>