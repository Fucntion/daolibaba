<template>
<div>
  <head-box  go-back="true" :headTitle="title" quick="true" fixed="true"></head-box>
  <div class="list-wrap">
    <mt-loadmore :bottom-method="getMalls" :autoFill="false" @bottom-status-change="handleBottomChange" :bottom-all-loaded="allLoaded" ref="loadmore">
      <mall-list :lists="malls"></mall-list>
    </mt-loadmore>
  </div>


</div>
</template>

<script>
  import headBox from '../../../components/head';
  import {mall} from "../../../service/getData";
  import mallList from '../../mall/common/list';

  export default {
        name: "type",
      data(){
          return {
            malls:[],
            page:1,
            allLoaded: false,
            bottomStatus: '',
          }
      },
    computed:{
      title(){
        return this.$route.query.typeTitle||'分类浏览'
      }
    },
      components:{headBox,mallList},
      created(){
        this.getMalls()
      },
      methods:{
        handleBottomChange(status) {
          this.bottomStatus = status;
        },
        getMalls(){
          mall({
            user_id:this.$route.params.id,
            co_type_id:this.$route.params.type,
            paginate:1,
            page:this.page
          }).then(res=>{
            this.page++;
            this.malls = this.malls.concat(res.body.data.data)
          })
        }
      }
    }
</script>

<style scoped>

</style>
