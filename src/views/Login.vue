<template>
  <div class="login">
    <div class="loginTop">欢迎登录</div>
    <div class="loginContent">
      <input type="text" name="phone" class="phone" v-model="phone" placeholder="请输入手机号码" />
      <input type="password" name="passworld" class="passworld" v-model="password" placeholder="请输入密码" />
      <button class="btn" @click="Login">登录</button>
    </div>
  </div>
</template>

<script>
import { getLoginUser } from '@/request/api/home.js'
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
  width: 100%;
  height: 13.34rem;
  padding: 0.2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: rgb(18, 198, 204);

  .loginTop {
    margin-top: 1rem;
    font-size: 1rem;
    color: #fff;
  }

  .loginContent {
    width: 100%;
    height: 300px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    margin-top: 2rem;

    .phone,
    .passworld {
      width: 5rem;
      height: 1rem;
      border: 0.02rem solid #999;
    }

    .btn {
      width: 2rem;
      height: .6rem;
    }
  }
}
</style>
  