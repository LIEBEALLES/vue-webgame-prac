<template>
  <div>
    <h3>{{ result }}</h3>
    <form @submit.prevent="onSubmitForm">
      <input ref="answer" minlength="4" maxlength="4" v-model="value"/>
      <button type="submit">입력</button>
    </form>
    <div>시도 : {{ tries.length }}</div>
    <ul>
      <li v-for="t in tries">
        {{ t.try }}
        {{ t.result }}
      </li>
    </ul>
  </div>
</template>

<script>
//랜덤숫자생성
const getNumbers = () => {
  const candidates = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const array = [];
  for (let i = 0; i < 4; i++) {
    const chosen = candidates.splice(Math.floor(Math.random() * (9 - i)), 1)[0];
    array.push(chosen);
  }
  return array;
};
export default {
  name: "NumberBaseball",
  data() {
    return {
      answer: getNumbers(), //ex)[1,5,3,4]
      tries: [],
      value: '',
      result: '',
      isNumber: ''
    }
  },
  methods: {
    checkNumber() {
      //중복값 확인
      //문자열 x
      //숫자만 가능하게끔
      //console.log('여기 들어오니')
      const letterCheck = /[0-9]/;
      const inputNumber = this.value;

      if (letterCheck.test(inputNumber)) {

        const arr = this.value.split('').map(value => parseInt(value));
        //배열 중복 검사
        for (let i = 0; i < arr.length - 1; i++) {
          for (let j = i + 1; j < arr.length; j++) {
            if (arr[i] == arr[j]) {
              alert('중복된 숫자가 있습니다.')
              this.value = '';
              return this.isNumber = false;
            } else {
              return this.isNumber = true;
            }
          }
        }

      } else {
        alert('문자열이 포함되어있습니다.다시 입력해주세요.')
        return this.isNumber = false;
      }
    },
    onSubmitForm() {
      console.log(this.answer)
      this.checkNumber(); // 입력된 숫자 확인하기
      if (this.isNumber = true) {
        if (this.value === this.answer.join('')) { //정답 맞췄으면
          // join() 메서드는 배열의 모든 요소를 연결해 하나의 문자열로 만듭니다. [1,2,3] = "1,2,3"
          //this.value 는 문자고 answer 은 배열이기 때문에 join을 해줘서 비교한다.
          this.tries.push({
            try: this.value,
            result: '홈런'
          });
          this.result = '홈런';
          alert("게임을 다시 시작합니다.")
          this.answer = getNumbers();
          this.value = ''; //인풋값 초기화
          this.tries = []; //시도 초기화
          this.$refs.answer.focus();
        } else { //틀렸을 때
          if (this.tries.length >= 9) { //10번째 시도
            this.result = `기회를 모두 소진하였습니다. 답은 ${this.answer.join('')}였습니다.`
            alert("게임을 다시 시작합니다.")
            this.answer = getNumbers();
            this.value = ''; //인풋값 초기화
            this.tries = []; //시도 초기화
            this.$refs.answer.focus();
          }
          let strike = 0;
          let ball = 0;
          const answerArray = this.value.split('').map(v => parseInt(v)); //문자열을 숫자배열로 바꾸는 코드
          //문자열을 잘라서 parseInt 해주는 것
          for (let i = 0; i < 4; i += 1) {
            if (answerArray[i] === this.answer[i]) { //숫자 자리수 모두 정답
              strike++;
            } else if (this.answer.includes(answerArray[i])) { //숫자만 정답
              ball++;
            }
          }
          this.tries.push({
            try: this.value,
            result: `${strike} 스트라이크, ${ball} 볼입니다.`
          })
        }
      }
      this.value = '';
      this.$refs.answer.focus();

    }
  }
}
</script>

<style scoped>

</style>