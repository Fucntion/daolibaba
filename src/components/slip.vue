<!--  -->
<template>
<div>
    <div class="block">
        <div class="head padding10-c">
            <div class="tip">{{title}}</div>
            <div v-if="morelink" class="more" @click="navigatetor(morelink)"><i class="iconfont icon-more"></i></div>
        </div>
        <div class="content">
            <slot name="list"></slot>
        </div>

    </div>
</div>
</template>

<script>
export default {
  data () {
    return {
    };
  },
    props:['title','morelink'],
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

</style>
