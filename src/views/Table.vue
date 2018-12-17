<template>
   <div class="ui container">
    <vuetable ref="vuetable"
        api-url="https://vuetable.ratiw.net/api/users"
        :fields="fields"
        pagination-path=""
        @vuetable:pagination-data="onPaginationData"
      >

      </vuetable>
      <vuetable-pagination ref="pagination"
        @vuetable-pagination:change-page="onChangePage"
      ></vuetable-pagination>
      </div>
</template>

<script>
import Vuetable from 'vuetable-2/src/components/Vuetable'
import VuetablePagination from 'vuetable-2/src/components/VuetablePagination'
import VuetablePaginationInfo from 'vuetable-2/src/components/VuetablePaginationInfo'


  export default {
    components: {
      Vuetable,
      VuetablePagination,
      VuetablePaginationInfo
    },
    data () {
      return {
        fields: ['name', 'email','birthdate','nickname','gender','__slot:actions']
      }
    },
    methods: {
      onPaginationData (paginationData) {
        this.$refs.pagination.setPaginationData(paginationData)
      },
      onChangePage (page) {
        this.$refs.vuetable.changePage(page)
      },
      editRow(rowData){
        alert("You clicked edit on"+ JSON.stringify(rowData))
      },
      deleteRow(rowData){
        alert("You clicked delete on"+ JSON.stringify(rowData))
      }
    }
  }
</script>
