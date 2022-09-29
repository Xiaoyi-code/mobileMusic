<template>
  <div class="header">
    <HeaderVue>
      <template v-slot:left>
        <div class="header-left">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-music"></use>
          </svg>
        </div>
      </template>
      <template v-slot:center>
        <span class="header-title">思鱼音乐</span>
      </template>
      <template v-slot:right>
        <div class="header-right">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-xihuan2"></use>
          </svg>
        </div>
      </template>
    </HeaderVue>
  </div>
</template>

<script>
import HeaderVue from "./Header.vue";
export default {
  components: {
    HeaderVue
  }
}
</script>

<style lang="less" scoped>
.header {
  .header-left {
    padding-left: .2rem;

    .icon {
      width: .6rem;
      height: .6rem;
    }
  }

  .header-title {
    color: aliceblue;
    font-size: .32rem;
    font-weight: bold;
  }

  .header-right {
    padding-right: .2rem;

    .icon {
      width: .6rem;
      height: .6rem;
    }
  }
}
</style>