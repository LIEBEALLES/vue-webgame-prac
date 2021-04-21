<template>
  <div>
    <input type="number" placeholder="세로" :value="row" @change="onChangeRow">
    <input type="number" placeholder="가로" :value="cell" @change="onChangeCell">
    <input type="number" placeholder="지뢰" :value="mine" @change="onChangeMine">
    <button @click="onClickBtn">시작</button>
  </div>
</template>

<script>
import store,{START_GAME} from "./store";

export default {
  store,
  name: "MineForm",
  //데이터를vuex 에서 중앙통제하고 있지만 그렇다고 컴포넌트의 데이터를 아예 안 쓰는 것은 아니다.
  //지역적인 데이터?로 만드는 게 좋다. 이 데이터를 여러곳에서 같이 쓴다면 vuex 에서 관리하고
  data() {
    return {
      row: 10,
      cell: 10,
      mine: 20,
    }
  },
  methods: {
    onChangeRow(e) {
      console.log(e.target.value); //인풋값에 들어온 값
      this.row = e.target.value;
    },
    onChangeCell(e) {
      this.cell = e.target.value;
    },
    onChangeMine(e) {
      this.mine = e.target.value;
    },
    onClickBtn(){
      this.$store.commit(START_GAME, {row: this.row, cell:this.cell, mine:this.mine});
    }
  }
}
</script>

<style scoped>

</style>