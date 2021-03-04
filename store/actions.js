import http from '@/js_sdk/luch-request/luch-request'

export default {
	// 登录
	async LOGIN({ commit, state, getters }, params) {
		let custom = params.custom || false
		const data = await http.post(`/index.php/web/public/login`,params,{custom})
		return data
	},
}