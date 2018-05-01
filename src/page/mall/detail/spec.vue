<template>
  <div   class="specbox padding10-r">
      <div class="head padding10-c">
          <img :src="mall.thumb" class="thumb" />
          <div class="info">
              <div class="info-line padding10-c title font14">{{mall.title}}</div>
              <div class="info-line padding10-c title font14">库存{{stockTotal||mall.stockTotal}}件</div>
              <span v-if="selectMall.price" class="price">￥<em>{{selectMall.price|cutPrice(0)}}</em>{{selectMall.price|cutPrice(1)}}</span>
              <span v-else class="price">￥<em>{{mall.price|cutPrice(0)}}</em>{{mall.price|cutPrice(1)}}</span>
          </div>
          <i class="iconfont icon-close" @click="closeSpecBox"></i>
      </div>
      <div  class="specs padding10">
          <div class="info-line" v-for="(options,idx1) in selectConf" :key="idx1">
              <div class="label font14">{{options[0].title}}</div>
              <div class="btns">
                   <!-- selected -->
                  <mt-button
                    class="select font12"
                    v-for="(sku,idx2) in options"
                    :key="idx1+'-'+idx2"
                    @click="select(idx1,idx2)"
                    :class="{'selected':sku.isA,'disabled':sku.isD}"
                    size="small" plain>{{sku.val}}</mt-button>

              </div>

          </div>
          <div class="info-line">
              <div class="label font14">数量</div>
              <div class="btns">
                  <div class="minus_plus">
                        <div class="num_wrap">
                                   <span class="minus disabled" @click="subtract()">
                            <i class="iconfont icon-yidiandiantubiao11"></i>
                            </span>
                            <div class="input_wrap">
                                <input class="num" type="tel" v-model="num">
                            </div>
                             <span class="plus" @click="add()">
                                <i class="iconfont icon-plus"></i>
                            </span>

                        </div>
                    </div>
              </div>

          </div>


      </div>
      <div @click="confirm()" class="foot">确认</div>
  </div>
</template>
<script>
import {mapState, mapMutations} from 'vuex'
import {postOrder} from '../../../service/getData';
import cart from '../../../service/shopCart';
import {setStore,getStore} from "../../../util/utils";

export default {
  data() {
    return {
      num: 1,
      activeS: {},
      selectSpecs: [],
      mallInfo: null,
      stockTotal: 0,
      selectMall:{},
      malls: [] //还是用自己局部的会比较好
    };
  },
  props: ["mall",'type'],
  components: {},

  computed: {
    accordMall() {},
    selectConf() {
      var selectConf = JSON.parse(JSON.stringify(this.mall.specOptions));
      for (var key in selectConf) {
        selectConf[key].map(function(spec) {
          spec.isA = false;
          spec.isD = false;
          spec.isS = false;
        });
      }
      return selectConf
    },
  },

  watch: {

  },

  mounted() {

    this.malls = JSON.parse(JSON.stringify(this.mall.mall));
  },
  methods: {
    //add给购物车用的，SET给立即购买用的
    ...mapMutations([
          'ADD_ORDERINFO', 'SET_ORDERINFO'
      ]),
      confirm(){
          if(this.type=='buy'){
            this.toConfirmOrder()//单个商品订单
          }else{
            this.addToCard()//加入购物车
            this.closeSpecBox()
          }

      },
    addToCard(){

      if(!this.selectMall.id){
        this.$root.mint.alertMsg('请选择规格')
        return
      }

      if(this.num<1){
        this.$root.mint.alertMsg('请选择商品数量')
        return
      }
      let amount = this.num*this.selectMall.price
      if(isNaN(amount)||amount<0){
        this.$root.mint.alertMsg('商品总价计算错误')
        return
      }

      let max = 0;
      if(this.mall.group&&this.mall.group.limit>0){
        max = this.mall.group.limit
      }

      let mall = {
        mallid:this.selectMall.id,
        group:this.mall.group,
        max:max,
        min:0,
        goodsid:this.mall.id,
        title:this.mall.title,
        price:this.selectMall.price,
        thumb:this.mall.thumb,
        number:this.num,
        stock:this.selectMall.stock,
        specInfo:this.getMallSpecs(),
        fare:this.mall.fare,
        company:{
          company:this.mall.company.company,
          id:this.mall.company.user_id
        },
      };

      console.log(mall);

      cart.addProduct(mall);


    },
    getMallSpecs(){
      var str = '';
      this.selectSpecs.map((spec)=>{
        str += spec.title+':'+spec.val+' ';
      })
      return str;
    },

    //立即购买,其实就是模拟多个订单一样额。。不过是一个店铺一个店家而已。
    toConfirmOrder(){

      if(!this.selectMall.id){
        this.$root.mint.alertMsg('请选择规格')
        return
      }

      // if(this.selectSpecs.length<1||this.num<1){
      //   this.$root.mint.messagesBox('必须选择规格',true);
      //   return;
      // }

      this.closeSpecBox()

      let orderCompany = [];

      //把选中的放进去了
      let tempObj = {company:this.mall.company.company,seller_id:this.mall.company.user_id,malls:[]};

      let max = 0;
      if(this.mall.group&&this.mall.group.limit>0){
        max = this.mall.group.limit
      }

      let mall = {
        mallid:this.selectMall.id,
        goodsid:this.mall.id,
        group:this.mall.group,
        max:max,
        min:0,
        title:this.mall.title,
        price:this.selectMall.price,
        thumb:this.mall.thumb,
        number:this.num,
        stock:this.selectMall.stock,
        specInfo:this.getMallSpecs(),
        fare:this.mall.fare,
        company:{
          company:this.mall.company.company,
          id:this.mall.company.user_id
        },
      };


      tempObj.malls.push(mall)

      if(tempObj.malls.length>0){
        orderCompany.push(tempObj)
      }else{
        this.$root.mint.alertMsg('请选择商品');
        return ;
      }

      //会清空之前的支付页面的数据，不过没关系。购物车的不影响就是了
      setStore("ConfirmOrder","'"+JSON.stringify(orderCompany));
      this.$router.push({
        path:'/confirmOrder'
      })



      //存到vuex
      //这里传的是一个单数组
      // this.selectMall['selectSpec'] = this.selectSpecs;//给商品加规格信息
      // this.selectMall['number'] = this.num
      //
      // //公司名和id   产品数组=》【产品信息（商品价格，运费模板id，规格信息'，货品信息（id，缩略图，名字）】
      // this.SET_ORDERINFO({
      //   company:this.goods.company,
      //     goods:this.goods,
      //     malls:[this.selectMall]
      //   })
      //
      //
      // this.$router.push({
      //   path:'/confirmOrder'
      // })




    },
    selectSku:function() {
      var _self = this,
        tempArr = [],
        curVaL = this.selectSpecs

      this.malls.map(function(mall) {
        //遍历已经有的规则
        var accord = true
        curVaL.map(function(selectSpec) {

          mall.specs.map(function(specs) {
            // console.log(specs.title == selectSpec.title && specs.val != selectSpec.val)
            // 意味着这个商品是符合的
            if(specs.title == selectSpec.title && specs.val != selectSpec.val) {
                accord = false
            }
          });

        });
        if(accord){
          tempArr.push(mall)
        }
      });

      //计算库存
       _self.stockTotal = 0;
      tempArr.map(function(e){
        _self.stockTotal +=e.stock
      })

      //只剩最后一个了,修改价格
      if(tempArr.length==1){
          this.selectMall = tempArr[0]
      }
    },
    closeSpecBox: function() {
      this.$emit("close");
    },

    select: function(idx1, idx2) {
      console.log(idx1,idx2)

      var selectSpec = this.selectConf[idx1][idx2];
      this.selectConf[idx1].map(function(e) {
        if(e.val!=selectSpec.val)e.isA = false

      });

      selectSpec.isA = true; //修改active
      selectSpec.isS = true; //修改选中状态


      let isHasTitle = false;
      for (var i = 0; i < this.selectSpecs.length; i++) {
        if (this.selectSpecs[i].title == selectSpec.title) {
          isHasTitle = true;
          this.selectSpecs[i] = selectSpec;
        }
      }

      if (!isHasTitle) {
        this.selectSpecs.push(selectSpec);
      }

      this.selectSku()

      // this.selectSpecs.push(selectSpec)
      //把已经选择的spec放在一起
      // let tempStr = selectSpec.title+'---'+selectSpec.val
      // if(this.selectSpecs.join('').indexOf(tempStr.title)<0){
      //   this.selectSpecs.push(tempStr)
      // }
    },

    add: function() {

      if(!this.selectMall.id){
        this.$root.mint.alertMsg('请选择规格')
        return
      }

      if(this.mall.group&&this.num>this.mall.group.limit-1){
        this.$root.mint.alertMsg('已达到团购限购数量');
        return;
      }

      if(this.num<this.selectMall.stock){
          this.num++;
      }

    },
    subtract: function() {

      if(!this.selectMall.id){
        this.$root.mint.alertMsg('请选择规格')
        return
      }
      if(this.num==1){
        this.$root.mint.alertMsg('不能再少了');
      }
      if (this.num > 0) {
        this.num--;
      }
    }
  }
};
</script>
<style lang='less' scoped>
@import "../../../assets/style/base.less";
.minus_plus {
  margin-left: 6px;
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

.specs {
  .info-line {
    .label {
      margin-bottom: 4px;

      color: @grayFontColor;

      display: block;
    }
    .btns {
      flex: 1;
      .select {
        height: 24px;
        margin-right: 6px;
        border: 1px solid #999999;
        &.selected {
          border-color: @activeColor;
          color: @activeColor;
        }
        &.disabled {
          color: #d8d8d8;
          background: gray;
        }
      }
    }
  }
}
.foot {
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 43px;
  line-height: 43px;
  text-align: center;
  background: @activeColor;
  color: white;
}
.head {
  height: 80px;
  position: relative;
  .border-b;
  .thumb {
    position: absolute;
    width: 100px;
    height: 100px;
    left: 10px;
    bottom: 10px;
    border-radius: 4px;
  }
  .info {
    padding: 0 30px 0 110px;
  }
  .icon-close {
    position: absolute;
    right: 10px;
    top: 10px;
    font-size: 18px;
    // color: @activeColor;
  }
}
.specbox {
  background: white;
  position: fixed;
  width: 100%;
  box-sizing: border-box;
  bottom: 0;
  z-index: 100;
  height: 70%;
}
</style>
