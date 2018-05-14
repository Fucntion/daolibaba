<template>
  <div class="wrap" :class="{'fiexd':popupVisible}" v-if="order.id">
    <head-box head-title="订单详情" go-back="true"></head-box>
    <div class="fieldset">
      <mt-cell title="订单信息"></mt-cell>
      <mt-cell title="订单号" :value="order.trade_no"></mt-cell>
      <mt-cell title="订单类型" :value="order.module.name+'订单'"></mt-cell>
      <mt-cell title="创建时间" :value="order.create_time"></mt-cell>
      <mt-cell title="订单总额" :value="order.amount"></mt-cell>
      <mt-cell title="订单状态" :value="isStatus"></mt-cell>
      <mt-cell title="订单总额" :value="'￥'+order.amount"></mt-cell>
    </div>

    <div class="fieldset">
      <mt-cell title="收货人信息"></mt-cell>
      <mt-cell title="收货人" :value="order.buyer_name"></mt-cell>
      <mt-cell title="联系方式" :value="order.buyer_phone"></mt-cell>
      <mt-cell title="详细地址" :value="order.buyer_address"></mt-cell>
      <mt-cell title="邮编" :value="order.buyer_postcode"></mt-cell>
    </div>


    <div class="fieldset">
      <mt-cell title="支付情况"></mt-cell>
      <mt-cell title="支付渠道" :value="order.pay.channel"></mt-cell>
      <mt-cell title="支付平台预下单号" :value="order.pay.out_trade_no"></mt-cell>
      <mt-cell title="支付时间" :value="order.update_time"></mt-cell>
      <mt-cell title="支付结果" :value="order.pay.status==1?'支付成功':'支付失败'"></mt-cell>
    </div>


    <div class="fieldset" style="padding-bottom: 10px">
      <mt-cell title="购买信息"></mt-cell>
      <div class="mall selected" v-for="(purchaser,idx) in order.purchaser">

        <img class="thumb" :src="purchaser.thumb"/>
        <div class="info">
          <div class="name">
            <span class="font14">{{purchaser.title|cutstr(20)}}..</span>
          </div>
          <div class="info_line specinfo">
            <span class="font12">类型:{{order.module.name}}订单</span>
          </div>
          <div class="info_line specinfo">
            <span class="font12"><span></span><span v-for="(spec,index) in purchaser.mallSpec">{{spec.title}}:{{spec.val}}; </span></span>
          </div>
          <div style="text-align: right">

          </div>
        </div>
        <div class="pircenumber">
          <div class="price info-line">￥{{purchaser.price}}</div>
          <div class="marketprice info-line">￥{{purchaser.price}}</div>
          <div class="number info-line">x{{purchaser.number}}</div>
        </div>
      </div>
    </div>


    <div class="fieldset" style="padding-bottom: 10px">
      <mt-cell title="物流相关"></mt-cell>
      <!--<mt-cell title="发货状态" :value="order.send_status"></mt-cell>-->
      <mt-cell title="快递/物流" :value="order.send_type" v-if="order.status>1"></mt-cell>
      <mt-cell title="单号" :value="order.send_no" v-if="order.status>1"></mt-cell>
      <div @click="openExpressPop()" v-if="order.status==1">
        <mt-field label="快递/物流" placeholder="请选择快递" v-model="send_type_name"></mt-field>
      </div>
      <mt-field v-if="order.status==1" label="单号" placeholder="请输入单号" type="email" v-model="send_no"></mt-field>
      <div class="margin10-c" v-if="order.status==1" @click="send()">
        <mt-button size="large" type="primary">确认发货</mt-button>
      </div>
    </div>

    <mt-popup
      v-model="popupVisible"
      position="bottom" class="express-box">
      <div @click="selectExpress(express)" v-for="(express,idx) in expressArr" :key="idx">
        <mt-cell :title="express.name"></mt-cell>
      </div>
    </mt-popup>

  </div>
</template>
<script>
  import headBox from '../../../components/head';

  import {sellerOrder} from "../../../service/getData";

  export default {
    data() {
      return {
        order: {},
        send_type_id: null,
        send_type_name: null,
        send_no: null,
        popupVisible: false,
        expressArr: []
      };
    },


    components: {headBox},

    computed: {
      isStatus() {
        console.log(this.order.status)
        switch (this.order.status) {
          case 0:
            return '待付款';
            break;
          case 1:
            return '待发货';
            break;
          case 2:
            return '待收货';
            break;
          case 4:
            return '待评价';
            break;
          case 5:
            return '已评价';
            break;
          case 6:
            return '退款/售后';
            break;
          case -1:
            return '订单失败';
            break;
          default:
            return '状态异常';
            break;
        }

      }
    },

    created() {
      let _self = this
      sellerOrder({
        id: this.$route.params.id,
        field: 'id,status,user_id,create_time,amount,mid,send_type,send_no',
      }).then(res => {
        if (res.body.code == 1) {
          this.order = res.body.data
          //需要发货地
          if (this.order.status == 1) {
            sellerOrder({
              action: 'express'
            }).then(resp => {
              this.expressArr = resp.body.data
            })
          }
        }
      })
    },
    methods: {
      send(){
        if(!this.send_type_id||!this.send_type_name){
          this.$root.mint.alertMsg('发货类型和单号必填');
          return ;
        }

        sellerOrder({
          action:'send',
          id:this.order.id,
          send_type_id:this.send_type_id,
          send_no:this.send_no,
          send_type:this.send_type_name,
        }).then(res=>{
          if(res.body.code==1){
            this.$root.mint.messagesBox('发货成功',false);
            this.order.send_type_id = this.send_type_id;
            this.order.send_no = this.send_no;
            this.order.status = 2;
          }else{
            this.$root.mint.messagesBox('发货失败');
          }
        })
      },
      selectExpress(express) {
        this.send_type_id = express.id
        this.send_type_name = express.name
        this.popupVisible = false
      },
      openExpressPop() {
        this.popupVisible = true
      }
    }
  }

</script>
<style lang='less' scoped>
  @import '../../../assets/style/base.less';

  .fieldset {

    font-size: 14px;
    margin-bottom: 10px;
    background: white;
  }

  .mall {
    z-index: 1;
    position: relative;
    min-height: 80px;
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

    .thumb {
      position: absolute;
      left: 10px;
      top: 0.3623rem;
      display: block;
      width: 1.8116rem;
      height: 1.8116rem;
    }
    .info {
      padding: 0 10px 0 0;
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

  .express-box {
    width: 100%;
  }

  .fiexd{
    /*position: fixed;*/
  }
</style>
