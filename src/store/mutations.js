import {
	SET_USERINFO,
	ADD_ADDRESS,
	CHOOSE_ADDRESS,
	DEL_ADDRESS,
	SET_ADDRESS,
	CLOSE_MASK,
	SHOW_MASK,
  SET_AREA
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
		address,
		index
	}) {
		state.chooseAddress = address;
		state.addressIndex = index;
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
	}


}
