import Request from './core/Request'
const http = new Request();
export default http

import Vue from 'vue'
let $this = Vue.prototype;

import { api } from '@/config'
http.setConfig((config) => { /* 设置全局配置 */
	config.baseURL = api; /* 根域名不同 */
	config.timeout = 10000;
	config.header = {
		'content-type': 'application/json'
	}
	config.custom = {
		loading: true // 默认有loading
	}
	return config
})

let ico_warn = '/static/common/alert.png';

/* 请求之前拦截器 */
let token = null
$this.$nextTick(()=>{
	//获取token
	token = $this.$store.state.token
})
http.interceptors.request.use((config, cancel) => { /* 请求之前拦截器 */
	config.header = {
		...config.header
	}
	if(token){
		//header 挂载token
		config.header['Authorization'] = token
	}
	if (config.custom.loading) {
	  uni.showLoading()
	}
	///*
	// if (!token) { // 如果token不存在，调用cancel 会取消本次请求，但是该函数的catch() 仍会执行
	// 	cancel('token 不存在') // 接收一个参数，会传给catch((err) => {}) err.errMsg === 'token 不存在'
	// }
	//*/
	return config;
})

/* 请求之后拦截器 */
http.interceptors.response.use((response) => {
	console.log(response,'response')
	let status = response.data.status;
	let statusCode = response.data.statusCode;
	if (response.config.custom.loading) {
	    uni.hideLoading()
	}
	
	if(status != 200){
		switch (status){
			case 400:
				uni.showToast({
				    title: statusCode || '请求参数异常',
					icon: 'none',
					image: ico_warn,
					mask: true,
				    duration: 2000
				});
				break;
			case 401:
				uni.showToast({
				    title: statusCode || '账号登录失效，请重新登录',
					icon: 'none',
					image: ico_warn,
					mask: true,
				    duration: 2000,
					complete(){
						uni.reLaunch({
							url:'/pages/public/login.vue'
						});
					}
				});
				break;
			case 403:
				uni.showToast({
				    title: statusCode || '无访问权限，请联系企业管理员',
					icon: 'none',
					image: ico_warn,
					mask: true,
				    duration: 2000
				});
				break;
			default:
				uni.showToast({
				    title: statusCode,
					icon: 'none',
					image: ico_warn,
					mask: true,
				    duration: 2000
				});
				// this.$api.msg(response.data.statusCode);
				break;
		}
		return Promise.reject(response);
	}
	return response;
}, (error) => { 
  // 请求错误
  console.warn(error)
  if (error.config.custom.loading) {
    uni.hideLoading()
  }
  return Promise.reject(error)
})