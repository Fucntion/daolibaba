<!--  -->
<template>
<div>
  <mt-loadmore :bottom-method="getMall" :autoFill="false" @bottom-status-change="handleBottomChange" :bottom-all-loaded="allLoaded" ref="loadmore">
    <div  class="full-list flex">
      <router-link :to="'/mall/detail/'+item.id" class="item"  v-for="item in malls" :key="item.itemid">
        <div class="thumb-box" >
          <img :src="item.thumb" class="thumb" />
        </div>
        <dl class="info">
          <dd class="name info-line"><span ><strong>{{item.title|cutstr(30)}}</strong></span></dd>
          <dd class="price info-line">￥{{item.price}}</dd>
          <dd class="count info-line"><span class="count-order">总共售出{{item.sales}}{{item.unit||'件'}}</span><span class="count-comment">{{item.comments}}条评价</span></dd>
          <dd><span>{{item.company}}</span></dd>
        </dl>
      </router-link>
    </div>
  </mt-loadmore>

</div>
</template>

<script>
  import {mall} from "../../../service/getData";

  export default {
  name:'mallList',
  data() {
    return {
      end: false,
      page:1,
      allLoaded: false,
      bottomStatus: '',
      malls:[]
    };
  },
    // props:['lists'],
  components: {},

  computed: {},
  created(){
    this.getMall()
  },
  methods: {

    getMall(){
      let mise = mall({
        size:20,
        page:this.page,
        paginate:true,
        order:'sort desc',
      }).then((res) => {
        let body = res.body;
        if (body.code === 1) {
          this.$refs.loadmore.onBottomLoaded();
          console.log(6666666666666666666666)
          this.malls = this.malls.concat(res.body.data.data)
        }
      })
    },
    handleBottomChange(status) {
      this.bottomStatus = status;
    },
  }
};
</script>
<style lang='less' scoped>
.info-line{
  margin-bottom: 4px !important;
}
  .thumb{
    margin-top: 4px;
  }
</style>
