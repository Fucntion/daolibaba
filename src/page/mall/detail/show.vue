
<template>
  <div v-if="mall">
      <!-- 幻灯片 -->
       <mt-swipe id="picbox" :auto="5000">
        <mt-swipe-item v-if="mall.thumb"><img class="thumb" :src="mall.thumb" /></mt-swipe-item>
        <mt-swipe-item v-if="mall.pic1"><img class="thumb" :src="mall.pic1" /></mt-swipe-item>
        <mt-swipe-item v-if="mall.pic2"><img class="thumb" :src="mall.pic2" /></mt-swipe-item>
        <mt-swipe-item v-if="mall.pic3"><img class="thumb" :src="mall.pic3" /></mt-swipe-item>
        <mt-swipe-item v-if="mall.pic4"><img class="thumb" :src="mall.pic4" /></mt-swipe-item>

      </mt-swipe>
      <!-- 基础信息 -->
      <div class="baseinfo ">
          <div class="info-line padding10-c title">{{mall.title}}</div>
          <div class="info-line padding10-c pricebox">
              <span class="price">￥<em>{{mall.price|cutPrice(0)}}</em>{{mall.price|cutPrice(1)}}</span>
              <span class="initial_price">￥<em>{{mall.price|cutPrice(0)}}</em>{{mall.price|cutPrice(1)}}</span>
            </div>
          <div class="info-line ext">
              <span>总销量:6666</span>
              <span>月销量:666</span>
              <span>发货地:海口</span>
          </div>
      </div>
        <!-- 规格信息 -->
      <div class="spceinfo padding10 block">
        <div class="head padding10-c">
            <div class="tip">选择产品规格</div>
            <div  class="more"><i class="iconfont icon-more"></i></div>
        </div>
    </div>
     <!-- 产品参数 -->
     <div class="info padding10 margin15-r block">
        <div class="head padding10-c">
            <div class="tip">产品参数</div>
            <div  class="more"><i class="iconfont icon-more"></i></div>
        </div>
    </div>



        <!-- 公司信息 -->
      <div class="companyinfo block">
          <div class="base padding10-c">
              <img class="logo" src="http://placehold.it/100/ccc"/>
              <div class="company padding10-c">
                    <span class="title font16">三颗松鼠旗舰店三颗松鼠旗舰店</span>
                    <div class="validate font12">
                        <span><i class="iconfont icon-renzhengguanli active"></i>资质验证</span>
                        <span><i class="iconfont icon-renzhengguanli active"></i>企业认证</span>
                        <span><i class="iconfont icon-renzhengguanli"></i>同城导购</span>
                    </div>
              </div>
              <div class="go">
                  <mt-button size="small" type="primary" plain>进入店铺</mt-button>
              </div>
          </div>
          <div class="score">
              <span>产品描述<em>4.1</em></span>
              <span>服务态度<em>4.1</em></span>
              <span>物流服务<em>4.1</em></span>
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

    <spec-box v-show="selectBox" v-if="mall" :mall="mall"></spec-box>

    <div style="height:1.2077rem;"></div>
    <div class="fixBar">
        <div class="feature">
            <div class="kefu">
            <i class="iconfont icon-kefu"></i><span>联系客服</span>                    
            </div>
            <div class="favorite">
                <i class="iconfont icon-collection"></i><span>加入收藏</span>                
            </div>
        </div>
        <div class="action">
            
            <div class="btn buy buyJs" >立即购买</div>
            <div class="btn tocart buyJs" >加入购物车</div>
        </div>
        
    </div>

  </div>
</template>

<script>
import { mall } from "../../../service/getData";
import specBox from './spec';
// v-bind:style="{'height':200+'px'}"
export default {
  name: "show",
  data() {
    return {
      mall: {},
      selectBox:false
    };
  },

  components: {specBox},

  computed: {},
  mounted() {
    this.$nextTick(function() {
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
    getInfo() {
      let mise = mall({
        id: this.$route.params.id,
        field: "id,title,price,marketprice,thumb,pic1,pic2,pic3,pic4,unit,fare_id,user_id"
      });

      mise.then(res => {
        let body = res.body;
        if (body.code === 1) {
          this.mall = res.body.data;
        }
      });
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
  .feature{
      border-top: 1px solid @defaultBorderColor;
      box-sizing: border-box;
      display: flex;
      text-align: center;
      width: 100%;
      box-sizing: border-box;
      padding-right: 240px;
      padding-top: 8px;
      .kefu,.favorite{
          flex: 1;
          span{
              display: block;
              text-align: center;
              font-size: 12px;
              line-height: 16px;
              color: @grayFontColor;
          }
          .iconfont{
              font-size: 20px;
          }
      }
      .kefu{

      }
      .favorite{

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
    .tocart{
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


</style>