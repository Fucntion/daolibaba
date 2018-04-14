<template>
  <div class="specbox padding10-r">
      <div class="head padding10-c">
          <img :src="mall.thumb" class="thumb" />
          <div class="info">
              <div class="info-line padding10-c title font14">{{mall.title}}</div>
               <span class="price">￥<em>{{mall.price|cutPrice(0)}}</em>{{mall.price|cutPrice(1)}}</span>
          </div>
          <i class="iconfont icon-close"></i>
      </div>
      <div  class="specs padding10">
          <div class="info-line" v-for="(spec,idx1) in specs" :key="idx1">
              <div class="label font14">{{spec.label}}</div>
              <div class="btns">
                   <!-- selected -->
                  <mt-button v-for="(sku,idx2) in spec.skus" :key="idx2" @onclick="select(idx,idx2)" class="select font12" size="small" plain>{{sku}}</mt-button>
                  
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
      <div class="foot">确认</div>
  </div>
</template>
<script>
export default {
  data() {
    return {
    num:1,
    specs: [
        {
          label: "颜色",
          skus: [
            {name:"红色",sku_id:666},
            {name:"蓝色",sku_id:666},
            {name:"白色",sku_id:666},
            {name:"蓝色",sku_id:666},
            {name:"红色",sku_id:666},
            {name:"蓝色",sku_id:666},
            {name:"白色",sku_id:666},
            {name:"蓝色",sku_id:666},
            {name:"青色",sku_id:666},
            {name:"紫色",sku_id:666}
          ]
        },
        {
          label: "尺码",
          skus: [170, 175, 180, 190, 165]
        }
      ]
    };
  },
  props: ["mall"],
  components: {},

  computed: {},

  methods: {
      select:function(){

      },
      add: function() {
      this.num++;
    },
    subtract: function() {

      if (this.num >0) {
        this.num--
      }
    },
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
    display: flex;

    .label {
      width: 40px;
      margin-bottom: 4px;
      line-height: 30px;
      color: @grayFontColor;
      text-align: center;
    }
    .btns {
      flex: 1;
      line-height: 30px;
      .select {
        height: 24px;
        margin-left: 6px;
        border: 1px solid #999999;
        &.selected {
            border-color: @activeColor;
            color: @activeColor;
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