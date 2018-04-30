
<template>
  <div>
      <div style="height:1.3043rem"></div>
      <section id="footer">
        <section v-bind:class="[active=='home'?'active':'']" @click="navigatetor('/seller/mall')" class="item">
            <i class="iconfont icon-shangpin"></i>
            <span>商品管理</span>
        </section>
        <section v-bind:class="[active=='order'?'active':'']" @click="navigatetor('/seller/order')" class="item">
            <i class="iconfont icon-icondd2"></i>
            <span>订单管理</span>
        </section>
        <section v-bind:class="[active=='cash'?'active':'']" @click="navigatetor('/seller/cash')" class="item">
            <i class="iconfont icon-zhanghuzichan"></i>
            <span>资金管理</span>
        </section>
        <section v-bind:class="[active=='service'?'active':'']" @click="navigatetor('/seller/service')" class="item">
            <i class="iconfont icon-msnui-service"></i>
            <span>增值服务</span>
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
