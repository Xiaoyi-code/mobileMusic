<template>
  <div class="header">
    <slot name="left">左边</slot>
    <slot name="center">中</slot>
    <slot name="right">右</slot>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>
.header {
  width: 100%;
  height: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>