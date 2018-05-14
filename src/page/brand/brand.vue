<template>
<div>
    <head-box
      :fixed="true"
      go-back="true"
      head-title="品牌馆">
      <!--<div class="menu"-->
           <!--@click="taggleSheetVisible()"-->
           <!--slot="edit"><i class="iconfont icon-caidan"></i></div>-->
    </head-box>
  <mt-actionsheet class="menu"
        :actions="actions"
        v-model="sheetVisible">
  </mt-actionsheet>
  <transition name="router-fade" mode="out-in">
    <router-view></router-view>
  </transition>

</div>
</template>

<script>
  import headBox from '../../components/head';
    export default {
        name: "brand",
      data(){
          return {
            brands:null,
            sheetVisible:false,
            active:'active',
            actions:[{name:'搜索品牌',method:(r)=>this.toSearch()},{name:'按分类浏览',method:(r)=>this.selectType()}]
          }
      },
      components:{headBox},
      methods:{
        taggleSheetVisible(){
          this.sheetVisible = !this.sheetVisible
        },
        toSearch(){
          this.$router.push({path:'/fullSearch'});//全局搜索和商品搜索分开吧，电商业务的搜索太重要了
        },
        selectType(){
          this.$router.push({path:'/fullSearch'});
        }
      }

    }
</script>

<style scoped>

</style>
