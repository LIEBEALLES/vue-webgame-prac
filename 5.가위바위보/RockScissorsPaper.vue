<template>
  <div>
    <div id="computer" v-bind:style="computedStyleObject"></div>
    <div>
      <button @click="onClickButton('바위')">바위</button>
      <button @click="onClickButton('가위')">가위</button>
      <button @click="onClickButton('보')">보</button>
    </div>
    <div>{{ result }}</div>
    <div>현재 {{ score }} 점</div>
  </div>
</template>

<script>
const rspCoords = {
  바위: '0',
  가위: '-142px',
  보: '-284px'
}
let interval = null; //이렇게 하는 이유는 나중에 clearInterval로 멈춰주려고 변수에 저장하는 것임.
const scores = {
  가위: 1,
  바위: 0,
  보: -1
}
const computerChoice = (imgCoord) => {
  return Object.entries(rspCoords).find(function (v) {
    console.log("v[1] :", v[1]);
    return v[1] === imgCoord; //첫번째요소값을 반환한다 ?
  })[0];
}
export default {
  data() {
    return {
      imgCoord: rspCoords.바위,
      result: '',
      score: 0,
    }
  },
  computed: {
    computedStyleObject() {
      return {
        background: `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${this.imgCoord} 0`,
      }
    }
  },
  methods: {
    onClickButton(choice) {
      clearInterval(interval);
      const myScore = scores[choice];
      console.log(myScore)
      const cpuScore = scores[computerChoice(this.imgCoord)];
      const diff = myScore - cpuScore;
      if (diff === 0) {
        this.result = '비김';
      } else if ([-1, 2].includes(diff)) {
        this.result = '이김!!!';
        this.score += 1;
      } else {
        this.result = '졌음ㅠㅠ.';
        this.score -= 1;
      }
      setTimeout(()=>{
        this.changeHand();
      },1000)
    },
    changeHand() {
      interval = setInterval(() => {
        if (this.imgCoord === rspCoords.바위) {
          this.imgCoord = rspCoords.가위
        } else if (this.imgCoord === rspCoords.가위) {
          this.imgCoord = rspCoords.보
        } else if (this.imgCoord === rspCoords.보) {
          this.imgCoord = rspCoords.바위;
        }
      }, 100); //0.1초마다 번갈아가면서 이미지를 교체하자
    },
  },
  mounted() {
    console.log('mounted');
    this.changeHand();
  },

  beforeDestroy() {
    console.log('beforeDestroy')
    clearInterval(interval); //무조건 해줘야한다. ->메모리 누수 문제가 발생하지 않는다.
  },

}
</script>

<style scoped>
#computer {
  width: 142px;
  height: 200px;
  background-position: 0 0;
}
</style>
