<template>
  <div class="home">
    <SwiperTopVue />
    <IconListVue />
    <MusicListVue />
  </div>
</template>

<script>
// @ is an alias to /src
import SwiperTopVue from "@/components/home/SwiperTop.vue";
import IconListVue from "@/components/home/IconList.vue";
import MusicListVue from "@/components/home/MusicList.vue";
export default {
  name: 'HomeView',
  components: {
    SwiperTopVue,
    IconListVue,
    MusicListVue
  }
}
</script>
<style lang="less" scoped>
.home {
  position: absolute;
  top: 2rem;
  width: 100%;
}
</style>