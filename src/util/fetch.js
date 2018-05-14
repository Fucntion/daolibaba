import {
	baseUrl
} from './env'
import Vue from 'vue'

export default async(url = '', data = {}, type = 'GET', method = 'fetch') => {
	
	type = type.toUpperCase();
	url = baseUrl + url;

	if (type == 'GET') {
		let dataStr = ''; //数据拼接字符串
		Object.keys(data).forEach(key => {
			dataStr += key + '=' + data[key] + '&';
		})

		if (dataStr !== '') {
			dataStr = dataStr.substr(0, dataStr.lastIndexOf('&'));
			url = url + '?' + dataStr;
		}
	}

	if(type=='POST'){
		return Vue.http.post(url,data)
	}else{
		return Vue.http.get(url)
	}
	
}