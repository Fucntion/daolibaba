<template>
  <div id="wrap">
    <transition name="router-fade" mode="out-in">
			<router-view></router-view>
		</transition>
		<div class="mask" v-show="mask" :style="{index:maskzIndex}"></div>
  </div>
</template>

<script>
import {mapState, mapMutations} from 'vuex'
import wx from 'weixin-js-sdk';
export default {
	name: 'App',
  data () {
    return {
			index:null,
			mask:false
    };
  },


  components: {},

  computed: {
		...mapState([
				'maksk','maskzIndex'
		]),
	},

  created(){
    // this.directRightUrl()
    if(this.$root.isWX){
      this.$root.utils.getWxConfig().then(res=>{

        // wx.ready(function () {
        //   //分享到朋友圈"
        //   wx.onMenuShareTimeline({
        //     title: '岛里巴巴-海南专业批发采购服务平台',
        //     link: location.href, // 分享链接
        //     imgUrl: 'https://daolibaba2018.oss-cn-shenzhen.aliyuncs.com/share_logo.png', // 分享图标
        //     success: function () {
        //       // console.log('分享到朋友圈成功')
        //     },
        //     cancel: function () {
        //       // console.log('分享到朋友圈失败')
        //     }
        //   });
        //   //分享给朋友
        //   wx.onMenuShareAppMessage({
        //     title: '岛里巴巴-海南专业批发采购服务平台',
        //     link: location.href, // 分享链接
        //     imgUrl: 'https://daolibaba2018.oss-cn-shenzhen.aliyuncs.com/share_logo.png', // 分享图标
        //     desc: '省事省力省心', // 分享描述
        //     success: function () {
        //       // console.log('分享到朋友成功')
        //     },
        //     cancel: function () {
        //       // console.log('分享到朋友失败')
        //     }
        //   });
        // })

      })
    }else{
      this.$root.mint.alertMsg('建议用微信浏览器打开');
    }

  },


  methods: {

			directRightUrl() {
            let { href, protocol, host, search, hash } = window.location;
            console.log(search,hash)
            const pathname = '/fun/';
            search = search || '?';
        hash = hash || '#/';//history
        // hash = hash;
            let newHref = `${protocol}//${host}${pathname}${search}${hash}`;
            if (newHref !== href) {
                window.location.replace(newHref);
            }
				}

	}
}

</script>

<style lang="less">
@import './assets/style/app.less';
.router-fade-enter-active, .router-fade-leave-active {
	  	transition: opacity .3s;
	}
	.router-fade-enter, .router-fade-leave-active {
	  	opacity: 0;
	}

.mask{
	position: fixed;
	opacity: 0.4;
	background: rgba(0, 0, 0, 0.2);
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
}
</style>
