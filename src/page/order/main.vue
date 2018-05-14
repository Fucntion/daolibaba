<!-- order首页，用来放my和detail的子路由 -->

<template>
  <div>
      <head-box :goBack="true" head-title="订单中心"  ></head-box>
    <transition name="router-fade" mode="out-in">
			<router-view></router-view>
		</transition>

    
      
  </div>
</template>

<script>
import headBox from '@/components/head'


export default {
  data() {
    return {
      mall: {}
    };
  },

  components: {
    headBox
  },

  computed: {
   
  },

  created() {},
  methods: {
    
  }
};
</script>
<style lang='less' scoped>
@import "../../assets/style/base.less";

</style>