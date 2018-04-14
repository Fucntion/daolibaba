
/**
 * http interceptors
 * 
 * @export
 * @param {any} request 
 * @param {any} next 
 */
import mint from './mint.config';
export default function (request, next) {

    mint.loading();
    request.headers.set('access-token', localStorage.getItem('access-token'));
    // ENV !== 'production' && console.log(request);

    next(function (response) {
        mint.close();
        if (response.status === 200) {
            switch (+response.body.code) {
                case 1:
                    break;
                case 20005:
                    sessionStorage.setItem('forward', window.location.href);
                    mint.alertMsg('需要登录');
                    location.href = '/#/login'
                    break;
                default:
                    mint.alertMsg(response.body.msg);
            }
        } else {
            mint.alertMsg('服务器出去旅行了');
        }
    });
}