<!--  -->
<template>
  <div>
    <head-box :goBack="true" head-title="个人信息"></head-box>
    <div class=" block" v-if="userInfo">
      <div @click="chooseImage()"><mt-cell title="头像"   > <img  style="width: 44px;margin: 10px 0" :src="userInfo.headimgurl" /></mt-cell></div>
      <div @click="changeNick()"><mt-cell  title="昵称" :value="userInfo.nickname"></mt-cell></div>
      <mt-cell title="手机号码"  to="/bindPhone"  :value="userInfo.phone||'点击绑定'"></mt-cell>
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
  import {getUser,changeInfo} from "../../service/getData";
  import {mapState, mapActions} from "vuex";
  import { MessageBox } from 'mint-ui';
  import store from '../../store';
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
      changeHeadImg(serverId){
        changeInfo({
          headimgurl:serverId,
          channel:'wx_pub'//留个参数，方便区分直传的还是需要从微信拿图片
        }).then(res=>{
          if(res.body.code==1){
            this.$root.mint.messagesBox('修改成功',false);
            getUser().then(res=>{
              console.log(res.body)
              if(res.body.code==1){
                this.userInfo = res.body.data
              }
            })
          }
        })
      },
      chooseImage() {
        let _self = this;
        this.$root.wx.chooseImage({
          count: 1, // 默认9
          sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
          sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
          success: function (res) {
            let localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
            _self.$root.mint.loading('图片上传中');
            store.commit('SHOW_MASK',999999999);

            _self.$root.wx.uploadImage({
              localId: localIds[0].toString(),
              isShowProgressTips: 0,
              success: function (res) {

                let serverId = res.serverId; // 返回图片的服务器端ID //其他对serverId做处理的代码
                store.commit('CLOSE_MASK')
                _self.$root.mint.close();
                _self.changeHeadImg(serverId)

              }
            });






          }
        });
      },
      changeNick(){

        MessageBox.prompt('请输入姓名').then(({ value, action }) => {
          changeInfo({
            nickname:value
          }).then(res=>{
            if(res.body.code==1){
              this.$root.mint.messagesBox('修改成功',false);
              getUser().then(res=>{
                console.log(res.body)
                if(res.body.code==1){
                  this.userInfo = res.body.data
                }
              })
            }
          })
        });
      },
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
