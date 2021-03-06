import Vue from 'vue'
import Router from 'vue-router'
import {SET_WX_URL} from "../store/mutation-types";
import STORE from '../store';
Vue.use(Router)


const home = r => require.ensure([], () => r(require('../page/home')))
const notFound = r => require.ensure([], () => r(require('../page/notfound')))

const mallCategory = r => require.ensure([], () => r(require('../page/mall/category')))
const mall = r => require.ensure([], () => r(require('../page/mall/index')))
const mallMain = r => require.ensure([], () => r(require('../page/mall/main')))
const mallList = r => require.ensure([], () => r(require('../page/mall/list')))
const mallDetail = r => require.ensure([], () => r(require('../page/mall/detail')))
const mallDetailShow = r => require.ensure([], () => r(require('../page/mall/detail/show')))
const mallDetailInfo = r => require.ensure([], () => r(require('../page/mall/detail/info')))
const mallDetailScore = r => require.ensure([], () => r(require('../page/mall/detail/score')))
//品牌
const brand = r => require.ensure([], () => r(require('../page/brand/brand')))
const brandType = r => require.ensure([], () => r(require('../page/brand/child/type')))
const brandList = r => require.ensure([], () => r(require('../page/brand/child/list')))
//店铺
const store = r => require.ensure([], () => r(require('../page/store/index')))
const storeShow = r => require.ensure([], () => r(require('../page/store/show')))
const storeType = r => require.ensure([], () => r(require('../page/store/child/type')))
const storeTop = r => require.ensure([], () => r(require('../page/store/top')))


const cart = r => require.ensure([], () => r(require('../page/mall/cart')))

const info = r => require.ensure([], () => r(require('../page/info/index')))
const infoMain = r => require.ensure([], () => r(require('../page/info/main')))
const infoSelf = r => require.ensure([], () => r(require('../page/info/my')))
const infoCategory = r => require.ensure([], () => r(require('../page/info/category')))
const infoList = r => require.ensure([], () => r(require('../page/info/list')))
const infoDetail = r => require.ensure([], () => r(require('../page/info/detail')))
const infoPost = r => require.ensure([], () => r(require('../page/info/post')))

const club = r => require.ensure([], () => r(require('../page/club/index')))
const clubTop = r => require.ensure([], () => r(require('../page/club/top')))
const clubMain = r => require.ensure([], () => r(require('../page/club/main')))
const clubArea = r => require.ensure([], () => r(require('../page/club/child/area')))
const clubList = r => require.ensure([], () => r(require('../page/club/list')))
const clubDetail = r => require.ensure([], () => r(require('../page/club/detail')))

const my = r => require.ensure([], () => r(require('../page/user/my')))
const profile = r => require.ensure([], () => r(require('../page/user/profile')))
const favorite = r => require.ensure([], () => r(require('../page/user/favorite')))

const reg = r => require.ensure([], () => r(require('../page/user/register')))
const login = r => require.ensure([], () => r(require('../page/user/login')))
const smsLogin = r => require.ensure([], () => r(require('../page/user/smslogin')))
const auth = r => require.ensure([], () => r(require('../page/auth')))
const bindPhone = r => require.ensure([], () => r(require('../page/user/bindphone')))
const forget = r => require.ensure([], () => r(require('../page/user/forget')))


const ConfirmIndex = r => require.ensure([], () => r(require('../page/confirmorder/index')))
const orderConfirm = r => require.ensure([], () => r(require('../page/confirmorder/confirm')))
const orderPayResult = r => require.ensure([], () => r(require('../page/confirmorder/result')))


const addressIndex = r => require.ensure([], () => r(require('../page/address/index')))
const addressList = r => require.ensure([], () => r(require('../page/address/list')))
const addressChoose = r => require.ensure([], () => r(require('../page/address/choose')))
const addressAdd = r => require.ensure([], () => r(require('../page/address/add')))
const addressEdit = r => require.ensure([], () => r(require('../page/address/edit')))

const orderMain = r => require.ensure([], () => r(require('../page/order/main')))
const myScore = r => require.ensure([], () => r(require('../page/order/score')))
const myOrder = r => require.ensure([], () => r(require('../page/order/my')))
const orderDetail = r => require.ensure([], () => r(require('../page/order/detail')))

const searchIndex = r => require.ensure([], () => r(require('../page/search/index')))
const searchFull = r => require.ensure([], () => r(require('../page/search/full')))
const searchMall = r => require.ensure([], () => r(require('../page/search/mall')))
const searchResult = r => require.ensure([], () => r(require('../page/search/result')))
// const resultMall = r => require.ensure([], () => r(require('../page/search/result/mall')))
// const resultCompany = r => require.ensure([], () => r(require('../page/search/result/company')))
// const resultInfo = r => require.ensure([], () => r(require('../page/search/result/info')))
// const resultClub = r => require.ensure([], () => r(require('../page/search/result/club')))


const sellerIndex = r => require.ensure([], () => r(require('../page/seller/index')))
const sellerMallIndex = r => require.ensure([], () => r(require('../page/seller/mall/index')))
const sellerMall = r => require.ensure([], () => r(require('../page/seller/mall/mall')))
const sellerReg = r => require.ensure([], () => r(require('../page/seller/reg')))
const sellerOrderIndex = r => require.ensure([], () => r(require('../page/seller/order/index')))
const sellerOrder = r => require.ensure([], () => r(require('../page/seller/order/order')))
const sellerCashIndex = r => require.ensure([], () => r(require('../page/seller/cash/index')))
const sellerCashWithdraw = r => require.ensure([], () => r(require('../page/seller/cash/withdraw')))
const sellerProfile = r => require.ensure([], () => r(require('../page/seller/profile/index')))
const sellerProfileSet = r => require.ensure([], () => r(require('../page/seller/profile/set')))



const router = new Router({
  mode: 'history',
  saveScrollPosition:true,
  routes: [
    {
      path: '',
      redirect: '/mall'
    },
    {
      path:'/notfound',
      component:notFound
    },
    {
      path: '/',
      name: 'home',
      redirect: '/mall'
    },
    {
      path:'/search',
      component:searchIndex,
      children:[
        {
          path:'',
          component:searchFull,
        },
        {
          path:'mall',
          component:searchMall
        }
      ]
    },
    {
      path:'/r',
      component:searchResult
    },
    {
      path: '/auth',
      component: auth
    },
    {
      path: '/confirmOrder',
      component: ConfirmIndex,//不写在前面就匹配成/order/:id了
      children: [

        {
          path:'/',
          component:orderConfirm
        },
        {
          path:'payresult',
          component:orderPayResult
        },
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
          path:'score',
          component:myScore
        },
        {
          path: ':id',
          component: orderDetail
        }
      ]
    },
    {
      path: '/brand',
      component: brand,
      children: [
        {
          path: '',
          redirect: '/brand/list'
        },
        {
          path: 'list',
          component: brandList
        },
        {
          path: 'type',
          component: brandType
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
          path: 'category',
          component: mallCategory
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
              path: 'score',
              component: mallDetailScore
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
          path:'my',
          component:infoSelf
        },
        {
          path: 'category',
          component: infoCategory,
        },
        {
          path: 'list/:catid',
          component: infoList,
        },
        {
          path: 'post',
          component: infoPost,
        },
        {
          path: ':id',
          component: infoDetail,
        },

      ]
    },

    {
      path: '/club',
      component: club,
      children: [
        {
          path: '',
          component: clubMain
        },
        {
          path:'top',
          component:clubTop
        },
        {
          path: 'area',
          component: clubArea,
        },
        {
          path: 'list',
          component: clubList,
        },
        {
          path: ':id',
          component: clubDetail,
        }
      ]
    },
    {
      path: '/cart',
      component: cart,
    },
    {
      path:'/favorite',
      component:favorite
    },
    {
      path: '/my',
      component: my,
    },
    {
      path: '/my/profile',
      component: profile
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
      path:'/smslogin',
      component:smsLogin
    },
    {
      path: '/forget',
      component: forget
    },
    {
      path: '/bindPhone',
      component: bindPhone
    },
    {
      path: '/store',
      component: store,
      children: [
        {
          path: 'top',
          component: storeTop,
        },
        {
          path: ':id',
          component: storeShow,

        },
        {
          path:':id/type/:type',
          component:storeType
        }

      ]
    },
    {
      path: '/address',
      component: addressIndex,
      children: [
        {
          path:'',
          component:addressList
        },
        {
          path:'choose',
          component:addressChoose
        },
        {
          path: 'add',
          component: addressAdd,
        },
        {
          path: ':id',
          component: addressEdit,
        },
      ]
    },
    {
      path:'/seller',
      component:sellerIndex,
      children:[
        {
          path:'',
          redirect:'/seller/mall'
        },{
          path:'mall',
          component:sellerMallIndex,
        },
        {
          path:'mall/:id',
          component:sellerMall//不用子路由是不想多建立一个模板文件
        },
        {
          path:'reg',
          component:sellerReg
        },
        {
          path:'order',
          component:sellerOrderIndex
        },
        {
          path:'order/:id',
          component:sellerOrder
        },
        {
          path:'cash',
          component:sellerCashIndex
        },
        {
          path:'withdraw',
          component:sellerCashWithdraw
        },
        {
          path:'profile/set',
          component:sellerProfileSet
        },
        {
          path:'profile',
          component:sellerProfile
        },
      ]
    },
    // { path: '*', redirect:'/mall' }

  ]
})

// router.beforeEach((to, from, next) => {
//   window.scrollTo(0, 0)
//   next()
// })

router.beforeEach((to, from, next) => {
  if(to.meta.title){
    document.title = to.meta.title
  }

  // 处理jssdk签名,兼容history模式
  if (!STORE.state.wxurl) {
    STORE.commit('SET_WX_URL', document.URL)
  }
  next()
})
export default router
