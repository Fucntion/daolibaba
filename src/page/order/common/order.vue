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
      <div class="total font14">
        共<em class="totalNumber">2</em>件商品,合计<span class="amount">¥ <em class="int">{{order.amount|cutPrice(0)}}</em>{{order.amount|cutPrice(1)}}</span>元（含运费￥0.00）
      </div>
      <div class="control">
        <mt-button size="small" @click="delMall('all')">确认收货</mt-button>
      </div>
    </div>

  </div>
</template>

<script>
  export default {
    name: "order",
    data(){
      return {

      }
    },
    props:['order']
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
    .total{
      text-align: right;
      color: #666666;
      padding: 10px 0;
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
