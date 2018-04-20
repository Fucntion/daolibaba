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
	newAddress:{},
	chooseAddress:{},
	addressIndex:0,
}

export default new Vuex.Store({
	state,
	getters,
	actions,
	mutations,
})
