<!--  -->
<template>
  <div>
      <head-box head-title="用户注册" goBack="true">
        <router-link slot="edit"  :to="'/login'" class="head_login">
            <span class="login_span" >已有账号登录</span>
        </router-link>
      </head-box>
      <div class="form">
        <mt-field label="手机号" placeholder="请输入手机号" :state="validatePhone?'success':'error'" type="tel" v-model="phone"></mt-field>
        <mt-field  label="验证码" v-model="captcha">
          <span @click="sendSms()" class="captcha-btn">获取验证码</span>
        </mt-field>
        <mt-field label="密码" placeholder="请输入密码" type="password" v-model="password"></mt-field>
        <div class="margin15"><mt-button @click="reg" class="sub" size="large" type="primary">注册</mt-button></div>
      </div>

  </div>
</template>

<script>
import headBox from '@/components/head'

import {sendSms,register} from '@/service/getData'
import {checkMobile} from "../../util/utils";

export default {
  data () {
    return {
      phone:null,
      password:null,
      captcha:null
    };
  },

  components: {
      headBox
  },

  computed: {
      validatePhone(){
        return checkMobile(this.phone)
      }
  },


  methods: {
    sendSms() {
      if(!this.validatePhone){
        this.$root.mint.alertMsg('手机号码格式不对')
        return false;
      }
      sendSms(this.phone,"bingphone").then(res=>{
        if(res.body.code==1){
          this.$root.mint.alertMsg('验证码发送成功')
        }
      })
    },
    reg(){
      let mise = register({
        phone:this.phone,
        password:this.password
      })
      mise.then((res) => {
          let body = res.body;
          if (body.code === 1) {
              this.$root.mint.alertMsg('注册成功');
              this.$router.push({
                path:'/login'
              })
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
