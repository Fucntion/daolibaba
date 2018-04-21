import {getUser,city} from '../service/getData';
import {SET_USERINFO,SAVE_ADDRESS} from './mutation-types.js'
import {SET_AREA} from "./mutation-types";

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
  async getCityList({commit,state}){
	  city({
      parent_id:state.defaultProvienceId//海南省id，厉害了
    }).then(res=>{
      commit(SET_AREA,res.body.data)
    })
  }
}
