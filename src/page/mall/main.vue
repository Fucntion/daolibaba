<!--  -->
<template>
  <div>
    <router-link to="/search" slot='logo' class="search-box" ><div class="input font14">搜索企业/商品</div><i class="iconfont icon-sousuo"></i></router-link>
      <ad-box :ads="ads" :h="200"></ad-box>
      <nav-box :navs="navs" >
        <router-link slot="all" to="/mall/category" class="item">
          <i class="iconfont icon-suoyou"></i>
          <span>所有分类</span>
        </router-link>
      </nav-box>

      <div class="margin10-r all-huoyuan">
        <router-link to="/club/top" class="all-mall" src="@/assets/img/pic/all-mall.jpg" ></router-link>
        <div class="brand2company">
          <router-link to="/store/top" class="company" src="@/assets/img/pic/top-company.jpg" ></router-link>
          <router-link to="/brand" class="brand" src="@/assets/img/pic/brand.jpg" ></router-link>
        </div>
      </div>
      <!--<slip-box title="秒杀" morelink="#">-->
          <!--<div slot="list"  class="list">-->
              <!--<div v-for="kill in kills" class="slip-item item">-->
                  <!--<img  class="thumb" :src="kill.thumb||'http://placehold.it/100/ccc'" />-->
                  <!--<div class="info">-->
                    <!--<span class="price font12">￥{{kill.price}}</span>-->
                    <!--<span class="initial_price font10">${{kill.marketprice}}</span>-->
                  <!--</div>-->
              <!--</div>-->
          <!--</div>-->
      <!--</slip-box>-->
      <slip-box class="margin10-r"  title="团购">
          <div slot="list"  class="list">
              <router-link style="padding-right:6px;" :to="'/mall/detail/'+group.goods.id" v-for="group in groups" class="slip-item item">
                  <img  class="thumb" :src="group.goods.thumb||'http://placehold.it/100/ccc'" />
                  <div class="info">
                    <span class="price font12">￥{{group.price}}</span>
                    <span class="initial_price font10">${{group.goods.price}}</span>
                  </div>
              </router-link>
          </div>
      </slip-box>

      <top-box adpid="14" catid="1039" title="鲜花绿植"></top-box>

    <top-box class="margin10-r" adpid="14" catid="1039" title="家用电器"></top-box>

    <top-box adpid="14" catid="1039" title="家居家装"></top-box>

    <top-box class="margin10-r" adpid="14" catid="1039" title="品质生活"></top-box>
      <!--<ad-box :ads="ads" :h="123"></ad-box>-->
      <slip-box   title="猜你喜欢">
          <div slot="list">
              <mall-list :lists="malls"></mall-list>
          </div>
      </slip-box>
      <foot-box active="home"></foot-box>

  </div>
</template>

<script>
import headBox from '../../components/head'
import footBox from '@/components/foot'
import adBox from '../../components/ad'
import navBox from '../../components/nav'
import slipBox from '@/components/slip'
import topBox from './common/top';
import {ad,category,kill,mall,group} from '../../service/getData'
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
      headBox,adBox,footBox,navBox,slipBox,mallList,topBox
  },

  computed: {},


  methods: {
    getAd(){

      ad({pid:14,size:3}).then((res) => {
          let body = res.body;
          if (body.code === 1) {
              this.ads = res.body.data
          }
      })

    },
    getNav(){
      let mise = category({
        moduleid:1,
        parentid:0,
        size:9
      })
      mise.then((res) => {
          let body = res.body;
          if (body.code === 1) {
              this.navs = res.body.data
          }
      })
    },
    // getKill(){
    //   /**
    //    * 获取秒杀列表
    //    * @param {栏目id} catid
    //    * @param {数量} size
    //    * @param {是否分页} paginate
    //    * @param {指定页数} page
    //    */
    //   let mise = kill(null,10)
    //   mise.then((res) => {
    //       let body = res.body;
    //       if (body.code === 1) {
    //           this.kills = res.body.data
    //       }
    //   })
    // },
    getGroup(){
      //别选错了
      let mise = group({
        with:'goods'
      })
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
    // this.getKill()
    this.getMall()
    this.getGroup()
  }
}

</script>

<style lang='less' scoped>
  .search-box{
    display: flex;
    position: absolute;
    top: 15px;
    left: 10%;
    width: 80%;
    box-sizing: border-box;
    padding: 0 10px;
    z-index: 3;
    height: 36px;
    line-height: 36px;
    opacity: 0.8;
    border-radius: 4px;
    background: white;
    .input{
      flex: 1;
      /*height: 28px;*/
      border-radius: 4px;
      border-radius: 4px;
    }
  }

.all-huoyuan{
   display: flex;
  .all-mall{
    flex: 1;
  }
  .brand2company{
    flex: 1;
  }
  .all-mall,.company,.brand{
    display: block;
    position: relative;
    background-repeat: no-repeat;
    background-size: cover;
    height: 0;

  }
  .all-mall{
    padding-top: 50%;
    background-image: url("https://daolibaba2018.oss-cn-shenzhen.aliyuncs.com/all-mall.jpg");
  }
  .company{
    padding-top: 50%;
    background-image: url("https://daolibaba2018.oss-cn-shenzhen.aliyuncs.com/top-company.jpg");
  }
  .brand{
    padding-top: 50%;
    background-image: url("https://daolibaba2018.oss-cn-shenzhen.aliyuncs.com/brand.jpg");
  }


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
  .icon-suoyou{
    display: inline-block;
    box-sizing: border-box;
    width: 40px;
    height: 40px;
    text-align: center;
    line-height: 40px;
    font-size: 26px;
  }
</style>
