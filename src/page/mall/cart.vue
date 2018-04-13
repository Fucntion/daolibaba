<!--  -->
<template>
  <div>
      <head-box head-title="购物车"></head-box>
      
      <div class="cartbox">
            <div class="section" v-for="(cart,index) in carts">
                <div class="head">
                    <i class="iconfont icon-select icon-select active"></i>
                    <i class="iconfont icon-shangjia"></i>
                    <span class="company">{{cart.popInfo.company}}</span>
                    <i class="iconfont icon-previewright"></i>
                </div>
                <div class="mall selected" v-for="(mall,idx) in cart.products">
                    <i class="iconfont icon-select icon-select"></i>
                    <img class="thumb" :src="mall.thumb" />
                    <div class="info" >                 
                        <div class="name">                                                                                    
                            <span class="font14" >{{mall.title}}</span>          
                        </div>                                  
                        <div class="info_line">                                          
                            <p class="price"><span class="priceJs" >¥ <em class="int">{{mall.price|cutPrice(0)}}</em>{{mall.price|cutPrice(1)}}</span></p>              
                            <div class="minus_plus">
                                <div class="num_wrap">  
                                    <span class="plus" @click="add(index,idx)">
                                        <i class="iconfont icon-yidiandiantubiao11"></i>      
                                    </span>                            
                                                              
                                    <div class="input_wrap">
                                        <input class="num" type="tel" v-model="mall.quantity">
                                    </div>                           
                                    <span class="minus disabled" @click="subtract(index,idx)">
                                    <i class="iconfont icon-plus"></i>    
                                    </span> 
                                </div>                     
                            </div>                                      
                        </div>                                      
                        <div class="info_sub_line">                      
                            <div class="m_action">                                    
                                <span class="m_action_item font12"  issuit="">删除</span>                         
                            </div>                     
                        </div>                                                       
                                                  
                    </div>
                </div>
            </div>
            
      </div>
      <div style="height:1.2077rem;"></div>
        <div class="fixBar">
            <i class="iconfont icon-select active">全选</i>
            <div class="total">
                <p>总计：
                    <strong id="totalPrice">¥6587.78</strong>
                    <small><span id="totalBackMoney">总额¥6767.30 立减¥179.52</span></small>
                </p>
                <div class="buy buyJs" >去结算
                    <em  id="totalNum" totalnum="39">(39件)</em>
                </div>
            </div>
            
        </div>

      <!-- <div class="container">
        <table class="table">
            <thead>
                <tr>
                    <th>产品编号</th>
                    <th>产品名字</th>
                    <th>购买数量</th>
                    <th>产品单价</th>
                    <th>产品总价</th>
                    <th>操作</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item , index) in message">
                    <td @click="jia(index)">{{item.id}}</td>
                    <td>{{item.name}}</td>
                    <td>
                        <button type="button" class="btn tn-primary" @click="subtract(index)">-</button>
                        <input type="text" v-model="item.quantity">
                        <button type="button" class="btn tn-primary" @click="add(index)">+</button>
                    </td>
                    <td>{{item.price | filtermoney}}</td>
                    <td>{{item.price*item.quantity | filtermoney}}</td>
                    <td>
                        <button type="button" class="btn btn-danger" @click="remove(index)">移除</button>
                    </td>
                </tr>
                <tr>
                    <td>总购买价            
                    </td>
                    <td>
                        {{animatenum | filtermoney}}
                    </td>
                    <td>总购买数量
                    </td>
                    <td>

                    </td>
                    <td colspan="2">
                        <button type="button" class="btn btn-danger" @click="empty()">清空购物车</button>
                    </td>
                </tr>
            </tbody>
        </table>

        <p v-if="message.length===0">购物车空空如也，去逛逛吧~</p>
    </div> -->

      <foot-box active="cart"></foot-box>
  </div>
</template>

<script>
import headBox from "@/components/head";
import footBox from "@/components/foot";

import { ad, category, kill, mall, group } from "@/service/getData";

export default {
  data() {
    return {
      totalPrice: 0,
      animatenum: 0,
      carts: [
        {
          popInfo: {
            id: "18226",
            company: "11111111有限公司"
          },
          products: [
            {
              id: 7758,
              title:
                "墙彩 中国风上善若水贴纸花卉荷花墙纸温馨客厅墙上贴花房间装饰品卧室壁纸自粘",
              thumb:
                "http://o2o.qingclouds.cn/file/upload/201804/06/094500621.jpg",
              quantity: 4,
              price: 700.01
            },
            {
              id: 2017,
              title:
                "墙彩 中国风上善若水贴纸花卉荷花墙纸温馨客厅墙上贴花房间装饰品卧室壁纸自粘",
              thumb:
                "http://o2o.qingclouds.cn/file/upload/201804/06/094500621.jpg",
              quantity: 5,
              price: 600
            }
          ]
        },
        {
          popInfo: {
            id: "18226",
            company: "222222222有限公司"
          },
          products: [
            {
              id: 7,
              title:
                "墙彩 中国风上善若水贴纸花卉荷花墙纸温馨客厅墙上贴花房间装饰品卧室壁纸自粘",
              thumb:
                "http://o2o.qingclouds.cn/file/upload/201804/06/094500621.jpg",
              quantity: 3,
              price: 400
            },
            {
              id: 1340,
              title:
                "墙彩 中国风上善若水贴纸花卉荷花墙纸温馨客厅墙上贴花房间装饰品卧室壁纸自粘",
              thumb:
                "http://o2o.qingclouds.cn/file/upload/201804/06/094500621.jpg",
              quantity: 9,
              price: 300
            }
          ]
        },

        {
          popInfo: {
            id: "182226",
            company: "333333333有限公司"
          },
          products: [
            {
              id: 23211,
              title:
                "墙彩 中国风上善若水贴纸花卉荷花墙纸温馨客厅墙上贴花房间装饰品卧室壁纸自粘",
              thumb:
                "http://o2o.qingclouds.cn/file/upload/201804/06/094500621.jpg",
              quantity: 3,
              price: 400
            },
            {
              id: 231231,
              title:
                "墙彩 中国风上善若水贴纸花卉荷花墙纸温馨客厅墙上贴花房间装饰品卧室壁纸自粘",
              thumb:
                "http://o2o.qingclouds.cn/file/upload/201804/06/094500621.jpg",
              quantity: 9,
              price: 300
            }
          ]
        }
      ]
    };
  },

  components: {
    headBox,
    footBox
  },

  computed: {
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
    this.tween("97000", "0");
  },
  methods: {
    //计算总数的方法为什么写在methods里面就不行？
    toComput: function() {
      var vm = this;
      vm.message.forEach(function(mess) {
        vm.totalPrice += parseInt(mess.price * mess.quantity);
      });
      return vm.totalPrice;
    },
    add: function(index) {
      var vm = this;
      vm.message[index].quantity++;
    },
    subtract: function(index) {
      var vm = this;
      vm.message[index].quantity--;
      if (vm.message[index].quantity <= 0) {
        if (confirm("你确定移除该商品？")) {
          vm.message.splice(index, 1);
        }
      }
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
</style>