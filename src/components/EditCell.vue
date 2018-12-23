<template>
  <div class="edit-cell">
    <span v-if="!edit">
      {{truncatedText(dataRow.Description)}}
    </span>
    <button v-if="!edit" class="edit-cell__edit-btn" type="button" @click="edit=!edit"></button>
    <div v-if="edit" class="edit-cell__window">
      <div class="edit-cell__text-box">
        <button class="edit-cell__save-btn" type="button" @click="saveDescription"></button>
        <textarea name="" type="text" v-model="description"></textarea>

      </div>
    </div>
  </div>
</template>
<script>

import * as firebase from 'firebase'
import _ from 'lodash'

export default {
  props: ['dataRow'],
  data () {
    return {
      edit: false,
      description: this.dataRow.Description

    }
  },
  methods: {
    truncatedText (text) {
      return _.truncate(text, {
        'length': 70
      });
    },
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

      const payload = {
        category: 'Name',
        type: 'edit'
      }

      let tableState = this.$store.getters.sorted
      if (tableState === 'reversed' || tableState === 'unreversed') {
        this.$store.dispatch('sortTable', payload)
      }

      this.edit = false
    }
  }
}

</script>

<style scoped lang="sass">
  @import "../styles/variables/colors"
  .edit-cell
    word-wrap: break-word
    overflow-wrap: break-word
  .edit-cell__window
    position: fixed
    background-color: rgba($black-duck, 0.7)
    left: 0
    top: 0
    right: 0
    bottom: 0
    display: flex
    align-items: center
    justify-content: center
  .edit-cell__edit-btn
    float: right
    margin: 4px
    border: none
    background: 
      image: url('../assets/img/pencil.svg')
      color: transparent
      size: cover
    width: 20px
    height: 20px
    &:hover
      cursor: pointer
  .edit-cell__save-btn
    border: none
    background: 
      image: url('../assets/img/save.svg')
      color: transparent
      size: cover
    width: 40px
    height: 40px
    position: absolute
    left: 0
    bottom: -24px
    &:hover
      cursor: pointer

  .edit-cell__text-box
    position: relative
    width: 90%
    height: 90%
    max-height: 400px
    max-width: 400px
    padding-bottom: 32px
    textarea
      width: 100%
      height: 100%
      resize: none
      border: solid black 2px
</style>