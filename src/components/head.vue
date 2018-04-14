<!--  -->
<template>
  <div>
      <div v-if="fixed" style="height: 0.9662rem;"></div>
      <header id='head_top' v-bind:class="[fixed?'fixed':'']">
        <slot name='logo'></slot>
        <slot name='search'></slot>
        <section class="head_goback" v-if="goBack" @click="$router.go(-1)">
            <i class="iconfont icon-fanhui"></i>
        </section>
        <router-link :to="userInfo? '/my':'/my/login'" v-if='signinUp' class="head_login">
            <svg class="user_avatar" v-if="userInfo">
                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#user"></use>
            </svg>
            <span class="login_span" v-else>登录|注册</span>
        </router-link>
        <slot name='tab'></slot>
        <section class="title_head ellipsis" v-if="headTitle">
            <span class="title_text font16">{{headTitle}}</span>
        </section>
        <slot name="edit"></slot>
        <slot name="changecity"></slot>
    </header>
  </div>
</template>
 
<script>
import { mapState, mapActions } from "vuex";

export default {
  data() {
    return {};
  },
  props: ["signinUp", "headTitle", "goBack", "fixed"],

  components: {},
  mounted() {
    //获取用户信息
    // this.getUserInfo();
  },
  computed: {
    ...mapState(["userInfo"])
  },
  methods: {
    ...mapActions(["getUserInfo"])
  }
};
</script>
<style lang='less' scoped>
#head_top {
  background: white;
  position: relative;
  height: 1.0628rem;
  font-size: 0.3382rem;
  padding: 0 0.2415rem;
  line-height: 1.0628rem;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #e7e7e7;
  .icon-fanhui {
    font-size: 0.4831rem;
  }
  .title_head {
    position: absolute;
    height: 1.0628rem;
    width: 50%;
    left: 25%;
    text-align: center;

  }
  &.fixed {
    position: fixed;
    top: 0;
    width: 100%;
    box-sizing: border-box;
    z-index: 9;
  }
}
</style>