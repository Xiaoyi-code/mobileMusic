<template>
  <div class="infoUser">
    <img :src="myUser.myPhoto" alt="" class="bgimg">
    <img :src="myUser.myPhoto" alt="" class="profileimg" />
    <div class="name">{{ myUser.myName }}</div>
    <van-button type="danger" size="normal" @click="exit" class="btn">退出登录</van-button>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  computed: {
    ...mapState(["myUser"]),
  },
  methods: {
    ...mapMutations(["updateMyUser", "deleteMyUser"]),
    exit () {
      this.deleteMyUser()
      this.$router.push('/login')
    }
  },
  mounted () {
    let localUser = localStorage.getItem("myUser") ? localStorage.getItem("myUser") : JSON.stringify(this.myUser)
    this.updateMyUser(JSON.parse(localUser))
  }
}
</script>

<style lang="less" scoped>
.infoUser {
  position: fixed;
  top: 2rem;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  .bgimg {
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: -1;
    filter: blur(10px);
  }

  .profileimg {
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
    margin: 1rem auto;
  }

  .name {
    font-weight: 700;
    font-size: .4rem;
  }

  .btn {
    position: absolute;
    bottom: 5rem;
  }
}
</style>