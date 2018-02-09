/**
 * 设置头部功能Menu选中位置
 */
export const setActiveIndex = ({commit},payload) =>{
	console.log(payload);
	commit('setActiveIndex',{activeIndex:payload.data});
}
