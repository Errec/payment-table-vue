<template>
  <span class="edit-cell">
    <button type="button" @click="edit=!edit">edit</button>
    <button type="button" @click="saveDescription">save</button>
    <span v-if="!edit">
      {{rows.Description}}
    </span>
    <input v-else type="text" name="" :rows="rows">
  </span>
</template>
<script>
  
export default {
  props: ['rows'],
  data () {
    return {
      edit: false
    }
  },
  methods: {
    saveDescription () {
      console.log('saving')
    }
  }
}

</script>