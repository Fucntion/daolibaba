<!--  -->
<template>
  <div>
    <head-box head-title="同城购物" :fixed="1">
      <router-link
        to="/club/area"
        slot='search' class="font12">
        <i class="iconfont icon-address"></i>{{city.name}}
      </router-link>
      <span slot='edit' class="search">
                <i class="iconfont icon-sousuo"></i>
            </span>
    </head-box>

    <ad-box :ads="ads" :h="123"></ad-box>
    <section class="nav">
      <router-link :to="'/club/'+club.id" v-for="club in navs" :key="club.id" class="item">
        <img :src="club.thumb||'http://placehold.it/100/ccc'"/>
        <span>{{club.title}}</span>
      </router-link>

      <router-link slot="all" :to="{path:'/club/list',query:{city_id:this.city.id}}" class="item">
        <i class="iconfont icon-suoyou"></i>
        <span>所有商圈</span>
      </router-link>

    </section>
    <!--<slip-box title="秒杀" morelink="#">-->
    <!--<div slot="list" class="list">-->
    <!--<div v-for="kill in kills" class="slip-item item">-->
    <!--<img class="thumb" :src="kill.thumb||'http://placehold.it/100/ccc'"/>-->
    <!--<div class="info">-->
    <!--<span class="price font12">￥{{kill.price}}</span>-->
    <!--<span class="initial_price font10">${{kill.marketprice}}</span>-->
    <!--</div>-->
    <!--</div>-->
    <!--</div>-->
    <!--</slip-box>-->
    <slip-box class="margin10-r" title="新品推荐">
      <div slot="list" class="list">
        <div v-for="kill in topMalls" class="slip-item item">
          <img class="thumb" :src="kill.thumb||'http://placehold.it/100/ccc'"/>
          <div class="info">
            <span class="price font12">￥{{kill.price}}</span>
            <span class="initial_price font10">${{kill.marketprice}}</span>
          </div>
        </div>
      </div>
    </slip-box>

    <div class="block">
      <div class="head">
        <div class="title"> 必逛</div>
      </div>
      <div class="content">
        <div class="row1 row">
          <div class="item" style="border-right:1px solid white;">
            <p class="name">手机平板</p>
            <span class="small">手机通讯</span>
            <img class="thumb"
                 src="https://daolibaba.oss-cn-shanghai.aliyuncs.com/static/img/13189890-C369-4E47-A1F7-A39B8032B770.png"/>
          </div>
          <div class="item">
            <p class="name">&nbsp;</p>
            <span class="small">&nbsp;</span>
            <img class="thumb"
                 src="https://daolibaba.oss-cn-shanghai.aliyuncs.com/static/img/80BB749F-3E5D-44F0-8ABB-66A34BB0F4E0.png"/>
          </div>
          <div class="item">
            <p class="name">美食</p>
            <span class="small">美食</span>
            <img class="thumb"
                 src="https://daolibaba.oss-cn-shanghai.aliyuncs.com/static/img/4571AB17-B91E-4EE0-B562-5AF4D2662FC4.png"/>
          </div>
          <div class="item">
            <p class="name">生活家电</p>
            <span class="small">生活家电</span>
            <img class="thumb"
                 src="https://daolibaba.oss-cn-shanghai.aliyuncs.com/static/img/4A374E3A-881E-4249-B757-353FF685C0F1.png"/>
          </div>
        </div>
        <div class="row2 row">
          <div class="item">
            <p class="name">日用必备</p>
            <span class="small">日用必备</span>
            <img class="thumb"
                 src="https://daolibaba.oss-cn-shanghai.aliyuncs.com/static/img/42DE2FB8-7FFD-46CD-AED5-784F0A1FD8DD.png"/>
          </div>
          <div class="item">
            <p class="name">精品服装</p>
            <span class="small">精品服装</span>
            <img class="thumb"
                 src="https://daolibaba.oss-cn-shanghai.aliyuncs.com/static/img/91326305-40EC-467F-84DD-6DC327E95DCB.png"/>
          </div>
          <div class="item">
            <p class="name">电脑办公</p>
            <span class="small">电脑办公</span>
            <img class="thumb"
                 src="https://daolibaba.oss-cn-shanghai.aliyuncs.com/static/img/DB664A97-4305-4E84-81F3-737A3DE85FA3.png"/>
          </div>
          <div class="item">
            <p class="name">运动户外</p>
            <span class="small">运动户外</span>
            <img class="thumb"
                 src="https://daolibaba.oss-cn-shanghai.aliyuncs.com/static/img/F68A78ED-F689-4FBA-BD75-42A1DBD14172.png"/>
          </div>
        </div>
      </div>
    </div>

    <ad-box :ads="ads2" :h="123"></ad-box>
    <div class="block">
      <div class="head">
        <div class="title"> 品牌推荐</div>
      </div>
      <div class="content">
        <div class="row1 row">
          <div class="item" style="border-right:1px solid white;">
            <p class="name">手机平板</p>
            <span class="small">手机通讯</span>
            <img class="thumb"
                 src="https://daolibaba.oss-cn-shanghai.aliyuncs.com/static/img/13189890-C369-4E47-A1F7-A39B8032B770.png"/>
          </div>
          <div class="item">
            <p class="name">&nbsp;</p>
            <span class="small">&nbsp;</span>
            <img class="thumb"
                 src="https://daolibaba.oss-cn-shanghai.aliyuncs.com/static/img/80BB749F-3E5D-44F0-8ABB-66A34BB0F4E0.png"/>
          </div>
          <div class="item">
            <p class="name">美食</p>
            <span class="small">美食</span>
            <img class="thumb"
                 src="https://daolibaba.oss-cn-shanghai.aliyuncs.com/static/img/4571AB17-B91E-4EE0-B562-5AF4D2662FC4.png"/>
          </div>
          <div class="item">
            <p class="name">生活家电</p>
            <span class="small">生活家电</span>
            <img class="thumb"
                 src="https://daolibaba.oss-cn-shanghai.aliyuncs.com/static/img/4A374E3A-881E-4249-B757-353FF685C0F1.png"/>
          </div>
        </div>
        <div class="row2 row">
          <div class="item">
            <p class="name">日用必备</p>
            <span class="small">日用必备</span>
            <img class="thumb"
                 src="https://daolibaba.oss-cn-shanghai.aliyuncs.com/static/img/42DE2FB8-7FFD-46CD-AED5-784F0A1FD8DD.png"/>
          </div>
          <div class="item">
            <p class="name">精品服装</p>
            <span class="small">精品服装</span>
            <img class="thumb"
                 src="https://daolibaba.oss-cn-shanghai.aliyuncs.com/static/img/91326305-40EC-467F-84DD-6DC327E95DCB.png"/>
          </div>
          <div class="item">
            <p class="name">电脑办公</p>
            <span class="small">电脑办公</span>
            <img class="thumb"
                 src="https://daolibaba.oss-cn-shanghai.aliyuncs.com/static/img/DB664A97-4305-4E84-81F3-737A3DE85FA3.png"/>
          </div>
          <div class="item">
            <p class="name">运动户外</p>
            <span class="small">运动户外</span>
            <img class="thumb"
                 src="https://daolibaba.oss-cn-shanghai.aliyuncs.com/static/img/F68A78ED-F689-4FBA-BD75-42A1DBD14172.png"/>
          </div>
        </div>
      </div>
    </div>
    <ad-box :ads="ads" :h="123"></ad-box>

    <div class="block padding10 margin10-r">
      <div class="head">
        <div class="tip">推荐商铺</div>

      </div>
      <div class="content">
        <div class="top-company-list">
          <companyBox :company="company" v-for="company in topCompny" :key="company.id"></companyBox>
        </div>
      </div>
    </div>

    <foot-box active="club"></foot-box>

  </div>
</template>

<script>
  import headBox from "@/components/head";
  import footBox from "@/components/foot";
  import adBox from "@/components/ad";
  import navBox from "@/components/nav";
  import slipBox from "@/components/slip";
  import companyBox from "@/page/mall/common/company";
  import {ad, kill, mall, city, club, company} from "../../service/getData";
  import {mapState, mapActions} from "vuex";
  import {getLocation} from "../../util/utils";

  export default {
    data() {
      return {
        ads: [],
        ads2: [],
        navs: [],
        kills: [],
        topMalls: [],
        newInfo: [],
        hotInfo: [],
        topCompny: [],
        city: {},
        citys: []
      };
    },

    components: {
      headBox, adBox, footBox, navBox, slipBox, companyBox
    },
    computed: {
      ...mapState(["defaultProvienceId", "defaultCityId"])
    },

    methods: {
      getAd() {
        let mise = ad(14);
        mise.then(res => {
          let body = res.body;
          if (body.code === 1) {
            this.ads = res.body.data;
          }
        });

        let mise2 = ad(14);
        mise2.then(res => {
          let body = res.body;
          if (body.code === 1) {
            this.ads2 = res.body.data;
          }
        });
      },
      getKill() {
        let mise = kill(null, 10);
        mise.then(res => {
          let body = res.body;
          if (body.code === 1) {
            this.kills = res.body.data;
          }
        });
      },
      getClub(cityId) {
        let mise = club({
          city_id: cityId,
          with: 'imgs',
          size: 9
        });
        mise.then(res => {
          let body = res.body;
          if (body.code === 1) {
            this.navs = res.body.data;
          }
        });
      },

      async getCity() {


        //通过拿到的地址，去获取服务器上的地址.如果拿不到地址，就走默认城市吧
        getLocation().then(res => {
          city({address: res}).then(res => {
            let body = res.body;
            if (body.code === 1) {
              this.city = res.body.data;
              this.getClub(this.city.id);
            }
          });
        }).catch(res=>{

          let cityId = this.$route.query.city_id || this.defaultCityId;
          let mise = city({id: cityId});
          mise.then(res => {
            let body = res.body;
            if (body.code === 1) {
              this.city = res.body.data;
              this.getClub(this.city.id);
            }
          });

        })



      },
      getMall() {
        let mise = mall({
          catid: null,
          size: 20,
          field: null,
          order: null,
          paginate: true,
          page: null
        })
        mise.then((res) => {
          let body = res.body;
          if (body.code === 1) {
            this.topMalls = res.body.data.data
          }
        })
      },
      getComany() {
        //获取十个参数
        let mise = company({
          areaid: this.$root.utils.defaultCityId,
          size: 10,
          field: 'user_id,company,thumb,business',
          order: 'hits desc',//先按照点击吧，后面就可以安排排名了
          mallSize: 5,//返回五个商品
          is_club: 1,//同城购
        });
        mise.then(res => {
          let body = res.body;
          if (body.code === 1) {
            this.topCompny = res.body.data;
          }
        });
      }
    },
    async created() {
      this.getAd();
      this.getKill();
      this.getMall();
      this.getCity();
      this.getComany();
    }
  };
</script>
<style lang='less' scoped>
  @import "../../assets/style/base.less";

  .icon-address {
    font-size: 0.4831rem;
  }

  .nav {
    padding: 0.2415rem;
    display: flex;
    justify-content: flex-star;
    flex-wrap: wrap;
    background: white;
    .item {
      margin-top: 0.0966rem;
      width: 20%;
      height: 1.4493rem;
      text-align: center;
      img {
        vertical-align: top;
        width: 0.9662rem;
        height: 0.9662rem;
        border-radius: 3px;
      }
      span {
        display: block;
        font-size: 0.2899rem;
      }
    }
  }

  .icon-suoyou {
    display: inline-block;
    box-sizing: border-box;
    width: 40px;
    height: 40px;
    text-align: center;
    line-height: 40px;
    font-size: 26px;
  }
</style>
