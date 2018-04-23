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
    this.directRightUrl()
    if(this.$root.isWX){
      this.$root.utils.getWxConfig()
    }else{
      this.$root.mint.alertMsg('建议用微信浏览器打开');
    }

  },


  methods: {

			directRightUrl() {
            let { href, protocol, host, search, hash } = window.location;
            const pathname = '/fun/';
            search = search || '?';
            hash = hash || '#/';
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
