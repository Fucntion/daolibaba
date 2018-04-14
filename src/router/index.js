import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

const home = r => require.ensure([], () => r(require('../page/home')))

const mallMain = r => require.ensure([], () => r(require('../page/mall/main')))
const mallList = r => require.ensure([], () => r(require('../page/mall/list')))
const mallDetail = r => require.ensure([], () => r(require('../page/mall/detail')))
const cart = r => require.ensure([], () => r(require('../page/mall/cart')))

const infoMain = r => require.ensure([], () => r(require('../page/info/main')))
const infoList = r => require.ensure([], () => r(require('../page/info/list')))
const infoDetail = r => require.ensure([], () => r(require('../page/info/detail')))
const infoPost = r => require.ensure([], () => r(require('../page/info/post')))

const clubMain = r => require.ensure([], () => r(require('../page/club/main')))
const clubList = r => require.ensure([], () => r(require('../page/club/list')))
const clubDetail = r => require.ensure([], () => r(require('../page/club/detail')))

const my = r => require.ensure([], () => r(require('../page/user/my')))
const reg = r => require.ensure([], () => r(require('../page/user/register')))
const login = r => require.ensure([], () => r(require('../page/user/login')))

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
      children:[{
          path:'register',
          component:reg
        },
        {
          path:'login',
          component:login
        }
      ]
    },
  ]
})
