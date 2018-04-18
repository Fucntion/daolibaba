
<template>
  <div>
      <div style="height:1.3043rem"></div>
      <section id="footer">
        <section v-bind:class="[active=='home'?'active':'']" @click="navigatetor('/')" class="item">
            <i class="iconfont icon-shouye"></i>
            <span>批发</span>
        </section>
        <section v-bind:class="[active=='info'?'active':'']" @click="navigatetor('/info')" class="item">
            <i class="iconfont icon-tongchengzhisong"></i>
            <span>岛里资讯</span>
        </section>
        <section v-bind:class="[active=='club'?'active':'']" @click="navigatetor('/club')" class="item">
            <i class="iconfont icon-shangquanxiao"></i>
            <span>同城购物</span>
        </section>
        <section v-bind:class="[active=='cart'?'active':'']" @click="navigatetor('/cart')" class="item">
            <i class="iconfont icon-tubiaolunkuo-"></i>
            <span>购物车</span>
        </section>
        <section v-bind:class="[active=='my'?'active':'']" @click="navigatetor('/my')" class="item">
            <i class="iconfont icon-gerenzhongxin"></i>
            <span>个人中心</span>
        </section>
    </section>
  </div>
</template>

<script>
export default {
  data () {
    return {
    };
  },
    props:['active'],
  components: {},

  computed: {},

  methods: {
      navigatetor(url){
          this.$router.push(url)
      }
  }
}
</script>
<style lang='less' scoped>
#footer{
    position: fixed;
    box-sizing: border-box;
    bottom: 0;
    width: 100%;
    z-index: 9;
    height: 1.3043rem;
    padding: 0.1208rem 0;
    overflow: hidden;
    display: flex;
    background: white;
    font-size:0.2899rem;
    border-top:1px solid #e7e7e7;
    .item{
        flex: 1;
        text-align: center;
        i{
            font-size: 0.628rem;
        }
        span{
            display: block;
        }
        &.active{
            color: red;
        }
    }
}
</style>