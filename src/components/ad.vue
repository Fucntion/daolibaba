<!--  -->
<template>
  <div>
      <mt-swipe class="ad-box" :auto="4000">
        <mt-swipe-item class="ad" v-for="ad in ads" :key="ad.aid">

          <a class="link" :href="ad.image_url"><img  :src="ad.image_src" /></a>
        </mt-swipe-item>
      </mt-swipe>
  </div>
</template>

<script>
export default {
  data () {
    return {

    };
  },
  props:['ads'],

  components: {},

  computed: {},


  methods: {}
}

</script>
<style lang='less' scoped>

</style>