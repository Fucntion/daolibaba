<template>
  <div>
    <head-box head-title="订单管理" quick="true">
      <div slot="search"></div>
    </head-box>
    <div class="order-wrap">
      <!--0=>'待付款',1=>'待发货',2=>'待收货',3=>'待评价',4=>'退款/售后',-1=>'为订单失败'-->
      <mt-navbar v-model="status" >
        <mt-tab-item id="999">全部</mt-tab-item>
        <!--<mt-tab-item id="0">已付款</mt-tab-item>-->
        <mt-tab-item id="1">待发货</mt-tab-item>
        <mt-tab-item id="2">待收货</mt-tab-item>
        <mt-tab-item id="666">已结算</mt-tab-item>
        <!--<mt-tab-item id="5">已评价</mt-tab-item>-->
        <!--<mt-tab-item id="6">退款/售后</mt-tab-item>-->
        <!--<mt-tab-item id="-1">失败</mt-tab-item>-->
      </mt-navbar>

      <!-- tab-container -->
      <div class="list-wrap">
        <mt-loadmore :bottom-method="getOrders" :autoFill="false" @bottom-status-change="handleBottomChange" :bottom-all-loaded="allLoaded" ref="loadmore">
          <order-item class="item"
                      v-for="(order,idx) in orders"
                      :key="idx"
                      :order="order"></order-item>
        </mt-loadmore>
      </div>
    </div>
    <foot-box active="order"></foot-box>

  </div>
</template>

<script>
  import headBox from '../../../components/head';
  import footBox from '../components/foot';
  import orderItem from './common/order';
  import {sellerOrder} from "../../../service/getData";

  export default {
    data() {
      return {
        status: null,
        orders:[],
        page:1,
        allLoaded: false,
        bottomStatus: '',
      };
    },

    components: {footBox, headBox,orderItem},

    computed: {},

    created() {
      this.status='999';
    },
    mounted() {
      this.$nextTick(function () {
        // document.querySelector('.malls').style.height = window.screen.height-54-44+'px';
      })
    },
    watch:{
      status(newVal,oldVal){

        this.orders = [];
        this.page =1;
        this.getOrders()

      }
    },

    methods: {
      handleBottomChange(status) {
        this.bottomStatus = status;
      },
      getOrders() {
        let post = {
          size: 10,
          paginate:true,
          page:this.page,
          field:'id,status,user_id,create_time,amount,mid,send_type,send_no',
        };

        if(this.status!=999){
          post.status = this.status
        }

        sellerOrder(post).then(res => {
          this.$refs.loadmore.onBottomLoaded();
          if (res.body.code == 1) {
            this.page++;
            this.orders = this.orders.concat(res.body.data.data)
            if(this.orders.length<1){
              this.bottomStatus = true;
              return;
            }

          }
        })
      },

    }
  }

</script>
<style lang='less' scoped>
  @import "../../../assets/style/base.less";

  .malls {
    background: white;

    .mall {
      margin-bottom: 10px;
      padding: 10px;
      border-bottom: 1px solid #e7e7e7;
      background: white;

      .head {

        display: flex;
        .thumb {
          width: 80px;
          height: 80px;
        }
        .info {
          flex: 1;
          padding: 0 10px;
          font-size: 12px;
          color: #666666;
          .info-line {
            margin-bottom: 6px;
          }
          .title {
            font-size: 14px;
            color: #333333;
          }
        }
      }
      .control {
        text-align: right;
        button {
          height: 28px;
          font-size: 12px;

        }
      }
    }
  }
</style>
