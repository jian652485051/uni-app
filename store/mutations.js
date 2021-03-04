export default {
    login(state, provider){
    	state.hasLogin = true;
    	state.userInfo = provider;
    	uni.setStorage({
    		key:'userInfo',
    		data:provider
    	})
    	console.log(state.userInfo);
    },
    loginout(state){
    	state.hasLogin = false;
    	state.userInfo = {};
    	uni.removeStorage({
    		key:'userInfo'
    	})
    }
}