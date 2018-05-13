<!--  -->
<template>
  <div>

      <div v-if="fixed&&!plain" style="height: 1.0628rem;"></div>
      <header id='head_top' v-bind:class="[fixed?'fixed':'',plain?'plain':'',justify?'justify':'']">

        <section class="head_goback" v-if="goBack" @click="$router.go(-1)">
            <i class="iconfont icon-fanhui"></i>
        </section>
        <slot name='logo'></slot>
        <slot name='search'></slot>
        <router-link :to="userInfo? '/my':'/login'" v-if='signinUp' class="head_login">
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
        <div v-if="quick" class="quick">
            <i class="iconfont icon-more" @click="toggleQucikMenu()"></i>
            <div v-if="quickMenu" class="list">
              <router-link :to="'/'" class="item"><i class="iconfont icon-shouye"></i><span>首页</span></router-link>
              <router-link :to="'/cart'" class="item"><i class="iconfont icon-tubiaolunkuo-"></i><span>购物车</span></router-link>
              <router-link :to="'/my'" class="item"><i class="iconfont icon-gerenzhongxin"></i><span>个人中心</span></router-link>
            </div>
        </div>

    </header>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  data() {
    return {
      quickMenu:false
    };
  },
  props: ["signinUp", "headTitle", "goBack", "fixed",'quick','plain','justify'],

  components: {},
  mounted() {
    //获取用户信息


  },
  created(){
    // this.getUserInfo();
  },
  mounted(){
    document.title = this.headTitle?this.headTitle:'岛里巴巴-海南批发采购平台';
  },

  computed: {
    ...mapState(["userInfo"])
  },
  methods: {
    		...mapActions(["getUserInfo"]),
    toggleQucikMenu(){
      this.quickMenu = !this.quickMenu
    },

  }
};
</script>
<style lang='less' scoped>
.quick{

  .list{
    position: fixed;
    z-index: 999;
    right: 5px;
    top: 50px;
    width: 80px;
    padding: 0 5px;
    background: rgba(0, 0, 0, 0.6);
    border-radius: 4px;
    .item{
      display: block;
      height: 26px;
      line-height: 26px;
      padding: 4px 0;
      color:white;
      border-bottom: 1px solid #c5c5c5;
      &:last-child{
        border-bottom: none;
      }
      span{
        font-size: 12px;
      }
      .iconfont{
        font-size: 18px;
        margin-right: 6px;
      }

    }
  }
}
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
  &.plain{
    border-bottom: none;
    background: none;
  }
  &.justify{
    justify-content: flex-start;
  }
}
</style>
