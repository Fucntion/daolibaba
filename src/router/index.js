import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)


const home = r => require.ensure([], () => r(require('../page/home')))

const mall = r => require.ensure([], () => r(require('../page/mall/index')))
const mallMain = r => require.ensure([], () => r(require('../page/mall/main')))
const mallList = r => require.ensure([], () => r(require('../page/mall/list')))
const mallDetail = r => require.ensure([], () => r(require('../page/mall/detail')))
const mallDetailShow = r => require.ensure([], () => r(require('../page/mall/detail/show')))
const mallDetailInfo = r => require.ensure([], () => r(require('../page/mall/detail/info')))
const mallDetailComment = r => require.ensure([], () => r(require('../page/mall/detail/comment')))


const cart = r => require.ensure([], () => r(require('../page/mall/cart')))

const info = r => require.ensure([], () => r(require('../page/info/index')))
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
      component: mall,
      children: [
        {
          path:'',
          component:mallMain
        },
     
        {
            path: 'list',
            component: mallList,
        },
        {
          path: 'detail/:id',
          component: mallDetail,
          children:[
            {
              path:'',
              redirect:'show'
            },
            {
              path:'show',
              component:mallDetailShow
            },
            {
              path:'info',
              component:mallDetailInfo,
            },
            {
              path:'comment',
              component:mallDetailComment
            },

          ]
      }, 
      ]
    },
    {
      path: '/info',
      component:info,
      children: [
        {
          path:'',
          component:infoMain
        },
        {
          path: 'detail/:id',
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
          path: 'detail',
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
