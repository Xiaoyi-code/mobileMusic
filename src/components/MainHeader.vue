<template>
  <div class="header">
    <HeaderVue>
      <template v-slot:left>
        <div class="header-left">
          <!-- <img :src="myUser.myPhoto" alt="" @click="$router.push('\infoUser')" /> -->
          <img :src="myUser.myPhoto" alt="" @click="$router.push('\infoUser')" />
        </div>
      </template>
      <template v-slot:center>
        <span class="header-title">思鱼音乐</span>
      </template>
      <template v-slot:right>
        <div class="header-right">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-xihuan2"></use>
          </svg>
        </div>
      </template>
    </HeaderVue>
  </div>
</template>

<script>
import HeaderVue from "./Header.vue";
import { mapState, mapMutations } from "vuex";
export default {
  components: {
    HeaderVue
  },
  computed: {
    ...mapState(["myUser"]),
  },
  methods: {
    ...mapMutations(['updateMyUser']),
  },
  mounted () {
    let localUser = localStorage.getItem("myUser") ? localStorage.getItem("myUser") : JSON.stringify(this.myUser)
    this.updateMyUser(JSON.parse(localUser))
  }
}
</script>

<style lang="less" scoped>
.header {
  position: fixed;
  z-index: 100;
  background: rgb(7, 187, 133);

  .header-left {
    padding-left: .2rem;

    img {
      width: .6rem;
      height: .6rem;
      border-radius: 50%;
    }
  }

  .header-title {
    color: aliceblue;
    font-size: .32rem;
    font-weight: bold;
  }

  .header-right {
    padding-right: .2rem;

    .icon {
      width: .6rem;
      height: .6rem;
    }
  }
}
</style>