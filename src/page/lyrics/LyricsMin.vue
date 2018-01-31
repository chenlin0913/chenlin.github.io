<template>
	<div style="margin-bottom: 8px;">
		<ul class="lyrics" v-if="isThereAnyLyric">
			<li v-for="(item,i) in lyrs()" :key="i" :class="{highBright:Lrc.formatLyrichighBright(currentTime,lyrs(),i)}">
				{{item[1]}}
			</li>
		</ul>
		<ul v-else style="font-size: 10px;">
			<li>无歌词~</li>
		</ul>
	</div>
</template>

<script>
	import Lrc from '@/common/AnalysisLrc'
	import {mapState} from 'vuex'
	
	export default{
		name:'LyricsMin',
		data(){
			return{
				Lrc:''
			}
		},
		computed:{
			...mapState({
				currentTime:state =>state.lyrics.currentTimes,
				isThereAnyLyric:state =>state.lyrics.isThereAnyLyric
			})
		},
		components:{
			
		},
		created(){
			this.Lrc = Lrc;
		},
		methods:{
			lyrs(){
				return Lrc.formatLyric(this.$store.state.lyrics.lyricsData);
			}
		}
	}
	
</script>

<style>
	.lyrics li{
		font-size: 10px;
		display: none;
	}
	.lyrics li.highBright{
		display:block;
	}
</style>