<template>
  <div class="musicDetal">
    <img :src="musicList.al.picUrl" alt="" class="bgimg" />
    <div class="detailTop">
      <div class="detailTopLeft">
        <svg class="icon liebiao" aria-hidden="true" @click="backHome">
          <use xlink:href="#icon-zuojiantou"></use>
        </svg>
        <div class="leftMarquee">
          <Vue3Marquee style="color: #fff">{{ musicList.al.name }}</Vue3Marquee>
          <span v-for="item in musicList.ar" :key="item">
            {{ item.name }}
          </span>
          <svg class="icon liebiao" aria-hidden="true">
            <use xlink:href="#icon-youjiantou1"></use>
          </svg>
        </div>
      </div>
      <div class="detailTopRight">
        <svg class="icon liebiao" aria-hidden="true">
          <use xlink:href="#icon-fenxiang"></use>
        </svg>
      </div>
    </div>
    <div class="detailContent" v-show="!isLyricShow">
      <img src="@/assets/needle-ab.png" alt="" class="img_needle" :class="{ img_needle_active: !isbtnShow }" />
      <img src="@/assets/cd.png" alt="" class="img_cd" />
      <img :src="musicList.al.picUrl" alt="" class="img_ar" @click="isLyricShow = true"
        :class="{ img_ar_active: !isbtnShow, img_ar_pauesd: isbtnShow }" />
    </div>
    <div class="musicLyric" ref="musicLyric" v-show="isLyricShow">
      <p v-for="item in lyric" :key="item" :class="{
        active:
          currentTime * 1000 >= item.time && currentTime * 1000 < item.pre,
      }">
        {{ item.lrc }}
      </p>
    </div>
    <div class="detailFooter">
      <div class="footerTop">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-aixin"></use>
        </svg>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-xiazai"></use>
        </svg>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-changpian"></use>
        </svg>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-xiaoxi"></use>
        </svg>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-liebiao1"></use>
        </svg>
      </div>
      <div class="footerContent">
        <input type="range" class="range" min="0" :max="duration" v-model="currentTime" step="0.05">
      </div>
      <div class="footer">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-xunhuan"></use>
        </svg>
        <svg class="icon" aria-hidden="true" @click="goPlay(-1)">
          <use xlink:href="#icon-shangyishoushangyige"></use>
        </svg>
        <svg class="icon bofang" aria-hidden="true" v-if="isbtnShow" @click="play">
          <use xlink:href="#icon-bofang"></use>
        </svg>
        <svg class="icon bofang" aria-hidden="true" v-else @click="play">
          <use xlink:href="#icon-zanting"></use>
        </svg>
        <svg class="icon" aria-hidden="true" @click="goPlay(1)">
          <use xlink:href="#icon-xiayigexiayishou"></use>
        </svg>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-liebiao"></use>
        </svg>
      </div>
    </div>
  </div>
</template>

<script>
//局部注册跑马灯组件
import { Vue3Marquee } from 'vue3-marquee'
import 'vue3-marquee/dist/style.css'
import { mapMutations, mapState } from "vuex";
export default {
  components: {
    Vue3Marquee
  },
  data () {
    return {
      isLyricShow: false,
    };
  },
  props: ["musicList", "isbtnShow", "play", "updataAllTime"],
  computed: {
    ...mapState(['playListIndex', 'lyricList', 'currentTime', 'playList', 'duration']),
    //获取歌词
    lyric: function () {
      let arr;
      let getLyric = this.lyricList.lyric
      if (getLyric) {
        // console.log(getLyric.split(/[(\r\n)\r\n]+/))
        arr = getLyric.split(/[(\r\n)\r\n]+/).map((item, i) => {
          let min = item.slice(1, 3);
          let sec = item.slice(4, 6);
          let mill = item.slice(7, 10);
          let lrc = item.slice(11, item.length);
          let time =
            parseInt(min) * 60 * 1000 + parseInt(sec) * 1000 + parseInt(mill);
          if (isNaN(Number(mill))) {
            //因为开头两句的毫秒是000，后面的都是00],这里需要判断切割的位置
            mill = item.slice(7, 9);
            lrc = item.slice(10, item.length);
            time =
              parseInt(min) * 60 * 1000 + parseInt(sec) * 1000 + parseInt(mill);
          }
          // console.log(min,sec,Number(mill),lrc);
          return { min, sec, mill, lrc, time };
        });
        arr.forEach((item, i) => {
          //当下一句歌词是最后一句，或者当前歌词是最后一句，则设置下一句歌词时间为无穷大，这里是100000毫秒
          if (i === arr.length - 1 || isNaN(arr[i + 1].time)) {
            item.pre = 100000;
          } else {
            item.pre = arr[i + 1].time;
          }
        });
      }
      // console.log(arr);
      return arr;
    },
  },
  methods: {
    ...mapMutations(["updateDetailShow", "updatePlayListIndex"]),
    //backHome 退出歌曲详情页，同时让歌词部分隐藏，因为再次点击进去，要显示磁盘而不是歌词
    backHome: function () {
      this.isLyricShow = false;
      this.updateDetailShow();
    },
    //切换下一首和上一首
    goPlay: function (num) {
      let index = this.playListIndex + num
      if (index < 0) {
        index = this.playList.length - 1
      } else if (index == this.playList.length) {
        index = 0
      }
      this.updatePlayListIndex(index)
      // this.updataAllTime()
    },
  },
  watch: {
    //控制歌词自动滑动
    currentTime: function (newValue) {
      let p = document.querySelector("p.active");

      if (p) {
        //设置一个高亮歌词的最大高度H=300，当歌词当前高度cur_H>H,则使滚动条向下滚动cur_H-H
        //offsetTop是元素当前高度，scrollTop是垂直滚动条位置
        if (p.offsetTop > 300) {
          this.$refs.musicLyric.scrollTop = p.offsetTop - 300;
        }
      }
      //当歌曲播放完后，自动播放下一首
      if (newValue === this.duration) {
        if (this.playListIndex === this.playList.length - 1) {
          this.updatePlayListIndex(0);
          // this.play()
        } else {
          this.updatePlayListIndex(this.playListIndex + 1);
        }
      }
      // console.log('curtime:', newValue, "alltime:", this.duration)
      // console.log([this.$refs.musicLyric])
    },

  },
  mounted () {
    // console.log("mounted更新")
    this.updataAllTime()
  },
  updated () {
    // console.log("updated更新")
    this.updataAllTime()
  }
}
</script>

<style lang="less" scoped>
.bgimg {
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: -1;
  filter: blur(70px);
}

.detailTop {
  width: 100%;
  height: 1rem;
  display: flex;
  padding: 0.2rem;
  justify-content: space-between;
  align-items: center;
  fill: #fff;

  .detailTopLeft {
    display: flex;
    align-items: center;

    .leftMarquee {
      width: 3rem;
      height: 100%;
      margin-left: 0.4rem;

      span {
        color: #999;
      }

      .icon {
        width: 0.3rem;
        height: 0.3rem;
        fill: #999;
      }
    }
  }
}

.detailContent {
  width: 100%;
  height: 9rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;

  .img_needle {
    width: 2rem;
    height: 3rem;
    position: absolute;
    left: 46%;
    transform-origin: 0 0;
    transform: rotate(-13deg);
    transition: all 2s;
  }

  .img_needle_active {
    width: 2rem;
    height: 3rem;
    position: absolute;
    left: 46%;
    transform-origin: 0 0;
    transform: rotate(0deg);
    transition: all 2s;
  }

  .img_cd {
    width: 5rem;
    height: 5rem;
    position: absolute;
    bottom: 2.3rem;
    z-index: -1;
  }

  .img_ar {
    width: 3.2rem;
    height: 3.2rem;
    border-radius: 50%;
    position: absolute;
    bottom: 3.14rem;
    animation: rotate_ar 10s linear infinite;
  }

  .img_ar_active {
    animation-play-state: running;
  }

  .img_ar_pauesd {
    animation-play-state: paused;
  }

  @keyframes rotate_ar {
    0% {
      transform: rotateZ(0deg);
    }

    100% {
      transform: rotateZ(360deg);
    }
  }
}

.musicLyric {
  width: 100%;
  height: 8rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 0.2rem;
  overflow: scroll;

  p {
    color: rgb(190, 181, 181);
    margin-bottom: 0.3rem;
  }

  .active {
    color: #fff;
    font-size: .4rem;
  }
}

.detailFooter {
  width: 100%;
  height: 3rem;
  position: absolute;
  bottom: 0.2rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  .footerTop {
    width: 100%;
    height: 1rem;
    display: flex;
    justify-content: space-around;
    align-items: center;

    .icon {
      width: 0.36rem;
      height: 0.36rem;
      fill: rgb(245, 234, 234);
    }

    .icon {
      width: 0.6rem;
      height: 0.6rem;
    }
  }

  .range {
    width: 100%;
    height: 0.06rem;
  }

  .footer {
    width: 100%;
    height: 1rem;
    display: flex;
    justify-content: space-around;
    align-items: center;

    .icon {
      fill: rgb(245, 234, 234);
    }

    .bofang {
      width: 1rem;
      height: 1rem;
    }
  }
}
</style>