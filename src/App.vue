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
<style lang="less" >

</style>
