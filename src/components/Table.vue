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
        <td v-for="(value, key) in rows">
          <span v-if="key !== 'Description'" :key="rows.ID">
            {{value}}
          </span>
          <edit-cell v-else :rows="rows" :key="rows.ID"></edit-cell>
        </td>
      </tr>
      </tbody>
    </table>

    <div>
      <button type="button" @click="previousPage"> <- back</button>
      <button type="button" @click="nextPage">next -></button>
    </div>

    <div>
      <button type="button" @click="sortTable(sortReverse)"> sort by name</button>
    </div>

    <div>
      <label><input type="text" name="Search by Name" v-model="nameSearch" placeholder="Name"></label>
    </div>

  </div>
</template>

<script>
  import EditCell from './EditCell'
  export default {
    components: {
      EditCell
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
        sortReverse: true
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
      sortTable (sortReverse) {
        let payload = {
          sortReverse: sortReverse,
          category: 'Name'
        }
        this.$store.dispatch('sortTable', payload)
        this.sortReverse = !this.sortReverse
      }
    },
    watch: {
      nameSearch () {
        this.$store.dispatch('filterTable', this.nameSearch)
      }
    }

  }
</script>
