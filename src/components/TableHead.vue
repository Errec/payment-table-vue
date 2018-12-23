<template>
  <thead class="table-head">
    <tr>
      <th v-for="(value, key) in row">
        {{ key }}
      </th>
    </tr>
  </thead>
</template>

<script>
  export default {
    props: ['row']
  }
</script>

<style  scoped lang="sass">
  @import "../styles/variables/colors"
  th
    overflow: hidden
    white-space: nowrap
    background-color: $red-duck
  .table-head
    th
      color: $white-duck
      text-transform: uppercase
</style>