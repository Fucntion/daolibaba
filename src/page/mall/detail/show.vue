<template>
  <div>
    <!-- 幻灯片 -->
    <mt-swipe id="picbox" :auto="5000">
      <mt-swipe-item v-if="mall.thumb"><img class="thumb" :src="mall.thumb"/></mt-swipe-item>
      <mt-swipe-item v-if="mall.pic1"><img class="thumb" :src="mall.pic1"/></mt-swipe-item>
      <mt-swipe-item v-if="mall.pic2"><img class="thumb" :src="mall.pic2"/></mt-swipe-item>
      <mt-swipe-item v-if="mall.pic3"><img class="thumb" :src="mall.pic3"/></mt-swipe-item>
      <mt-swipe-item v-if="mall.pic4"><img class="thumb" :src="mall.pic4"/></mt-swipe-item>
    </mt-swipe>
    <!--团购信息-->
    <timer-box v-if="mall.group" :mall="mall" :now="now" :start_time="mall.group.start_time*1000" :end_time="mall.group.end_time*1000"></timer-box>

    <!-- 基础信息 -->
    <div v-if="mall.id" class="baseinfo">
      <div class="info-line padding10-c title">{{mall.title}}</div>
      <div class="info-line padding10-c pricebox" v-if="!mall.group">
        <span class="price">￥<em>{{mall.price|cutPrice(0)}}</em>{{mall.price|cutPrice(1)}}</span>
        <span class="initial_price">￥<em>{{mall.price|cutPrice(0)}}</em>{{mall.price|cutPrice(1)}}</span>
      </div>
      <div class="info-line padding10-c limit" v-else >每人限购{{mall.group.limit}}件</div>
      <div class="info-line ext">
        <span>发货地:{{mall.city.name||'海口'}}</span>
        <span>总销量:{{mall.sales}}</span>
        <span>总评论:{{mall.comments}}</span>
      </div>
    </div>
    <!-- 规格信息 -->
    <div @click="openSpecBox()" class="spceinfo padding10 block">
      <div class="head padding10-c">
        <div class="tip">选择产品规格</div>
        <div class="more"><i class="iconfont icon-more"></i></div>
      </div>
    </div>
    <!-- 产品参数 -->
    <div @click="openAttrBox()" class="info padding10 margin15-r block">
      <div class="head padding10-c">
        <div class="tip">产品参数</div>
        <div class="more"><i class="iconfont icon-more"></i></div>
      </div>
    </div>

    <!-- 公司信息 -->
    <div v-if="mall.company" class="companyinfo block">
      <div class="base padding10-c">
        <img class="logo" src="http://placehold.it/100/ccc"/>
        <div class="company padding10-c">
          <span class="title font16">{{mall.company.company}}</span>
          <div class="validate font12">
            <span><i class="iconfont icon-renzhengguanli" :class="{'active':mall.company.validated}"></i>企业认证</span>
            <span><i class="iconfont icon-renzhengguanli" :class="{'active':mall.company.is_club}"></i>同城导购</span>
          </div>
        </div>
        <router-link :to="'/store/'+mall.company.user_id" class="go">
          <mt-button size="small" type="primary" plain>进入店铺</mt-button>
        </router-link>
      </div>
      <div class="score">
        <span>产品描述<em>{{mall.company.score1}}</em></span>
        <span>服务态度<em>{{mall.company.score2}}</em></span>
        <span>物流服务<em>{{mall.company.score3}}</em></span>
      </div>
    </div>
    <!-- 产品详情 -->
    <div class="info padding10-r margin15-r block">
      <div class="head padding10-c">
        <div class="tip">产品详情</div>
      </div>
      <div v-if="mall.content" v-html="mall.content.content" class="content goods-content-box">
    </div>
    </div>
    <attr-box v-show="showAttrBox" v-if="mall.id" @close="closeAttrBox" :mall="mall"></attr-box>
    <spec-box v-show="showSpecBox" :type="specType" v-if="mall.id" @close="closeSpecBox" :mall="mall"></spec-box>
    <comm-mask @upup="closeMask" :mask="mask" v-show="mask.open"></comm-mask>
    <div style="height:1.2077rem;"></div>
    <div class="fixBar">
      <div class="feature">
        <div class="kefu">
          <i class="iconfont icon-kefu"></i><span>联系客服</span>
        </div>
        <div class="favorite" @click="addFavorite()" v-if="!mall.favorite">
          <i class="iconfont icon-collection"></i><span>加入收藏</span>
        </div>
        <div class="favorite  active" v-else @click="clearFavorite()">
          <i class="iconfont icon-collection"></i><span>取消收藏</span>
        </div>
      </div>
      <div class="action">

        <div @click="openSpecBox()" class="btn buy buyJs">立即购买</div>
        <div @click="openSpecBox('cart')" class="btn tocart buyJs">加入购物车</div>
      </div>

    </div>

  </div>
</template>

<script>
  import {mall,favorite} from "../../../service/getData";
  import SpecBox from './spec';
  import AttrBox from './attr';
  import CommMask from '../../../components/CommMask';
  import timerBox from  './timer';
  // v-bind:style="{'height':200+'px'}"
  export default {
    name: "show",
    data() {
      return {
        mall: {favorite:false},
        showSpecBox: false,
        showAttrBox: false,
        num: 0,
        specType: null,
      };
    },

    components: {SpecBox, AttrBox, CommMask,timerBox},

    computed: {
      mask(oval, nval) {
        return {
          open: this.showSpecBox || this.showAttrBox,
          zIndex: 99,
          call: this.showSpecBox ? 'closeSpecBox' : 'closeAttrBox'
        }
      },
      now(oval, nval){

        return (new Date()).valueOf()
      }
    },
    mounted() {
      this.$nextTick(function () {
        var box = document.getElementById("picbox"),
          docwidth = window.screen.width + "px";

        box.style.height = docwidth;
        box.style.width = docwidth;
      });
    },
    created() {
      this.getInfo();
    },
    methods: {

      getPriceLimit(arr){
        arr.sort(function(x,y){
          return x.price-y.price;
        });
        return arr;
      },
      closeMask() {
        console.log(22222)
        if (this.showAttrBox) this.showAttrBox = false
        if (this.showSpecBox) this.showSpecBox = false
      },
      closeAttrBox: function () {

        this.showAttrBox = false
      },
      openAttrBox: function () {
        this.showAttrBox = true
      },
      closeSpecBox: function () {
        this.showSpecBox = false
      },
      openSpecBox: function (type) {
        this.showSpecBox = true
        this.specType = type ? type : 'buy'
      },
      getInfo() {
        let mise = mall({
          id: this.$route.params.id,
          with:'content',
          field: "id,title,price,marketprice,thumb,pic1,pic2,pic3,pic4,sales,comments,unit,fare_id,user_id,city_id"
        });

        mise.then(res => {
          let body = res.body;
          if (body.code === 1) {
            this.mall = res.body.data;
          }
        });
      },
      addFavorite(){
        favorite({
          resource_id:this.mall.id,
          action:'add',
          type:1
        }).then(res=>{
          if(res.body.code==1){
            this.$root.mint.messagesBox('收藏成功',false)
            this.mall.favorite = true;
          }
        })
      },
      clearFavorite(){

        favorite({
          resource_id:this.mall.id,
          action:'del',
          type:1
        }).then(res=>{
          if(res.body.code==1){
            this.$root.mint.messagesBox('取消成功',false)
            this.mall.favorite = false;
          }
        })

      }
    }
  };
</script>
<style lang='less' scoped>
  @import "../../../assets/style/base.less";

  .fixBar {
    left: 0;
    right: 0;
    margin: 0 auto;
    max-width: 13.0435rem;
    height: 1.2077rem;
    //   border-top:1px solid @defaultBorderColor;
    background: hsla(0, 0%, 100%, 0.95);
    color: #333;
    font-size: 0.3382rem;
    position: fixed;
    z-index: 99;
    bottom: 0;
    .feature {
      border-top: 1px solid @defaultBorderColor;
      box-sizing: border-box;
      display: flex;
      text-align: center;
      width: 100%;
      box-sizing: border-box;
      padding-right: 240px;
      padding-top: 8px;
      .kefu, .favorite {
        flex: 1;
        span {
          display: block;
          text-align: center;
          font-size: 12px;
          line-height: 16px;
          color: @grayFontColor;
        }
        .iconfont {
          font-size: 20px;
        }
      }
      .kefu {

      }
      .favorite {

      }
    }
    .action {
      position: absolute;
      top: 0;
      right: 0;
      // p {
      //   padding-top: 0.2415rem;
      //   font-weight: 700;
      //   line-height: 1em;
      //   height: 1.2077rem;
      //   text-align: right;
      //   float: left;
      //   font-size: 0.3865rem;
      //   strong {
      //     color: @activeColor;
      //   }
      //   .totalPrice {
      //     color: @activeColor;
      //   }
      //   small {
      //     padding-top: 0.0483rem;
      //     display: block;
      //     font-size: 0.2415rem;
      //     color: #999;
      //     font-weight: 400;
      //   }
      // }
      .btn {
        float: right;
        display: block;
        width: 120px;
        height: 1.2077rem;
        line-height: 1.2077rem;
        font-size: 14px;
        text-align: center;

        background: #e4393c;
        color: #fff;
        em {
          font-weight: 400;
          font-size: 0.2899rem;
          font-family: none;
        }
      }
      .tocart {
        background: rgb(255, 149, 0);
      }
    }
  }

  .thumb {
    width: 100%;
    height: 100%;
  }

  .baseinfo {
    margin-bottom: 15px;
    padding: 10px 0 4px;
    background: white;
    .title {
      font-weight: 700;
    }
    .pricebox {
      margin: 15px 0;
    }
    .price {
      font-size: 14px;
      font-weight: bold;

      em {
        font-size: 24px;
      }
    }
    .initial_price {
      margin-left: 4px;
      text-decoration: line-through;

      font-size: 10px;
      em {
        font-size: 16px;
      }
    }
    .ext {
      display: flex;
      font-size: 14px;
      color: @grayFontColor;
      span {
        flex: 1;
        text-align: center;
        border-right: 2px solid #e7e7e7;
        &:last-child {
          border: none;
        }
      }
    }
  }

  .tip {
    font-size: 14px !important;
  }

  .companyinfo {
    padding: 10px 0 4px;
    .score {
      margin-top: 10px;
      font-size: 14px;
      display: flex;
      span {
        flex: 1;
        text-align: center;
        em {
          color: @activeColor;
          padding: 0 4px;
        }
      }
    }
    .base {
      display: flex;

      .go {
        line-height: 60px;
        button {
          .rest;
          font-size: 12px;
          width: 70px;
          height: 30px;
          box-sizing: border-box;
        }
      }
      .company {
        flex: 1;
        .validate {
          margin: 8px 0;
          span {
            color: @grayFontColor;
            .iconfont {
              font-size: 18px;
              &.active {
                color: @activeColor;
              }
            }
          }
        }
        .title {
        }
      }
      .logo {
        width: 60px;
        height: 60px;
      }
    }
  }

  .minus_plus {
    margin-left: 6px;
    .num_wrap {
      position: relative;
      display: block;
      width: 2.5845rem;
      border-radius: 0.0966rem;
      overflow: hidden;
      background-color: #f7f7f7;
      input,
      span {
        position: relative;
        float: left;
        width: 0.7246rem;
        height: 0.7246rem;
        line-height: 0.7246rem;
        text-align: center;
      }
      span {
        text-align: center;
        display: block;
        i {
          color: #999999;
        }
      }
    }
    .minus {
      &.disabled {
        color: #d8d8d8;
      }
    }
    .plus {
    }
    .input_wrap {
      float: left;
      position: relative;
      border-left: 0.0242rem solid #fff;
      border-right: 0.0242rem solid #fff;
      .num {
        font-size: 0.2899rem;
        color: #999;
        flex: 1;
        min-width: 0;
        background: none;
        border: none;
        width: 1.087rem;
        text-align: center;
      }
    }
  }

  .limit{
    margin: 15px 0;
    font-size: 14px;
    color: #666666;
  }

  .favorite.active{
    color: #e4393c;
    span{
      color: #e4393c !important;
    }
  }

</style>
