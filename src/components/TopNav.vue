<template>
  <div class="topNav">
    <div class="nav">
      <router-link tag="div" class="item" to="/">
        <span>推荐</span>
      </router-link>
      <router-link tag="div" class="item" to="/singer">
        <span>歌手</span>
      </router-link>
      <router-link tag="div" class="item" to="/search">
        <span>搜索</span>
      </router-link>
    </div>
  </div>

</template>

<script>
export default {

}
</script>

<style lang="less" scoped>
.topNav {
  position: fixed;
  z-index: 10;
  top: 1rem;
  width: 100%;
  height: 1rem;

  .nav {
    display: flex;
    height: 100%;
    justify-content: space-around;
    align-items: center;
    background: rgb(239, 245, 247);

    .item {
      padding: .1rem;

      span {
        color: #666;
      }

      &.router-link-active {
        span {
          color: red;
          font-weight: bold;

        }

        border-bottom: .03rem solid red;
      }
    }

  }
}
</style>