<template>
  <div class="home">
    <div class="home-wrapper">
      <ScrollView>
        <div>
          <SwiperTopVue />
          <IconListVue />
          <MusicListVue />
        </div>
      </ScrollView>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import SwiperTopVue from "@/components/home/SwiperTop.vue";
import IconListVue from "@/components/home/IconList.vue";
import MusicListVue from "@/components/home/MusicList.vue";
import ScrollView from '@/components/ScrollView.vue'
export default {
  name: 'HomeView',
  components: {
    SwiperTopVue,
    IconListVue,
    MusicListVue,
    ScrollView
  }
}
</script>
<style lang="less" scoped>
// .home {
//   position: absolute;
//   top: 2rem;
//   width: 100%;
// }
.home {
  position: fixed;
  top: 2rem;
  left: 0;
  right: 0;
  bottom: 0;

  .home-wrapper {
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
}
</style>