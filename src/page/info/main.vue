<!--  -->
<template>
  <div>
      <head-box head-title="同城资讯" :fixed="1">
        <span slot='search'><i class="iconfont icon-sousuo"></i></span>
        <router-link to="/info/category?isPost=1" slot='edit' class="edit" >发布<i class="iconfont icon-fabu"></i></router-link>
      </head-box>
      <nav-box :navs="navs">
        <router-link slot="all" to="/info/category" class="item">
          <i class="iconfont icon-suoyou"></i>
          <span>所有分类</span>
        </router-link>
      </nav-box>
      <ad-box :ads="ads" :h="123"></ad-box>
    <slip-box   title="最新资讯" morelink="#">
        <div slot="list" >
            <ul class="new-info-list padding10-c">
                <li v-for="info in newInfo" :key="info.itemid" class="item padding10-r font14" >
                    <span class="title">{{info.title}}</span><span class="inputtime">{{info.create_time}}</span>
                </li>
            </ul>
        </div>
      </slip-box>
      <ad-box :ads="ads" :h="123"></ad-box>
      <slip-box   class="margin10-r"  title="热门资讯" morelink="#">
        <div slot="list" >
            <ul class="o2o-hot-list padding10-c">
                <li v-for="info in hotInfo" :key="info.itemid" class="item padding10-r  font14">
                    <div class="editor">

                            <img class="headimg" src="http://o2o.qingclouds.cn/api/avatar/show.php?username=admin&amp;size=large">
                            <span class="name">admin</span>

                    </div>
                    <div class="info" >
                        <h4 class="title">{{info.title}}</h4>
                        <div class="pic-box">
                            <div class="pic" style="background-image: url(http://o2o.qingclouds.cn/file/upload/o2o/1522483877oRNmygDik0t7TOPQ-s74QpsahDQ3kdLD7VAYyv23Uh3pyZKKJZ6w_9s694D8g__1.jpg)"></div>
                            <div class="pic" style="background-image: url(http://o2o.qingclouds.cn/file/upload/o2o/1522483878AbOd9jXA3bdeBwUjovNAQBnYXdnSBAf74E09GRFRr80in9yJ5qo8rmcKOEzo9L-t.jpg)"></div>
                            <div class="pic" style="background-image: url(http://o2o.qingclouds.cn/file/upload/o2o/1522483878f9P0nx0mKQoMrDHQT6PfI4Blrr4cxCJspdlN3MUmdhPxB1VIpEAeZYTcV1QVRhJA.jpg)"></div>
                        </div>
                        <div class="desc">
                            <span class="keyword px12">{{info.keyword|cutstr(20)}}..</span>
                            <span class="inputtime">{{info.create_time}}</span>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
      </slip-box>

      <foot-box  active="info"></foot-box>
  </div>
</template>

<script>
import headBox from '@/components/head'
import footBox from '@/components/foot'
import adBox from '@/components/ad'
import navBox from '@/components/nav'
import slipBox from '@/components/slip'
import {ad,category,info} from '@/service/getData'


export default {
  data () {
    return {
      ads:[],
      navs:[],
      newInfo:[],
      hotInfo:[]
    };
  },

  components: {
      headBox,adBox,footBox,navBox,slipBox
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
      let mise = category({
        moduleid:2,
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
   getInfo(){

        let newMise = info({
          catid:0,
          size:10,
          field:'itemid,create_time,title',
          order:'create_time desc'
        });
        newMise.then((res) => {
            let body = res.body;
            if (body.code === 1) {

                this.newInfo = res.body.data
            }
        })

        let hotMise = info(0,10,null,'hits desc')
        hotMise.then((res) => {
            let body = res.body;
            if (body.code === 1) {
                this.hotInfo = res.body.data
            }
        })

   }


  },
  created(){
    this.getAd()
    this.getNav()
    this.getInfo()

  }
}

</script>
<style lang='less' scoped>
@import '../../assets/style/base.less';
.edit{
    .icon-fabu{
        font-size: 0.4831rem;
        padding: 0 0.0966rem;
    }
}

.new-info-list{

    .item{

        border-bottom: 1px solid #e7e7e7;
        display: flex;
        justify-content: space-between;
      &:last-child{
        border-bottom: none;
      }
    }
}

/**
同城首页
*/
.o2o-hot-list{
.item{
    border-bottom: 1px solid #e7e7e7;
    &:last-child{
      border-bottom: none;
    }
    .editor{
    display: flex;
    justify-content: space-between;
    .headimg{
        margin: 0 0.1449rem;
        width: 0.8696rem;
        height: 0.8696rem;
    }
    .name{
        line-height: 0.8696rem;
    }
    .detail-btn{

        .detail-icon{

        }
    }

    }
    .info{
    .rest;
    display: block;
    .title{
        .rest;
        margin-top: 0.2415rem;

        font-size: 0.3865rem;
        font-weight: bold;
    }
    .pic-box{
        margin: 0.2415rem 0;
        .pic{
        display: inline-block;
        width: 25%;
        height: 0;
        padding-top: 25%;
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center;
        }

    }
    .desc{
        display: flex;
        justify-content: space-between;
        .keyword{
        color: #666666;
        }
        .inputtime{
            width: 0.9662rem;
            text-align: center;
        }
    }
    }
}
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
