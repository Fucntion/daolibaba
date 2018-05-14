<template>
  <div class="wrap">
    <head-box :fixed="true" :goBack="true" :quick="!search" >
      <div slot="search"  to="/search" class="search-box" >
        <div class="search-content">
          <i class="iconfont icon-sousuo"></i><input :placeholder="$route.query.catname" class="search-input" type="text" v-model="keyword" />
        </div>
      </div>
      <router-link v-if="search"  slot="edit" :to="'/search/mall?keyword='+keyword+'&from=category'"><mt-button  class="search-btn" size="small" type="danger">搜索</mt-button></router-link>
    </head-box>
    <div class="result-list-box">
      <mt-loadmore :bottom-method="getMall" :autoFill="false" @bottom-status-change="handleBottomChange" :bottom-all-loaded="allLoaded" ref="loadmore">
      <mall-list :lists="malls"></mall-list>
      </mt-loadmore>
    </div>
  </div>
</template>
<script>
  import headBox from '../../components/head';
  import {mall} from "../../service/getData";
  import mallList from "../mall/common/list";

  export default {
    data () {
      return {
        keyword:'',
        malls:[],
        page:1,
        allLoaded: false,
        bottomStatus: '',
      };
    },

    components: {headBox,mallList},

    computed: {

      search(){
        if(this.keyword.length>0){
          return true
        }
        return  false
      }
    },

    created(){
      this.getMall()
    },

    methods: {
      handleBottomChange(status) {
        this.bottomStatus = status;
      },
      getMall(){
        mall({
          action:'cat',
          catid:this.$route.query.catid,
          page:this.page
        }).then(res=>{
          if(res.body.code==1){
            this.page++;
            this.malls = this.malls.concat(res.body.data.data)
          }
        })
      }
    }
  }

</script>
<style lang='less' scoped>
  .search-box{
    flex: 1;
    margin: 0 10px;
    .search-content{
      height: 28px;
      margin-top: 8px;
      position: relative;
      z-index: 1;
      background: #f3f3f3;
      border-radius: 14px;
      /*padding-left: 28px;*/
      .iconfont{
        position: absolute;
        line-height: 28px;
        left: 4px;
        z-index: 3;
        /*width: 24px;*/
        /*height: 24px;*/
        /*top: 2px;*/
        /*left: 2px;*/
        /*&::before{*/
        /*position: absolute;*/
        /*top: 0;*/
        /*left: 0;*/
        /*width: 24px;*/
        /*height: 24px;*/
        /*}*/
      }
      .search-input{
        display: block;
        position: absolute;
        width: 100%;
        background: none;
        z-index: 2;
        padding-left: 32px;
        top: 0;
        left: 0;
        bottom: 0;
        box-sizing: border-box;
        border: none;
        right: 0;

        /*border: none;*/


      }
    }


  }
  .search-btn{
    height: 26px;
    margin-top: 9px;
  }
</style>
