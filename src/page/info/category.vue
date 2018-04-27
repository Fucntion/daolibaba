<!-- 折叠列表 -->
<template>
  <div>
    <!-- 标题栏 -->
    <head-box head-title="发布资讯-选择分类" go-back="true"></head-box>
    <!-- 列表 -->
    <accordion
      :isPost="isPost"
      v-for="(item,index) in cats"
      :key="item.id"
      :title="item"
      :list="item.child">
    </accordion>
  </div>
</template>

<script>
  import headBox from '../../components/head'
  import Accordion from './components/Accordion'
  import {getFoldList} from "../../service/getData"

  export default {
    name: 'Fold',
    components: {
      Accordion,headBox
    },
    data(){
      return {
        cats:[]
      }
    },
    computed:{
      isPost(){
        return this.$route.query.isPost?true:null
      }
    },
    created(){
      this.getNav()
    },
    methods:{

      getNav(){
        let mise = getFoldList({
          moduleid:2,
          len:2,
          // size:0
        })
        mise.then((res) => {
          let body = res.body;
          if (body.code === 1) {
            this.cats = res.body.data
          }
        })
      },

    }
  }
</script>

<style lang="less" scoped>

</style>
