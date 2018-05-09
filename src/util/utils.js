import {pay, getJsSign} from '../service/getData';
import wx from 'weixin-js-sdk';
import Vue from 'vue'

/**
 * 存储localStorage
 */
export const setStore = (name, content) => {
  if (!name) return;
  if (typeof content !== 'string') {
    content = JSON.stringify(content);
  }
  window.localStorage.setItem(name, content);
}

/**
 * 获取localStorage
 */
export const getStore = name => {
  if (!name) return;
  return window.localStorage.getItem(name);
}

/**
 * 删除localStorage
 */
export const removeStore = name => {
  if (!name) return;
  window.localStorage.removeItem(name);
}


export const cloneObj = obj => {
  let str, newobj = obj.constructor === Array ? [] : {};
  if (typeof obj !== 'object') {
    return;
  } else if (window.JSON) {
    str = JSON.stringify(obj), //系列化对象
      newobj = JSON.parse(str); //还原
  } else {
    for (var i in obj) {
      newobj[i] = typeof obj[i] === 'object' ?
        cloneObj(obj[i]) : obj[i];
    }
  }
  return newobj;
};

export const checkMobile = (phone) => {
  var sMobile = phone

  if (!(/^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/.test(sMobile))) {
    return false;
  }
  console.log(111)
  return true
}


const defaultProvienceId = 22;
const defaultCityId = 266;//数据库里面海南的名字
const emptyObject = obj => {
  for (var prop in obj) {
    if (obj[prop] === '' || obj[prop] === undefined || obj[prop] === null || obj[prop] === 'undefined') {
      delete obj[prop];
    }
  }
  return obj;
}

/**
 *
 * @param {合并支付订单号} out_trade_no 一个合并支付订单号和多个真实订单对应，用来和第三方支付对接。支付状态和这个关联，支付成功后回调修改各个子订单状态即可
 * @param {支付渠道} channel 支付渠道 wx_pub  union wx_mini ali wx_app
 */
export const unifiedPay = function (out_trade_no, channel = 'wx_pub') {

  let payPromise = new Promise(function (resolve, reject) {
    //当异步代码执行成功时，我们才会调用resolve(...), 当异步代码失败时就会调用reject(...)
    //在本例中，我们使用setTimeout(...)来模拟异步代码，实际编码时可能是XHR请求或是HTML5的一些API方法.
    let post = {channel: channel, out_trade_no: out_trade_no};

    let ag = navigator.userAgent,
      ua = ag.toLowerCase();
    let isWX = (ua.indexOf('micromessenger') !== -1);

    if (isWX) {
      let openid = localStorage.getItem("wx_pub_openid");
      if (!openid) {
        alert('openid缺失');
      }
      post.openid = openid;
    }
    let _self = this;

    pay(post).then(res => {

      let body = res.body;
      if (body.code === 1) {
        //下单成功
        let payInfo = res.body.data;

        wx.chooseWXPay({
          timestamp: payInfo.timeStamp,  // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
          nonceStr: payInfo.nonceStr,    // 支付签名随机串，不长于 32 位
          package: payInfo.package,      // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=\*\*\*）
          signType: payInfo.signType,    // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
          paySign: payInfo.paySign,      // 支付签名
          success: function (res) {

          },
          complete: function (res) {
            reject(res);

          },
          fail(res){

          }
        });
      }
    })

  });

  return payPromise;



}

export const getWxConfig = () => {

  let wxConfigPromise = new Promise(function (resolve, reject) {

    let mise = getJsSign({
      url: location.href.split('#')[0]
    });

    mise.then((res) => {

      if (res.body.code === 1) {
        res.body.data.debug = process.env.NODE_ENV === 'production' ? false : true;
        res.body.data.jsApiList = ['getLocalImgData', 'chooseImage', 'previewImage', 'uploadImage', 'openLocation',
          'getLocation', 'chooseWXPay', 'onMenuShareTimeline', 'onMenuShareAppMessage','openAddress'];
        wx.config(res.body.data);
        resolve(res);
      }
      reject(res)

    })


  })

  return wxConfigPromise;

}



export const formatDuring = (mss) => {

  var hours = parseInt(mss / (1000 * 60 * 60));
  var minutes = parseInt((mss % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = parseInt((mss % (1000 * 60)) / 1000);
  var ss = parseInt((mss % (1000)) / 10);//获取秒后两位

  if (hours < 10) ss = '0' + hours;
  if (minutes < 10) minutes = '0' + minutes;
  if (seconds < 10) seconds = '0' + seconds;
  if (ss < 10) ss = '0' + ss;

  return {
    h: hours,
    m: minutes,
    s: seconds,
    ss: ss
  }
}


export const getLocation = ()=>{

  let wxLocationPromise = new Promise(function (resolve, reject) {

    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        // 地址解析:http://lbs.qq.com/javascript_v2/guide-service.html#link-four
        let geocoder = new qq.maps.Geocoder({
          complete: function (result) {
            resolve(result.detail.address)
          }
        })

        var coord = new qq.maps.LatLng(res.latitude, res.longitude)
        geocoder.getAddress(coord)
      },
      fail:function(res){
        reject(res)
      }
    })


  })

  return wxLocationPromise;

}


export const getUrlValueByKey = (name) => {
  return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.href) || [, ""])[1].replace(/\+/g, '%20')) || null;
}

export default {
  checkMobile,
  removeStore,
  setStore,
  getStore,
  cloneObj,
  unifiedPay,
  getWxConfig,
  getUrlValueByKey,
  formatDuring,
  getLocation
}
