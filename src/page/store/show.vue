import {search} from "../../service/getData";
<template>
  <div class="wrap">
    <head-box class="box" go-back="true"  plain="true">
      <div slot="search" style="flex: 1">
        <input placeholder="本店铺搜索" class="word" v-model="word"/>
      </div>
      <button slot="edit" @click="toSearch()" class="submit">搜索</button>
    </head-box>


    <div class="topbanner"></div>

    <div class="base padding10 block">
      <img class="thumb" :src="company.thumb"/>
      <div class="info-line title">{{company.company}}</div>
      <div class="info-line validate font14">
        <span><i class="iconfont icon-renzhengguanli" :class="{'active':company.validated}"></i>企业认证</span>
        <span><i class="iconfont icon-renzhengguanli" :class="{'active':company.is_club}"></i>同城导购</span>
      </div>
      <div class="info-line font14 row-line"><span>商家电话:<em>089822222</em></span><span>服务时间:<em>08:30-22:10</em></span>
      </div>
      <div class="info-line font14 row-line"><span>收藏数:<em>325</em></span><span>店铺评分:<em>4分</em></span></div>

    </div>

    <div class="block margin15-r padding10-r">
      <div class="head">
        <div class="title"> 本店推荐</div>
      </div>
      <div class="content">
        <div class="list">
          <router-link :to="'/mall/detail/'+goods.id" v-for="goods in company.malls" class="slip-item item padding10-c">
            <img class="thumb" :src="goods.thumb||'http://placehold.it/100/ccc'"/>
            <div class="info">
              <span class="price font12">￥{{goods.price}}</span>
              <span class="initial_price font10">${{goods.marketprice}}</span>
            </div>
          </router-link>

        </div>
      </div>
    </div>

    <slip-box class="margin10-r" title="热销排行">
      <div slot="list">
        <mall-list :lists="allMalls"></mall-list>
      </div>
    </slip-box>

    <div @click="openCoType()" class="fixed cotype">商品分类</div>
    <mt-popup
      v-model="popupVisible"
      position="bottom" class="type-box">
      <mt-cell  title="所有类别"  :to="{path:'/store/'+company.user_id+'/type/null',query:{typeTitle:'所有类别'}}" :key="idx"></mt-cell>
      <mt-cell  :title="type.title" v-for="(type,idx) in company.type" :to="{path:'/store/'+company.user_id+'/type/'+type.id,query:{typeTitle:type.title}}" :key="idx"></mt-cell>
    </mt-popup>
  </div>
</template>

<script>
  import headBox from '../../components/head';
  import slipBox from '../../components/slip';
  import mallList from "../mall/common/list";
  import {company,mall} from "../../service/getData";
  import wx from 'weixin-js-sdk';
  export default {
    name: "show",
    data() {
      return {
        company: null,
        word: null,
        allMalls:[],
        page:1,
        popupVisible:false
      }
    },
    components: {headBox,slipBox,mallList},
    methods: {
      openCoType(){
        this.popupVisible = true
      },
      getMall() {
        let mise = mall({
          size: 20,
          paginate:1,
          user_id:this.$route.params.id,
          page:this.page
        }).then(res => {
          let body = res.body;
          if (body.code === 1) {
            this.page++
            this.allMalls = this.allMalls.concat(res.body.data.data);
            this.allMalls = this.allMalls.concat(res.body.data.data);
            this.allMalls = this.allMalls.concat(res.body.data.data);
            this.allMalls = this.allMalls.concat(res.body.data.data);
          }
        });
      }
    },
    created() {
      let _self = this;
      company({
        user_id: this.$route.params.id,
        mallsize: 20
      }).then(res => {
        if (res.body.code == 1) {
          this.company = res.body.data

          wx.ready(function () {
            //分享到朋友圈"
            wx.onMenuShareTimeline({
              title: _self.company.company||'岛里巴巴',
              link: location.href, // 分享链接
              imgUrl: _self.company.thumb, // 分享图标
              success: function () {
                // console.log('分享到朋友圈成功')
              },
              cancel: function () {
                // console.log('分享到朋友圈失败')
              }
            });
            //分享给朋友
            wx.onMenuShareAppMessage({
              title: _self.company.company||'岛里巴巴',
              link: location.href, // 分享链接
              imgUrl: _self.company.thumb, // 分享图标
              desc: '分享一个好店给你', // 分享描述
              success: function () {
                // console.log('分享到朋友成功')
              },
              cancel: function () {
                // console.log('分享到朋友失败')
              }
            });
          })


        }
      })
      this.getMall()
    }
  }
</script>

<style lang='less' scoped>
  @import "../../assets/style/base.less";

  .wrap {

  }

  .base {
    position: relative;
    color: #666666;
    margin-top: calc(36.7% - 40px);

    .thumb {
      position: absolute;
      top: -50px;
      width: 100px;
      height: 100px;
      border-radius: 4px;
    }
    .title {
      margin-top: 50px;
      color: #333333;

    }
    .row-line {
      display: flex;
      justify-content: space-between;
    }

  }

  .topbanner {
    position: absolute;
    top: 0;
    width: 100%;
    height: 0;
    padding-top: 36.7%;
    background-image: url("https://daolibaba2018.oss-cn-shenzhen.aliyuncs.com/demo_store_top.jpg");
    background-size: cover;
    background-repeat: no-repeat;
    &:before {
      width: 100%;
      height: 0;
      padding-top: 36.7%;
    }
  }

  .box {
    position: relative;
    z-index: 99;
    background: none !important;
    .type, .word, .submit {

      box-sizing: border-box;
      height: 34px;
      border: 1px solid #e7e7e7;
    }

    .type {
      font-size: 14px;
      padding: 0 6px;
      margin-bottom: 20px;
    }

    .word {
      font-size: 14px;
      padding: 0 6px;
      margin: 0 6px;
      margin-bottom: 20px;
      width: 90%;
    }

    .submit {
      margin-top: 6px;
      height: 32px;
      width: 60px;
      border-radius: 4px;
      background: #26a2ff;
      color: white;
    }
  }

  .validate {
    .iconfont {
      font-size: 20px;
      &.active {
        color: @activeColor;
      }
    }
  }

  .info-line {
    margin-top: 8px;
    em {
      color: #333333;
    }
  }

  .cotype{
    position: fixed;
    bottom: 0;
    background: white;
    z-index: 2;
    width: 100%;
    font-size: 14px;
    height: 44px;
    text-align: center;
    line-height: 44px;
  }
  .type-box{
    width: 100%;
  }

</style>
