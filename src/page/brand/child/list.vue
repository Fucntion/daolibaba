<template>
  <div class="padding10-r wrap">
    <mt-loadmore :bottom-method="getBrands" @bottom-status-change="handleBottomChange" :bottom-all-loaded="allLoaded" ref="loadmore">
      <brand-item class="item"
                  v-for="(brand,idx) in brands"
                  :key="idx"
                  :brand="brand"></brand-item>
    </mt-loadmore>
  </div>
</template>

<script>
  import {brand} from "../../../service/getData";
  import brandItem from '../common/brand'
  import {Loadmore} from 'mint-ui';

  export default {
    name: "list",
    data() {
      return {
        brands: [],
        end: false,
        page:1,
        allLoaded: false,
        bottomStatus: '',
      }
    },
    components: {brandItem},
    created() {

    },
    methods: {
      handleBottomChange(status) {
        this.bottomStatus = status;
      },
      getBrands() {

        brand({
          size: 20,
          paginate:true,
          page:this.page
        }).then(res => {
          if (res.body.code == 1) {
            this.page++;
            this.brands = this.brands.concat(res.body.data.data)
            this.$refs.loadmore.onBottomLoaded();
          }
        })
      }
    }
  }
</script>

<style scoped lang='less'>
  .wrap {
    position: fixed;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
    top: 40px;
    bottom: 0px;
    width: 100%;
  }

  .item {
    display: block;
  }
</style>
