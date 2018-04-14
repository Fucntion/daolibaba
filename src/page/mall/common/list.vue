<!--  -->
<template>
<div>
    <div  class="full-list flex">
        <router-link :to="'/mall/detail/'+item.id" class="item"  v-for="item in lists" :key="item.itemid">
            <div class="thumb-box" >
                <img :src="item.thumb" class="thumb" />
            </div>
            <dl class="info">
                <dd class="name"><span ><strong>{{item.title}}</strong></span></dd>
                <dd class="price">￥{{item.price}}</dd>
                <dd class="count"><span class="count-order">总共成交{{item.sales}}笔</span><span class="count-comment">{{item.comments}}条评价</span></dd>
                <dd><span>{{item.company}}</span></dd>
            </dl> 
        </router-link>
    </div>
</div>
</template>

<script>
export default {
  data() {
    return {};
  },
    props:['lists'],
  components: {},

  computed: {},

  methods: {}
};
</script>
<style lang='less' scoped>

</style>