<template>
  <div class="order-item">
    <div class="section">
      <div class="head">
        <i class="iconfont icon-shangjia"></i>
        <router-link :to="'/compay/'+order.seller" class="company">{{order.seller_name}}</router-link>
        <i class="iconfont icon-previewright"></i>
      </div>
      <div class="mall selected" v-for="(mall,idx) in order.purchaser">

        <img class="thumb" :src="mall.thumb"/>
        <div class="info">
          <div class="name">
            <span class="font14">{{mall.title}}</span>
          </div>
          <div class="info_line specinfo">
            <span class="font12">类型:{{order.module.name}}订单</span>
          </div>
          <div class="info_line specinfo">
          <span class="font12"><span></span><span v-for="(spec,index) in mall.mallSpec">{{spec.title}}:{{spec.val}}; </span></span>
        </div>
          <!--<div class="info_line specinfo">-->
            <!--<span class="font12">数量{{mall.number}}</span>-->
          <!--</div>-->
          <!--<div class="info_line specinfo" v-if="mall.group">-->
            <!--<span class="font12">每人限购{{mall.group.limit}}件</span>-->
          <!--</div>-->

        </div>
        <div class="pircenumber">
          <div class="price info-line">￥{{mall.price}}</div>
          <div class="marketprice info-line">￥{{mall.price}}</div>
          <div class="number info-line">x{{mall.number}}</div>
        </div>
      </div>
      <a href="http://m.kuaidi100.com" class="send font14">
        快递/物流: <em>{{order.send_type}}</em>  单号: <em class="send_no">{{order.send_no}}</em>
      </a>
      <div class="total font14">
        共<em class="totalNumber">2</em>件商品,合计<span class="amount">¥ <em class="int">{{order.amount|cutPrice(0)}}</em>{{order.amount|cutPrice(1)}}</span>元（含运费￥0.00）
      </div>

      <div class="control">
        <mt-button v-if="order.status==0" size="small" @click="doPayAgain()">立即付款</mt-button>
        <!--<mt-button v-if="order.status==1" size="small" @click="delMall('all')">提醒发货</mt-button>-->
        <mt-button v-if="order.status==2" size="small" @click="checkSend()">确认收货</mt-button>
        <mt-button v-if="order.status==4" size="small" @click="goScore()">去评价</mt-button>
      </div>
    </div>

  </div>
</template>

<script>
  import {payAgin,order} from '../../../service/getData';
  export default {
    name: "order",
    data(){
      return {

      }
    },
    props:['order'],
    methods:{
      goScore(){
        this.$router.push({
          path:'/order/score',
          query:{
            id:this.order.id,
          }
        })
      },
      doPayAgain(){

        if (this.$root.isWX) {

          let openid = this.$root.utils.getStore("wx_pub_openid");
          if (!openid) {
            sessionStorage.setItem("forward", window.location.href);
            this.$root.mint.alertMsg("获取openid");
            this.$http
              .post("/fun/v1/member/getAuthUrl", { channel: "wechat_pub_pay" })
              .then(response => {
                let body = response.body;
                if (body.code === 1) {
                  window.location.href = body.data;

                }
              });
          }
        }

        let post = {channel: 'wx_pub', trade_no:this.order.trade_no};

        let ag = navigator.userAgent,
          ua = ag.toLowerCase();
        let isWX = (ua.indexOf('micromessenger') !== -1);

        if (isWX) {
          let openid = localStorage.getItem("wx_pub_openid");
          if (!openid) {
            alert('openid缺失');
          }
          post.openid = openid;
        }
        let _self = this;

        payAgin(post).then(res => {

          let body = res.body;
          if (body.code === 1) {
            //下单成功
            let payInfo = res.body.data;

            wx.chooseWXPay({
              timestamp: payInfo.timeStamp,  // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
              nonceStr: payInfo.nonceStr,    // 支付签名随机串，不长于 32 位
              package: payInfo.package,      // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=\*\*\*）
              signType: payInfo.signType,    // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
              paySign: payInfo.paySign,      // 支付签名
              success: function (res) {
                _self.$root.mint.messagesBox('支付成功',false);
              },
              complete: function (res) {
                  location.reload()
              },
              fail(res){
                _self.$root.mint.messagesBox('支付失败',false);
              }
            });
          }
        })


      },
      checkSend(){
          order({
            id:this.order.id,

            action:'checkSend'
          }).then(res=>{
            if(res.body.code==1){
              this.$root.mint.messagesBox('操作成功',false);
              location.reload();
            }
          })
      }
    }
  }
</script>

<style lang='less' scoped>
  @import "../../../assets/style/base.less";

  .order-item{
    position: relative;
    .control {
      padding: 0 10px;
      background: white;
      border-bottom: 1px solid #e7e7e7;
      box-sizing: border-box;
      height: 44px;
      z-index: 2;
      text-align: right;
      line-height: 44px;

      button {
        font-size: 12px;
        height: 26px;
        background: none;
        box-shadow:none;
        color: #333333;
        border: 1px solid #e8e8e8;
      }
    }
    .section {
      position: relative;
      margin-top: 0.2415rem;
      background: #fff;
      overflow: hidden;
      .head {
        box-sizing: border-box;
        position: relative;
        display: flex;
        align-items: center;
        padding: 0.2415rem 0.2415rem 0.2415rem 10px;
        // min-height: 1.087rem;
        height: 1.2077rem;
        z-index: 1;
        border-bottom: 0.0242rem solid @defaultBorderColor;
        .company {
          color: #333333;
          /*font-weight: 600;*/
        }
        .icon-shangjia,
        .icon-previewright {
          padding: 0 0.0966rem;
          font-size: 0.5314rem;
          color: #999999;
        }
      }
      .mall {
        z-index: 1;
        position: relative;
        min-height: 1.8116rem;
        padding: 0.2899rem 80px 0.3623rem 100px;
        background: #f8f8f8;
        margin-bottom: 2px;
        &:not(:last-child):before {
          z-index: 2;
          content: "";
          height: 0;
          display: block;

          position: absolute;
          left: 0;
          right: 0;
          bottom: 0;
        }
      }
    }
    .send{
      display: block;
      text-align: right;
      color: #666666;
      padding: 4px 10px;
      font-size: 12px;
      .em{
        color: #333333;
      }
      .send_no{
        text-decoration: underline;
      }
    }
    .total{
      text-align: right;
      color: #666666;
      padding: 0 0 10px 0;
      font-size: 12px;
      border-bottom: 0.0242rem solid @defaultBorderColor;
      .amount{

        .int{
          color: #333333;
          font-size: 16px;
        }
      }
    }
  }

  .mall {

    .thumb {
      position: absolute;
      left: 10px;
      top: 0.3623rem;
      display: block;
      width: 1.8116rem;
      height: 1.8116rem;
    }
    .info {

      .info_line {
        display: flex;
        margin-top: 0.2415rem;
        &.specinfo {
          color: #666666;
        }
        .price {
          flex: 1;
          .font10;
          color: @activeColor;
          em {
            .font16;
          }
        }

      }
      .info_sub_line {
        text-align: right;
        .m_action {
          color: @grayFontColor;
        }
      }
    }
    .pircenumber{
      text-align: right;
      font-size: 14px;
      width: 80px;
      padding: 10px;
      position: absolute;
      right: 0;
      top:0;
      bottom: 0;
      color: #666666;
      .marketprice{
        text-decoration: line-through;
        color: #999999;

      }
      .number{
        font-size: 12px;
      }
    }
  }


  .empty {
    text-align: center;
    display: block;
    color: #666666;
    .iconfont {
      font-size: 44px;

    }
    .title {
      padding: 20px 0;

    }
  }


</style>
