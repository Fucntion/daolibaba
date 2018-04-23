<template>
  <div class="groupBox">
    <div class="price">￥<em>{{mall.group.price|cutPrice(0)}}</em>{{mall.group.price|cutPrice(1)}}</div>
    <div class="totalStock">
      <div class="stock">{{mall.group.sales}}件已售</div>
      <div class="oldprice">￥{{mall.price}}</div>
    </div>
    <div class="timer" v-if="now>start_time">
      <div class="tip"><i class="iconfont icon-icon-"></i>
        <span >距离结束仅剩</span></div>
      <span class="timerbox"><em class="h">{{toend.h}}</em>:<em class="m">{{toend.m}}</em>:<em class="s">{{toend.s}}</em>:<em class="ss">{{toend.ss}}</em></span>
    </div>
    <div class="timer" v-else>
      <div class="tip"><i class="iconfont icon-icon-"></i>
        <span >距离开团仅剩</span></div>
      <span class="timerbox"><em class="h">{{toend.h}}</em>:<em class="m">{{toend.m}}</em>:<em class="s">{{toend.s}}</em>:<em class="ss">{{toend.ss}}</em></span>
    </div>
  </div>
</template>

<script>
  import {formatDuring} from '../../../util/utils';
  export default {
    name: "timer",
    data() {
      return {
        now:null
      }
    },
    props:[ 'start_time', 'end_time','mall'],
    computed:{

        toend(){

          if(this.now>this.end_time-1) return 0;
          return formatDuring(this.end_time-this.now);
        },
      tostart(){

          if(this.now>this.start_time-1) return 0;

        return formatDuring(this.start_time-this.now);

      }
    },
    created(){
      let self = this
      this. now =  (new Date()).valueOf()

        setInterval(function(){
          self.now = (new Date()).valueOf();

        },100)
    },
    methods: {

      }
  }

</script>
<style lang="less" scoped>
  .groupBox{
    height: 54px;
    background: #fa215f;
    display: flex;
    color: white;
    .price{
      color: white;
      padding: 0 10px;
      font-size: 20px;
      font-weight: bold;
      line-height: 54px;
      em {
        font-size: 28px;
      }
    }
    .totalStock{
      font-size: 14px;
      flex:1;
      padding: 10px;
      height: 34px;
      .stock{
        line-height: 16px;
      }
      .oldprice{
        font-size: 12px;
        line-height: 16px;
        text-decoration: line-through;
      }
    }
    .timer{
      width: 100px;
      padding: 4px 10px;
      font-size: 12px;
      text-align: center;
      .tip{
        height: 20px;
        line-height: 20px;
        .iconfont{
          font-size: 18px;
        }
      }
      .timerbox{
        display: inline-block;
        margin-top: 4px;

        em{
          margin:0 2px;
          background: #ff9500;
          padding: 0 2px;
        }
      }


    }
  }

</style>
