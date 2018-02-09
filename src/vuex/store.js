import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'
import switchStore from './switchs/store'
import * as getters from './getters'
import * as actions from './actions'
import * as mutations from './mutations'

Vue.use(Vuex)

export default new Vuex.Store({
	state,
	getters,
	actions,
	mutations,
	modules:{
		switchStore
	}
})