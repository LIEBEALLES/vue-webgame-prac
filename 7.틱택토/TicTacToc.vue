<template>
  <div>
    <div>{{ turn }} 님의 턴 입니다.</div>
    <table-component v-bind:table-data="tableData"/>
    <div v-if="winner">{{ winner }}님의 승리</div>
  </div>
</template>

<script>
import TableComponent from "./TableComponent";
import Vue from 'vue';

export default {
  name: "TicTacToc",
  components: {TableComponent},
  data() {
    return {
      tableData: [
        ['', '', ''],
        ['', '', ''],
        ['', '', ''],
      ],
      turn: 'O',
      winner: ''
    }
  },
  methods: {
    onChangeData() {
      //this.tableData[1][0] = 'X' 작동하지않음
      this.$set(this.tableData[1], 0, 'X'); //Vue.set과 동일
    }
  }
}
</script>

<style>
table {
  border-collapse: collapse;
}

td {
  border: 1px solid black;
  width: 40px;
  height: 40px;
  text-align: center;
}
</style>