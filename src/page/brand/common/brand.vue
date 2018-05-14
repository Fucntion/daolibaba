<template>
  <router-link :to="'/brand/'+brand.id" class="brand"  v-if="brand.id">
    <div class="info">
      <img class="thumb" :src="brand.thumb||'http://placehold.it/100/ccc'" />
      <div class="base">
        <div class="name">{{brand.title}}</div>
        <div class="business">{{brand.keyword}}</div>
      </div>
    </div>
  </router-link>
</template>

<script>
    export default {
        name: "brand",
      data(){
          return {

          }
      },
      props:['brand']
    }
</script>

<style scoped lang='less'>
  @import "../../../assets/style/base.less";
  .brand{
    padding: 10px;
    border-bottom: 1px solid #e7e7e7;
  &:last-child{
   // border-bottom: none;
   }
  .info{
  .rest;
    display: flex;
    justify-content: space-between;
  .thumb{
    width: 66px;
    height: 66px;
  }
  .base{
    width: 100%;
    padding: 0 10px;

  .name{
    margin-bottom: 6px;
  .font14;
    color: #333333;

  }
  .business{
  .font12;
    margin-bottom: 6px;
  }
  .star-list{

  }
  }
  .link{
    width: 2.4155rem;
  .goto{
  .rest;
    width: 1.4493rem;
    height: 0.7246rem;
    color: white;
    text-align: center;
  // background: @activityColor;
  }

  }
  }
  .mall-list{
    margin-top: 6px;
    height: 100px;
    white-space: nowrap;
    overflow-y: hidden;
    overflow-x: scroll;
    -webkit-overflow-scrolling: touch;
  .mall{
    width: 72px;
    height: 100px;
    margin-right: 10px;

    display: inline-block;
    text-align: center;
  .thumb{

    width: 72px;
    height: 72px;
  }
  .price{
    display: block;
    text-align: left;
    line-height: 28px;
    color: @activeColor;
  }
  }
  }
  }
</style>
