<template>
 <div>
   <head-box :go-back="true" :head-title="搜索"></head-box>
   <transition name="router-fade" mode="out-in">
     <router-view></router-view>
   </transition>

 </div>
</template>
<script>
  import headBox from '../../components/head';
  export default {
    data () {
      return {
      };
    },

    components: {headBox},

    computed: {},



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
