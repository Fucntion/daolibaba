
<template>
  <section class="nav">
      <section  v-for="nav in navs" :key="nav.catid" @click="navigatetor(nav.catid)" class="item">
          <img :src="nav.thumb||'http://placehold.it/100/ccc'" />
          <span>{{nav.title}}</span>
      </section>
      <slot name='all'></slot>


  </section>
</template>

<script>
export default {
  data () {
    return {
    };
  },
  props:['navs'],

  components: {},

  computed: {},

  methods: {
      navigatetor(catid){
          let url ='/list/'+catid
          this.$router.push(url)
      }
  }
}
</script>
<style lang='less'>
.nav{
    padding: 0.2415rem;
    display: flex;
    justify-content: flex-star;
    flex-wrap: wrap;
    background: white;
    .item{
        margin-top: 0.0966rem;
        width: 20%;
        height: 1.4493rem;
        text-align:center;
        img{
            vertical-align: top;
            width: 0.9662rem;
            height: 0.9662rem;
          border-radius: 3px;

        }
        span{
            display: block;
            font-size: 0.2899rem;
        }
    }
}
</style>
