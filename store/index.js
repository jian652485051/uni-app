import Vue from 'vue'
import Vuex from 'vuex'

import getters from './getters'
import mutations from './mutations'
import actions from './actions'

Vue.use(Vuex)

var state =  {
	hasLogin:false,
	userInfo:{},
	userName:"王健",
	token:'123456'
}


const store = new Vuex.Store({
    state,
	getters,
    mutations,
	actions
})

export default store
