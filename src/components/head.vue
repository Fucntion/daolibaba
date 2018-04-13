<!--  -->
<template>
  <header id='head_top'>
        <slot name='logo'></slot>
        <slot name='search'></slot>
        <section class="head_goback" v-if="goBack" @click="$router.go(-1)">
            <i class="iconfont icon-fanhui"></i>
        </section>
        <router-link :to="userInfo? '/profile':'/login'" v-if='signinUp' class="head_login">
            <svg class="user_avatar" v-if="userInfo">
                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#user"></use>
            </svg>
            <span class="login_span" v-else>登录|注册</span>
        </router-link>
        <section class="title_head ellipsis" v-if="headTitle">
            <span class="title_text">岛里巴巴-{{headTitle}}</span>
        </section>
        <slot name="edit"></slot>
        <slot name="changecity"></slot>
    </header>
</template>
 
<script>
export default {
  data () {
    return {
    };
  },
  props: ['signinUp', 'headTitle', 'goBack'],

  components: {},

  computed: {},



  methods: {}
}

</script>
<style lang='less' scoped>
#head_top{
    position: relative;
    height: 0.9662rem;
    font-size: 0.3382rem;
    padding: 0 0.2415rem;
    line-height: 0.9662rem;
    display: flex;
    justify-content: space-between;
    .title_head{
        position: absolute;
        height: 0.9662rem;
        left: 0;
        right: 0;
        text-align: center;
    }
}
</style>