import fetch from '../util/fetch'


function emptyObject(obj){
	for (var prop in obj) {
		if (obj[prop] === '' || obj[prop] === undefined || obj[prop] === null || obj[prop] === 'undefined') {
			delete obj[prop];
		}
	}
	return obj;
}


/**
 * 获取广告位
 * @param {广告位id} pid 
 */
export const ad = (pid) => fetch('/api/v1/ad', {
	pid: pid
},'POST');

/**
 * 获取分类
 * @param {模块id} moduleid 
 * @param {父级id} parentid 
 */
export const category = (moduleid,parentid) => fetch('/api/v1/category', emptyObject({
	moduleid:moduleid,
	parentid:parentid,
	size:10
}),'POST');


/**
 * 获取秒杀列表
 * @param {栏目id} catid 
 * @param {数量} size 
 * @param {是否分页} paginate 
 * @param {指定页数} page 
 */
export const kill = (catid,size,paginate,page) => fetch('/api/v1/kill', emptyObject({
	catid:catid,
	size:size,
	paginate:paginate,
	page:page
}),'POST');

export const mall = (catid,size,paginate,page) => fetch('/api/v1/mall', emptyObject({
	catid:catid,
	size:size,
	paginate:paginate,
	page:page
}),'POST');


// /**
//  * 获取首页默认地址
//  */

// export const cityGuess = () => fetch('/v1/cities', {
// 	type: 'guess'
// });


// /**
//  * 获取首页热门城市
//  */

// export const hotcity = () => fetch('/v1/cities', {
// 	type: 'hot'
// });



// /**
//  * 账号密码登录
//  */
// export const accountLogin = (username, password, captcha_code) => fetch('/v2/login', {username, password, captcha_code}, 'POST');


// /**
//  * 退出登录
//  */
// export const signout = () => fetch('/v2/signout');


// /**
//  * 改密码
//  */
// export const changePassword = (username, oldpassWord, newpassword, confirmpassword, captcha_code) => fetch('/v2/changepassword', {username, oldpassWord, newpassword, confirmpassword, captcha_code}, 'POST');
