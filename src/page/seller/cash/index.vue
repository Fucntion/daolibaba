<template>
  <div>
    <head-box head-title="资金管理">
      <div slot="search"></div>
      <router-link to="/seller/withdraw" slot="edit" class="quick">
        发起提现
      </router-link>
    </head-box>
    <div class="order-wrap">
      <!--0=>'待付款',1=>'待发货',2=>'待收货',3=>'待评价',4=>'退款/售后',-1=>'为订单失败'-->
      <mt-navbar v-model="type">
        <mt-tab-item id="1">余额变动</mt-tab-item>
        <mt-tab-item id="2">提现记录</mt-tab-item>
      </mt-navbar>

      <mt-tab-container v-model="type">
        <mt-tab-container-item id="1">
          <div class="list-wrap padding10-r">
            <mt-loadmore :bottom-method="getAmountRecord" :autoFill="false" @bottom-status-change="handleBottomChange"
                         :bottom-all-loaded="allLoaded" ref="loadmore1">

              <div class="fieldset" v-for="(amount,idx1) in amountRecordArr" :key="idx1">
                <mt-cell title="变动原因" :value="amount.type"></mt-cell>
                <mt-cell title="变动时间" :value="amount.create_time"></mt-cell>
                <mt-cell title="变动前余额" :value="amount.before_total_amount"></mt-cell>
                <mt-cell title="变动金额" :value="amount.amount"></mt-cell>
                <mt-cell title="变动后余额" :value="amount.after_total_amount"></mt-cell>
                <mt-cell title="说明" :value="amount.content"></mt-cell>
              </div>

            </mt-loadmore>
          </div>
        </mt-tab-container-item>
        <mt-tab-container-item id="2">
          <div class="list-wrap padding10-r">
            <mt-loadmore :bottom-method="getWithdraw" :autoFill="false" @bottom-status-change="handleBottomChange"
                         :bottom-all-loaded="allLoaded" ref="loadmore2">
              <div class="fieldset" v-for="(withdraw,idx2) in withdrawArr" :key="idx2">
                <mt-cell title="提现编号" :value="withdraw.id"></mt-cell>
                <mt-cell title="提现金额" :value="'￥'+withdraw.number"></mt-cell>
                <mt-cell title="发起时间" :value="withdraw.create_time"></mt-cell>
                <mt-cell title="处理状态" :value="withdraw.status"></mt-cell>
              </div>
            </mt-loadmore>
          </div>
        </mt-tab-container-item>
      </mt-tab-container>

      <!-- tab-container -->


    </div>
    <foot-box active="cash"></foot-box>

  </div>
</template>

<script>
  import headBox from '../../../components/head';
  import footBox from '../components/foot';
  import {sellerAmount,sellerWithdraw} from "../../../service/getData";

  export default {
    name: 'cash',
    data() {
      return {
        type: 0,
        amountRecordArr: [],
        withdrawArr:[],
        page1: 1,
        page2: 1,
        allLoaded: false,
        bottomStatus: '',
      };
    },

    components: {footBox, headBox},

    computed: {},

    created() {
      this.type ='1'
      this.getAmountRecord()
      this.getWithdraw()
    },
    mounted() {
      this.$nextTick(function () {
        // document.querySelector('.malls').style.height = window.screen.height-54-44+'px';
      })
    },
    watch: {
      type(newVal, oldVal) {



        // if(newVal=='1'){
        //   this.getAmountRecord()
        //
        // }
        //
        // if(newVal=='2'){
        //   this.getWithdraw()
        // }

      }
    },

    methods: {
      handleBottomChange(status) {
        this.bottomStatus = status;
      },
      getWithdraw(){
        let post = {
          size: 10,
          paginate: true,
          page: this.page2
        };

        sellerWithdraw(post).then(res => {
          if (res.body.code == 1) {
            this.page2++;
            this.withdrawArr = this.withdrawArr.concat(res.body.data.data)
            this.$refs.loadmore2.onBottomLoaded();


          }
        })

      },
      getAmountRecord() {
        let post = {
          size: 10,
          paginate: true,
          page: this.page1
        };

        sellerAmount(post).then(res => {
          if (res.body.code == 1) {
            this.page1++;
            this.amountRecordArr = this.amountRecordArr.concat(res.body.data.data)
            this.$refs.loadmore1.onBottomLoaded();


          }
        })
      },

    }
  }

</script>
<style lang='less' scoped>
  @import "../../../assets/style/base.less";
.fieldset{
  margin-bottom: 10px;
}
</style>
