<template>
  <div>
    <div>당첨숫자</div>
    <div id="결과창">
      <lotto-ball v-for="ball in winBalls" :number="ball" :key="ball"></lotto-ball>
    </div>
    <div>보너스</div>
    <lotto-ball v-if="bonus" :number="bonus"></lotto-ball>
    <button v-if="redo" @click="onClickRedo">한 번 더!</button>
  </div>
</template>

<script>
import LottoBall from "./LottoBall";

function getWinNumbers() {
  //셔플정렬 -> 랜덤으로 숫자 7개 뽑는거
  console.log('getWinNumbers');
  const candidate = Array(45).fill().map((v, i) => i + 1);
  const shuffle = [];
  while (candidate.length > 0) {
    shuffle.push(candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0]);
  }
  const bonusNumber = shuffle[shuffle.length - 1];
  const winNumbers = shuffle.slice(0, 6).sort((p, c) => p - c);
  return [...winNumbers, bonusNumber];
}
const timeouts = [];
export default {
  name: "LottoGenerator.vue",
  components: {LottoBall},
  data() {
    return {
      winNumbers: getWinNumbers(), //처음에 숫자를 한 방에 다 뽑고 공을 1초마다 공개할거다. 그렇기 때문에 뽑아놓고 winBalls 배열에 옮겨서 나오도록..!
      winBalls: [],
      bonus: null,
      redo: false
    }
  },
  mounted() {
    this.showBalls();
  },
  methods: {
    onClickRedo() {
      this.winNumbers = getWinNumbers();
      this.winBalls = [];
      this.bonus = null;
      this.redo = false;
      this.showBalls();
    },
    showBalls() {
      for (let i = 0; i < this.winNumbers.length - 1; i++) {
        //일단 다 뽑아놓은 것에서 6개만 뽑자
       timeouts[i]= setTimeout(() => {
          this.winBalls.push(this.winNumbers[i])
        }, (i + 1) * 1000);
      }
     timeouts[6] = setTimeout(() => {
        this.bonus = this.winNumbers[6];
        this.redo = true;
      }, 7000);
    },
    beforeDestroy() {
      timeouts.forEach((t)=>{
        clearTimeout(t);
      })
    },
    watch:{
      winBalls(val, oldVal){
        if(val.length === 0){
          this.showBalls();
        }
      }
    }
  }
}
</script>

<style scoped>

</style>