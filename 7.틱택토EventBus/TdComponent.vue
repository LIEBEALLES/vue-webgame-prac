<template>
  <td @click="onClickTd">{{ cellData }}</td>
</template>

<script>
import EventBus from "./EventBus";
export default {
  name: "TdComponent",
  props: {
    cellData: String,
    rowIndex: Number,
    cellIndex: Number
  },
  methods: {
    onClickTd() {
      if(this.cellData) return;
      EventBus.$emit('clickTd',this.rowIndex, this.cellIndex); //이밋이 되면 onClickTd 가 실행된다.
    }
  }
}
</script>

<style scoped>

</style>