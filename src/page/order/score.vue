<template>
  <div class="order-item" v-if="order">
    <div class="section">
      <div class="head">
        <i class="iconfont icon-shangjia"></i>
        <div class="company">{{order.seller_name}}</div>
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
            <span class="font12"><span></span><span
              v-for="(spec,index) in mall.mallSpec">{{spec.title}}:{{spec.val}}; </span></span>
          </div>
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
    </div>

    <div class="control">
      <mt-cell  title="评价星级">
        <i @click="changeStar(1)" :class="{active:star>0}" class="icon-star iconfont"></i>
        <i @click="changeStar(2)" :class="{active:star>1}" class="icon-star iconfont"></i>
        <i @click="changeStar(3)" :class="{active:star>2}" class="icon-star iconfont"></i>
        <i @click="changeStar(4)" :class="{active:star>3}" class="icon-star iconfont"></i>
        <i @click="changeStar(5)" :class="{active:star>4}" class="icon-star iconfont"></i>
      </mt-cell>
      <mt-field class="content" placeholder="文字评价，可选" type="textarea"  rows="4" v-model="content"></mt-field>
      <div class="stars">

      </div>

      <mt-button size="large" type="primary" @click="send()">提交</mt-button>
    </div>

  </div>
</template>

<script>
  import headBox from '../../components/head';
  import {order} from "../../service/getData";

  export default {
    name: "score",
    data() {
      return {
        order: null,
        content:null,
        star:0
      }
    },
    created() {

      order({
        id: this.$route.query.id,

        with: 'module,purchaser',
      }).then(res => {
        if (res.body.code == 1) {
          this.order = res.body.data
        }
      })
    },
    components: {headBox},
    methods: {
      changeStar(star){
        this.star =star
      },
      send(){
        if(this.star<1){
          this.$root.mint.alertMsg('请选择评分哦');
          return;
        }
        order({
          action:'score',
          star:this.star,
          id:this.$route.query.id,
          content:this.content
        }).then(res=>{
          if(res.body.code==1){
            this.$root.mint.messagesBox('订单评价成功',false);
          }
        })
      }
    }
  }
</script>

<style lang="less" scoped>
  @import "../../assets/style/base.less";

  .order-item {
    margin-top: 10px;
    position: relative;
    .control {
      margin: 10px 0;
      padding: 10px;
      background: white;
      border-bottom: 1px solid #e7e7e7;
      box-sizing: border-box;
      z-index: 2;

      .iconfont{
        color: #666666;
        &.active{
          color: @activeColor;
        }
      }

      .content{
        .border;
        margin-bottom: 10px;
        border-radius: 2px;
      }

    }
    .section {
      position: relative;
      /*margin-top: 0.2415rem;*/
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
    .send {
      display: block;
      text-align: right;
      color: #666666;
      padding: 4px 10px;
      font-size: 12px;
      .em {
        color: #333333;
      }
      .send_no {
        text-decoration: underline;
      }
    }
    .total {
      text-align: right;
      color: #666666;
      padding: 0 0 10px 0;
      font-size: 12px;
      border-bottom: 0.0242rem solid @defaultBorderColor;
      .amount {

        .int {
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
    .pircenumber {
      text-align: right;
      font-size: 14px;
      width: 80px;
      padding: 10px;
      position: absolute;
      right: 0;
      top: 0;
      bottom: 0;
      color: #666666;
      .marketprice {
        text-decoration: line-through;
        color: #999999;

      }
      .number {
        font-size: 12px;
      }
    }
  }


</style>
