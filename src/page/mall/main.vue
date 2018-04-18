<!--  -->
<template>
  <div>
      <head-box head-title="岛里巴巴" signinUp="true">
        <span slot='logo' class="head_logo" ><i class="iconfont icon-sousuo"></i></span>
      </head-box>
      <ad-box :ads="ads" :h="200"></ad-box>
      <nav-box :navs="navs"></nav-box>
      <div class="margin10-r banner-all-huoyuan"></div>
      <slip-box title="秒杀" morelink="#">
          <div slot="list"  class="list">
              <div v-for="kill in kills" class="slip-item item">
                  <img  class="thumb" :src="kill.thumb||'http://placehold.it/100/ccc'" />
                  <div class="info">
                    <span class="price font12">￥{{kill.price}}</span>
                    <span class="initial_price font10">${{kill.marketprice}}</span>
                  </div>
              </div>
          </div>
      </slip-box>
      <slip-box class="margin10-r"  title="团购" morelink="#">
          <div slot="list"  class="list">
              <div v-for="kill in groups" class="slip-item item">
                  <img  class="thumb" :src="kill.thumb||'http://placehold.it/100/ccc'" />
                  <div class="info">
                    <span class="price font12">￥{{kill.price}}</span>
                    <span class="initial_price font10">${{kill.marketprice}}</span>
                  </div>
              </div>
          </div>
      </slip-box>
      <ad-box :ads="ads" :h="123"></ad-box>
      <slip-box class="margin10-r"  title="猜你喜欢">
          <div slot="list">
              <mall-list :lists="malls"></mall-list>
          </div>
      </slip-box>

      <foot-box active="home"></foot-box>

     
  </div>
</template>

<script>
import headBox from '@/components/head'
import footBox from '@/components/foot'
import adBox from '@/components/ad'
import navBox from '@/components/nav'
import slipBox from '@/components/slip'
import {ad,category,kill,mall,group} from '@/service/getData'
import mallList from './common/list'

export default {
  data () {
    return {
      ads:[],
      navs:[],
      kills:[],
      malls:[],
      groups:[]
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
    getGroup(){
      let mise = group(null,10)
      mise.then((res) => {
          let body = res.body;
          if (body.code === 1) {
              this.groups = res.body.data
          }
      })
    },
    getMall(){
      let mise = mall({
        catid:null,
        size:20,
        field:null,
        order:null,
        paginate:true,
        page:null
      })
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
    this.getGroup()
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
.router-slid-enter-active,
.router-slid-leave-active {
  transition: all 0.4s;
}
.router-slid-enter,
.router-slid-leave-active {
  transform: translate3d(2rem, 0, 0);
  opacity: 0;
}
</style>