<!-- 确认订单 -->
<template>
  <div>
       <head-box :goBack="true" :head-title="title"  ></head-box>
        <router-link :to='{path:"/address",query:{select:true}}'>
          <div class="address" v-if="chooseAddress.id">
            <div class="icon"><i class="iconfont icon-address"></i></div>
            <div class="detail">
              <div class="info-line link">
                <span>收货人:{{chooseAddress.link}}</span><span>{{chooseAddress.tel}}</span>
              </div>
              <div class="info-line fulladdress"><span>收货地址:{{chooseAddress.provience}} {{chooseAddress.city}} {{chooseAddress.area}} {{chooseAddress.detail}}</span></div>
            </div>
            <div class="icon"><i class="iconfont icon-previewright"></i></div>
          </div>
          <div class="address no-address" v-else >
            <mt-button type="primary">新增收货地址</mt-button>
          </div>
        </router-link>
      <div class="orderbox">
            <div class="section" v-for="(company,index) in companyList" :key="index">
                <div class="head">
                    <i class="iconfont icon-shangjia"></i>
                    <router-link :to="'/compay/'+company.id"  class="company">{{company.company}}</router-link>
                </div>
                <div class="mall selected" v-for="(mall,idx) in company.malls" :key="idx">

                    <img class="thumb" :src="mall.thumb" />
                    <div class="info" >
                        <div class="name">
                            <span class="font14" >{{mall.title}}</span>
                        </div>
                        <div class="info_line specinfo">
                           <span class="font12">已选:{{mall.specInfo}}</span>
                        </div>
                      <div class="info_line specinfo" v-if="mall.group">
                        <span class="font12">团购:每人限购{{mall.group.limit}}件</span>
                      </div>
                        <div class="info_line specinfo">
                           <span class="font12">运费{{mall.fee}}</span>
                        </div>
                        <div class="info_line">
                            <p class="price"><span class="priceJs" >¥ <em class="int">{{mall.price|cutPrice(0)}}</em>{{mall.price|cutPrice(1)}}</span></p>
                            <div class="minus_plus">x{{mall.number}}</div>
                        </div>


                    </div>
                </div>
                <div class="info-line fee"><label>运费总计</label><div class="val">￥{{company.feeTotal}}</div></div>
                <!-- <div class="info-line fee"><label>运费</label><div class="val">{{company.fee}}</div></div> -->
                <div class="info_sub_line">
                  共计{{company.malls.length}}件商品,小计 <span class="priceJs" >¥<em class="int">{{company.amountTotal+company.feeTotal|cutPrice(0)}}</em>{{company.amountTotal+company.feeTotal|cutPrice(1)}}</span>
                </div>
            </div>

      </div>
      <div  style="height:1.2077rem;"></div>
      <div class="fixBar">
          <!-- <i class="iconfont icon-select" @click="selectMall('all')" :class="{'active':selectAll}">全选</i> -->
          <div class="total">
              <p>
                  <!-- <strong id="totalPrice">¥{{total.totalAmount}}</strong> -->
                  <small><span id="totalBackMoney">合计总额: <span class="priceJs" > ¥ <em class="int">{{totalAmount+totalFee|cutPrice(0)}}</em>{{totalAmount+totalFee|cutPrice(1)}}</span> 元</span></small>
                  <!-- 立减¥179.52 -->
              </p>
              <div @click="sendOrder()" class="buy buyJs" :class="{disabled:!isSend}" >提交订单
                  <!-- <em  id="totalNum">({{total.totalNumber}}件)</em> -->
              </div>
          </div>

      </div>
      <transition name="router-slid" mode="out-in">
              <router-view></router-view>
      </transition>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import { postOrder, address, mall } from "../../service/getData";
import headBox from "@/components/head";
import order from "../../service/order";
export default {
  data() {
    return {
      title: "确认订单",
      companyList: order.getProductList() || [],
      totalAmount: order.totalAmount,
      totalFee: 0,
      totalNumber: order.totalNumber,
      buyer: order.buyer,
      malls: [],
    };
  },

  components: { headBox },

  computed: {
    isSend(){
      if(this.chooseAddress.id&&this.totalAmount>0){
        return true;
      }else{
        return false;
      }
    },
    ...mapState(["chooseAddress", "userInfo"])

  },
  created() {
    this.initAddress();
    this.computedFare();
    this.$root.utils.getWxConfig();
  },
  methods: {
    ...mapMutations(["CHOOSE_ADDRESS", "getUserInfo"]),
    computedFare: function() {
      var _self = this;
      // if (!this.chooseAddress.id) {
      //   this.$root.mint.alertMsg('请选择收货地址');//默认选择
      // }

      this.companyList.map(function(c) {
        let tempFareTotal = 0;
        c.malls.map(function(m) {
          let mallFare = _self.mallFare(m);
          console.log(mallFare);
          if (mallFare > 0) {
            tempFareTotal += mallFare;
          }
        });
        c.feeTotal = parseFloat(tempFareTotal);
        _self.totalFee += c.feeTotal;
      });
    },
    getCarryModel: function(cityId, fare) {
      var Region = this.chooseAddress.city_id,
        carryModelList = fare.carry, //获取系统的
        carryModelDefault = fare.carry_default; //获取默认

      //返回空的
      // if(!Region)return false;//用默认的代替
      if (carryModelList.length < 1 && !carryModelDefault) return false;

      //如果有自定义各个区域的运费计算方式
      for (var i = 0; i < carryModelList.length; i++) {
        if (carryModelList[i].Region == Region) {
          return carryModelList[i];
        }
      }
      //返回默认的咯
      return carryModelDefault;
    },
    mallFare(mall) {
      /**
       * 邮费计算
       */
      // 判断是否包邮->判断是否满足条件包邮->根据客户选择的运送方式判断地区->没有所在地区则使用默认运费->求最大首费和最小续费
      var rt = 0,
        carryModel = mall.carry,
        Region = this.chooseAddress.city_id,
        selectNum = mall.number;

      // Region
      //是否包邮
      if (mall.isProviso == 1) {
        return rt;
      }

      //根据选择的区域计算邮费
      carryModel = this.getCarryModel(Region, mall.fare);

      if (!carryModel) {
        console.log("默认运费");
        return rt;
      }

      //首件+剩下的件
      rt =
        parseFloat((selectNum - 1) * carryModel.SecondPiece) +
        parseFloat(carryModel.FirstAmount);

      mall.fee = parseInt(rt * 100) / 100; //更新了邮费了

      return mall.fee;
    },
    async initAddress() {
      if(this.chooseAddress.id){
        return ;//如果有默认的地址
      }
      address({
        action:'getDefault'
      }).then(res => {
        if (res.body.code == 1) {
          let address = res.body.data;

          this.CHOOSE_ADDRESS({ address:address});


        }
      });
    },
    sendOrder() {

      if(!this.isSend){
        this.$root.mint.alertMsg('订单异常,请选择收货地址或者检查价格');
        return;
      }

      let _self = this,
        post = {
          companyList: _self.companyList, //按照门店分类的订单信息
          amount: this.totalAmount + this.totalFee,
          chooseAddress: this.chooseAddress
        };


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

      let mise = postOrder(post);
      mise.then(res => {
        let body = res.body;
        if (body.code === 1) {
          this.$root.mint.alertMsg("下单成功");
          order.clearProduct();//清空购物车所有商品和待下订单商品
          let out_trade_no = res.body.data.out_trade_no;
          let PayResult = this.$root.utils.unifiedPay(out_trade_no, "wx_pub");
          PayResult.then(res=>{
            this.$root.mint.alertMsg('支付成功')
            this.$router.push({
              path:'/confirmOrder/payresult',
              query:{out_trade_no:res.body.data.out_trade_no}
            })
          }).catch(res=>{
            this.$router.push({
              path:'/confirmOrder/payresult',
              query:{out_trade_no:res.body.data.out_trade_no}
            })
          })
        }
      });
    },
  }
};
</script>
<style lang='less' scoped>

@import "../../assets/style/base.less";
.no-address{

  text-align: center;
  button{
    margin: 10px auto;
    font-size: 14px;
    height: 36px;
    padding: 0 20px;
    box-shadow: none;
    border-radius: 0;
  }
}
.address {
  display: flex;
  padding: 10px 0;
  background: white;
  border-bottom: 1px solid #e7e7e7;
  height: 60px;
  .detail {
    flex: 1;
    font-size: 14px;
    .link {
      height: 16px;
      line-height: 16px;
      display: flex;
      justify-content: space-between;
    }
    .fulladdress {
      font-size: 12px;
      height: 36px;
      line-height: 16px;
    }
  }
  .icon {
    line-height: 60px;
    width: 20px;
    padding: 0 10px;
    .iconfont {
      font-size: 20px;
      color: #666666;
    }
  }
}
.router-slid-enter-active,
.router-slid-leave-active {
  transition: all 0.4s;
}
.router-slid-enter,
.router-slid-leave-active {
  transform: translate3d(2rem, 0, 0);
  opacity: 0;
}

.orderbox {
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
      border: 1px solid @activeColor;
    }
  }
  .section {
    position: relative;
    margin-bottom: 0.2415rem;
    background: #fff;
    overflow: hidden;
    .head {
      box-sizing: border-box;
      position: relative;
      display: flex;
      align-items: center;
      padding: 0.2415rem 0.2415rem 0.2415rem 10px;
      height: 1.2077rem;
      z-index: 1;
      border-bottom: 0.0242rem solid @defaultBorderColor;
      .company {
        font-size: 14px;
        color: #333333;
        // font-weight: 600;
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
      background: #f9f9f9;
      position: relative;
      min-height: 1.8116rem;
      padding: 0.2899rem 0.2415rem 0.3623rem 90px;
      &:not(:last-child):before {
        z-index: 2;
        content: "";
        height: 0;
        display: block;
        border-bottom: 0.0242rem solid @defaultBorderColor;
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
      }
    }
    .info-line {
      padding: 0 10px;
      margin-top: 4px;
      font-size: 14px;
      height: 36px;
      line-height: 36px;
      border-bottom: 1px solid #e7e7e7;
      &.fee {
        justify-content: space-between;
        display: flex;
      }
      &:last-child {
        border-bottom: none;
      }
    }
    .info_sub_line {
      padding: 10px;
      text-align: right;
      font-size: 14px;
    }
  }
}
.icon-select {
  z-index: 1;
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  width: 1.0145rem;
  height: 100%;
  &:before {
    position: absolute;
    left: 50%;
    display: block;
    font-size: 0.5797rem;
    color: #d8d8d8;
    top: 50%;
    -webkit-transform: translate(-50%, -50%);
  }

  &.active {
    &:before {
      color: @activeColor;
    }
  }
}

.mall {
  .icon-select {
    left: 0;
    width: 1.0145rem;
    height: 100%;
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
    .name {
      font-weight: 600;
    }
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
      .minus_plus {
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
    }
    .info_sub_line {
      text-align: right;
      .m_action {
        color: @grayFontColor;
      }
    }
  }
  &.select {
  }
}
.priceJs {
  flex: 1;
  .font10;
  color: @activeColor;
  em {
    .font16;
  }
}
.fixBar {
  left: 0;
  right: 0;
  margin: 0 auto;
  max-width: 13.0435rem;
  height: 1.2077rem;
  background: hsla(0, 0%, 100%, 0.95);
  color: #333;
  font-size: 0.3382rem;
  position: fixed;
  z-index: 99;
  bottom: 0;

  .total {
    position: absolute;
    top: 0;
    right: 0;
    p {
      padding-top: 0.2415rem;
      font-weight: 700;
      line-height: 1em;
      height: 1.2077rem;
      text-align: right;
      float: left;
      font-size: 0.3865rem;
      strong {
        color: @activeColor;
      }
      .totalPrice {
        color: @activeColor;
      }
      small {
        padding-top: 0.0483rem;
        display: block;
        font-size: 0.2415rem;
        color: #999;
        font-weight: 400;
      }
    }
    .buy {
      float: right;
      display: block;
      width: 2.657rem;
      height: 1.2077rem;
      margin-left: 0.2415rem;
      line-height: 1.2077rem;
      font-size: 0.3865rem;
      text-align: center;
      // font-weight: 700;
      background: #e4393c;
      color: #fff;
      &.disabled{
        background: #666666;
      }
      em {
        font-weight: 400;
        font-size: 0.2899rem;
        font-family: none;
      }
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
