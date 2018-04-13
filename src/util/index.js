import Vue from 'vue';
import mint from './mint.config';
import utils from './utils';
import interceptorsConfig from './interceptors.config';
import wx from 'weixin-js-sdk';
import filter from './filter';


/** 
 *  DatetimePicker 注册在 components.index.js中    一时间竟不知道注册在哪里比较合适
*/
export default {
    install(Vue, options) {
        Vue.prototype.mint = mint;
        Vue.prototype.utils = utils;
        Vue.prototype.wx = wx;
        Vue.http.interceptors.push(interceptorsConfig);
        Vue.http.options.emulateJSON = true;
        Vue.http.options.emulateHTTP = true;
        filter.map(value =>{
            Vue.filter(value.name, value.methods);
        });
    }
}
