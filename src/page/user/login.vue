<!--  -->
<template>
  <div>
      <head-box head-title="用户注册" goBack="true"></head-box>

      
  </div>
</template>

<script>
import headBox from '@/components/head'

import {mall} from '@/service/getData'


export default {
  data () {
    return {
      malls:[],
    }; 
  },

  components: {
      headBox
  },

  computed: {},


  methods: {
    getMall(){
      let mise = mall({
        size:20,
        paginate:true,
      })
      mise.then((res) => {
          let body = res.body;
          if (body.code === 1) {
              this.malls = res.body.data.data
          }
      })
    }
      
      
      
  },
  created(){



  }
}

</script>
<style lang='less' scoped>
@import "../../assets/style/base.less";

</style>