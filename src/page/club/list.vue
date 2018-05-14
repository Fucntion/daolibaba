<template>
  <div v-if="city">
    <head-box  :head-title="city.name+'-商圈列表'" go-back="true"></head-box>
    <div class="club-list" v-if="clubs.length>0">
      <div class="club-item" v-for="(club,idx) in clubs">
        <div class="head">
          <div class="title">{{club.title}}</div>
          <mt-button @click="navigator(club.id)" class="goto font12" type="primary" size="small">进入</mt-button>
          <!--<router-link class="gobtn font14" :to="'/club/'+club.id">进入</router-link>-->
        </div>
        <div class="desc font14">{{club.desc}}</div>
        <div class="thumb" :style="{backgroundImage:'url('+club.thumb+')'}"></div>
      </div>
    </div>
  </div>
</template>

<script>
  import headBox from '../../components/head';
  import {club, city} from "../../service/getData";

  export default {
    data() {
      return {
        clubs: [],
        city:null
      };
    },

    components: {headBox},

    computed: {},

    created() {
      city({id: this.$route.query.city_id}).then(res => {
        if (res.body.code == 1) {
          this.city = res.body.data
        }
      })
      club({
        city_id: this.$route.query.city_id,
        zise: 0
      }).then(res => {
        this.clubs = res.body.data
      })
    },

    methods: {
      navigator(clubId) {
        this.$router.push({
          path: '/club/' + clubId
        })
      }
    }
  }

</script>
<style lang='less' scoped>
  .club-list {

    .club-item {
      background: white;
      margin-bottom: 10px;
      padding: 10px 0;
      border-bottom: 1px solid #e7e7e7;
      color: #666666;
      .head {
        height: 36px;
        padding: 0 10px;
        line-height: 36px;
        display: flex;
        .title {
          flex: 1;
        }
        .goto {
          font-size: 12px;
          width: 50px;
          height: 26px;
        }
      }
      .desc {
        padding: 10px;
      }
      .thumb {
        position: relative;
        height: 0;
        padding-top: 50%;
      }
    }
  }
</style>
