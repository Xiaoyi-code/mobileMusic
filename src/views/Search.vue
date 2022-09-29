<template>
  <div class="Search">
    <div class="searchTop">
      <svg class="icon" aria-hidden="true" @click="$router.go(-1)">
        <use xlink:href="#icon-zuojiantou"></use>
      </svg>
      <input type="text" placeholder="沈以诚" onfocus="this.placeholder=''" onblur="this.placeholder='沈以诚'"
        v-model="searchKey" @keydown.enter="enterKey" />
    </div>
    <div class="searchHistory">
      <span class="searchSpan">历史</span>
      <span v-for="item in keyWorldList" :key="item" class="spanKey" @click="searchHistory(item)">
        {{ item }}
      </span>
      <svg class="icon" aria-hidden="true" @click="delHistory">
        <use xlink:href="#icon-shanchu"></use>
      </svg>
    </div>
    <div class="itemList">
      <div class="item" v-for="(item, i) in searchList" :key="i">
        <div class="itemLeft" @click="playMusicList(item)">
          <span class="leftSpan">{{ i + 1 }}</span>
          <div>
            <p>{{ item.name }}</p>
            <span v-for="(item1, index) in item.artists" :key="index">{{
            item1.name
            }}</span>
          </div>
        </div>
        <div class="itemRight">
          <svg class="icon bofang" aria-hidden="true" v-if='item.mvid !=0'>
            <use xlink:href="#icon-shipin"></use>
          </svg>
          <svg class="icon liebiao" aria-hidden="true">
            <use xlink:href="#icon-31liebiao"></use>
          </svg>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getSearchMusic } from "@/request/api/home.js"
import { mapMutations, mapState } from 'vuex'
export default {
  data () {
    return {
      keyWorldList: [],
      searchKey: "",
      searchList: [],
    };
  },
  computed: {
    ...mapState(['playListIndex'])
  },
  mounted () {
    //渲染页面时从本地存在拿搜索历史记录，如果没有历史记录，则为空，置为[]
    this.keyWorldList = JSON.parse(localStorage.getItem("keyWorldList"))
      ? JSON.parse(localStorage.getItem("keyWorldList"))
      : [];
  },
  methods: {
    ...mapMutations(['updatePlayListIndex', 'updatePlayList', 'pushPlayList']),
    //搜索歌手事件，同时保存到localstorage本地存储
    enterKey: function () {
      let SearchKey = this.searchKey.trim()//去除前后空格
      this.searchKey = ""//搜索后输入框置空
      if (SearchKey !== "") {
        this.keyWorldList.unshift(SearchKey)
        //   去重
        this.keyWorldList = [...new Set(this.keyWorldList)]
        // 限制搜索记录长度
        if (this.keyWorldList.length > 10) {
          this.keyWorldList.splice(this.keyWorldList.length - 1, 1)
        }
        localStorage.setItem("keyWorldList", JSON.stringify(this.keyWorldList))
        //调用搜索歌手歌曲的方法
        this.searchForSinger(SearchKey)

      }
    },
    //删除历史记录
    delHistory: function () {
      localStorage.removeItem("keyWorldList")
      this.keyWorldList = []
    },
    //搜索歌手歌曲的方法
    searchForSinger: async function (singer) {
      let singerRes = await getSearchMusic(singer)
      if (singerRes.data.result.songs) {
        this.searchList = singerRes.data.result.songs
      } else {
        this.searchList = []
        console.log('没有搜索到资源！')
      }
      // console.log(this.searchList)
    },
    //点击搜过历史来搜索歌曲
    searchHistory: async function (singer) {
      let singerRes = await getSearchMusic(singer)
      if (singerRes.data.result.songs) {
        this.searchList = singerRes.data.result.songs
      } else {
        this.searchList = []
        console.log('没有搜索到资源！')
      }
      // console.log(this.searchList)
    },
    //点击搜索列表的歌曲，把点击的歌曲加到vuex中的歌曲列表当前歌曲索引的下一位
    playMusicList: function (item) {
      item.al = item.album
      item.al.picUrl = item.album.artist.img1v1Url
      this.pushPlayList(item)
      this.updatePlayListIndex(this.playListIndex)
    }
  },
}
</script>
<style lang="less" scoped>
.searchTop {
  width: 100%;
  height: 1rem;
  padding: 0 0.2rem;
  display: flex;
  align-items: center;

  input {
    margin-left: 0.2rem;
    border: none;
    border-bottom: 1px solid #999;
    width: 90%;
    padding: 0.1rem;
  }
}

.searchHistory {
  width: 100%;
  padding: 0.2rem;
  position: relative;

  .searchSpan {
    font-weight: 700;
  }

  .spanKey {
    padding: 0.1rem 0.2rem;
    background-color: rgb(185, 169, 169);
    border-radius: 0.4rem;
    margin: 0.1rem 0.2rem;
    display: inline-block;
  }

  .icon {
    width: 0.3rem;
    height: 0.3rem;
    position: absolute;
    right: 0.2rem;
  }
}

.itemList {
  width: 100%;
  padding: .2rem;

  .item {
    width: 100%;
    height: 1.4rem;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .itemLeft {
      width: 85%;
      height: 100%;
      display: flex;
      align-items: center;

      .leftSpan {
        display: inline-block;
        width: 0.2rem;
        text-align: center;
      }

      div {
        p {
          width: 4.54rem;
          height: .4rem;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          font-weight: 700;
        }

        span {
          font-weight: 400;
          font-size: .24rem;
          color: #999;
        }

        margin-left: 0.3rem;
      }
    }

    .itemRight {
      width: 20%;
      height: 100%;
      display: flex;
      // justify-content: space-between;
      align-items: center;
      position: relative;

      .icon {
        fill: #999;
      }

      .bofang {
        position: absolute;
        left: 0;
      }

      .liebiao {
        position: absolute;
        right: 0;
      }
    }
  }
}
</style>