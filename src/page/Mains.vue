<template>
	<div>
		<el-container>
			<transition v-if="show" name="fade">
				<el-aside width="200px">
					<!--Aside-->
					<LyricsMax></LyricsMax>
				</el-aside>
			</transition>

			<el-container>
				<el-header>
					<!--Header-->
					<Search></Search>
				</el-header>
				<el-main>
					<!--Main-->
					<el-carousel :interval="4000" type="card" height="250px">
						<el-carousel-item v-for="(item,index) in banner" :key="index">
							<img :src="item.pic" width="100%" height="100%"/>
						</el-carousel-item>
					</el-carousel>
					<el-button @click="show = !show">Click Me</el-button>
				</el-main>
				<el-footer>
					<!--Footer controls="controls"-->
					<Auidos></Auidos>
					<LyricsMin></LyricsMin>
				</el-footer>
			</el-container>
		</el-container>
	</div>

</template>

<script>
	import { Aside, Header, Main, Footer, Button} from 'element-ui'
	import Auidos from '@/page/play/Auidos'
	import LyricsMax from '@/page/lyrics/LyricsMax'
	import LyricsMin from '@/page/lyrics/LyricsMin'
	import Search from '@/page/search/Search'

	export default {
		name: 'Mains',
		data() {
			return {
				show: true,
				banner:''
			}
		},
		created() {
			this.$axioss.get('/banner').then((response) =>{
				console.log(response.data);
				this.banner = response.data.banners;
			})
		},
		components: {
			Aside,
			Header,
			Main,
			Footer,
			Button,
			Auidos,
			LyricsMax,
			LyricsMin,
			Search
		},
		methods: {
			formatTooltip(val) {
				console.log(val);
				console.log(val / 100);
				return val / 100;
			}
		}
	}
</script>

<style>
	.el-header,
	.el-footer {
		background-color: #B3C0D1;
		color: #333;
		text-align: center;
	}
	
	.el-aside {
		background-color: #D3DCE6;
		color: #333;
		text-align: center;
		line-height: 200px;
	}
	
	.el-main {
		background-color: #E9EEF3;
		color: #333;
		text-align: center;
		padding: 10px;
	}
	
	body>.el-container {
		margin-bottom: 40px;
	}
	
	.el-container:nth-child(5) .el-aside,
	.el-container:nth-child(6) .el-aside {
		line-height: 260px;
	}
	
	.el-container:nth-child(7) .el-aside {
		line-height: 320px;
	}
	
	.el-carousel__item h3 {
		color: #475669;
		font-size: 14px;
		opacity: 0.75;
		line-height: 200px;
		margin: 0;
	}
	
	.el-carousel__item:nth-child(2n) {
		background-color: #99a9bf;
	}
	
	.el-carousel__item:nth-child(2n+1) {
		background-color: #d3dce6;
	}
	
	.el-slider__button {
		width: 10px;
		height: 10px;
	}
	
	.el-slider__button.hover {
		transform: scale(1.1);
	}
</style>