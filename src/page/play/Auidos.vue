<template>
	<div>
		<el-row :gutter="0">
			<el-col :xs="1" :sm="1" :md="1" :lg="1" :xl="1">
				<div class="grid-content bg-purple">
					<i class="iconfont icon-font-cl-shangyishou2"></i>
				</div>
			</el-col>
			<el-col :xs="1" :sm="1" :md="1" :lg="1" :xl="1">
				<div class="grid-content bg-purple">
					<i :class="playState?'iconfont icon-font-cl-ai07':'iconfont icon-font-cl-bofang2'" @click="togglePlay"></i>
				</div>
			</el-col>
			<el-col :xs="1" :sm="1" :md="1" :lg="1" :xl="1">
				<div class="grid-content bg-purple">
					<i class="iconfont icon-font-cl-xiayishou4"></i>
				</div>
			</el-col>
			<el-col :xs="13" :sm="13" :md="13" :lg="13" :xl="13">
				<div class="grid-content bg-purple-light">
					<el-slider v-model="mwidth" @change="setTime" :max="100" :show-tooltip="false"></el-slider>
				</div>
			</el-col>
			<el-col :xs="3" :sm="3" :md="3" :lg="3" :xl="3">
				<div class="grid-content bg-purple-light times-cl">{{start}}/{{end}}</div>
			</el-col>
			<el-col :xs="3" :sm="3" :md="3" :lg="3" :xl="3">
				<el-slider v-model="volume" :show-tooltip="false" @change="setVolume"></el-slider>
			</el-col>
			<el-col :xs="1" :sm="1" :md="1" :lg="1" :xl="1">
				<div class="grid-content bg-purple-light">
					<i :class="mutedshow?'iconfont icon-font-cl-mute_icon':'iconfont icon-font-cl-laba3'" @click="muted"></i>
				</div>
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
</style>