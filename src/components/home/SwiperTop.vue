<template>
  <div class="swiperTop">
    <van-swipe :autoplay="3000" lazy-render>
      <van-swipe-item v-for="image in state.images" :key="image">
        <img :src="image.pic" />
        <img v-lazy="image.pic" />
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
import axios from "axios"
import { getBanner } from "@/request/api/home.js"
import { reactive, onMounted } from "vue";
export default {
  data () {
    return {
      state: {
        images: [
          'https://fastly.jsdelivr.net/npm/@vant/assets/apple-1.jpeg',
          'https://fastly.jsdelivr.net/npm/@vant/assets/apple-2.jpeg',
        ]
      }
    }
  },
  mounted () {
    let res = getBanner();
    res
      .then((res) => {
        this.state.images = res.data.banners
        // console.log("请求轮播图成功！", res)
      })
      .catch((message) => {
        console.log('请求轮播图失败！', message)
      })

  }
}
</script>

<style lang="less" scoped>
.swiperTop {
  width: 100%;

  .van-swipe {
    width: 100%;
    height: 3rem;

    .van-swipe-item {
      padding: 0 0.2rem;

      img {
        width: 100%;
        height: 100%;
        border-radius: 0.2rem;
      }
    }
  }
}
</style>