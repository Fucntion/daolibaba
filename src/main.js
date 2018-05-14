// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import store from './store/';
import Mint from 'mint-ui';
import commConfig from './util/index';
import VueResource from 'vue-resource';

import router from './router'



let ag = navigator.userAgent,
    ua = ag.toLowerCase();
let ios = /(iPhone|iPad|iPod|iOS)/i;
let android = /(Android)/i;
ios.test(ag) && (Vue.prototype.isIos = true);
android.test(ag) && (Vue.prototype.isAndroid = true);
Vue.prototype.isWX = (ua.indexOf('micromessenger') !== -1);


Vue.config.productionTip = true
Vue.use(Mint);
Vue.use(VueResource);
Vue.use(commConfig);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
