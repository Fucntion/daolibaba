// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Mint from 'mint-ui';
import commConfig from './util/index';
import VueResource from 'vue-resource';



Vue.config.productionTip = true
Vue.use(Mint);
Vue.use(VueResource);
Vue.use(commConfig);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
