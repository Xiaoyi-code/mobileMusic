import { createStore } from 'vuex'
import { getMusicLyric } from '@/request/api/item.js'
import { getPhoneLogin } from '@/request/api/home.js'
export default createStore({
  state: {
    playList: [{ //播放列表
      al: {
        id: 89039055,
        name: "雨爱抖音版",
        pic: 109951164966568500,
        picUrl: "https://p1.music.126.net/2f6UgY8Jc0Dy6jufMdIZeQ==/109951164966568495.jpg",
        pic_str: "109951164966568495"
      },
      id: 1446137141,
      name: "雨爱（抖音版）",
      ar: [{ name: "灏灏灏仔" }],
    }],
    playListIndex: 0, //默认下标为0
    isbtnShow: true, //true为暂停按钮的显示
    isDetailShow: false,//歌曲详请页，默认不显示
    lyricList: {},//歌词
    currentTime: 0,//当前歌词时间
    duration: 0,//歌曲总时长
    isLogin: false,//判断是否登录
    isFooterMusic: false,//是否显示底部播放器
    firstFooterMusic: false,//首次不显示底部播放器
    token: "",
    user: {},//用户信息
    myUser: {
      myName: "",
      myPhoto: "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fi.qqkou.com%2Fi%2F2a172641896x452126958b26.jpg&refer=http%3A%2F%2Fi.qqkou.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1667046408&t=29d1fc630fcc77ac13ebedc106d7a7f9"
    },//用户名和用户图像
  },
  getters: {
  },
  mutations: {
    //更新播放/暂停的图标
    updateIsbtnShow: function (state, value) {
      state.isbtnShow = value
    },
    //更新播放列表的数据，没次点一个新歌单，就要更新底部播放器里的单曲
    updatePlayList: function (state, value) {
      state.playList = value
      state.isFooterMusic = true
      state.firstFooterMusic = true
      // console.log('vuex播放列表刷新了', state);
    },
    //更新当前播放的歌曲索引，没次点同一个歌单的不同歌曲，就要更新底部播放器里播放的歌曲
    updatePlayListIndex: function (state, value) {
      state.playListIndex = value
      state.isFooterMusic = true
      state.firstFooterMusic = true
      if (state.isbtnShow) {
        state.isbtnShow = false
      }
      // console.log('vuex播放索引刷新了', state);
    },
    //更新歌曲详情页的显示状态
    updateDetailShow: function (state) {
      state.isDetailShow = !state.isDetailShow
    },
    //更新歌词
    updateLyricList: function (state, value) {
      state.lyricList = value
    },
    //更新歌词当前时间
    updateCurrentTime: function (state, value) {
      state.currentTime = value
    },
    //更新歌词总时间
    updateDuration: function (state, value) {
      state.duration = value
      // console.log('vuex-duration:', state.duration)
    },
    //把搜索的歌曲添加到当前播放列表的正在播放歌曲的后面
    pushPlayList: function (state, value) {
      let currentPlayListIndex = state.playListIndex + 1
      // console.log("currentPlayListIndex:", currentPlayListIndex)
      state.playList.splice(currentPlayListIndex, 0, value)
      state.playList.begin = true
      state.playListIndex = currentPlayListIndex
    },
    // 更新登陆状态
    updateIsLogin: function (state, value) {
      state.isLogin = true
    },
    //保留登陆成功后的Token值，同时存入本地存储
    updateToken: function (state, value) {
      state.token = value
      localStorage.setItem('token', state.token)
      // 
    },
    // 保留用户的信息（用户名和图像）
    updateUser: function (state, value) {
      state.user = value
      state.myUser.myName = value.data.profile.nickname
      state.myUser.myPhoto = value.data.profile.avatarUrl
      localStorage.setItem('myUser', JSON.stringify(state.myUser))
    },
    //更新用户名和图像
    updateMyUser: function (state, value) {
      state.myUser = value
    },
  },
  actions: {
    //获取歌词是异步请求，要在actions里处理
    getLyric: async function (context, value) {
      let res = await getMusicLyric(value)
      // console.log("歌词：", res);
      context.commit("updateLyricList", res.data.lrc)
    },
    //获取用户登录输入的用户名&密码
    getLogin: async function (context, value) {
      let res = await getPhoneLogin(value)
      return res
    }
  },
  modules: {
  }
})
