<template>
 <div>

   <transition name="router-fade" mode="out-in">
     <router-view></router-view>
   </transition>

 </div>
</template>
<script>

  export default {
    data () {
      return {
      };
    },

    components: {},

    computed: {
      status(newVal,oldVal){

        this.orders = [];
        this.page =1;
        //排除掉初始化
        if(oldVal!=999){
          this.getOrders()
        }

      }
    },



    methods: {}
  }

</script>
<style lang='less' scoped>
.router-fade-enter-active, .router-fade-leave-active {
  transition: opacity .3s;
}
.router-fade-enter, .router-fade-leave-active {
  opacity: 0;
}

</style>
