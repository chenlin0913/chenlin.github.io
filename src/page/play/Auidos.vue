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
			<el-col :xs="3" :sm="3" :md="3" :lg="3" :xl="3">
				<el-slider v-model="volume" :show-tooltip="false" @change="setVolume" class="cl-music-cl-volume"></el-slider>
			</el-col>
			<el-col :xs="1" :sm="1" :md="1" :lg="1" :xl="1" class="cl-music-col1">
				<i class="iconfont icon-font-cl-suijibofang cl-music-pointer"></i>
			</el-col>
			<el-col :xs="1" :sm="1" :md="1" :lg="1" :xl="1" class="cl-music-col1">
				<el-popover :visible-arrow="false" popper-class="cl-music-popover" ref="musicList" placement="top-start" trigger="click">
					<el-row class="cl-music-plist-size">
						<el-col :span="14" style="font-size: 9px;">
							歌曲列表(1)
						</el-col>
						<el-col :span="2" class="cl-music-pointer">
							收藏全部
						</el-col>
						<el-col :span="1" class="cl-music-pointer">
							删除
						</el-col>
						<el-col :span="7" style="text-align: center;">
							{{snapName}}
						</el-col>
					</el-row>
					<el-row style="padding-left: 5px;">
						 <el-col :span="17" >
						 	<ul class="cl-music-snapMaxUl">
						 		<li>
						 			<ul class="cl-music-snapUl">
								 		<li class="cl-music-snapLi-name">{{snapName}}</li>
								 		<li class="cl-music-snapLi-ar"><span v-for="(item,index) in snapAr" :key="index">{{item.name+" "}}</span></li>
								 		<li class="cl-music-snapLi-time">{{snapTime}}</li>
								 		<li v-if="snapName"><i class="el-icon-share"></i></li>
								 	</ul>
						 		</li>
						 		<li>
						 			<ul class="cl-music-snapUl">
								 		<li class="cl-music-snapLi-name">{{snapName}}</li>
								 		<li class="cl-music-snapLi-ar"><span v-for="(item,index) in snapAr" :key="index">{{item.name+" "}}</span></li>
								 		<li class="cl-music-snapLi-time">{{snapTime}}</li>
								 		<li v-if="snapName"><i class="el-icon-share"></i></li>
								 	</ul>
						 		</li>
						 	</ul>
						 </el-col>
						 <el-col :span="7" style="text-align: center;"><LyricsMin></LyricsMin></el-col>
					</el-row>
				</el-popover>
				<i class="iconfont icon-font-cl-swticonyinle2 cl-music-pointer" v-popover:musicList></i>
			</el-col>
			<audio @timeupdate="updateTime" id="audioPlay" :src="musicUrl" autoplay loop></audio>
		</el-row>
	</div>

</template>

<script>
	import { mapState } from 'vuex'
	import { Slider, Card, Popover } from 'element-ui'
	import { changeTime } from '@/common/ChangeTime'
	import Lrc from '@/common/AnalysisLrc'
	import FrameMin from '@/page/frame/FrameMin'
	import LyricsMin from '@/page/lyrics/LyricsMin'
	
	

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
		computed: {
			...mapState({
				start: state => state.lyrics.startTimes,
				end: state => state.lyrics.endTimes,
				musicUrl: state => state.current.playUrl,
				playState: state => state.playState,
				snapTime:state => state.current.detail.publishTime,
				snapName:state => state.current.detail.name,
				snapAr:state => state.current.detail.ar
			})
		},
		created() {

		},
		components: {
			Slider,
			Card,
			FrameMin,
			Popover,
			LyricsMin
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
				this.$store.dispatch('setPlayState', {
					data: !this.playState
				})
			},
			/**
			 * 实时更新音乐播放时间
			 */
			updateTime() {
				var myaudio = document.getElementById('audioPlay');
				this.$store.dispatch('setCurrentTimes', {
					data: myaudio.currentTime
				});
				var time = parseInt(myaudio.currentTime);
				var timelength = myaudio.duration;
				if(isNaN(timelength)) {
					this.tipshow = true;
				} else {
					this.tipshow = false;
					this.mwidth = time / timelength * 100;
					this.$store.dispatch('setPlayTime', {
						data: this.mwidth
					});
					this.$store.dispatch('setStartAndEndTime', {
						start: changeTime(time),
						end: changeTime(timelength)
					});
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
				this.$store.dispatch('setCurrentTimes', {
					data: myaudio.currentTime
				});
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
	
	.cl-music-frameimgs {
		width: 6.7%;
	}
	
	.cl-music-play3 {
		width: 9.5%;
		line-height: 33px;
	}
	
	.cl-music-timer3 {
		font-size: 6px;
		color: #a1a1a1;
		line-height: 38px;
	}
	
	.cl-music-speaker {
		line-height: 35px;
		width: 4.33333%;
	}
	
	.cl-music-cl-volume {
		width: 60%;
	}
	
	.el-slider__button {
		border: 2px solid #ccc;
	}
	
	.el-slider__runway {
		background-color: #535353;
	}
	
	.el-slider__bar {
		background-color: #C20C0C;
	}
	
	.cl-music-col1 {
		line-height: 35px;
	}
	
	.cl-music-popover {
		height: 30%;
		width: 99%;
		left: 2px !important;
		background-color: #141211;
		border:none;
		padding:0;
	}
	
	.cl-music-plist-size{
		height: 20px;
		width: 100%;
		background-color: #1d1d1d;
		font-size: 8px;
		color: #e2e2e2;
		line-height: 20px;
		padding-left: 5px;
	}
	
	.cl-music-snapMaxUl{
		font-size: 8px;
	}
	
	.cl-music-snapMaxUl li{
		line-height: 15px;
	}
	
	.cl-music-snapUl li{
		float: left;
		cursor: pointer;
	}
	
	.cl-music-snapMaxUl li:hover{
		color: white;
	}
	
	.cl-music-snapLi-name{
		width: 70%;
	}
	
	.cl-music-snapLi-ar{
		width: 14%;
		text-align: center;
	}
	
	.cl-music-snapLi-time{
		width: 14%;
		text-align: center;
	}
</style>