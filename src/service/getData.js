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
export const category = (post) => fetch('v1/category', emptyObject(post),'POST');


export const getFoldList = (post) => fetch('v1/category/getFoldList', emptyObject(post),'POST');


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

export const group = (post) => fetch('v1/group', emptyObject(post),'POST');

export const mall = (post) => fetch('v1/goods', emptyObject(post),'POST');


export const info = (post) => fetch('v1/info', emptyObject(post),'POST');


export const club = (post) => fetch('v1/club', emptyObject(post),'POST');

export const city = (post) => fetch('v1/city', emptyObject(post),'POST');

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
export const company = (post) => fetch('v1/company',emptyObject(post),'POST');


export const brand = (post) => fetch('v1/brand',emptyObject(post),'POST');


export const order = (post) => fetch('v1/order',emptyObject(post),'POST');



export const favorite = (post) => fetch('v1/favorite',emptyObject(post),'POST');

/**
 *
 * @param {货品id} goodsid
 * @param {商品id} mallid
 * @param {货品名称} title
 * @param {缩略图} thumb
 * @param {商品单价} price
 * @param {商品数量} number
 * @param {总价} amount
 * @param {物流费用} fee
 * @param {订单类型} mid [1=>普通商城订单,4=》秒杀,5=》团购]
 */
export const postOrder = (post) => {
	post.action ='add';
	return order(post)
};



export const pay = (post) => fetch('v1/pay',emptyObject(post),'POST');

export const payAgin = (post) => fetch('v1/pay/again',emptyObject(post),'POST');



export const getJsSign = (post) => fetch('v1/tool/getJsSign',emptyObject(post),'POST');

// 微信登录
export const snsLogin = (post) => fetch('v1/member/snsLogin',emptyObject(post),'POST');

// 获取openid
export const getWXopenId = (post) => fetch('v1/member/getWXopenId',emptyObject(post),'POST');


/**
 * 获取用户信息
 */

export const getUser = (post) => fetch('v1/member',emptyObject(post),'POST');



/**
 * 注册
 */
export const register = (post) => fetch('v1/member/register',emptyObject(post),'POST');


/**
 * 登录
 */
export const login = (post) => fetch('v1/member/login',emptyObject(post),'POST');

/**
 * 获取收货地址
 */

export const address = (post) => fetch('v1/member/address',emptyObject(post),'POST');


export const bindPhone = (phone,code) => fetch('v1/member/bindPhone',{
	phone:phone,
	code:code
},'POST');


export const sendSms = (phone,type)=>fetch('v1/tool/sendSms',{
	phone:phone,
	type:type
},'POST');

/**
 * 手机号登录
 * @params code, mobile, validate_token
 */



export const smsLogin = (post) => fetch('v1/login/app_mobile', {}, 'POST');

export const search = (post) => fetch('v1/search', emptyObject(post), 'POST');



// /**
//  * 获取首页默认地址
//  */

// export const cityGuess = () => fetch('v1/cities', {
// 	type: 'guess'
// });


// /**
//  * 获取首页热门城市
//  */

// export const hotcity = () => fetch('v1/cities', {
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
