<!--  -->
<template>
  <div>
      微信授权中
  </div>
</template>

<script>
import {getWXopenId,snsLogin} from '../service/getData';

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
                    this.$root.utils.setStore('access-token', body.data['access-token']);
                    this.$root.utils.setStore('token_expire', body.data['token_expire']);
                    this.$root.utils.setStore('wx_pub_openid', body.data['wx_pub_openid']);
                    if (!body.data['wx_pub_openid'] && this.$root.isWX) { 
                        this.getOpenUrl();
                    } else {
                        this.getUserInfo()
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
                    this.$root.setStore('wx_pub_openid', body.data);

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