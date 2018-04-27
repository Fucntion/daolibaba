<!--  -->
<template>
  <div>
    <head-box :goBack="true" head-title="个人信息"></head-box>
    <div class="padding10 block">
      <mt-cell title="昵称" :value="userInfo.nickname"></mt-cell>
      <mt-cell title="手机号码" :value="userInfo.phone"></mt-cell>
      <mt-cell title="头像"  > <img style="width: 44px" :src="userInfo.headimgurl" /></mt-cell>
      <!--<mt-cell title="标题" label="描述信息" is-link></mt-cell>-->
      <!--<mt-cell title="标题" label="描述信息" is-link></mt-cell>-->
      <!--<mt-cell title="标题" label="描述信息" is-link></mt-cell>-->
      <!--<mt-cell title="标题" label="描述信息" is-link></mt-cell>-->
      <!--<mt-cell title="标题" label="描述信息" is-link></mt-cell>-->
      <!--<mt-cell title="标题" label="描述信息" is-link></mt-cell>-->
      <!--<mt-cell title="标题" label="描述信息" is-link></mt-cell>-->
    </div>

    <div @click="logout()" class="logout">
      <mt-button size="large" type="primary">退出登录</mt-button>
    </div>
  </div>
</template>

<script>
  import headBox from "@/components/head";
  import {mapState, mapActions} from "vuex";

  export default {
    data() {
      return {};
    },

    components: {headBox},

    computed: {
      ...mapState(["userInfo"])
    },

    methods: {
      logout() {
        localStorage.clear();
        sessionStorage.clear();
        this.$router.push({
          path: '/'
        })
      }
    }
  }

</script>
<style lang='less' scoped>
  .logout {

    width: 80%;
    margin: 40px auto;
    text-align: center;

  }
</style>
