<!--  -->
<template>
  <div>
      <head-box head-title="用户登录" goBack="true" >
         <router-link slot="edit"  :to="'/register'" class="head_login">
            <span class="login_span" >注册</span>
        </router-link>
      </head-box>
      <div class="form">
        <mt-field label="手机号" placeholder="请输入手机号" type="tel" v-model="phone"></mt-field>
        <mt-field label="密码" placeholder="请输入密码" type="password" v-model="password"></mt-field>
        <div class="margin15"><mt-button @click="sub" class="sub" size="large" type="primary">登录</mt-button></div>
      </div>
      
  </div>
</template>

<script>
import headBox from '@/components/head'

import {login} from '@/service/getData'
import {setStore,getStore,removeStore} from '@/util/utils'

export default {
  data () {
    return {
      
      phone:15607683921,//null,
      password:3779010,//null,
      captcha:null
    }; 
  },

  components: {
      headBox
  },

  computed: {

  },


  methods: {
    sub(){

      
      let mise = login({
        phone:this.phone,
        password:this.password
      })
      mise.then((res) => {
          let body = res.body;
          if (body.code === 1) {
            let token = res.body.data;
            this.$root.mint.alertMsg('登录成功');
            setStore('access-token',token.access_token);
            let forward = getStore('forward');

            console.log(forward)
            if(forward){
              location.href = forward;
            }else{
              this.$router.push({
                path:'/'
              })
            }
          }
      })
      
    }
      
      
      
  },
  created(){



  }
}

</script>
<style lang='less' scoped>
@import "../../assets/style/base.less";
.captcha-btn{
  border-radius: 0;
  border-left: 2px solid #e7e7e7;
  padding-left: 5px;
  color: #666666;
}
</style>