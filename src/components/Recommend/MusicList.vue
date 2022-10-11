<template>
  <div class="musicList">
    <div class="musicTop">
      <div class="title">发现好歌单</div>
      <div class="more">查看更多</div>
    </div>
    <ul class="musicContent">
      <li v-for="item in musicList" :key="item">
        <router-link class="musicLink" :to="{name:'ItemMusic',query:{id:item.id}}">
          <img v-lazy="item.picUrl" alt="" />
          <span class="playCount">
            <div class="play">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-erji-copy"></use>
              </svg>
              <span>{{ changeCount(item.playCount) }}</span>
            </div>
          </span>
          <p class="name">{{ item.name }}</p>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import { getMusicList } from "@/request/api/recommend";
export default {
  // vue2
  data () {
    return {
      musicList: []
    }
  },
  methods: {
    async getGedan () {
      let res = await getMusicList();
      // console.log(res);
      this.musicList = res.data.result;
    },
    changeCount: function (num) {
      if (num >= 100000000) {
        return (num / 100000000).toFixed(1) + "亿";
      } else if (num >= 10000) {
        return (num / 10000).toFixed(1) + "万";
      }
    },
  },
  mounted () {
    this.getGedan()
  },
}
</script>

<style lang="less" scoped>
.musicList {
  width: 100%;
  // height: 5rem;
  height: 100%;
  // padding: 0.2rem;
  overflow: hidden;

  .musicTop {
    width: 100%;
    height: 0.6rem;
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.2rem;

    .title {
      font-size: 0.4rem;
      font-weight: 900;
    }

    .more {
      border: 1px solid #ccc;
      text-align: center;
      line-height: 0.6rem;
      padding: 0 0.2rem;
      border-radius: 0.4rem;
    }
  }

  .musicContent {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;

    li {
      padding: .1rem .1rem;

      .musicLink {
        position: relative;
        box-sizing: border-box;

        img {
          width: 2.3rem;
          height: 2.3rem;
          border-radius: .2rem;
        }

        .playCount {
          position: absolute;
          right: 0.1rem;
          color: white;

          .play {
            display: flex;
            align-items: center;

            .icon {
              width: .3rem;
              height: .3rem;
            }

            span {
              font-size: .24rem;
            }
          }
        }

        .name {
          width: 2.3rem;
          font-size: .26rem;
        }
      }
    }

  }
}
</style>