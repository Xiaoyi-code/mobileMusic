<template>
  <div id="wrapper" ref="wrapper">
    <slot></slot>
  </div>
</template>

<script>
import IScroll from 'iscroll/build/iscroll-probe'
export default {
  mounted () {
    this.iscroll = new IScroll(this.$refs.wrapper, {
      mouseWheel: true,
      scrollbars: true
    })
    // 1.创建一个观察者对象
    /*
    MutationObserver构造函数只要监听到了指定内容发生了变化, 就会执行传入的回调函数
    mutationList: 发生变化的数组
    observer: 观察者对象
    * */
    let observer = new MutationObserver((mutationList, observer) => {
      // console.log(mutationList)
      // console.log(this.iscroll.maxScrollY)
      this.iscroll.refresh()
      // console.log(this.iscroll.maxScrollY)
    })
    // 2.告诉观察者对象我们需要观察什么内容
    let config = {
      childList: true, // 观察目标子节点的变化，添加或者删除
      subtree: true, // 默认为 false，设置为 true 可以观察后代节点
      attributeFilter: ['height', 'offsetHeight'] // 观察特定属性
    }
    // 3.告诉观察者对象, 我们需要观察谁, 需要观察什么内容
    /*
    第一个参数: 告诉观察者对象我们需要观察谁
    第二个参数: 告诉观察者对象我们需要观察什么内容
    * */
    observer.observe(this.$refs.wrapper, config)
  }
}
</script>

<style lang="less" scoped>
#wrapper {
  width: 100%;
  height: 100%;
}
</style>