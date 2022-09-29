<template>
  <div class="topNav">
    <!-- <div class="topleft">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-31liebiao"></use>
      </svg>
    </div>
    <div class="topContent">
      <span @click="$router.push('/InfoUser')">我的</span>
      <span class="active">发现</span>
      <span>云村</span>
      <span>视频</span>
    </div>
    <div class="topRight">
      <svg class="icon" aria-hidden="true" @click="$router.push('/search')">
        <use xlink:href="#icon-sousuo"></use>
      </svg>
    </div> -->
    <router-link tag="div" class="item" to="/InfoUser">
      <span>我的</span>
    </router-link>
    <router-link tag="div" class="item" to="/">
      <span>发现</span>
    </router-link>
    <router-link tag="div" class="item" to="/rank">
      <span>排行</span>
    </router-link>
    <router-link tag="div" class="item" to="/search">
      <span>搜索</span>
    </router-link>
  </div>

</template>

<script>
export default {

}
</script>

<style lang="less" scoped>
.topNav {
  width: 100%;
  height: 1rem;
  padding: .2rem;
  display: flex;
  justify-content: space-around;
  align-items: center;
  z-index: 10;

  .topContent {
    width: 65%;
    height: 100%;
    display: flex;
    justify-content: space-around;
    // align-items: center;
    font-size: .36rem;

    .active {
      font-weight: 900;
    }
  }

  span {
    color: #666;
  }
}
</style>