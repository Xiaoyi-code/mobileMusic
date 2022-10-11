<template>
  <div class="rank">
    <div class="rank-wrapper">
      <ScrollView>
        <ul>
          <li v-for="(value,key) in category.titles" :key="key">
            <h3 class="group-title">{{value}}</h3>
            <ul class="normal-group" v-if="value==='官方榜'">
              <li v-for="obj in category[key]" :key="obj.rank.id">
                <div class="rank-left">
                  <img v-lazy="obj.rank.coverImgUrl" alt="">
                  <p>{{obj.rank.updateFrequency}}</p>
                </div>
                <div class="rank-right">
                  <p v-for="(song,index) in obj.rank.tracks" :key="song.first">
                    {{index+1}}.{{song.first}}-{{song.second}}
                  </p>
                </div>
              </li>
            </ul>
            <ul class="other-group" v-else>
              <li v-for="obj in category[key]" :key="obj.rank.id">
                <div class="rank-top">
                  <img v-lazy="obj.rank.coverImgUrl" alt="" />
                  <p>{{ obj.rank.updateFrequency }}</p>
                </div>
                <div class="rank-bottom">
                  <p>{{ obj.rank.name }}</p>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </ScrollView>
    </div>

  </div>
</template>
<script>
import { getTopListDetail } from "../request/api/rank"
import ScrollView from "@/components/ScrollView.vue"
export default {
  components: {
    ScrollView
  },
  data () {
    return {
      category: {}
    };
  },
  methods: {

  },
  created () {
    getTopListDetail()
      .then((data) => {
        this.category = data
        // console.log(data)
      })
      .catch((err) => {
        console.log(err)
      })
  }
};
</script>
<style lang="less" scoped>
.rank {
  position: fixed;
  top: 2rem;
  left: 0;
  right: 0;
  bottom: 0;

  .rank-wrapper {
    width: 100%;
    height: 100%;
    overflow: hidden;

    .group-title {
      padding: .2rem .4rem;
      font-weight: bold;
    }

    .normal-group {
      li {
        display: flex;
        align-items: center;
        padding: .1rem .2rem;
        box-sizing: border-box;

        .rank-left {
          position: relative;

          img {
            width: 2rem;
            height: 2rem;
            border-radius: .2rem;
          }

          p {
            position: absolute;
            left: .2rem;
            bottom: .2rem;
            color: #fff;
          }
        }

        .rank-right {
          margin-left: .4rem;

          p {
            padding: .2rem 0;
          }
        }
      }
    }

    .other-group {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;

      li {
        padding: .1rem .2rem;
        box-sizing: border-box;

        .rank-top {
          position: relative;

          img {
            width: 2rem;
            height: 2rem;
            border-radius: .2rem;
          }

          p {
            position: absolute;
            left: .2rem;
            bottom: .2rem;
            color: #fff;
          }
        }

        .rank-bottom {
          width: 2rem;

          p {
            padding: .2rem 0;
          }
        }
      }
    }
  }
}
</style>
