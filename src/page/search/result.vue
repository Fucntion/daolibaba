<template>
  <div>
    <head-box class="head block" :fixed="true"  go-back="true" >
        <div slot='search' class="wordbox">
          <input class="word" v-model="word" />
        </div>
      <div slot="edit" @click="refreshSearch()"><button>搜索</button></div>
    </head-box>

    <div class="list-wrap padding10-r block" v-if="rt.length>0">

      <mt-loadmore :bottom-method="toSearch" :autoFill="false" @bottom-status-change="handleBottomChange" :bottom-all-loaded="allLoaded" ref="loadmore">


      <router-link class="item-wrap club-item" v-for="(club,idx) in rt" v-if="type=='club'">
        <img class="thumb" :src="club.thumb" />
      <div class="info">
        <h4>{{club.title}}</h4>
        <span>{{club.stores}}个商铺</span>
      </div>
      </router-link>

      <router-link :to="'/info/'+info.id" class="item-wrap info-item" v-for="(info,idx) in rt" v-if="type=='info'">
        <div class="info">
          <h4>{{info.title}}</h4>
          <span class="font12">{{info.hits}}人看过</span>
        </div>
        <div>{{info.create_time}}</div>
      </router-link>

      <router-link :to="'/mall/detail/'+goods.id" class="item-wrap mall-item" v-for="(goods,idx) in rt" v-if="type=='mall'">
        <img class="thumb" :src="goods.thumb" />
        <div class="info">
          <h4>{{goods.title}}</h4>
          <span class="price">￥{{goods.price}}</span>
          <span class="sales">浏览{{goods.hits}}次,售出{{goods.sales}}个</span>
        </div>
      </router-link>
      <router-link :to="'/company/'+company.user_id" class="item-wrap company-item" v-for="(company,idx) in rt" v-if="type=='company'">
        <img class="thumb" :src="company.thumb" />
        <div class="info">
          <h4>{{company.company}}</h4>
          <span>{{company.hits}}人进店</span>
        </div>
      </router-link>
      </mt-loadmore>
    </div>

  </div>
</template>

<script>
  import headBox from '../../components/head';
  import {search} from '../../service/getData';
  // import rtClub from './result/club';
  // import rtCompany from './result/company';
  // import rtInfo from './result/info';
  // import rtMall from './result/mall';

  export default {
    data () {
      return {
        type:'mall',
        word:'',
        rt:[],
        page:1,
        allLoaded: false,
        bottomStatus: '',
      };
    },
    created(){

      if(this.$route.query.type){
        this.type = this.$route.query.type
      }
      if(this.$route.query.word){
        this.word = this.$route.query.word
      }

      this.toSearch()


    },
  // ,rtClub,rtCompany,rtMall,rtInfo
    components: {headBox},

    computed: {},

    methods: {
      handleBottomChange(status) {
        this.bottomStatus = status;
      },
      refreshSearch(){
        this.page=1;
        this.rt = [];
        this.toSearch()
      },
      toSearch(){
        search({
          type:this.type,
          word:this.word,
          page:this.page
        }).then(res=>{
          if(res.body.code==1){

            this.page++;
            this.rt = this.rt.concat(res.body.data.data)
            this.$refs.loadmore.onBottomLoaded();
          }
        })
      }
    }
  }

</script>
<style lang='less' scoped>

.head{

  justify-content:flex-start;
  .wordbox{
    flex: 1;
    padding: 0 10px;
  }
  .word{
    width: 100%;
    height: 30px;
    margin-top: 7px;
    box-sizing: border-box;
    padding: 2px 4px;
    background: none;
    border:1px solid #c2c2c2;
    border-radius: 4px;
  }
  button{
    width: 60px;
    margin-top: 9px;
    height: 26px;
    font-size: 12px;
    border:1px solid #c2c2c2;
    border-radius: 4px;
  }
}

  .list-wrap{

    .item-wrap{
      padding:10px;
      border-bottom: 1px solid #e7e7e7;
      font-size: 14px;
      display: flex;
      &:last-child{
        border-bottom: none;
      }
      .thumb{
        width: 60px;
        height: 60px;
        margin-right: 10px;
      }
      .info{
        flex: 1;
          .sales{
      color: #666666;
      }
      }
    }
  }

  .info-item{
    .info{
      /*display: flex;*/
      /*justify-content: space-between;*/
    }
  }
</style>
