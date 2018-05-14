<!--  -->
<template>
  <div>
      <head-box head-title="绑定手机号" noquick="true"  goBack="true"></head-box>
      <div class="form">
        <mt-field label="手机号" placeholder="请输入手机号" type="tel" v-model="phone"></mt-field>
        <mt-field label="验证码" v-model="captcha">
          <span @click="sendSms" class="captcha-btn">获取验证码</span>
        </mt-field>
        <div class="margin15"><mt-button @click="bindPhone" class="sub" size="large" type="primary">绑定</mt-button></div>
      </div>

  </div>
</template>

<script>
import headBox from "@/components/head";
import {sendSms,bindPhone,getUser} from "../../service/getData";

import { mapState, mapActions } from "vuex";
import { MessageBox } from 'mint-ui';
export default {
  data() {
    return {
      phone: null,
      userInfo:null,
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

        if(this.userInfo.phone){
            MessageBox.confirm('当前用户已绑定手机,是否覆盖?').then(action => {
              sendSms(this.phone,"bingphone")
            }).catch(action=>{});
        }


    },
    bindPhone(){

        if(this.userInfo.phone){
            MessageBox.confirm('当前用户已绑定手机,是否覆盖?').then(action => {

            });
        }

        bindPhone(this.phone,this.captcha)
        .then(res=>{
            if(res.body.code==1){
                this.$root.mint.messagesBox('绑定成功',true);
                this.$router.push({
                    path:'/'
                })
            }
        })
    }
  },
  created() {
    getUser().then(res=>{
      console.log(res.body)
      if(res.body.code==1){
        this.userInfo = res.body.data
      }
    })
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
