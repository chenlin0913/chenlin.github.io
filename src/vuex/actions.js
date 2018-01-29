import vue from 'vue'
import Static from '@/common/PublicStatic'

export const  increment = ({commit}) => {
  	commit('increment');
}

export const decrement = ({commit}) =>{
	commit('decrement');
}

/**
 * 更新登录状态
 */
export const updateLoadingStatus = ({commit},payload) =>{
	commit('updateLoadingStatus',{isLoading:payload.isLoading});
}

/**
 * 设置歌词
 */
export const setfromatLyrics = ({commit},payload) =>{
	console.log(payload);
	commit('setfromatLyrics',{lyricsData:payload.data});
	commit('setIsThereAnyLyric',{isThereAnyLyric:payload.lyricsFalg});
}

/**
 * 设置音乐播放时间
 */
export const setCurrentTimes = ({commit},payload) =>{
	commit('setCurrentTimes',{currentTimes:payload.data});
	commit('setlyricsMTop',{currentTimes:payload.data});
}

/**
 * 设置音乐播放开始与结束时间
 */
export const setStartAndEndTime = ({commit},payload) =>{
	commit('setStartAndEndTime',{startTimes:payload.start,endTimes:payload.end});
}

/**
 * 设置音乐播放进度
 */
export const setPlayTime = ({commit},payload) =>{
	commit('setPlayTime',{playTime:payload.data});
}

/**
 * 设置当前音乐播放ID
 */
export const setMusicId = ({commit},payload) =>{
	commit('setMusicId',{id:payload.data});
}

/**
 * 设置当前音乐播放URL
 */
export const setPlayUrl = ({commit},payload) =>{
	if(payload.id){
		commit('setPlayUrl',{playUrl:Static.musicUrl+""+payload.id+".mp3"});
	}else{//直传URL
		commit('setPlayUrl',{playUrl:payload.data});
	}
}

/**
 * 设置当前音乐播放状态
 */
export const setPlayState = ({commit},payload) =>{
	if(payload.data){
		document.getElementById('audioPlay').play();
	}else{
		document.getElementById('audioPlay').pause();
	}
	commit('setPlayState',{playState:payload.data});
}

/**
 * 设置当前音乐播放是否有歌词
 */
export const setIsThereAnyLyric = ({commit},payload) =>{
	commit('setIsThereAnyLyric',{isThereAnyLyric:payload.data})
}


