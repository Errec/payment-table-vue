<template>
  <div class="table">
    <table>
      <table-head :row="table[0]"></table-head>
      <table-body :bodyData="{table, currentFirst, currentLast}"></table-body>
    </table>

    <div>
      <button type="button" @click="previousPage"> back </button>
      <button type="button" @click="nextPage"> next </button>
    </div>

    <div>
      <button type="button" @click="sortTable"> sort by name</button>
    </div>

    <div>
      <label><input type="text" name="Search by Name" v-model="nameSearch" placeholder="Name"></label>
    </div>

  </div>
</template>

<script>
  import TableHead from './TableHead'
  import TableBody from './TableBody'
  export default {
    components: {
      TableHead,
      TableBody
    },
    props: ['pageSize'],
    computed: {
      table () {
        return this.$store.getters.userTable
      }
    },
    data () {
      return {
        nameSearch: '',
        currentFirst: 0,
        currentLast: this.pageSize,
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
      },
      sortTable () {
        let payload = {
          category: 'Name',
          type: 'sort'
        }
        this.$store.dispatch('sortTable', payload)
      }
    },
    watch: {
      nameSearch () {
        this.$store.dispatch('filterTable', this.nameSearch)
      }
    }

  }
</script>
