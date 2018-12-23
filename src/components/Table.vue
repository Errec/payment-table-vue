<template>
  <div class="table">
    <div class="table__panel">
      <div class="table__search">
        <input class="table__search-input" type="text" name="Search by Name" v-model="nameSearch" placeholder="Name">
      </div>
      <div>
        <button type="button" @click="sortTable('Name','sort')">name</button>
        <button type="button" @click="sortTable('Amount','sort')">Payment</button>
      </div>

    </div>

    <table>
      <table-head :row="table[0]"></table-head>
      <table-body :bodyData="{table, currentFirst, currentLast}"></table-body>
    </table>

    <div>
      <button type="button" @click="previousPage"> back </button>
      <button type="button" @click="nextPage"> next </button>
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
      sortTable (category, type) {
        const payload = {
          category: category,
          type: type
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

<style lang="sass">
  @import "../styles/variables/colors"

  .table
    padding: 8px
    position: relative
    background-color: rgba($yellow-duck, 0.9)
    margin: 0 auto
    border-radius: 4px
    width: 92%
    table
      border-left: solid $black-duck 1px 
      border-top: solid $black-duck 1px 
      border-bottom: solid $black-duck 1px 
      display: table
      table-layout: fixed
      width: 100%
      border-collapse: collapse
      th,td
        border-right: 1px solid $black-duck
  .table__search-input
    position: absolute
    top: 0
    bottom: 0
    padding-left: 4px
    width: calc(100% - 45px)
    outline: none
    border: none
  .table__search
    overflow: hidden
    border-radius: 4px
    height: 45px
    position: relative
    max-width: 250px
    background-color: white
    border: solid black 2px
    margin: 8px 0 
    &:after
      content: ""
      position: absolute
      right: 8px
      top: 8px
      width: 30px
      height: 30px
      background: 
        image: url("../assets/img/search.svg")
        size: cover

</style>
