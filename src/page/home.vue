<!--  -->
<template>
  <div>
      <head-box head-title="岛里巴巴">
        <span slot='logo' class="head_logo" ><i class="iconfont icon-sousuo"></i></span>
      </head-box>
      <ad-box :ads="ads"></ad-box>
      <nav-box :navs="navs"></nav-box>
      <div class="margin10-r banner-all-huoyuan"></div>
      <slip-box  title="秒杀" morelink="#">
          <div slot="list"  class="list">
              <div v-for="kill in kills" class="slip-item item">
                  <img  class="thumb" :src="kill.thumb||'http://placehold.it/100/ccc'" />
                  <div class="info">
                    <span class="price font12">￥{{kill.price}}</span>
                    <span class="initial_price font12">${{kill.marketprice}}</span>
                  </div>
              </div>
          </div>
      </slip-box>
      <mall-list class="margin10-r" :lists="malls"></mall-list>
      <foot-box></foot-box>
  </div>
</template>

<script>
import headBox from '@/components/head'
import footBox from '@/components/foot'
import adBox from '@/components/ad'
import navBox from '@/components/nav'
import slipBox from '@/components/slip'
import {ad,category,kill,mall} from '@/service/getData'

import mallList from './mall/components/list'
export default {
  data () {
    return {
      ads:[],
      navs:[],
      kills:[],
      malls:[]
    }; 
  },

  components: {
      headBox,adBox,footBox,navBox,slipBox,mallList
  },

  computed: {},


  methods: {
    getAd(){
      
      let mise = ad(14)
      mise.then((res) => {
          let body = res.body;
          if (body.code === 1) {
              this.ads = res.body.data
          }
      })

    },
    getNav(){
      let mise = category(1,0)
      mise.then((res) => {
          let body = res.body;
          if (body.code === 1) {
              this.navs = res.body.data
          }
      })
    },
    getKill(){
      /**
       * 获取秒杀列表
       * @param {栏目id} catid 
       * @param {数量} size 
       * @param {是否分页} paginate 
       * @param {指定页数} page 
       */
      let mise = kill(null,10)
      mise.then((res) => {
          let body = res.body;
          if (body.code === 1) {
              this.kills = res.body.data
          }
      })
    },
    getMall(){
      let mise = mall(null,20,true)
      mise.then((res) => {
          let body = res.body;
          if (body.code === 1) {
              this.malls = res.body.data.data
          }
      })
    }
      
      
      
  },
  created(){
    this.getAd()
    this.getNav()
    this.getKill()
    this.getMall()
  }
}

</script>
<style lang='less' scoped>
.banner-all-huoyuan{
    background-image: url(https://daolibaba.oss-cn-shanghai.aliyuncs.com/static/img/233922F0-B469-457C-B5B8-A4BEEC32C50F.png);
    width: 100%;
    height: 0;
    padding-top: 15%;
    background-size: cover;
    background-position: center;
}

</style>