<template>
  <table>
    <!--    tr : row -->
    <tr-component v-for="(rowData, index) in tableData" :row-data="rowData" :row-index="index" :key="index"/>
  </table>
</template>

<script>
import TrComponent from "./TrComponent";

export default {
  name: "TableComponent",
  components: {TrComponent},
  props: {
    tableData: Array
  }
}
</script>

<style scoped>

</style>