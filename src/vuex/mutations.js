import Lrc from '@/common/AnalysisLrc'

export const increment = state =>{
	state.count = state.count+5;
}

export const decrement = state =>{
	state.count = state.count-3;
}

/**
 * 更新登录状态
 */
export const updateLoadingStatus = (state,payload) =>{
	state.isLoading = payload.isLoading;
}

/**
 * 歌词
 */
export const setfromatLyrics = (state,payload) =>{
	state.lyrics.lyricsData = payload.lyricsData;
}

/**
 * 设置音乐播放时间
 */
export const setCurrentTimes = (state,payload) =>{
	state.lyrics.currentTimes = payload.currentTimes;
}

/**
 * 设置音乐播放开始与结束时间
 */
export const setStartAndEndTime = (state,payload) =>{
	state.lyrics.startTimes = payload.startTimes;
	state.lyrics.endTimes = payload.endTimes;
}

/**
 * 设置全部歌词marginTop值
 */
export const setlyricsMTop = (state,payload) =>{
	if(state.lyrics.isThereAnyLyric){//有歌词时 计算滚动marginTop值
		state.lyricsMTop = Lrc.compLyricPos(payload.currentTimes,Lrc.formatLyric(state.lyrics.lyricsData));
	}
}

/**
 * 设置音乐播放进度
 */
export const setPlayTime = (state,payload) =>{
	state.playTime = payload.playTime;
}

/**
 * 设置当前音乐播放ID
 */
export const setMusicId = (state,payload) =>{
	state.current.id = payload.id;
}

/**
 * 设置当前音乐播放URL
 */
export const setPlayUrl = (state,payload) =>{
	state.current.playUrl = payload.playUrl;
}

/**
 * 设置当前音乐播放状态
 */
export const setPlayState = (state,payload) =>{
	state.playState = payload.playState;
}

/**
 * 设置当前音乐播放是否有歌词
 */
export const setIsThereAnyLyric = (state,payload) =>{
	state.lyrics.isThereAnyLyric = payload.isThereAnyLyric;
}

/**
 * 设置当前音乐播放详情信息
 */
export const setMusicDetail = (state,payload) =>{
	state.current.detail.al = payload.detail.songs[0].al;
	state.current.detail.ar = payload.detail.songs[0].ar;
	state.current.detail.name = payload.detail.songs[0].name;
}


