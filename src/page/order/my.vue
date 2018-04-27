<!-- 我的订单 -->
<template>

  <div class="order-wrap">
    <!--0=>'待付款',1=>'待发货',2=>'待收货',3=>'待评价',4=>'退款/售后',-1=>'为订单失败'-->
    <mt-navbar v-model="status" >
      <mt-tab-item  id="999">全部</mt-tab-item>
      <mt-tab-item  id="0">待付款</mt-tab-item>
      <mt-tab-item  id="1">待发货</mt-tab-item>
      <mt-tab-item  id="2">待收货</mt-tab-item>
      <mt-tab-item  id="3">待评价</mt-tab-item>
      <mt-tab-item  id="4">退款/售后</mt-tab-item>
      <mt-tab-item  id="-1">失败</mt-tab-item>
    </mt-navbar>

    <!-- tab-container -->
    <div class="list-wrap">
      <mt-loadmore :bottom-method="getOrders" @bottom-status-change="handleBottomChange" :bottom-all-loaded="allLoaded" ref="loadmore">
        <order-item class="item"
                    v-for="(order,idx) in orders"
                    :key="idx"
                    :order="order"></order-item>
      </mt-loadmore>
    </div>
  </div>
</template>

<script>
  import orderItem from './common/order';
  import {order} from "../../service/getData";
  export default {
  data () {
    return {
      status: '999',
      orders:[],
      end: false,
      page:1,
      allLoaded: false,
      bottomStatus: '',
    };
  },
    components:{orderItem},
    watch:{
      status(newVal,oldVal){
        this.orders = [];
        this.page =1;
        this.getOrders(newVal)
      }
    },
  created(){
      this.status = this.$route.query.status;

  },
  computed: {},
  mounted(){
    this.$nextTick(function(){
      // console.log(document.querySelector('.order-wrap'))
      // document.querySelector('.list-wrap').style.height = window.screen.height-44-46+'px';
      // document.querySelector('.mint-loadmore').style.height = window.screen.height-44-46+'px';
    })
  },

  methods: {
    handleBottomChange(status) {
      this.bottomStatus = status;
    },
    getOrders() {
      let post = {
        size: 20,
        paginate:true,

        page:this.page
      };
      if(status!=999){
        post.status = status
      }
      order(post).then(res => {
        if (res.body.code == 1) {
          this.page++;
          this.orders = this.orders.concat(res.body.data.data)
          this.$refs.loadmore.onBottomLoaded();
        }
      })
    },
    // getOrder(status){
    //   let post = {
    //     paginate:1,
    //     size:20
    //   };
    //
    //   order(post).then(res=>{
    //
    //   })
    // }
  }
}

</script>
<style lang='less' scoped>
.order-wrap{
  background: white;
}
  .list-wrap{
    position: fixed;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
    top: 90px;
    bottom: 0px;
    width: 100%;
    overflow-y: scroll;
  }

</style>
