<template>
  <div>
    <div id="screen" :class="state" @click="onClickScreen">{{ message }}</div>
    <!-- 딱히 역할이 없는 div인데 감싸주는용도로 div 쓰고 싶지 않으면 template을 쓰면된다.-->
    <template v-if="result.length">
      <div>평균시간 : {{ average }}ms</div>
      <button @click="onReset">reset</button>
    </template>
  </div>
</template>

<script>
//화면이랑 관련없는 데이터들이기때문에 script 단의 data 에 안넣음
let startTime = 0;
let endTime = 0;
let timeOut = null;
export default {
  data() {
    return {
      result: [],
      state: 'waiting',
      message: '클릭해서 시작하세요.'
    }
  },
  computed: {
    average() {
      return this.result.reduce((a, c) => a + c, 0) / this.result.length || 0 //computed 를 쓰는 이유 ; 캐싱이된다.
    }
  },
  methods: {
    onReset() {
      this.result = [];
    },
    onClickScreen() {

      if (this.state === 'waiting') {
        this.state = 'ready';
        this.message = '초록색이 되면 클릭하세요'
        timeOut = setTimeout(() => {
          this.state = 'now';
          this.message = '지금클릭!';
          startTime = new Date();
        }, Math.floor(Math.random() * 1000) + 2000) //2~3초
      } else if (this.state === 'ready') {
        clearTimeout(timeOut); //기존 타임아웃을 없애줌
        this.state = 'waiting'
        this.message = '너무 성급하시군요 ! 초록색이 되면 클릭하세요.'
      } else if (this.state === 'now') {
        endTime = new Date();
        this.state = 'waiting'
        this.message = '클릭해서 시작하세요';
        this.result.push(endTime - startTime);
      }
    }
  }
}
</script>

<style scoped>
#screen {
  width: 300px;
  height: 200px;
  text-align: center;
  user-select: none;

}

#screen.waiting {
  background-color: aquamarine;
}

#screen.ready {
  background-color: red;
  color: white;
}

#screen.now {
  background-color: greenyellow;
}
</style>
