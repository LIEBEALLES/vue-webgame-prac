<template>
  <td @click="onClickTd">{{ cellData }}</td>
</template>

<script>
export default {
  name: "TdComponent",
  props: {
    cellData: String,
    rowIndex: Number,
    cellIndex: Number
  },
  methods: {
    onClickTd() {
      //남이 누른 경우
      if(this.cellData) return;

      const rootData = this.$root.$data;
      //console.log(this.$parent.$data); 내가 니 아빠다.
      //테이블 데이터에 가로행 수 세로행 수 칸이 나온다. 현재 턴으로 바꿔줌
      //현재턴이 O면 O를 넣어주고 X면 X를 넣는다.
      //this.$root.$data.tableData[this.rowIndex][this.cellIndex] = this.$root.$data.turn;
      this.$set(rootData.tableData[this.rowIndex], this.cellIndex, rootData.turn);

      let win = false;
      if (rootData.tableData[this.rowIndex][0] === rootData.turn && rootData.tableData[this.rowIndex][1] === rootData.turn && rootData.tableData[this.rowIndex][2] === rootData.turn) {
        win = true;
      }
      if (rootData.tableData[0][this.cellIndex] === rootData.turn && rootData.tableData[1][this.cellIndex] === rootData.turn && rootData.tableData[2][this.cellIndex] === rootData.turn) {
        win = true;
      }
      if (rootData.tableData[0][0] === rootData.turn && rootData.tableData[1][1] === rootData.turn && rootData.tableData[2][2] === rootData.turn) {
        win = true;
      }
      if (rootData.tableData[0][2] === rootData.turn && rootData.tableData[1][1] === rootData.turn && rootData.tableData[2][0] === rootData.turn) {
        win = true;
      }

      if (win) { // 이긴 경우: 3줄 달성
        rootData.winner = rootData.turn;
        rootData.turn = 'O';
        rootData.tableData = [['', '', ''], ['', '', ''], ['', '', '']];
      } else { // 무승부
        let all = true; // all이 true면 무승부라는 뜻
        rootData.tableData.forEach((row) => { // 무승부 검사
          row.forEach((cell) => {
            if (!cell) {
              all = false;
            }
          });
        });
        if (all) { // 무승부
          rootData.winner = '';
          rootData.turn = 'O';
          rootData.tableData = [['', '', ''], ['', '', ''], ['', '', '']];
        } else {
          rootData.turn = rootData.turn === 'O' ? 'X' : 'O';
        }
      }
    }
  }
}
</script>

<style scoped>

</style>