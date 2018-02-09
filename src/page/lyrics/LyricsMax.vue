<!--
	作者：offline
	时间：2018-01-24
	描述：显示全部歌词
-->
<template>
	<div class="box-card-lyrics">
		<ul :style="{marginTop:top}" v-if="isThereAnyLyric">
			<li>歌词</li>
			<li v-for="(item,i) in lyrs()" :key="i" :class="{highBright:Lrc.formatLyrichighBright(currentTime,lyrs(),i)}">
				{{item[1]}}
			</li>
		</ul>
		<ul v-else>
			<li>无歌词~</li>
		</ul>
	</div>
</template>

<script>
	import Lrc from '@/common/AnalysisLrc'
	import {mapState} from 'vuex'
	
	export default{
		name:'LyricsMax',
		data(){
			return{
				Lrc:''
			}
		},
		created(){
			this.Lrc = Lrc;
		},
		computed:{
			...mapState({
				currentTime:state =>state.lyrics.currentTimes,
				top:state =>state.lyricsMTop,
				isThereAnyLyric:state =>state.lyrics.isThereAnyLyric
			})
		},
		components:{
			
		},
		methods:{
			/**
			 * 获取歌词，格式化
			 */
			lyrs(){
				return Lrc.formatLyric(this.$store.state.lyrics.lyricsData);
			}
		}
	}
	
</script>

<style>
	.box-card-lyrics{
		font-size: 10px;
	}
	.box-card-lyrics li{
		line-height: 19px;
	}
</style>