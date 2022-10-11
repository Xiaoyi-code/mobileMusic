<template>
  <div class="itemMusic">
    <div class="itemMusic-wrapper">
      <ScrollView>
        <div>
          <ItemMusicTop :playlist="state.playlist" :creator="creator" />
          <ItemMusicListVue :itemList="state.itemList" :subscribedCount="state.playlist.subscribedCount" />
        </div>
      </ScrollView>
    </div>
  </div>
</template>

<script>
import { getMusicItemdetail, getMusicItemList } from "@/request/api/item";
import ItemMusicTop from "@/components/item/ItemMusicTop.vue"
import ItemMusicListVue from "@/components/item/ItemMusicList.vue";
import ScrollView from '@/components/ScrollView.vue'
export default {
  components: {
    ItemMusicTop,
    ItemMusicListVue,
    ScrollView
  },
  data () {
    return {
      state: {
        playlist: {},//歌单的详情页的数据
        itemList: [],//歌单的歌曲列表
      }
    }
  },
  computed: {
    creator: function () {
      return this.state.playlist.creator || ""
    }
  },

  props: ['id'],
  methods: {
    //获取歌单的详情页的数据
    getMusicItemdetail (id) {
      let res = getMusicItemdetail(id)
      res.then((value) => {
        // console.log(value.data.playlist)
        this.state.playlist = value.data.playlist
        // 防止页面刷新，数据丢失，将数据保存到sessionStorage中
        // sessionStorage.setItem("itemDetail", JSON.stringify(this.state));
      }).catch(() => {
        console.log('获取歌单详情页失败！')
      })
    },
    //获取歌单所有歌曲的数据
    getMusicItemList (id) {
      let res = getMusicItemList({ id, limit: 10, offset: 0 })
      res.then((value) => {
        this.state.itemList = value.data.songs
      }).catch(() => {
        console.log('获取歌单所有歌曲失败！')
      })
    }
  },
  mounted () {
    this.getMusicItemdetail(this.id)
    this.getMusicItemList(this.id)
  },
}
</script>

<style lang="less" scoped>
.itemMusic {
  position: fixed;
  top: 2rem;
  left: 0;
  right: 0;
  bottom: 0;

  .itemMusic-wrapper {
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
}
</style>