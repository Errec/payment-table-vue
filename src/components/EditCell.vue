<template>
  <span class="edit-cell">
    <button type="button" @click="edit=!edit">edit</button>
    <span v-if="!edit">
      {{value}}
    </span>
    <input v-else type="text" name="" :value="value">
  </span>
</template>
<script>
  
export default {
  props: ['value'],
  data () {
    return {
      edit: false
    }
  }
}

</script>