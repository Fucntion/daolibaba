import {getUser} from '../service/getData';
import {SET_USERINFO,SAVE_ADDRESS} from './mutation-types.js'

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
}