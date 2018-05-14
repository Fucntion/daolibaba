/**
 * http interceptors
 *
 * @export
 * @param {any} request
 * @param {any} next
 */
import store from '../store/';
import mint from './mint.config';

export default function (request, next) {

  mint.loading();
  store.commit('SHOW_MASK', 999999999);
  request.headers.set('access-token', localStorage.getItem('access-token'));
  // ENV !== 'production' && console.log(request);
  next(function (response) {
    mint.close();
    setTimeout(function () {
      store.commit('CLOSE_MASK')
    }, 100)
    if (response.status === 200) {
      switch (+response.body.code) {
        case 1:
          break;
        case 20005:
          if(window.location.href.indexOf('login') < 0) {
            sessionStorage.setItem('forward', window.location.href);
          }
          mint.alertMsg('需要登录');
          location.href = '/login'
          break;
        default:
          mint.alertMsg(response.body.msg||'请求数据为空或者有误');
      }
    } else {
      mint.alertMsg('服务器出去旅行了');
    }
  });
}
