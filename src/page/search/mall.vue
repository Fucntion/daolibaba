<template>
  <div class="wrap">
    <head-box :fixed="true" :goBack="true" :quick="!search">
      <div slot="search" to="/search" class="search-box">
        <div class="search-content">
          <i class="iconfont icon-sousuo"></i><input class="search-input" type="text" v-model="keyword"/>
        </div>
      </div>
      <div @click="refreshSearch()" v-if="search" slot="edit" :to="'/search/mall?keywrod='+keyword+'&from=category'">
        <mt-button class="search-btn" size="small" type="danger">搜索</mt-button>
      </div>
    </head-box>

    <div class="result-list-box">
      <mt-loadmore :bottom-method="getOrders" :autoFill="false" @bottom-status-change="handleBottomChange" :bottom-all-loaded="allLoaded" ref="loadmore">
        <mall-list :lists="malls"></mall-list>
      </mt-loadmore>
    </div>

  </div>
</template>

<script>
  import headBox from '../../components/head';
  import {search} from "../../service/getData";
  import mallList from "../mall/common/list";

  export default {
    name: "searchMall",
    data() {
      return {
        keyword: '',
        onload:true,
        malls:[],
        page:1,
        allLoaded: false,
        bottomStatus: '',
      }
    },
    computed: {
      search() {
        if (this.keyword.length > 0) {
          return true
        }
        return false
      }
    },
    created(){
      this.keyword = this.$route.query.keyword
      this.doSearch()
    },
    components: {headBox,mallList},
    methods:{
      handleBottomChange(status) {
        this.bottomStatus = status;
      },

      doSearch(){
        if(this.keyword.length<1)return
        search({
          type:'mall',
          word:this.keyword,
          page:this.page,
        }).then(res=>{
          console.log(res.body.code)
          if(res.body.code==1){
            this.page++;
            this.rt = this.rt.concat(res.body.data.data)
            this.$refs.loadmore.onBottomLoaded();
          }
        })
      }
    }
  }
</script>

<style lang="less" scoped>
  .search-box {
    flex: 1;
    margin: 0 10px;
    .search-content {
      height: 28px;
      margin-top: 8px;
      position: relative;
      z-index: 1;
      background: #f3f3f3;
      border-radius: 14px;

      .iconfont {
        position: absolute;
        line-height: 28px;
        left: 4px;
        z-index: 3;

      }
      .search-input {
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

      }
    }

  }

  .search-btn {
    height: 26px;
    margin-top: 9px;
  }
</style>
