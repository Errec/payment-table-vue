<template>
  <div class="table">
    <table>
      <thead>
        <tr>
          <th v-for="(value, key) in table[0]">
            {{ key }}
          </th>
        </tr>
      </thead>
      <tbody>
      <tr v-for="(rows, index) in table" v-show="index >= (currentFirst) && index < (currentLast)">
        <td v-for="value in rows">
          {{value}}
        </td>
      </tr>
      </tbody>
    </table>
    <div>
      <button type="button" @click="previousPage"> <- back</button>
      <button type="button" @click="nextPage">next -></button>
    </div>

  </div>
</template>

<script>
  export default {
    props: ['pageSize'],
    computed: {
      table () {
        return this.$store.getters.userTable
      }
    },
    data () {
      return {
        currentFirst: 0,
        currentLast: this.pageSize
      }
    },
    methods: {
      nextPage () {
        if ( this.currentLast < this.$store.getters.userTable.length) {
          this.currentFirst = this.currentFirst + this.pageSize
          this.currentLast = this.currentLast + this.pageSize
        } else {
          return
        }
      },
      previousPage () {
        if ( this.currentFirst > 0) {
          this.currentFirst = this.currentFirst - this.pageSize
          this.currentLast = this.currentLast - this.pageSize
        } else {
          return
        }
      }
    }

  }
</script>
