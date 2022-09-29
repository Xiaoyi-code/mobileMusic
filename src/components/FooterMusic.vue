<template>
  <div class="FooterMusic" v-show="firstFooterMusic && isFooterMusic">
    <div class="footerLeft" @click="updateDetailShow">
      <img :src="playList[playListIndex].al.picUrl" alt="" />
      <div>
        <p>{{ playList[playListIndex].name }}</p>
        <span>横滑切换上下首哦</span>
      </div>
    </div>
    <div class="footerRight">
      <svg class="icon liebiao" aria-hidden="true" @click="play" v-if="isbtnShow">
        <use xlink:href="#icon-bofang"></use>
      </svg>
      <svg class="icon liebiao" aria-hidden="true" @click="play" v-else>
        <use xlink:href="#icon-zanting"></use>
      </svg>
      <svg class="icon liebiao" aria-hidden="true">
        <use xlink:href="#icon-liebiao"></use>
      </svg>
    </div>
    <audio ref="audio" :src="`https://music.163.com/song/media/outer/url?id=${playList[playListIndex].id}.mp3`"></audio>
    <van-popup v-model:show="isDetailShow" position="bottom" :style="{ height: '100%' }">
      <MusicDetailVue :musicList="playList[playListIndex]" :play="play" :isbtnShow="isbtnShow"
        :updataAllTime="updataAllTime" />
    </van-popup>

  </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex'
import MusicDetailVue from "./item/MusicDetail.vue"
export default {
  data () {
    return {
      interVal: 0,//当前播放歌曲时间，初始为0
    };
  },
  components: {
    MusicDetailVue
  },
  computed: {
    ...mapState(['playList', 'playListIndex', 'isbtnShow', 'isDetailShow', 'isFooterMusic', 'firstFooterMusic'])
  },
  mounted () {
    // this.$store.dispatch("getLyric", this.playList[this.playListIndex].id);
    // this.updateTime()
    this.updataAllTime()
  },
  methods: {
    ...mapMutations(
      ['updateIsbtnShow', 'updateDetailShow', 'updateCurrentTime', 'updateDuration']
    ),
    ...mapActions(['getLyric']),
    //点击播放按键就改变播放图标
    play: function () {
      if (this.isbtnShow) {
        this.updateIsbtnShow(false)

        // console.log('播放图标')
      } else {
        this.updateIsbtnShow(true)
        clearInterval(this.interVal); //暂停清除定时器
        // console.log('暂停图标')
      }
    },
    //只要当播放歌曲时才调用这个函数，因为歌词时间需要不断获取，这里每隔1s更新一次当前歌词时间,
    //暂停时要清楚这个定时器
    updateTime () {
      this.interVal = setInterval(() => {
        this.updateCurrentTime(this.$refs.audio.currentTime);
        // console.log('更新歌词时间中')
      }, 1000);
    },
    //更新当前歌曲总时长
    updataAllTime: function () {
      this.updateDuration(this.$refs.audio.duration)
    },
  },
  watch: {
    isbtnShow: function (news, olds) {
      if (news) {
        //监控播放/暂停图标的状态来设置音乐的播放，暂停图标为true，播放为false
        this.$refs.audio.pause()
        // console.log('现在为暂停', 'news:', news, 'olds:', olds)
      } else if (this.$refs.audio.autoplay) {
        //如果是播放图标且当前已经是自动播放状态，则用play()方法
        this.$refs.audio.play()
        //播放就调用函数
        this.updateTime()
        // console.log('现在为播放用play', 'news:', news, 'olds:', olds)
      } else if (!this.$refs.audio.autoplay) {
        //如果是播放图标且当前不是自动播放状态，则用autoplay
        this.$refs.audio.autoplay = true
        //播放就调用函数
        this.updateTime()
        // console.log('现在为播放用autoplay', 'news:', news, 'olds:', olds)
      }
    },
    //当底部的歌曲列表更新或者歌曲索引变化后都要请求当前歌的歌词
    playListIndex: function () {
      this.getLyric(this.playList[this.playListIndex].id)
    },
    playList: function () {
      this.getLyric(this.playList[this.playListIndex].id)
    },
  },
}
</script>

<style lang="less" scoped>
.FooterMusic {
  width: 100%;
  height: 1.4rem;
  background-color: #fff;
  position: fixed;
  bottom: 0;
  border-top: 1px solid #999;
  display: flex;
  padding: 0.2rem;
  justify-content: space-between;

  .footerLeft {
    width: 60%;
    height: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;

    img {
      width: 1rem;
      height: 1rem;
      border-radius: 50%;
    }
  }

  .footerRight {
    width: 20%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .icon {
      width: 0.6rem;
      height: 0.6rem;
    }
  }
}
</style>