<template>
  <div class="block">
    <div class="head">
      <div class="title">{{title}}</div>
    </div>
    <div class="content">
      <div class="slide margin10-c">
        <mt-swipe class="top-swipe" style="height: 150px"  :auto="5000">
          <mt-swipe-item class="top" v-for="ad in ads" :key="ad.aid">
            <a class="link" :href="ad.image_url"><img  :src="ad.image_src" /></a>
          </mt-swipe-item>
        </mt-swipe>
      </div>

      <div class="top-list-box margin10-c padding10-r">
        <router-link style="padding-right:6px;" :to="'/mall/detail/'+good.id" v-for="good in malls" class="top-item item">
          <img  class="thumb" :src="good.thumb||'http://placehold.it/100/ccc'" />

          <div class="info">
            <div class="title font14">{{good.title|cutstr(8)}}..</div>
            <div class="price font14 padding10-r">￥{{good.price}}</div>
            <!--<span class="initial_price font10">￥{{good.marketprice}}</span>-->
          </div>
        </router-link>
        <router-link style="padding-right:6px;" :to="'/mall/detail/'+good.id" v-for="good in malls" class="top-item item">
          <img  class="thumb" :src="good.thumb||'http://placehold.it/100/ccc'" />

          <div class="info">
            <div class="title font14">{{good.title|cutstr(8)}}..</div>
            <div class="price font14 padding10-r">￥{{good.price}}</div>
            <!--<span class="initial_price font10">￥{{good.marketprice}}</span>-->
          </div>
        </router-link>

      </div>
    </div>
  </div>
</template>

<script>
  import {ad,mall} from "../../../service/getData";

  export default {
        name: "top",
      props:['adpid','catid','title'],
    data(){
          return {
            ads:[],
            malls:[]
          }
    },created(){
      this.getMall();
      this.getAd();
    },
    methods:{
      getAd(){

        ad({pid:this.adpid,size:5}).then((res) => {
          let body = res.body;
          if (body.code === 1) {
            this.ads = res.body.data
          }
        })

      },
      getMall(){
        mall({
          type_id:this.catid,
          size:10,
          field:'title,price,thumb,id,marketprice',
          order:'hits desc',
        }).then((res) => {
          let body = res.body;
          if (body.code === 1) {
            this.malls = res.body.data
          }
        })
      }
    }
    }
</script>

<style lang="less" scoped>
.top-list-box{
  overflow-y: hidden;
  overflow-x: scroll;
  white-space: nowrap;
  .item{
    display: inline-block;
    .thumb{
      width: 150px;
    }
  }
}

</style>
