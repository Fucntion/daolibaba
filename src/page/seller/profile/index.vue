<template>
  <div>
    <head-box head-title="店铺信息">
      <div slot="search"></div>
      <router-link to="/seller/profile/set" slot="edit" class="quick">修改</router-link>
    </head-box>
  </div>
</template>

<script>
  import headBox from '../../../components/head';
    export default {
        name: "index",
      data(){
          return {

          }
      },
      components:{headBox},
      created(){

      },
      methods:{

      }
    }
</script>

<style scoped>

</style>
