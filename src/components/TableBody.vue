<template>
  <tbody class="table-body">
  <tr v-for="(rows, index) in bodyData.table" v-show="index >= (bodyData.currentFirst) && index < (bodyData.currentLast)">
    <td v-for="(value, key) in rows">
      <span v-if="key !== 'Description'" :key="rows.ID">
        {{value}}
      </span>
      <edit-cell v-else :dataRow="rows" :key="rows.ID"></edit-cell>
    </td>
  </tr>
  </tbody>
</template>

<script>
  import EditCell from './EditCell'

  export default {
    props: ['bodyData'],
    components: {
      EditCell
    }
  }
</script>

<style lang="sass">
  @import "../styles/variables/colors"
  .table-body
    td
      word-wrap: break-word
      overflow-wrap: break-word
      width: 100%
      text-align: center
      &:nth-child(3)
        text-align: left
    tr:nth-child(even)
      background-color: rgba($blue-duck, 0.7)
</style>