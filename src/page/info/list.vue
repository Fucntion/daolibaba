<template>
  <div>
    <head-box :head-title="title" ></head-box>
    <section v-if="navs.length>0" class="nav">
      <router-link :to="{path:'/info/list/'+cat.id,query:{catid:cat.id}}" v-for="cat in navs" :key="cat.id"  class="item">
        <img :src="cat.thumb||'http://placehold.it/100/ccc'"/>
        <span>{{cat.title}}</span>
      </router-link>
    </section>
    <ad-box :ads="ads" :h="123"></ad-box>
    <slip-box class="margin10-r" title="最新信息">
      <div slot="list">
        <ul class="o2o-hot-list padding10-c">
          <router-link v-if="info.pic.length>0"  :to="'/info/'+info.id" v-for="info in infos" :key="info.id" class="item padding10-r  font14">
            <div class="editor" v-if="info.user">
              <img class="headimg" :src="info.user.headimgurl||'http://placehold.it/100/ccc'">
              <span class="name">{{info.user.nickname||'未知'}}</span>
            </div>
            <div class="info">
              <h4 class="title">{{info.title}}</h4>
              <div class="pic-box">
                <div class="pic margin4-c"
                     :style="{backgroundImage:'url('+pic.url+')'}" v-for="(pic,idx) in info.pic"></div>
              </div>
              <div class="desc">
                <span class="keyword px12">{{info.title|cutstr(20)}}..</span>
                <span class="inputtime">{{info.create_time}}</span>
              </div>
            </div>
          </router-link>
        </ul>
      </div>
    </slip-box>


  </div>
</template>

<script>
  import headBox from '@/components/head'
  import adBox from '@/components/ad'
  import slipBox from '@/components/slip'
  import {ad, category, info} from '../../service/getData'

  export default {
    data () {
      return {
        ads: [],
        page:1,
        infos:[],
        navs:[]
      };
    },

    components: {
      headBox, adBox, slipBox
    },
    watch:{
      '$route' (to, from) {
        this.page = 1
        this.navs = []
        this.infos = []
        this.getInfo()
        this.getNav()
      }
    },
    computed: {
      title(){
        return (this.$route.query.catname||'资讯')+'-列表'
      }
    },

    created(){
      this.getInfo()
      this.getNav()
      this.getAd()
    },
    methods: {
      getAd() {

        let mise = ad(14)
        mise.then((res) => {
          let body = res.body;
          if (body.code === 1) {
            this.ads = res.body.data
          }
        })

      },
      getNav() {

        category({
          moduleid: 2,
          parentid: this.$route.query.catid,
          size: 0
        }).then((res) => {
          let body = res.body;
          if (body.code === 1) {
            this.navs = res.body.data
          }
        }).catch(res=>{

        })

      },
      getInfo(){
        info({
          catid:this.$route.query.catid,
          paginate:1,
          size:20,
          with:'pic,user,con',
          page:this.page
        }).then(res=>{
          if(res.body.code==1){
            this.page++;
            this.infos = this.infos.concat(res.body.data.data)
          }
        })
      }
    }
  }

</script>
<style lang='less' scoped>
  @import '../../assets/style/base.less';

  .nav{
    padding: 0.2415rem;
    display: flex;
    justify-content: flex-star;
    flex-wrap: wrap;
    background: white;
    .item{
      margin-top: 0.0966rem;
      width: 20%;
      height: 1.4493rem;
      text-align:center;
      img{
        vertical-align: top;
        width: 0.9662rem;
        height: 0.9662rem;
        border-radius: 3px;

      }
      span{
        display: block;
        font-size: 0.2899rem;
      }
    }
  }


  .o2o-hot-list {
    .item {
      display: block;
      border-bottom: 1px solid #e7e7e7;
      &:last-child {
        border-bottom: none;
      }
      .editor {
        display: flex;
        justify-content: space-between;
        .headimg {
          margin: 0 0.1449rem;
          width: 44px;
          height: 44px;
        }
        .name {
          line-height: 0.8696rem;
        }
        .detail-btn {

          .detail-icon {

          }
        }

      }
      .info {
        .rest;
        display: block;
        .title {
          .rest;
          margin-top: 0.2415rem;

          font-size: 0.3865rem;
          /*font-weight: bold;*/
        }
        .pic-box {
          margin: 0.2415rem 0;
          .pic {
            display: inline-block;
            width: 25%;
            height: 0;
            padding-top: 25%;
            background-repeat: no-repeat;
            background-size: cover;
            background-position: center;
          }

        }
        .desc {
          display: flex;
          justify-content: space-between;
          .keyword {
            color: #666666;
          }
          .inputtime {
            width: 0.9662rem;
            text-align: center;
          }
        }
      }
    }
  }
</style>
