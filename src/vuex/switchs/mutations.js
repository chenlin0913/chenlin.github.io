/**
 * 设置头部功能Menu选中位置
 */
export const setActiveIndex = (state,payload) =>{
	console.log(payload);
	state.activeIndex = payload.activeIndex;
}
