<template>
  <div class="infoUser">
    <!-- <img :src="user.data.profile.avatarUrl" alt="" class="profileimg" /> -->
    <img :src="myUser.myPhoto" alt="" class="profileimg" />
    <div class="name">{{ myUser.myName }}</div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  computed: {
    ...mapState(["myUser"]),
  },
  methods: {
    ...mapMutations(["updateMyUser"])
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
  padding-top: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  // justify-content: space-around;
  background-color: rgb(18, 198, 204);

  .profileimg {
    width: 1rem;
    height: 1rem;
    border-radius: 50%;
    margin: 0 auto;
  }

  .name {
    font-weight: 700;
    font-size: .4rem;
  }
}
</style>