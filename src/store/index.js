import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './action'
import getters from './getters'

Vue.use(Vuex)

const state = {
	latitude: '', // 当前位置纬度
	longitude: '', // 当前位置经度
  areas:[],//整站地区的列表，现在是一级（海南内部的）
	userInfo:null, //用户信息
	mask:false,
	maskzIndex:0,
	address:[],
	chooseAddress:{},
  defaultProvienceId:22,
  defaultCityId:3145,
  shopProductCount:0,//购物车当前商品数量
  wxurl:null,//记录微信jssdk或者支付的路径
}

export default new Vuex.Store({
	state,
	getters,
	actions,
	mutations,
})
