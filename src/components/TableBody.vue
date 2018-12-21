<template>
  <tbody>
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