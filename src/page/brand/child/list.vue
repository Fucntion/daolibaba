<template>
  <div class="padding10-r">
    <mt-loadmore  :bottom-method="loadTop" ref="loadmore" :bottomDistance="100">
      <brand-item class="item" v-for="(brand,idx) in brands" :key="idx" :brand="brand"></brand-item>
    </mt-loadmore>


  </div>
</template>

<script>
import {brand} from "../../../service/getData";
import brandItem from '../common/brand'
export default {
        name: "list",
        data(){
          return {
            brands:[],
            end:false,
          }
        },
  components:{brandItem},
  created(){

  },

    methods:{
      loadTop() {
        this.getBrands()
        this.$refs.loadmore.onTopLoaded();
      },
          getBrands(){

            brand({
              size:10
            }).then(res=>{
              if(res.body.code==1){
                this.brands = this.brands.concat(res.body.data)
              }
            })
          }
    }
    }
</script>

<style scoped lang='less'>
.item{
  display: block;
}
</style>
