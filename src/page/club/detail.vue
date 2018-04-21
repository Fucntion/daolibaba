<!--  -->
<template>
  <div v-if="club">
    <head-box class="head-title"   plain="true" go-back="true" ></head-box>
    <mt-swipe class="slide-box"  :auto="5000">
      <mt-swipe-item class="slide" v-for="img in club.imgs" :key="img.id">
        <div class="img"  :style="{backgroundImage:'url('+img.src+')'}" />
      </mt-swipe-item>
    </mt-swipe>
    <div class="info block">
      <div class="info-line title">{{club.title}}</div>
      <div class="info-line desc font14">{{club.desc}}</div>
      <div class="info-line data font14">
        <div class="data-item">点击量<em>({{club.hits}})</em></div>
        <div class="data-item">商家 <em>({{this.companyList.length}})</em></div>
        <div class="data-item">排名 <em>({{club.id}})</em></div>
      </div>
    </div>
    <div class="block padding10 margin10-r">
      <div class="head">
        <div class="tip">推荐商铺</div>

      </div>

      <div class="content">
        <div class="top-company-list">
          <companyBox class="company" :company="company" v-for="company in companyList" :key="company.id"></companyBox>
          <companyBox class="company" :company="company" v-for="company in companyList" :key="company.id"></companyBox>
          <companyBox class="company" :company="company" v-for="company in companyList" :key="company.id"></companyBox>
          <companyBox class="company" :company="company" v-for="company in companyList" :key="company.id"></companyBox>
          <companyBox class="company" :company="company" v-for="company in companyList" :key="company.id"></companyBox>
          <companyBox class="company" :company="company" v-for="company in companyList" :key="company.id"></companyBox>
          <companyBox class="company" :company="company" v-for="company in companyList" :key="company.id"></companyBox>

        </div>
      </div>
    </div>

    <slip-box class="margin10-r"  title="为您推荐">
      <div slot="list">
        <mall-list :lists="malls"></mall-list>
      </div>
    </slip-box>
  </div>
</template>

<script>
  import slipBox from "@/components/slip";
  import headBox from '../../components/head';
  import {club,mall,company} from "../../service/getData";
  import companyBox from "@/page/mall/common/company";
  import mallList from "../mall/common/list";
  export default {
    data() {
      return {
          club:null,
        malls:[],
        companyList:[]
      };
    },
    components: {headBox,companyBox,slipBox,mallList},

    computed: {},
    created(){
      this.getClubInfo()
      this.getMall()
      this.getCompany()
    },
    methods: {
      getMall() {
        let mise = mall({
          size: 20,
          paginate: true
        });
        mise.then(res => {
          let body = res.body;
          if (body.code === 1) {
            this.malls = res.body.data.data;
          }
        });
      },
      getCompany(){


        company({
          is_club:1,
          club_id:this.$route.params.id,
          mallSize: 5,//返回五个商品
          field: 'user_id,company,thumb,business',
          size:10}).then(res=>{
          if(res.body.code==1){
            this.companyList = res.body.data
          }
        })

      },
      getClubInfo(){

        club({
          id:this.$route.params.id,
          with:'imgs'
        }).then(res=>{
          if(res.body.code==1){
            this.club = res.body.data
          }

        })
      }
    }
  };
</script>
<style lang='less' scoped>
  @import "../../assets/style/base.less";
  .info{
    padding: 10px 10px 4px 10px;
    .title{
      font-size: 18px;
    }
    .desc{
      color: #666666;
      margin: 10px 0 !important;
    }
    .info-line{
      color: #666666;
      margin-bottom: 4px;
      em{
        color: @activeColor ;
      }
    }
    .data{
      display: flex;
      .data-item{
        flex:1;
        text-align: center;
      }
    }
  }
  .head-title{
    position: absolute;
    width: 100%;
    z-index: 3;
    color: white;
    box-sizing: border-box;
  }
.slide-box{
  height: 200px;
  width: 100%;
  z-index: 2;
  .slide{
    .img{
      width: 100%;
      height: 100%;
      background-size: cover;
    }
  }
}

  .top-company-list{
    .company{
      border-bottom: 1px solid #e7e7e7;
    }
  }

</style>
