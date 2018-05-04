<template>
 <div>
    <head-box head-title="商品管理"  go-back="true"></head-box>


      <div class="mall" >

        <mt-swipe id="picbox" :auto="5000" >
          <mt-swipe-item v-if="mall.thumb"><img class="thumb" :src="mall.thumb"/></mt-swipe-item>
          <mt-swipe-item v-if="mall.pic1"><img class="thumb" :src="mall.pic1"/></mt-swipe-item>
          <mt-swipe-item v-if="mall.pic2"><img class="thumb" :src="mall.pic2"/></mt-swipe-item>
          <mt-swipe-item v-if="mall.pic3"><img class="thumb" :src="mall.pic3"/></mt-swipe-item>
          <mt-swipe-item v-if="mall.pic4"><img class="thumb" :src="mall.pic4"/></mt-swipe-item>
        </mt-swipe>

        <div class="block margin10-r padding10">
          <div class="head">
            <div class="tip">整体参数</div>
          </div>
          <div class="content skus">
            <div class="sku">
              <div class="">
                总库存{{mall.stockTotal}} 访问量{{mall.hits}} 总销量{{mall.sales}}
              </div>

            </div>
          </div>
        </div>

        <div class="block padding10">
          <div class="head">
            <div class="tip">商品规格</div>
          </div>
          <div class="content skus">
            <div class="sku">
              <div class="spec">
                属性
              </div>
              <div>价格</div>
              <div class="stock">库存</div>
              <div class="stock">销量</div>
            </div>
            <div class="sku" v-for="(sku,idx1) in mall.mall" :key="idx1">
              <div class="spec">
                <p class="font12" v-for="(spec,idx2) in sku.specs">{{spec.title}}:{{spec.val}};</p>
              </div>
              <div class="price">￥{{sku.price}}</div>
              <div class="stock">{{sku.stock}}{{mall.unit}}</div>
              <div class="stock">{{sku.sales}}{{mall.unit}}</div>
            </div>
          </div>
        </div>

      </div>


 </div>
</template>
<script>
  import headBox from '../../../components/head';

  import {selerMall} from "../../../service/getData";

  export default {
    data () {
      return {
        mall:{},
      };
    },

    components: {headBox},
    mounted(){
      this.$nextTick(function () {
        var box = document.getElementById("picbox"),
          docwidth = window.screen.width + "px";

        box.style.height = docwidth;
        box.style.width = docwidth;
      });
    },
    computed: {},

    created(){
      this.getMall()
    },
    methods: {
      getMall(){
        selerMall({
          id:this.$route.params.id
        }).then(res=>{
          if(res.body.code==1){
            this.mall = res.body.data

          }
        })
      }
    }
  }

</script>
<style lang='less' scoped>
.mall{
  .skus{
    .sku{
      display: flex;
      font-size: 14px;
      padding: 10px 0;
      border-bottom: 1px solid #e7e7e7;
      &:last-child{
        border-bottom: none;
      }
      .spec{
        flex: 1;
        font-size: 12px;
        color: #666666;
        p{
          margin-top: 6px;
        }
      }
      .price{
        width: 60px;
        text-align: center;
      }
      .stock{
        width: 100px;
        text-align: center;
      }
    }
  }
}

</style>
