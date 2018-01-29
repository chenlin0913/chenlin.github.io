import axios from 'axios'
import qs from 'qs'
import { Message, MessageBox } from 'element-ui'
import router from '../router'

console.log(router);
const axiosIns = axios.create({
	headers: {
		"Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
		"X-Powered-By": "Express",
		"Access-Control-Allow-Credentials": "true",
		"Access-Control-Allow-Origin": "*",
		"Access-Control-Allow-Headers": "X-Requested-With",
		"Access-Control-Allow-Methods": "PUT,POST,GET,DELETE,OPTIONS",
		"Content-Type": "application/json; charset=utf-8"
	}
});

if(process.env.NODE_ENV == 'development') {
	axiosIns.defaults.baseURL = 'http://localhost:8080/static/';
} else if(process.env.NODE_ENV == 'debug') {
//	axiosIns.defaults.baseURL = 'http://localhost:8080/static/data/';
} else if(process.env.NODE_ENV == 'production') {
//	axiosIns.defaults.baseURL = 'http://localhost:8090/static/data/';
}

//axiosIns.defaults.headers.post['X-Requested-With'] = 'XMLHttpRequest';
//axiosIns.defaults.headers.get['X-Requested-With'] = 'XMLHttpRequest';
//axiosIns.defaults.responseType = '*';
axiosIns.defaults.transformRequest = [function(data) {
	//数据序列化
	return qs.stringify(data);
}];
axiosIns.defaults.validateStatus = function(status) {
	return true;
};
axiosIns.interceptors.request.use(function(config) {
	//配置config
//	config.headers.Accept = 'application/json';
//	config.headers('Access-Control-Allow-Methods:GET,POST,PATCH,PUT,OPTIONS');
//	config.headers['Content-Type'] =  'Access-Control-Allow-Methods:GET,POST,PATCH,PUT,OPTIONS||*';
//	config.headers['Content-Type'] =  'application/x-www-form-urlencoded';
	// config.headers.System = 'vue';
	// let token = Vue.localStorage.get('token');
	// if(token){
	//     config.headers.Token = token;
	// }
	return config;
});
axiosIns.interceptors.response.use(function(response) {
	let data = response.data;
	let status = response.status;
	if(status === 200) {
		return Promise.resolve(response);
	} else {
		return Promise.reject(response);
	}
});

let ajaxMethod = ['get', 'post'];
let api = {};
ajaxMethod.forEach((method) => {
	//数组取值的两种方式
	api[method] = function(uri, data, config) {
		return new Promise(function(resolve, reject) {
			axiosIns[method](uri, data, config).then((response) => {
				/*根据后台数据进行处理
				 *1 code===200   正常数据+错误数据     code!==200   网络异常等
				 *2 code===200   正常数据     code!==200   错误数据+网络异常等
				 * 这里使用的是第一种方式
				 * ......
				 */
				if(response.data.StatusCode) {
					Message({
						showClose: true,
						message: response.data.Message,
						type: "error"
					});
					if(response.data.Message === '未登录') {
						Message({
							showClose: true,
							message: response.data.Message,
							type: "error"
						});
						//使用vue实例做出对应行为  change state or router
						//instance.$store.commit('isLoginShow',true);
						
					}
				} else {
					resolve(response);
				}
			}).catch((response) => {
				MessageBox.confirm(response.status, '提示', {
					confirmButtonText: '确定',
					type: 'warning',
					showClose: false,
					showCancelButton: false,
					closeOnPressEscape: false,
					closeOnHashChange: false,
					closeOnClickModal: false
				}).then(() => {
					// 下面是接口回调的satus ,因为我做了一些错误页面,所以都会指向对应的报错页面
					if(response.status === 403) {
						router.push({
							path: "/error/403"
						});
					}
					if(response.status === 500) {
						router.push({
							path: "/error/500"
						});
					}
					if(response.status === 502) {
						router.push({
							path: "/error/502"
						});
					}
					if(response.status === 404) {
//						router.push({
//							path: "/error/404"
//						});
					}
				});
			})
		})
	}
});
export default api;