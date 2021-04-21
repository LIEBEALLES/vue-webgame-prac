<template>
  <div>
    <mine-form/>
    <div>{{ timer }}</div>
    <table-component/>
    <div>{{ result }}</div>
  </div>
</template>

<script>
import MineForm from "./MineForm";
import TableComponent from "./TableComponent";
import  {mapState} from "vuex";
import store, {INCREMENT_TIMER} from './store';

let interval;
export default {
  store,
  components: {TableComponent, MineForm},
  computed: {
    //timer 와 result는 store의 state 니까 map으로 가져온다.
    ...mapState(['timer', 'result', 'halted'])
  },
  watch:{
    halted(value, oldValue){
      if(value === false){ //false 일 때 게임시작
       interval = setInterval(()=>{
          this.$store.commit(INCREMENT_TIMER);
        },1000) // 게임이 시작되면 1초마다 timer 올려줌 , 잡스의 타이머가 진짜가 아닐 수 있음.
      }else{ //게임중단
        clearInterval(interval);
      }
    }
  }
};
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