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


  methods: {}
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
</style>
