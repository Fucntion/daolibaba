<!--  -->
<template>
  <div>
      微信授权中
  </div>
</template>

<script>
import {getWXopenId,snsLogin} from '../service/getData';
import {getStore,setStore} from "../util/utils";

export default {
  data () {
    return {
        snsConfig: {}
    };
  },

created(){

    this.snsConfig.code = this.$root.utils.getUrlValueByKey('code');
    this.snsConfig.channel = this.$root.utils.getUrlValueByKey('type');
    this.snsConfig.state = this.$root.utils.getUrlValueByKey('state');
    if(this.snsConfig.channel === 'wechat_pub_pay'){
        this.getWXopenId();
    }else{
        this.getToken();
    }
},
  components: {},

  computed: {},

  mounted: {},

  methods: {

      getToken() {

            snsLogin(this.snsConfig).then((response) => {
                let body = response.body;
                if (body.code === 1) {
                    setStore('access-token', body.data['access-token']);
                    setStore('token_expire', body.data['token_expire']);
                    setStore('wx_pub_openid', body.data['wx_pub_openid']);

                    if (!body.data['wx_pub_openid'] && this.$root.isWX) {
                        this.getOpenUrl();
                    } else {

                        if(body.data['is_bind_phone']){
                            this.$router.push({path:'/bindPhone'});
                        }
                        let forward = sessionStorage.getItem("forward");

                        if (forward) {
                            location.href = forward;
                        } else {
                            this.$router.push({
                            path: "/"
                            });
                        }
                    }
                }else{
                  this.$root.mint.alertMsg(body.data.msg||'登录失败');
                  this.$router.push({
                    path:'/login'
                  })
                }
            });
        },
        getOpenUrl() {
            this.$http.post('/v1/member/getAuthUrl', { channel: 'wechat_pub_pay' }).then((response) => {
                let body = response.body;
                if (body.code === 1) {
                    window.location.href = body.data;
                }
            });
        },

        //获取微信openid
        getWXopenId(){

            getWXopenId(this.snsConfig).then( response => {
                let body = response.body;
                if (body.code === 1) {
                    //这里存起来，其他地方可以用vuex和本地储存一起来用的
                    setStore('wx_pub_openid', body.data);

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
            })
        }

  }
}

</script>
<style lang='less' scoped>
</style>
