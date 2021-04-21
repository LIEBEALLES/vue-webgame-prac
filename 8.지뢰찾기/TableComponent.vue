<template>
  <table>
    <tr v-for="(rowData, rowIndex) in tableData" :key="rowIndex">
      <td v-for="(cellData, cellIndex) in rowData"
          :key="cellIndex"
          :style="cellDataStyle(rowIndex,cellIndex)"
          @click="onClickTd(rowIndex,cellIndex)"
          @contextmenu.prevent="onRightClickTd(rowIndex,cellIndex)"
      >
        {{ cellDataText(rowIndex, cellIndex) }}
      </td>
    </tr>
  </table>
</template>

<script>
import {mapState} from 'vuex';
import {CLICK_MINE, CODE, FLAG_CELL, NORMALIZE_CELL, OPEN_CELL, QUESTION_CELL} from "./store";

export default {
  name: "TableComponent",
  computed: {
    ...mapState(['tableData', 'halted']), //뷰엑스 스토어가 컴퓨티드에 연결이된다.
    //왜 computed 에 두냐 ?
    //cellData 를 기반으로 스타일이나, 화면에 표시할 것들을 다시 만드는 것이기 때문에!
    cellDataStyle(state) {
      return (row, cell) => {
        switch (this.$store.state.tableData[row][cell]) {
          case CODE.NORMAL:
          case CODE.MINE :
            return {
              background: '#444',
            };
          case CODE.CLICKED_MINE :
          case CODE.OPENED:
            return {
              background: 'white'
            };
          case CODE.FLAG:
          case CODE.MINE:
            return {
              background: 'red'
            };
          case CODE.QUESTION:
          case CODE.QUESTION_MINE :
            return {
              background: 'yellow'
            }
          default:
        }
      }

    },
    cellDataText(state) {
      return (row, cell) => {
        switch (this.$store.state.tableData[row][cell]) {
          case CODE.MINE:
            return 'X';
          case CODE.NORMAL:
            return '';
          case CODE.FLAG:
          case CODE.FLAG_MINE:
            return '!';
          case CODE.QUESTION_MINE:
          case CODE.QUESTION:
            return '?';
          case CODE.CLICKED_MINE:
            return '💣';
          default:
            return this.$store.state.tableData[row][cell] || ''; //주변지뢰갯수 몇개인지 보여주는 것을 기본으로
        }
      }

    }
  },
  methods: {
    onClickTd(row, cell) {
      if (this.halted) {
        //게임이 중단됐을 때
        return; //칸 클릭 못하게
      }
      switch (this.tableData[row][cell]) {
        case CODE.NORMAL:
          return this.$store.commit(OPEN_CELL, {row, cell});
        case CODE.MINE:
          return this.$store.commit(CLICK_MINE, {row, cell});
        default:
          return;
      }
      this.$store.commit(OPEN_CELL, {row, cell});
    },
    onRightClickTd(row, cell) {
      if (this.halted) {
        return; //게임이 중단된 경우에는 그냥 중지
      }
      switch (this.tableData[row][cell]) {
        case CODE.NORMAL:
        case CODE.MINE: //빈칸이거나 지뢰가 심어진 경우 깃발
          this.$store.commit(FLAG_CELL, {row, cell})
          return;
        case CODE.FLAG:
        case CODE.FLAG_MINE: //깃발칸에서 오른쪽 클릭하면 물음표가되고
          this.$store.commit(QUESTION_CELL, {row, cell})
          return;
        case CODE.QUESTION:
        case CODE.QUESTION_MINE: //물음표에서 오른쪽 클릭하면 빈칸이 된다.
          this.$store.commit(NORMALIZE_CELL, {row, cell})
          return;
        default:
          return;
      }
    }
  }
}
</script>

<style scoped>

</style>