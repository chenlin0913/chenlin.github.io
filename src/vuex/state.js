const state = {
	count:0,
	isLoading:false,
	playState:true,//播放状态 true:未播放
	current:{
		id:'',//当前播放音乐ID
		playUrl:'',//当前播放音乐路径
		detail:{//当前播放音乐详情
			al:{picUrl:'static/img/player-bar.png'},//id:播放歌曲详情ID,name:播放歌曲详情类型名称,pic:播放歌曲详情图片ID,picUrl:播放歌曲详情图片
			ar:{},//id:播放歌曲详情id,name:播放歌曲详情演唱者
			name:'',//播放歌曲详情名称
		}
	},
	lyrics:{
		lyricsData:'[00:00.00]歌词加载中!',//歌词
		currentTimes:0,//音乐播放时间
		startTimes:'00:00',//开始播放时间
		endTimes:'00:00',//结束播放时间
		isThereAnyLyric:false,
	},
	lyricsMTop:'0rem',//显示全部歌词
	playTime:0,//播放进度
	volume:0.4,//播放音量
}

export default state;
