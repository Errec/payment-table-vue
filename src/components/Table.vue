<template>
  <div class="table">
    <table>
      <tr>
        <th>Name</th>
        <th>ID</th>
        <th>Date</th>
        <th>Amount</th>
        <th>Description</th>
      </tr>
      <tr>
        <td>{{table[0].Name}}</td>
        <td>{{table[0].ID}}</td>
        <td>{{table[0].Date}}</td>
        <td>{{table[0].Amount}}</td>
        <td>{{table[0].Description}}</td>
      </tr>
    </table>

  </div>
</template>

<script>

  export default {
    computed: {
      table () {
        return this.$store.getters.userTable
      }
    },
    data () {
      return {
      }
    },

  }
</script>
