<template>
<div>
  <head-box head-title="资源失效" go-back="true"></head-box>
  <div class="result-box padding10 block">
    <div class="fail">
      <i class="icon iconfont icon-cuowuhttp"></i>
      <h4 class="msg">信息无效或者已经下架</h4>
    </div>

  </div>
  <slip-box class="margin10-r" title="为您推荐">
    <div slot="list">
      <mall-list :lists="malls"></mall-list>
    </div>
  </slip-box>
  <foot-box></foot-box>
</div>
</template>

<script>
  import headBox from '../components/head';
  import slipBox from '../components/slip';
  import mallList from './mall/common/list';
  import {mall,order} from "../service/getData";
  import footBox from '../components/foot';
  export default {
    data () {
      return {
        malls:[],

      };
    },

    components: {headBox,slipBox,mallList,footBox},
    created(){
      this.getMall()
    },
    computed: {},

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
      }
    }
  }

</script>
<style lang='less' scoped>
  .result-box{
    padding: 30px 15px;
    text-align: center;
    .success,.fail{
      color: #666666;
        .icon{
            font-size: 60px;
          &.icon-tipssuccess{
            color: #50b674;
          }
        }
        .msg{

        }
    }
    .base{
      margin-top: 15px;
      color: #666666;
      font-size: 14px;
      .info-line{
        display: flex;
        justify-content: space-between;
      }
    }
  }

</style>
