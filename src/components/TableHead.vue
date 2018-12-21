<template>
  <thead>
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