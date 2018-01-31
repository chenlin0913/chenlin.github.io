<template>
	<div style="background-color: #313030; width: 100%;">
		<el-row :gutter="0">
			<el-col :xs="3" :sm="3" :md="3" :lg="3" :xl="3" class="cl-music-play3">
				<i class="iconfont icon-font-cl-shangyishou2 cl-music-pointer"></i>
				<i :class="playState?'iconfont icon-font-cl-ai07 cl-music-pointer':'iconfont icon-font-cl-bofang2 cl-music-pointer'" @click="togglePlay"></i>
				<i class="iconfont icon-font-cl-xiayishou4 cl-music-pointer"></i>
			</el-col>
			<el-col :xs="2" :sm="2" :md="2" :lg="2" :xl="2" class="cl-music-frameimgs">
					<FrameMin></FrameMin>
			</el-col>
			<el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
					<el-slider v-model="mwidth" @change="setTime" :max="100" :show-tooltip="false"></el-slider>
			</el-col>
			<el-col :xs="2" :sm="2" :md="2" :lg="2" :xl="2" class="cl-music-timer3">
				&nbsp;{{start}}/{{end}}&nbsp;
			</el-col>
			<el-col :xs="2" :sm="2" :md="2" :lg="2" :xl="2" class="cl-music-speaker">
				<i :class="mutedshow?'iconfont icon-font-cl-mute_icon cl-music-pointer':'iconfont icon-font-cl-laba3 cl-music-pointer'" @click="muted"></i>&nbsp;
			</el-col>
			<el-col :xs="3" :sm="3" :md="3" :lg="3" :xl="3" >
				<el-slider v-model="volume" :show-tooltip="false" @change="setVolume" class="cl-music-cl-volume"></el-slider>
			</el-col>
			<el-col :xs="1" :sm="1" :md="1" :lg="1" :xl="1" class="cl-music-col1">
				<i class="iconfont icon-font-cl-suijibofang cl-music-pointer"></i>
			</el-col>
			<el-col :xs="1" :sm="1" :md="1" :lg="1" :xl="1" class="cl-music-col1">
				<i class="iconfont icon-font-cl-swticonyinle2 cl-music-pointer" @click="playList"></i>
			</el-col>
			<audio @timeupdate="updateTime"  id="audioPlay" :src="musicUrl" autoplay loop></audio>
		</el-row>
	</div>

</template>

<script>
	import {mapState} from 'vuex'
	import { Slider, Card } from 'element-ui'
	import { changeTime } from '@/common/ChangeTime'
	import Lrc from '@/common/AnalysisLrc'
	import FrameMin from '@/page/frame/FrameMin'
	
	export default {
		name: 'Auidos',
		data() {
			return {
				show: true,
				tipshow: false,
				mwidth: 0,
				mutedshow: false,
				volume: 0.4
			}
		},
		computed:{
			...mapState({
				start:state => state.lyrics.startTimes,
				end:state => state.lyrics.endTimes,
				musicUrl:state =>state.current.playUrl,
				playState:state =>state.playState
			})
		},
		created() {
			
		},
		components: {
			Slider,
			Card,
			FrameMin
		},
		watch: {
			/**
			 * 监听
			 */
		},
		methods: {
			/**
			 * 播放与暂停事件
			 */
			togglePlay() {
				this.$store.dispatch('setPlayState',{data:!this.playState})
			},
			/**
			 * 实时更新音乐播放时间
			 */
			updateTime() {
				var myaudio = document.getElementById('audioPlay');
				this.$store.dispatch('setCurrentTimes',{data:myaudio.currentTime});
				var time = parseInt(myaudio.currentTime);
				var timelength = myaudio.duration;
				if(isNaN(timelength)) {
					this.tipshow = true;
				} else {
					this.tipshow = false;
					this.mwidth = time / timelength * 100;
					this.$store.dispatch('setPlayTime',{data:this.mwidth});
					this.$store.dispatch('setStartAndEndTime',{start:changeTime(time),end:changeTime(timelength)});
					if(timelength === time) {
						this.togglePlay();
					}
				}
			},
			/**
			 * 拖动进度条 设置进度时间
			 */
			setTime(value) {
				var myaudio = document.getElementById('audioPlay');
				var timelength = myaudio.duration;
				myaudio.currentTime = timelength * value / 100;
				this.$store.dispatch('setCurrentTimes',{data:myaudio.currentTime});
			},
			/**
			 * 禁音
			 */
			muted() {
				var myaudio = document.getElementById('audioPlay');
				myaudio.muted = !myaudio.muted;
				this.mutedshow = myaudio.muted;
			},
			/**
			 * 音量设置
			 */
			setVolume(value) {
				value = value / 100;
				var num = new Number(value.toFixed(1));
				document.getElementById('audioPlay').volume = num;
				this.volume = num;
			},
			/**
			 * 播放列表
			 */
			playList(){
				
			}
		}
	}
</script>

<style>
	.el-col {
		border-radius: 4px;
	}
	
	.bg-purple-dark {
		background: #99a9bf;
	}
	
	.bg-purple {
		background: #d3dce6;
	}
	
	.bg-purple-light {
		background: #e5e9f2;
	}
	
	.grid-content {
		border-radius: 4px;
		min-height: 36px;
	}
	
	.cl-music-frameimgs{
		width: 6.7%;
	}
	
	.cl-music-play3{
		width: 9.5%;
		line-height: 33px;
	}
	
	.cl-music-timer3{
		font-size: 6px;
		color: #a1a1a1;
		line-height: 38px;
	}
	
	.cl-music-speaker{
		line-height: 35px;
		width: 4.33333%;
	}
	
	.cl-music-cl-volume{
		width: 60%;
	}
	
	.el-slider__button{
		border: 2px solid #ccc;
	}
	
	.el-slider__runway{
		background-color: #535353;
	}
	
	.el-slider__bar{
		background-color: #C20C0C;
	}
	
	.cl-music-col1{
		line-height: 35px;
	}
</style>