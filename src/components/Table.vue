<template>
  <div class="table">
    <table>
      <tr>
        <th v-for="(value, key) in table[0]">
          {{ key }}
        </th>
      </tr>
      <tr v-for="rows in table">
        <td v-for="value in rows">
          {{value}}
        </td>
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
