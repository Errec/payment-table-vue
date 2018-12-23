<template>
  <tbody class="table-body">
  <tr v-for="(rows, index) in bodyData.table" v-show="index >= (bodyData.currentFirst) && index < (bodyData.currentLast)">
    <td v-for="(value, key) in rows">
      <span v-if="key !== 'Description' && key !== 'ID'" :key="rows.ID">
        {{value}}
      </span>
      <div v-if="key === 'ID'" :key="rows.ID">
        <p class="edit-cell__id-text">{{value}}</p>
        <button class="edit-cell__id-btn" @click="showID(value)" type="button"></button>
      </div>
      <edit-cell v-if="key === 'Description'" :dataRow="rows" :key="rows.ID"></edit-cell>
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
    },
    methods: {
      showID (value) {
        this.$swal(
          `ID: ${value}`
        )
      }
    }
  }
</script>

<style lang="sass">
  @import "../styles/variables/colors"

  .table-body
    td
      word-wrap: break-word
      overflow-wrap: break-word
      width: 100%
      text-align: center
      &:nth-child(3)
        text-align: left
    tr:nth-child(even)
      background-color: rgba($blue-duck, 0.7)

  .edit-cell__id-btn
    margin: 0 auto
    display: none
    border: none
    outline: none
    cursor: pointer
    background: 
      image: url('../assets/img/id-card.svg')
      color: transparent
      size: cover
    width: 30px
    height: 30px

  @media only screen and (max-width: 600px)
    .table-body
      font-size: 0.8rem
    .edit-cell__id-text
      display: none
    .edit-cell__id-btn
      display: block

</style>