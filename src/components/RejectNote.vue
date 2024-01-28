<template>
  <div class="box py-5 px-5">
    <div class="font-weight-bold mb-2">Reject Note:</div>
    <div class="value">{{ value }}</div>
  </div>
</template>

<script setup>
defineProps({
  value: {
    type: String,
    default: ''
  }
})
</script>

<style lang="scss" scoped>
.box {
  border-radius: 5px;
  background: #FFF2C5;
  min-height: 100px;

  &>div:first-child {
    color: #111;
  }

  .value {
    white-space: pre-wrap;

    color: #6F6B7D;
    font-weight: 300;
    line-height: 22px;
  }
}
</style>
