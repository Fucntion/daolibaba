import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

const home = r => require.ensure([], () => r(require('../page/home')),'home')

const mallMain = r => require.ensure([], () => r(require('../page/mall/main')),'mallMain')
const mallList = r => require.ensure([], () => r(require('../page/mall/list')),'mallList')
const mallDetail = r => require.ensure([], () => r(require('../page/mall/detail')),'mallDetail')
const cart = r => require.ensure([], () => r(require('../page/mall/cart')),'cart')

const infoMain = r => require.ensure([], () => r(require('../page/info/main')),'infoMain')
const infoList = r => require.ensure([], () => r(require('../page/info/list')),'infoList')
const infoDetail = r => require.ensure([], () => r(require('../page/info/detail')),'infoDetail')
const infoPost = r => require.ensure([], () => r(require('../page/info/post')),'infoPost')

const clubMain = r => require.ensure([], () => r(require('../page/club/main')),'clubMain')
const clubList = r => require.ensure([], () => r(require('../page/club/list')),'clubList')
const clubDetail = r => require.ensure([], () => r(require('../page/club/detail')),'clubDetail')

const my = r => require.ensure([], () => r(require('../page/user/my')),'my')
const reg = r => require.ensure([], () => r(require('../page/user/register')),'reg')
const login = r => require.ensure([], () => r(require('../page/user/login')),'login')

export default new Router({
  routes: [
    {
      path: '',
      redirect: '/mall'
    },
    {
      path: '/',
      name: 'home',
      redirect: '/mall'
    },
    {
      path: '/mall',
      component: mallMain,
      children: [{
          path: 'detial',
          component: mallDetail,
      }, 
      {
          path: 'list',
          component: mallList,
      },
    ]
    },
    {
      path: '/info',
      component: infoMain,
      children: [{
          path: 'detial',
          component: infoDetail,
      }, 
      {
          path: 'list',
          component: infoList,
      },
      {
        path: 'post',
        component: infoPost,
      }
    ]
    },

    {
      path: '/club',
      component: clubMain,
      children: [{
          path: 'detial',
          component: clubDetail,
      }, 
      {
          path: 'list',
          component: clubList,
      }
    ]
    },
    {
      path:'/cart',
      component:cart,
    },
    {
      path:'/my',
      component:my,
      children:[
        
      ]
    },
    {
      path:'/register',
      component:reg
    },
    {
      path:'/login',
      component:login
    }
  ]
})
