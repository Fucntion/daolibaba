<!--  -->
<template>
  <div>
      <head-box head-title="用户登录" noquick="true"  goBack="true" >
         <router-link slot="edit"  :to="'/register'" class="head_login">
            <span class="login_span" >注册</span>
        </router-link>
      </head-box>
      <div class="form">
        <mt-field label="手机号" placeholder="请输入手机号" type="tel" v-model="phone"></mt-field>
        <mt-field label="密码" placeholder="请输入密码" type="password" v-model="password"></mt-field>
        <div class="margin15"><mt-button @click="sub" class="sub" size="large" type="primary">登录</mt-button></div>
      </div>

      <div class="sns">
        <div class="qs">
          <i class="iconfont icon-qq qq " @click="qqGet()" ></i>
          <i class="iconfont icon-weixin-copy wx " @click="wxGet()" ></i>
          <i class="iconfont icon-weibo wb" @click="wbGet()" ></i>
        </div>
      </div>

  </div>
</template>

<script>
import headBox from "@/components/head";

import { login } from "@/service/getData";
import { setStore, getStore, removeStore } from "@/util/utils";

export default {
  data() {
    return {
      openUrl: {},
      phone: null,
      password: null,
      captcha: null
    };
  },

  components: {
    headBox
  },

  computed: {},

  created() {

    // if(this.$root.utils.getStore('access-token')){
    //   this.$root.mint.alertMsg('已经登录');
    //   this.$router.push({
    //     path:'/'
    //   })
    // }
    this.getOpenUrl();
  },
  methods: {
    getOpenUrl() {
      this.$http
        .post("/fun/v1/member/getAuthUrl", { channel: "wap_all" })
        .then(response => {
          let body = response.body;
          if (body.code === 1) {
            this.openUrl = body.data;
          }
        });
    },
    wxGet() {
      window.location.href = this.openUrl.wechat_pub;
    },
    wbGet() {
      window.location.href = this.openUrl.weibo_wap;
    },
    qqGet() {
      window.location.href = this.openUrl.qq_wap;
    },
    getWxOpenIdAuthUrl() {
      this.$http
        .post("/v1/member/getAuthUrl", { channel: "wechat_pub_pay" })
        .then(response => {
          let body = response.body;
          if (body.code === 1) {
            window.location.href = body.data;
          }
        });
    },
    sub() {
      let mise = login({
        phone: this.phone,
        password: this.password
      });
      mise.then(res => {
        let body = res.body;
        if (body.code === 1) {
          let token = res.body.data;
          this.$root.mint.alertMsg("登录成功");
          setStore("access-token", token.access_token);


          if (!body.data["wx_pub_openid"] && this.$root.isWX) {
            this.getWxOpenIdAuthUrl();
          }

           let forward = sessionStorage.getItem("forward");
          console.log(forward);

          if (forward) {
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
</style>
