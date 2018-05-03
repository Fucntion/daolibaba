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
const clubTop = r => require.ensure([], () => r(require('../page/club/Top')))
const clubMain = r => require.ensure([], () => r(require('../page/club/main')))
const clubArea = r => require.ensure([], () => r(require('../page/club/child/area')))
const clubList = r => require.ensure([], () => r(require('../page/club/list')))
const clubDetail = r => require.ensure([], () => r(require('../page/club/detail')))

const my = r => require.ensure([], () => r(require('../page/user/my')))
const profile = r => require.ensure([], () => r(require('../page/user/profile')))
const favorite = r => require.ensure([], () => r(require('../page/user/favorite')))

const reg = r => require.ensure([], () => r(require('../page/user/register')))
const login = r => require.ensure([], () => r(require('../page/user/login')))
const auth = r => require.ensure([], () => r(require('../page/auth')))
const bindPhone = r => require.ensure([], () => r(require('../page/user/bindPhone')))


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
const searchResult = r => require.ensure([], () => r(require('../page/search/result')))
// const resultMall = r => require.ensure([], () => r(require('../page/search/result/mall')))
// const resultCompany = r => require.ensure([], () => r(require('../page/search/result/company')))
// const resultInfo = r => require.ensure([], () => r(require('../page/search/result/info')))
// const resultClub = r => require.ensure([], () => r(require('../page/search/result/club')))


const sellerIndex = r => require.ensure([], () => r(require('../page/seller/index')))
const sellerMallIndex = r => require.ensure([], () => r(require('../page/seller/mall/index')))
const sellerMall = r => require.ensure([], () => r(require('../page/seller/mall/mall')))
const sellerReg = r => require.ensure([], () => r(require('../page/seller/reg')))


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
      path:'/search',
      component:searchIndex,
      children:[
        {
          path:'',
          component:searchFull,
        },
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
          path:'',
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
          component:sellerMallIndex,
        },
        {
          path:'mall/:id',
          component:sellerMall
        },
        {
          path:'reg',
          component:sellerReg
        }
      ]
    }

  ]
})
