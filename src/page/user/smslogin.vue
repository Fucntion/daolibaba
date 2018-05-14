<!--  -->
<template>
  <div>
      <head-box head-title="快捷登录" noquick="true"  goBack="true" >

      </head-box>
      <div class="form">
        <mt-field label="手机号" placeholder="请输入手机号" type="tel" v-model="phone"></mt-field>
        <mt-field  label="验证码" v-model="captcha">
          <span @click="sendSms()" class="captcha-btn">获取验证码</span>
        </mt-field>

        <div class="margin15" @click="sub"><mt-button  class="sub" size="large" type="primary">快捷登录</mt-button></div>
      </div>





  </div>
</template>

<script>
import headBox from "@/components/head";
import {sendSms,smsLogin} from "../../service/getData";

import {setStore, getStore, removeStore} from "../../util/utils";

export default {
  data() {
    return {

      phone: null,
      captcha: null
    };
  },

  components: {
    headBox
  },

  computed: {},

  created() {


  },
  methods: {
    sendSms() {
      sendSms(this.phone,"login").then(res=>{
        if(res.body.code==1){
          this.$root.mint.alertMsg('验证码发送成功');
        }else{
          this.$root.mint.alertMsg('验证码发送失败');
        }
      })

    },
    sub() {
      smsLogin({
        phone: this.phone,
        captcha: this.captcha
      }).then(res => {
        let body = res.body;
        if (body.code === 1) {
          let token = res.body.data;
          this.$root.mint.alertMsg("登录成功");
          setStore("access-token", token.access_token);

          // if (!body.data["wx_pub_openid"] && this.$root.isWX) {
          //   this.getWxOpenIdAuthUrl();
          // }

           let forward = sessionStorage.getItem("forward");
          console.log(forward);

          if (forward&&forward.indexOf('login')<0) {
            location.href = forward;
          } else {
            this.$router.push({
              path: "/"
            });
          }
        }
      });
    }
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
.sns {
  position: fixed;
  bottom: 60px;
  width: 100%;
  .qs {
    margin: 0 auto;
    width: 300px;
    display: flex;
    .iconfont {
      flex: 1;
      text-align: center;
      font-size: 40px;
      &.qq {
        color: #26a2ff;
      }
      &.wx {
        color: rgb(80, 182, 116);
      }
      &.wb {
        color: rgb(234, 93, 92);
      }
    }
  }
}
  .forget{
    display: block;
    text-align: right;
  }
</style>
