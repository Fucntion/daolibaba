<!-- 我的订单 -->
<template>

  <div class="order-wrap">
    <head-box head-title="个人收藏" noquick="true" goBack="true"></head-box>
    <!--1是商品，2是公司，3是信息-->
    <!--<mt-navbar v-model="type" >-->
      <!--<mt-tab-item  id="1">商品</mt-tab-item>-->
      <!--<mt-tab-item  id="2">公司</mt-tab-item>-->
      <!--<mt-tab-item  id="3">同城资讯</mt-tab-item>-->
    <!--</mt-navbar>-->

    <!-- tab-container -->
    <div class="list-wrap">
      <mt-loadmore :bottom-method="getFavoriteList" @bottom-status-change="handleBottomChange" :bottom-all-loaded="allLoaded" ref="loadmore">
        <div v-if="item.type==1" class="item-wrap" v-for="(item,index) in lists" :key="index">
          <div class="box">
            <img @click="navigator('/mall/detail/'+item.goods_id)" class="thumb" :src="item.thumb" />
            <div @click="navigator('/mall/detail/'+item.goods_id)" class="info">
              <div class="name">
                <span class="font16">{{item.title}}</span>
              </div>
              <div class="info_line specinfo">
                <span class="font12"> {{item.create_time}}</span>
              </div>
            </div>
            <div class="control">
              <mt-button size="small" @click="delFavorite(item.type,item.goods_id)">取消收藏</mt-button>
            </div>
          </div >
        </div>
        <div v-if="item.type==2" class="item-wrap" v-for="(item,index) in lists" :key="index">
          <div class="box">
            <img @click="navigator('/company/'+item.company_id)" class="thumb" :src="item.thumb" />
            <div @click="navigator('/company/'+item.company_id)" class="info">
              <div class="name">
                <span class="font16">{{item.title}}</span>
              </div>
              <div class="info_line specinfo">
                <span class="font12"> {{item.create_time}}</span>
              </div>
            </div>
            <div class="control">
              <mt-button size="small" @click="delFavorite(item.type,item.company_id)">取消收藏</mt-button>
            </div>
          </div >
        </div>
        <div v-if="item.type==3" class="item-wrap" v-for="(item,index) in lists" :key="index">
          <div class="box">
            <img @click="navigator('/info/'+item.info_id)" class="thumb" :src="item.thumb" />
            <div @click="navigator('/info/'+item.info_id)" class="info">
              <div class="name">
                <span class="font16">{{item.title}}</span>
              </div>
              <div class="info_line specinfo">
                <span class="font12"> {{item.create_time}}</span>
              </div>
            </div>
            <div class="control">
              <mt-button size="small" @click="delFavorite(item.type,item.ino_id)">取消收藏</mt-button>
            </div>
          </div >
        </div>

      </mt-loadmore>
    </div>
  </div>
</template>
<script>
  import headBox from "@/components/head";
  import {favorite} from "../../service/getData";
  import action from "../../store/action";

  export default {
  data () {
    return {
      type: 1,
      lists:[],
      end: false,
      page:1,
      allLoaded: true,
      bottomStatus: '',
    };
  },
    components:{headBox},
    watch:{
      type(){
        this.lists = [];
        this.page =1;
        this.getFavoriteList()
      }
    },
  created(){

  },
  computed: {},
  mounted(){
    this.$nextTick(function(){
      // console.log(document.querySelector('.order-wrap'))
      // document.querySelector('.list-wrap').style.height = window.screen.height-44-46+'px';
      // document.querySelector('.mint-loadmore').style.height = window.screen.height-44-46+'px';
    })
  },

  methods: {
    navigator(url){
        this.$router.push({
          path:url
        })
    },
    handleBottomChange(status) {
      this.bottomStatus = status;
    },
    delFavorite(type,id){
      console.log(type,id)
        favorite({
          action:'del',
          resource_id:id,
          type:type
        }).then(res=>{
          if(res.body.code==1){
            this.$root.mint.messagesBox('取消成功');
            this.lists = [];
            this.page =1;
            this.getFavoriteList()
          }
        })
    },
    getFavoriteList() {

      let post = {
        size: 20,
        paginate:true,
        type:this.type,
        page:this.page
      };

      favorite(post).then(res => {
        if (res.body.code == 1) {
          this.page++;
          this.lists = this.lists.concat(res.body.data.data)
          this.$refs.loadmore.onBottomLoaded();
        }
      })
    },

  }
}

</script>
<style lang='less' scoped>
.order-wrap{
  background: white;
}
.list-wrap{
  position: fixed;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
  top: 44px;
  bottom: 0px;
  width: 100%;
  .item-wrap{
    background: white;
    margin-top: 6px;
    padding: 10px 0 0;
    .box{
      display: flex;
      padding: 10px;
      /*justify-content: space-between;*/
      .thumb{
        width: 75px;
        height: 75px;
      }
      .info{
        padding-left: 10px;
        flex: 1;
      }
      .title{

      }
      .time{
        font-size: 12px;
        width: 110px;
      }
    }
    .control{
      padding: 10px;
      /*border-top: 1px solid #e7e7e7;*/
      text-align: right;
      button{
        font-size: 12px;
        height: 26px;
        background: none;
        box-shadow: none;
        color: #333333;
        border: 1px solid #e8e8e8;
      }
    }


  }
}

</style>
