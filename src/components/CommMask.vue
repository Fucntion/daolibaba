<!--  -->
<template>
  <div id="mask" @click="close()" v-if="mask" :style={zIndex:mask.zIndex}></div>
</template>

<script>
export default {
  data () {
    return {
        
    };
  },
  props:['mask'],

  components: {},

  computed: {},


  methods: {
    close(){

      this.$emit('upup')
    }
  }
}

</script>
<style lang='less' scoped>
#mask{
    position: fixed;
    z-index: 2;//熊来了，我能比底层跑的高就行了。。。
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.7)
}
</style>