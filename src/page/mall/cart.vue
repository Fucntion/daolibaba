<!--  -->
<template>
  <div>
      <head-box :goBack="true"  head-title="购物车"></head-box>

      <div class="cartbox" v-if="total.totalNumber>1||selectAll">
            <div class="control"><mt-button size="small" @click="delMall('all')" >全部删除</mt-button></div>
            <div class="section" v-for="(company,index) in companyList" :key="index">
                <div  class="head">
                    <i class="iconfont icon-select icon-select" :class="{'active':company.select}" @click="selectCompany(company)"></i>
                    <i class="iconfont icon-shangjia"></i>
                    <router-link :to="'/compay/'+company.id"  class="company">{{company.title}}</router-link>
                    <i class="iconfont icon-previewright"></i>
                </div>
                <div class="mall selected" v-for="(mall,idx) in company.malls">
                    <i class="iconfont icon-select icon-select" :class="{'active':mall.select}" @click="selectMall(mall,company)"></i>
                    <img class="thumb" :src="mall.thumb" />
                    <div class="info" >
                        <div class="name">
                            <span class="font14" >{{mall.title}}</span>
                        </div>
                        <div class="info_line specinfo">
                           <span class="font12">已选:{{mall.specInfo}}</span>
                        </div>
                        <div class="info_line specinfo">
                           <span class="font12">库存{{mall.stock}}</span>
                        </div>
                        <div class="info_line">
                            <p class="price"><span class="priceJs" >¥ <em class="int">{{mall.price|cutPrice(0)}}</em>{{mall.price|cutPrice(1)}}</span></p>
                            <div class="minus_plus">
                                <div class="num_wrap">
                                    <span class="plus" @click="subtract(mall)">
                                        <i class="iconfont icon-yidiandiantubiao11"></i>
                                    </span>
                                    <div class="input_wrap">
                                        <input class="num" type="tel" v-model="mall.number">
                                    </div>
                                    <span class="minus" @click="add(mall)">
                                    <i class="iconfont icon-plus"></i>
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div class="info_sub_line">
                            <div class="m_action">
                                <span @click="delMall(mall.mallid)" class="m_action_item font12"  issuit="">删除</span>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

      </div>
      <div  style="height:1.2077rem;"></div>
      <div v-if="total.totalNumber>0||selectAll" class="fixBar">
          <!-- <i class="iconfont icon-select" @click="selectMall('all')" :class="{'active':selectAll}">全选</i> -->
          <div class="total">
              <p>总计：
                  <strong id="totalPrice">¥{{total.totalAmount}}</strong>
                  <small><span id="totalBackMoney">总额¥{{total.totalAmount}}元 立减¥0元 </span></small>
                  <!-- 立减¥179.52 -->
              </p>
              <div @click="toOrder()" class="buy buyJs" >去结算
                  <em  id="totalNum">({{total.totalNumber}}件)</em>
              </div>
          </div>

      </div>
      <router-link :to="'/'" class="empty" v-if="total.totalNumber<1&&!selectAll" >
        <i class="iconfont icon-meiyoudingdan-01"></i>
        <div class="title">购物车饿扁了,快去选购吧</div>
      </router-link>

      <foot-box active="cart"></foot-box>
  </div>
</template>

<script>
import headBox from "@/components/head";
import footBox from "@/components/foot";
import cart from '../../service/shopCart';
import {setStore,getStore} from '../../util/utils';
import { ad, category, kill, mall, group } from "@/service/getData";

export default {
  data() {
    return {
      totalPrice: 0,
      animatenum: 0,
      control:false,
      base:cart.orderdetail,
      companyList:[],
      compute:false

    };
  },

  components: {
    headBox,
    footBox
  },

  computed: {

    selectAll:function(){
      if(this.companyList.length<1){
        return false;
      }

      let rt =true,temp =this.companyList[0].malls[0].select

      this.companyList.map(function(company){

          company.malls.map(mall=>{
            if(mall.select!=temp){
             rt = false
            }
          })
        })
        return rt
    },
    total:function(){

        let totalNumber = 0,totalAmount = 0;
        this.companyList.map(function(company){
          company.malls.map(mall=>{
            if(mall.select){
              totalNumber+=mall.number;
              totalAmount+=parseInt(mall.number)*parseFloat(mall.price);
            }
          })
        })

        return {totalNumber:totalNumber,totalAmount:parseInt(totalAmount*100)/100}

    },
    //计算总金额
    toComput2: function() {
      var vm = this;
      //每次进来要重置总金额
      vm.totalPrice = 0;
      this.message.forEach(function(mess) {
        vm.totalPrice += parseInt(mess.price * mess.quantity);
      });
      return this.totalPrice;
    }
  },
  mounted: function() {
    // this.tween("97000", "0");
  },
  created(){
    this.INIT()
  },
  methods: {

    toOrder:function(){
        let orderCompany = [];
        //把选中的放进去了
        this.companyList.map(function(company){
          let tempObj = {company:company.title,id:company.id,malls:[]}
          company.malls.map(function(mall){
            if(mall.select){
              tempObj.malls.push(mall)
            }
          })
          if(tempObj.malls.length>0){
            orderCompany.push(tempObj)
          }
        })

        //存起来哦
        setStore("ConfirmOrder","'"+JSON.stringify(orderCompany));
        this.$router.push({
          path:'/confirmOrder'
        })
    },
    INIT(){
      this.companyList = cart.getProductList()||[]
    },
    delMall(mallid){
      if(mallid=='all')mallid=null
      cart.clearProduct(mallid)
      this.INIT()//存在localstorage里面没法监听改变，只能手动init了
    },
    selectCompany(company){
      let _self = this;
      company.select = !company.select

      company.malls.map(function(mall){
        _self.selectMall(mall,company,company.select)
      })
    },
    selectMall(mall,company,status){

      if(mall=='all'){

        let rt = this.selectAll
        this.companyList.map(function(company){
          company.select = !rt
          company.malls.map(mall=>{
            mall.select =!rt
          })
        })
        this.control = !this.control
        return
      }


      mall.select = status?status:!mall.select

      let allMallSelect = true
      company.malls.map(function(mall){
          if(!mall.select)allMallSelect=false
      })
      if(!allMallSelect){
        company.select = false
      }else{
        company.select = true
      }


    },

    add: function(mall) {
      if(mall.number<mall.stock)mall.number++

      //把加减情况同步到本地啊
      cart.updateProductNum(mall.mallid,mall.number)
    },
    subtract: function(mall) {
      if(mall.number>1){
        mall.number--;
         //把加减情况同步到本地啊
        cart.updateProductNum(mall.mallid,mall.number)
        return ;
      };
      if(mall.number==1){
        this.$root.mint.confirm('是否要移除该商品?').then(action => {
          cart.clearProduct(mall.mallid)
        }).catch(action=>{});
        return;
      }

      // var vm = this;
      // vm.message[index].quantity--;
      // if (vm.message[index].quantity <= 0) {
      //   if (confirm("你确定移除该商品？")) {
      //     vm.message.splice(index, 1);
      //   }
      // }
    },
    remove: function(index) {
      var vm = this;
      if (confirm("你确定移除该商品？")) {
        vm.message.splice(index, 1);
      }
    },
    empty: function() {
      var vm = this;
      vm.message.splice(0, vm.message.length);
    },
    jia: function(index) {
      var vm = this;
      vm.arr[index].one++;
    },
    tween: function(newValue, oldValue) {
      var vm = this;
      var twen = new TWEEN.Tween({ animatenum: oldValue });
      function animate() {
        requestAnimationFrame(animate);
        TWEEN.update();
      }
      twen.to({ animatenum: newValue }, 750);
      twen.onUpdate(function() {
        //toFixed();保留几位小数
        vm.animatenum = this.animatenum.toFixed();
      });
      twen.start();
      animate();
    }
  }
};
</script>
<style lang='less' scoped>
@import "../../assets/style/base.less";
.cartbox {
  position: relative;
  .control{
    padding: 0 10px;
   background: white;
   border-bottom: 1px solid #e7e7e7;
    box-sizing: border-box;
    height: 44px;
    z-index: 2;
    text-align: right;
    line-height: 44px;

    button{
      font-size: 12px;
      height: 26px;
      background: none;
      border:1px solid @activeColor;
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
      padding: 0.2415rem 0.2415rem 0.2415rem 1.0145rem;
      // min-height: 1.087rem;
      height: 1.2077rem;
      z-index: 1;
      border-bottom: 0.0242rem solid @defaultBorderColor;
      .company {
        color: #333333;
        font-weight: 600;
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
      padding: 0.2899rem 0.2415rem 0.3623rem 3.0918rem;
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
    left: 1.0386rem;
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
      &.specinfo{
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
  bottom: 1.3043rem;
  .icon-select {
    width: 0.9662rem;
    padding-top: 0.7729rem;
    font-size: 0.2415rem;
    text-align: center;
    height: 0.3623rem;
    color: #999;
    &:before {
      top: 0.3865rem;
    }
  }
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
      font-weight: 700;
      background: #e4393c;
      color: #fff;
      em {
        font-weight: 400;
        font-size: 0.2899rem;
        font-family: none;
      }
    }
  }
}


.empty{
  text-align: center;
  display: block;
  color: #666666;
  .iconfont{
    font-size: 44px;

  }
  .title{
    padding: 20px 0;

  }
}
</style>
