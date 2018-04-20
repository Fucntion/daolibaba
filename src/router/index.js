import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)


const home = r => require.ensure([], () => r(require('../page/home')))


const mallCategory = r => require.ensure([], () => r(require('../page/mall/category')))
const mall = r => require.ensure([], () => r(require('../page/mall/index')))
const mallMain = r => require.ensure([], () => r(require('../page/mall/main')))
const mallList = r => require.ensure([], () => r(require('../page/mall/list')))
const mallDetail = r => require.ensure([], () => r(require('../page/mall/detail')))
const mallDetailShow = r => require.ensure([], () => r(require('../page/mall/detail/show')))
const mallDetailInfo = r => require.ensure([], () => r(require('../page/mall/detail/info')))
const mallDetailComment = r => require.ensure([], () => r(require('../page/mall/detail/comment')))

//商家手机版
const store = r => require.ensure([], () => r(require('../page/store/index')))
const storeHome = r => require.ensure([], () => r(require('../page/store/home')))

//店铺展示
const storeShow = r => require.ensure([], () => r(require('../page/store/show')))

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
const profile = r => require.ensure([], () => r(require('../page/user/profile')))


const reg = r => require.ensure([], () => r(require('../page/user/register')))
const login = r => require.ensure([], () => r(require('../page/user/login')))
const auth = r => require.ensure([], () => r(require('../page/auth')))
const bindPhone = r => require.ensure([], () => r(require('../page/user/bindPhone')))

const orderConfirm = r => require.ensure([], () => r(require('../page/confirmorder/confirm')))
const addressAdd = r => require.ensure([], () => r(require('../page/confirmorder/address/add')))
const addressChoose = r => require.ensure([], () => r(require('../page/confirmorder/address/choose')))
const addressSearch = r => require.ensure([], () => r(require('../page/confirmorder/address/search')))

const orderMain = r => require.ensure([], () => r(require('../page/order/main')))
const myOrder = r => require.ensure([], () => r(require('../page/order/my')))
const orderDetail = r => require.ensure([], () => r(require('../page/order/detail')))

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
      path: '/auth',
      component: auth
    },
    {
      path: '/confirmOrder',
      component: orderConfirm,//不写在前面就匹配成/order/:id了
      children: [
        {
          path: 'chooseAddress',
          component: addressChoose,
          children: [
            {
              path: 'addAddress',
              component: addressAdd,
              children: [
                {
                  path: 'serachAddress',
                  component: addressSearch
                }
              ]
            }
          ]
        }

      ]
    },
    {
      path: '/order',
      component: orderMain,
      children: [
        {
          path: '',
          component: myOrder//默认是订单列表
        },
        {
          path: ':id',
          component: orderDetail
        }
      ]
    },
    {
      path: '/mall',
      component: mall,
      children: [
        {
          path: '',
          component: mallMain
        },
        {
          path:'category',
          component:mallCategory
        },
        {
          path: 'list',
          component: mallList,
        },
        {
          path: 'detail/:id',
          component: mallDetail,
          children: [
            {
              path: '',
              redirect: 'show'
            },
            {
              path: 'show',
              component: mallDetailShow
            },
            {
              path: 'info',
              component: mallDetailInfo,
            },
            {
              path: 'comment',
              component: mallDetailComment
            },

          ]
        },
      ]
    },
    {
      path: '/info',
      component: info,
      children: [
        {
          path: '',
          component: infoMain
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
      path: '/cart',
      component: cart,
    },
    {
      path: '/my',
      component: my,
    },
    {
      path:'/my/profile',
      component:profile
    },
    {
      path: '/register',
      component: reg
    },
    {
      path: '/login',
      component: login
    },
    {
      path: '/bindPhone',
      component: bindPhone
    },
    {
      path:'/store',
      component:store,
      children:[
        {
          path:'home',
          redirect:'/store/show',
        },
        {
          path:'show',
          component:storeShow
        },
        {
          path:'home',
          component:storeHome
        },
      ]
    }

  ]
})
