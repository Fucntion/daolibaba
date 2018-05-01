<!--  -->
<template>
  <div>
    <head-box head-title="个人中心" noquick="true" goBack="true">
      <!--<i slot="edit" class="iconfont icon-more"></i>-->
    </head-box>
    <div class="header-wrap padding10">
      <div class="my-header">
        <div class="userinfo" v-if="userInfo">
          <div class="avatar">
            <img :src="userInfo.headimgurl||'http://o2o.qingclouds.cn/file/upload/201804/06/094500621.jpg'"
                 class="avatar-img"/>
          </div>
          <div class="info">
            <div class="line nickname">昵称:{{userInfo.nickname}}</div>
            <div class="line account">通信证: {{userInfo.phone}}</div>
            <div class="line point">积分 {{userInfo.pionts_num}}</div>
          </div>
        </div>
        <router-link v-if="userInfo" :to="'/my/profile'" class="edit-btn">编辑<i class="iconfont icon-fabu"></i>
        </router-link>
        <router-link v-if="!userInfo" :to="'/login'" class="login">
          <mt-button size="small" plain>登录/注册</mt-button>
        </router-link>
      </div>
    </div>
    <div class="my-order margin15-r" v-if="userInfo">
      <!--0=>'待付款',1=>'待发货',2=>'待收货',3=>'待评价',4=>'退款/售后',-1=>'为订单失败'-->
      <router-link to="/order?status=0" class="order"><i class="iconfont icon-fukuan"></i><span class="key">待付款</span></router-link>
      <router-link to="/order?status=2" class="order"><i class="iconfont icon-ziyuan"></i><span class="key">待收货</span></router-link>
      <router-link to="/order?status=3" class="order"><i class="iconfont icon-daipingjia20"></i><span class="key">待评价</span></router-link>
      <router-link to="/order?status=4" class="order"><i class="iconfont icon-icondd2"></i><span class="key">退款/售后</span></router-link>
    </div>
    <div class="my-assets " v-if="userInfo">
      <div class="assets"><span class="value">{{userInfo.cashing_money}}</span><span class="key">可用余额</span></div>
      <div class="assets"><span class="value">{{userInfo.freeze_money}}</span><span class="key">冻结余额</span></div>
      <div class="assets"><span class="value">{{userInfo.pionts_num}}</span><span class="key">积分</span></div>
      <div class="assets"><i class="iconfont icon-zhanghuzichan"></i><span>我的财富</span></div>
    </div>
    <div class="my-lnks margin15-r" v-if="userInfo">
      <div class="lnks"><span class="value">{{userInfo.commentCount}}</span><span class="key">我的评论</span></div>
      <div class="lnks"><span class="value">{{userInfo.favoriteCompanyCount}}</span><span class="key">关注的店铺</span></div>
      <router-link to="/favorite" class="lnks"><span class="value">{{userInfo.favoriteMallCount}}</span><span class="key">收藏的商品</span></router-link>
      <router-link to="/info/my" class="lnks"><span class="value">{{userInfo.infoCount}}</span><span class="key">发布资讯</span></router-link>
    </div>

    <div class="my-assets" v-if="userInfo.co_id">
      <div class="assets"><span class="value">{{userInfo.cashing_money}}</span><span class="key">七天内订单</span></div>
      <div class="assets"><span class="value">{{userInfo.freeze_money}}</span><span class="key">七天内成交额</span></div>
      <div class="assets"><span class="value">{{userInfo.pionts_num}}</span><span class="key">七天内访客</span></div>
      <router-link to="/seller" class="assets"><i class="iconfont icon-shangjia"></i><span>店铺管理</span></router-link>
    </div>
    <router-link to="/seller/reg" class="my-assets" v-if="userInfo&&!userInfo.co_id">
      <mt-button type="primary" size="large" class="goSeller">成为商户</mt-button>

    </router-link>


    <slip-box class="margin10-r" title="为您推荐">
      <div slot="list">
        <mall-list :lists="malls"></mall-list>
      </div>
    </slip-box>

    <foot-box active="my"></foot-box>
    <!-- <transition name="router-slid" mode="out-in">
          <router-view></router-view>
      </transition> -->
  </div>
</template>

<script>
  import headBox from "@/components/head";
  import footBox from "@/components/foot";
  import slipBox from "@/components/slip";
  import {mall,getUser} from "../../service/getData";
  import mallList from "../mall/common/list";

  import {mapState, mapActions} from "vuex";

  export default {
    data() {
      return {
        malls: [],
        userInfo:{}
      };
    },

    components: {
      headBox,
      footBox,
      mallList,
      slipBox
    },

    computed: {

    },

    methods: {

      getMall() {
        let mise = mall({
          size: 20,
          paginate: true
        });
        mise.then(res => {
          let body = res.body;
          if (body.code === 1) {
            this.malls = res.body.data.data;
          }
        });
      }
    },
    created() {
      getUser({
        action:'ext'
      }).then(res=>{
        console.log(res.body)
        if(res.body.code==1){
          this.userInfo = res.body.data
        }
      })
      this.getMall();
    }
  };
</script>
<style lang='less' scoped>
  @import "../../assets/style/base.less";
  .goSeller{
    margin: 0 auto;
    width: 50%;
    background: -webkit-linear-gradient(left, #eb3c3c, #ff7459);
    background: linear-gradient(90deg, #eb3c3c, #ff7459);
    border: 1px solid #e7e7e7;
    text-align: center;
    line-height: 30px;
    font-size: 14px;
    margin-top: 20px;
  }
  .my-order {
    display: flex;
    height: 72px;
    background: white;
    .order {
      flex: 1;
      text-align: center;
      padding: 15px;
      .iconfont {
      }
      .key {
        color: @grayFontColor;
      }
      span {
        font-size: 12px;
        display: block;
      }
    }
  }

  .my-assets {
    display: flex;
    height: 72px;
    background: white;
    .assets {
      flex: 1;
      text-align: center;
      padding: 15px;
      .iconfont {
      }
      .value {
        line-height: 26px;
        font-size: 16px;
        color: @activeColor;
      }
      .key {
        color: @grayFontColor;
      }
      span {
        font-size: 12px;
        display: block;
      }
    }
  }

  .my-lnks {
    display: flex;
    height: 72px;
    background: white;
    .lnks {
      flex: 1;
      text-align: center;
      padding: 15px;
      .iconfont {
      }
      .value {
        line-height: 26px;
        font-size: 16px;
      }
      .key {
        color: @grayFontColor;
      }
      span {
        font-size: 12px;
        display: block;
      }
    }
  }

  .header-wrap {
    background: white;
  }

  .my-header {
    overflow: hidden;
    position: relative;
    border-radius: 6px;
    font-size: 12px;
    color: #fff;
    background: -webkit-linear-gradient(left, #eb3c3c, #ff7459);
    background: linear-gradient(90deg, #eb3c3c, #ff7459);
    box-shadow: 0 2px 5px rgba(255, 98, 98, 0.4);
    .userinfo {
      padding: 25px 15px;
      display: flex;
      .avatar {
        margin-right: 10px;
        width: 60px;
        height: 60px;
        border-radius: 60px;
        border: 1px solid hsla(0, 0%, 100%, 0.4);
        .avatar-img {
          width: 60px;
          height: 60px;
          display: block;
          border-radius: 60px;
        }
      }
      .info {
        .line {
          margin-top: 4px;
        }
        .nickname {
        }
        .account {
          color: #e7e7e7;
        }
        .point {
        }
      }
    }
    .edit-btn {
      position: absolute;
      right: 10px;
      top: 10px;

      color: #e7e7e7;
      height: 20px;
      line-height: 20px;

      .icon-fabu {
        font-size: 16px;


      }
    }
  }

  .login {
    display: block;
    text-align: center;
    padding: 20px;

    button {
      color: white;
      border-color: white;
    }
  }

  .router-slid-enter-active,
  .router-slid-leave-active {
    transition: all 0.4s;
  }

  .router-slid-enter,
  .router-slid-leave-active {
    transform: translate3d(2rem, 0, 0);
    opacity: 0;
  }
</style>
