//封装排行榜接口请求
import service from "..";

export const getTopListDetail = () => {
  return new Promise(function (resolve, reject) {
    let category = {
      officialList: [
        { name: '飙升榜', id: 3 },
        { name: '新歌榜', id: 0 },
        { name: '原创榜', id: 2 },
        { name: '热歌榜', id: 1 }
      ],
      recList: [
        { name: '黑胶VIP爱听榜', id: 23 },
        { name: '云音乐说唱榜', id: 25 },
        { name: '云音乐古典榜', id: 32 },
        { name: '云音乐电音榜', id: 26 },
        { name: '云音乐ACG榜', id: 22 },
        { name: '云音乐韩语榜', id: 24 }
      ],
      globalList: [
        { name: '云音乐国电榜', id: 6 },
        { name: 'UK排行榜周榜', id: 5 },
        { name: '美国Billboard榜', id: 21 },
        { name: 'Beatport全球电子舞曲榜', id: 10 },
        { name: 'KTV唛榜', id: 8 },
        { name: '日本Oricon榜', id: 29 }
      ],
      otherList: [
        { name: '云音乐欧美热歌榜', id: 7 },
        { name: '云音乐欧美新歌榜', id: 19 },
        { name: '法国 NRJ Vos Hits 周榜', id: 27 },
        { name: '云音乐ACG动画榜', id: 28 },
        { name: '云音乐ACG游戏榜', id: 30 },
        { name: '云音乐ACG VOCALOID榜', id: 31 }
      ],
      titles: { officialList: '官方榜', recList: '推荐榜', globalList: '全球榜', otherList: '更多榜单' }
    }
    service({
      method: "GET",
      url: "/toplist/detail"
    }).then(function (data) {
      data.data.list.forEach(function (obj) {
        let flag = false
        for (let key in category) {
          for (let i = 0; i < category[key].length; i++) {
            if (category[key][i].name === obj.name) {
              category[key][i].rank = obj
              flag = true
              break
            }
          }
          if (flag) {
            break
          }
        }
      })
      // console.log('data:', data)
      resolve(category)
    })
      .catch(function (err) {
        reject(err)
      })
  })
}