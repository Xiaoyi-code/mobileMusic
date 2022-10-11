<template>
  <div class="login">
    <!-- <label>Date:<input type="text"/></label> -->
    <div class="loginSub">
      <div class="loginTop">欢迎登录</div>
      <div class="loginContent">
        <van-cell-group>
          <van-field v-model="phone" type="tel" label="手机号" placeholder="请输入手机号" />
          <van-field v-model="password" type="password" label="密码" placeholder="请输入密码" />
        </van-cell-group>
        <van-button type="primary" size="normal" @click="Login">登录</van-button>
      </div>
    </div>
  </div>
</template>

<script>
import { getLoginUser } from '@/request/api/recommend'
import { mapActions, mapMutations } from "vuex"
export default {
  data () {
    return {
      phone: '',
      password: ''
    }
  },
  methods: {
    ...mapActions(['getLogin']),
    ...mapMutations(['updateIsLogin', 'updateToken', 'updateUser']),
    async Login () {
      let res = await this.getLogin({ phone: this.phone, password: this.password })
      // console.log(res)
      if (res.data.code === 200) {
        this.updateIsLogin()
        this.updateToken(res.data.token)
        // 登陆成功后，根据用户id请求用户详细信息
        let result = await getLoginUser(res.data.account.id)
        this.updateUser(result)
        this.$router.push('/infoUser')
      } else {
        alert("手机号码或者密码错误")
        this.password = ''
      }
    }
  },
}
</script>

<style lang="less" scoped>
.login {
  position: fixed;
  top: 2rem;
  width: 100%;
  height: 100%;
  background-color: rgb(155, 212, 214);

  .loginSub {
    padding: 0.2rem;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;

    .loginTop {
      height: 2rem;
      margin-top: .2rem;
      font-size: 1rem;
      color: #fff;
    }

    .loginContent {
      width: 100%;
      height: 30%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-around;
    }
  }
}
</style>
  