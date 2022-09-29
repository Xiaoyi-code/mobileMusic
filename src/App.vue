<template>
  <div class="app">
    <MainHeaderVue />
    <TopNavVue />
    <router-view />
    <FooterMusicVue />
  </div>
</template>
<script>
import FooterMusicVue from "./components/FooterMusic.vue";
import MainHeaderVue from "./components/MainHeader.vue";
import TopNavVue from "./components/TopNav.vue";
export default {
  components: {
    MainHeaderVue,
    TopNavVue,
    FooterMusicVue
  },
}
</script>
<style lang="less">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.icon {
  width: .5rem;
  height: .5rem;
}

a {
  color: black;
}
</style>
