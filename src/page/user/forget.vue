<!--  -->
<template>
  <div>
      <head-box head-title="绑定手机号" noquick="true"  goBack="true"></head-box>
      <div class="form">
        <mt-field label="手机号" placeholder="请输入手机号" type="tel" v-model="phone"></mt-field>
        <mt-field label="验证码" v-model="captcha">
          <span @click="sendSms" class="captcha-btn">获取验证码</span>
        </mt-field>
        <mt-field label="密码" placeholder="请输入密码" type="password" v-model="password"></mt-field>
        <mt-field label="确认密码" placeholder="重复输入密码" type="password" v-model="passwordConfirm"></mt-field>
        <div class="margin15"><mt-button @click="forget" class="sub" size="large" type="primary">绑定</mt-button></div>
      </div>

  </div>
</template>

<script>
import headBox from "@/components/head";
import {sendSms,bindPhone,forget} from "../../service/getData";

import { mapState, mapActions } from "vuex";
import { MessageBox } from 'mint-ui';
export default {
  data() {
    return {
      phone: null,
      password:null,
      passwordConfirm:null,
      captcha: null
    };
  },

  components: {
    headBox
  },

  computed: {

  },

  methods: {
    sendSms() {

      sendSms(this.phone,"forget")


    },
    forget(){

        if(this.password!==this.passwordConfirm){
          this.$root.mint.alertMsg('两次密码不一样');
          return ;
        }

        forget({
          phone:this.phone,
          captcha:this.captcha,
          password:this.password
        })
        .then(res=>{
            if(res.body.code==1){
                this.$root.mint.messagesBox('密码修改成功',false);
                this.$router.push({
                    path:'/login'
                })
            }
        })
    }
  },
  created() {

  }
};
</script>
<style lang='less' scoped>
@import "../../assets/style/base.less";
.captcha-btn {
  border-radius: 0;
  border-left: 2px solid #e7e7e7;
  padding-left: 5px;
  color: #666666;
}
</style>
