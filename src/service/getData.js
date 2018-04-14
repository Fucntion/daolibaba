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
 * @desc 公共参数介绍,省的后面自己忘记了
 * @param {商家id} itemid 
 * @param {列表数量} size 
 * @param {指定返回的字段} field 
 * @param {排序} order 
 * @param {分页} paginate 
 * @param {指定页面} page 
 */


/**
 * 获取广告位
 * @param {广告位id} pid 
 */
export const ad = (pid) => fetch('v1/ad', {
	pid: pid
},'POST');

/**
 * 获取分类
 * @param {模块id} moduleid 
 * @param {父级id} parentid 
 */
export const category = (moduleid,parentid) => fetch('v1/category', emptyObject({
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
export const kill = (catid,size,paginate,page) => fetch('v1/kill', emptyObject({
	catid:catid,
	size:size,
	paginate:paginate,
	page:page
}),'POST');

export const group = (catid,size,paginate,page) => fetch('v1/group', emptyObject({
	catid:catid,
	size:size,
	paginate:paginate,
	page:page
}),'POST');

export const mall = (post) => fetch('v1/mall', emptyObject(post),'POST');

export const info = (catid,size,field,order,paginate,page) => fetch('v1/info', emptyObject({
	catid:catid,
	size:size,
	field:field,
	order:order,
	paginate:paginate,
	page:page
}),'POST');

export const club = (areaid,catid,itemid,size,field,order,paginate,page) => fetch('v1/club', emptyObject({
	areaid:areaid,
	catid:catid,
	itemid:itemid,
	size:size,
	field:field,
	order:order,
	paginate:paginate,
	page:page
}),'POST');

export const area = (parentid,itemid,size,field,order,paginate,page) => fetch('v1/area', emptyObject({
	parentid:parentid,
	itemid:itemid,
	size:size,
	field:field,
	order:order,
	paginate:paginate,
	page:page
}),'POST');

/**
 * 
 * @param {商家id} itemid 
 * @param {列表数量} size 
 * @param {指定返回的字段} field 
 * @param {排序} order 
 * @param {分页} paginate 
 * @param {指定页面} page 
 * @param {每个商铺返回的商品数量} mallSize 
 */
export const company = (areaid,id,size,field,order,paginate,page,mallSize) => fetch('v1/company', emptyObject({
	areaid:areaid,
	id:id,
	size:size,
	field:field,
	order:order,
	paginate:paginate,
	page:page,
	mallSize:mallSize
}),'POST');

/**
 * 获取用户信息
 */

export const getUser = () => fetch('v1/user');

/**
 * 注册
 */
export const register = (post) => fetch('/v1/member/register',emptyObject(post),'POST');


/**
 * 登录
 */
export const login = (post) => fetch('/v1/member/login',emptyObject(post),'POST');




/**
 * 手机号登录
 * @params code, mobile, validate_token
 */

export const sendLogin = (post) => fetch('v1/login/app_mobile', {}, 'POST');


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
