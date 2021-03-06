import {
	SET_USERINFO,
	ADD_ADDRESS,
	CHOOSE_ADDRESS,
	DEL_ADDRESS,
	SET_ADDRESS,
	CLOSE_MASK,
	SHOW_MASK,
  SET_AREA,
  SET_CART_PRODUCT_COUNT,
  SET_WX_URL
} from './mutation-types.js'

import {setStore, getStore} from '../util/utils'

import {localapi, proapi} from '../util/env'

export default {
  [SET_AREA](state,info){
    state.areas = info;
  },
	//获取用户信息存入vuex
	[SET_USERINFO](state, info) {

		state.userInfo = info;

	},
	[ADD_ADDRESS](state,address){
		state.address.puth(address)
	},
	[CHOOSE_ADDRESS](state, {
		address
	}) {
		state.chooseAddress = address;
	},
	[DEL_ADDRESS](state,index){
		delete state.address[index]
	},
	[SET_ADDRESS](state,address){
		state.address[index] = address
	},
	[CLOSE_MASK](state){
		state.mask = false
	},
	[SHOW_MASK](state,index){
		state.mask = true
		state.maskzIndex = index||1;
	},
  [SET_CART_PRODUCT_COUNT](state,num){
    state.shopProductCount = num
  },
  [SET_WX_URL](state,url){
    state.wxurl = url;
  }


}
