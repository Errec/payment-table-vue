<template>
  <div class="table">
    <div class="table__panel">
      <div class="table__search">
        <input class="table__search-input" type="text" name="Search by Name" v-model="nameSearch" placeholder="Name">
      </div class="table__sort">
      <div class="table__sort-wrapper">
        <button class="table__sort-name" type="button" @click="sortTable('Name','sort')"></button>
        <button class="table__sort-payment" type="button" @click="sortTable('Amount','sort')"></button>
        <div class="table__switch"></div>
      </div>
    </div>

    <table>
      <table-head :row="table[0]"></table-head>
      <table-body :bodyData="{table, currentFirst, currentLast}"></table-body>
    </table>

    <div class="table__nav">
      <button class="table__back-btn" type="button" @click="previousPage"></button>
      <div class="table__page">
        <p>{{currentPage}}</p>
      </div>
      <button class="table__next-btn" type="button" @click="nextPage"></button>
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
        currentPage: 1,
        currentLast: this.pageSize,
      }
    },
    methods: {
      nextPage () {
        if ( this.currentLast < this.$store.getters.userTable.length) {
          this.currentFirst = this.currentFirst + this.pageSize
          this.currentLast = this.currentLast + this.pageSize
          this.currentPage++
        } else {
          return
        }
      },
      previousPage () {
        if ( this.currentFirst > 0) {
          this.currentFirst = this.currentFirst - this.pageSize
          this.currentLast = this.currentLast - this.pageSize
          this.currentPage--
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
    background-color: rgba($yellow-duck, 0.96)
    margin: 0 auto
    border-radius: 4px
    width: 92%
    margin-bottom: 32px
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
        height: 30px
  .table__search-input
    position: absolute
    top: 0
    bottom: 0
    padding-left: 4px
    width: calc(100% - 45px)
    outline: none
    border: none
  .table__search
    flex: 1
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
  .table__panel
    position: relative
    width: 100%
    display: flex
    align-items: center
    margin-bottom: 4px

  .table__sort-wrapper
    padding: 2px
    border-radius: 2px
    margin-left: 4px
    background-color: rgba($black-duck, 0.5)
    button
      cursor: pointer
      margin: 8px 4px
      width: 30px
      height: 30px
      border: none
      background: 
        image: url('../assets/img/duck.svg')
        color: transparent
    .table__sort-payment
      background: 
        image: url('../assets/img/coins.svg')

  .table__switch
    margin-left: 4px
    display: inline-block
    height: 30px
    width: 15px
    background:
      image: url('../assets/img/switch.svg')
      size: contain
      repeat: no-repeat
      position: center

  .table__nav
    position: relative
    z-index: 0
    display: flex
    align-items: center
    justify-content: flex-end
    button
      cursor: pointer
      transition: 0.2s ease-in-out
      margin: 8px 4px
      width: 40px
      height: 40px
      border: none
      background: 
        image: url('../assets/img/arrow.svg')
        color: transparent
        size: cover
    .table__back-btn
      transform: rotateY(180deg)

  .table__page
    position: relative
    background-color: white
    width: 40px
    height: 40px
    border-radius: 6px
    p
      font-weight: bold
      text-align: center
      position: absolute
      top: 0
      left: 0
      right: 0
      transform: translateY(50%)
</style>
