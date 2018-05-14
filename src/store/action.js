import {getUser,city} from '../service/getData';
import {SET_USERINFO,SAVE_ADDRESS,SET_CART_PRODUCT_COUNT,SET_WX_URL} from './mutation-types.js'
import {SET_AREA} from "./mutation-types";
import cart from '../service/shopCart';
export default {

	async getUserInfo({
		commit,
		state
	}){

		let mise = getUser();
		mise.then(res =>{
			let body = res.body;
			if(body.code === 1) {
				commit(SET_USERINFO,res.body.data);
			}
		});

	},
  async getCartProductCount({commit, state}){

    commit(SET_CART_PRODUCT_COUNT,cart.getProductCount());
  },
  async getWxUrl({commit,state}){
    commit(SET_WX_URL,document.URL)
  },
  async getCityList({commit,state}){
	  city({
      parent_id:state.defaultProvienceId//海南省id，厉害了
    }).then(res=>{
      commit(SET_AREA,res.body.data)
    })
  },
}
