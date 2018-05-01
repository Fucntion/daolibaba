<template>
<div>
  <head-box go-back="true" head-title="热门商圈"></head-box>
  <div class="hot-club-list">
    <mt-loadmore :bottom-method="getClubs" :autoFill="false" @bottom-status-change="handleBottomChange" :bottom-all-loaded="allLoaded" ref="loadmore">
      <router-link :to="'/club/'+club.id" class="club" v-for="(club,idx1) in clubs" :key="idx1">
        <div class="info">
          <img class="thumb" :src="club.thumb" />
          <div class="title">
            <h4>{{club.title}}</h4>
            <span>{{club.desc}}</span>
          </div>
          <mt-button class="to" size="small" type="primary">进入</mt-button>
        </div>
        <div class="companys">
          <router-link :to="'/store/'+company.user_id" class="company" v-for="(company,idx2) in club.company" :key="idx2">
            <img :src="company.thumb" class="thumb" />
            <span class="title">{{company.company|cutstr(8)}}..</span>
          </router-link>

        </div>
      </router-link>
    </mt-loadmore>
  </div>

</div>
</template>
<script>
  import headBox from '../../components/head';
  import {club} from "../../service/getData";

  export default {
        name: "clubTop",
      data(){
          return {
            clubs:[],
            page:1,
            allLoaded: false,
            bottomStatus: '',
          }
      },
    components:{headBox},
      created(){
        this.getClubs()
      },
      methods:{
        handleBottomChange(status) {
          this.bottomStatus = status;
        },
        getClubs(){
          //获取十个参数
         club({
           order:'hits desc',
           paginate:1,
           size:10,
           with:'company',
           page:this.page
         }).then(res=>{
           this.page++
           this.$refs.loadmore.onBottomLoaded();
           this.clubs = this.clubs.concat(res.body.data.data)
         })
        }
      }
    }
</script>

<style lang="less" scoped>
.hot-club-list{
  .club{
    padding: 10px;
    border-bottom: 1px solid #e7e7e7;
    .info{
      display: flex;
      .thumb{
        width: 40px;
        height: 40px;
      }
      .title{
        flex: 1;
        padding: 0 10px;
        font-size: 14px;
        h4{

        }
        span{
          color: #666666;
          font-size: 12px;
        }
      }
      .to{
        width: 60px;
        height: 28px;
        font-size: 12px;
      }

    }
    .companys{
      margin-top: 10px;
      overflow-y: scroll;
      white-space: nowrap;
      -webkit-overflow-scrolling: touch;
      .company{
        display: inline-block;
        margin-right: 10px;
        text-align: center;
        .thumb{
          width: 90px;
          height: 90px;
        }
        .title{
          display: block;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
