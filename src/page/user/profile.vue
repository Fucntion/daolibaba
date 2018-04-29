<!--  -->
<template>
  <div>
    <head-box :goBack="true" head-title="个人信息"></head-box>
    <div class=" block" v-if="userInfo">
      <mt-cell title="头像"  > <img style="width: 44px;margin: 10px 0" :src="userInfo.headimgurl" /></mt-cell>
      <mt-cell title="昵称" :value="userInfo.nickname"></mt-cell>
      <mt-cell title="手机号码" to="/bindPhone"  :value="userInfo.phone||'点击绑定'"></mt-cell>
      <mt-cell to="/address" title="收货地址管理"></mt-cell>
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
  import {getUser} from "../../service/getData";
  import {mapState, mapActions} from "vuex";

  export default {
    data() {
      return {
        userInfo:{}
      };
    },

    components: {headBox},

    computed: {

    },
    created(){
      getUser().then(res=>{
        console.log(res.body)
        if(res.body.code==1){
          this.userInfo = res.body.data
        }
      })

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
  .mint-cell{
    border-bottom: 1px solid #e7e7e7;
  }
</style>
