<template>
	<div>
		<el-container>
			<el-header>
				<!--Header-->
				<el-row class="cl-header-botton">
					<el-col :xs="5" :sm="5" :md="5" :lg="5" :xl="5">
						<div class="cl-music-logo"></div>
					</el-col>
					<el-col :xs="15" :sm="15" :md="15" :lg="15" :xl="15">
						<Menu></Menu>
					</el-col>
					<el-col :xs="5" :sm="5" :md="5" :lg="5" :xl="5">
						<Search></Search>
					</el-col>
				</el-row>
			</el-header>
			<el-container>
				<transition v-if="show" name="fade">
					<el-aside width="205px">
						<!--Aside-->
						<el-tree :data="treeData" :props="defaultTree" @node-click="handleNodeClick" :default-expand-all="true"></el-tree>
						<!--<LyricsMax></LyricsMax>-->
					</el-aside>
				</transition>
				<el-container>
					<el-main>
						<!--Main-->
						<el-carousel :interval="4000" type="card" height="250px">
							<el-carousel-item v-for="(item,index) in banner" :key="index">
								<img :src="item.pic" width="100%" height="100%" />
							</el-carousel-item>
						</el-carousel>
					</el-main>
					<el-footer>
						<!--Footer controls="controls"-->
						<LyricsMin></LyricsMin>
						<Auidos></Auidos>
					</el-footer>
				</el-container>
			</el-container>
		</el-container>
	</div>
</template>

<script>
	import { Aside, Header, Main, Footer, Button, Tree } from 'element-ui'
	import CommonData from '@/common/CommonData'
	import Auidos from '@/page/play/Auidos'
	import LyricsMax from '@/page/lyrics/LyricsMax'
	import LyricsMin from '@/page/lyrics/LyricsMin'
	import Menu from '@/page/Menu'
	import Search from '@/page/search/Search'

	export default {
		name: 'Mains',
		data() {
			return {
				show: false,
				banner: '',
				treeData: CommonData.vipTree,
				defaultTree: {
					children: 'children',
					label: 'label'
				}
			}
		},
		created() {
			console.log();
			this.$axioss.get('/banner').then((response) => {
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
			Tree,
			Menu,
			Search
		},
		methods: {
			handleNodeClick(val) {
				console.log(val);
			},
		}
	}
</script>

<style>
	.el-header,
	.el-footer {
		background-color: #242424;
		color: #333;
		text-align: center;
	}
	
	.el-aside {
		background-color: #242424;
		color: #333;
		text-align: center;
		line-height: 200px;
	}
	
	.el-main {
		background-color: #242424;
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
	.cl-header-botton{
		border-bottom: solid 1px #e6e6e6;
	}
	.el-menu--horizontal{
		border: none;
	}
	.el-footer{
		padding: 0;
	}
</style>