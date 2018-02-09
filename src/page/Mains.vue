<template>
	<div>
		<el-container>
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
						<template>
							<el-carousel :interval="4000" type="card" height="250px">
								<el-carousel-item v-for="(item,index) in banner" :key="index">
									<img v-lazy="item.pic" width="100%" height="100%" />
								</el-carousel-item>
							</el-carousel>
							<div style="background-color: white;">
								<el-row><HotRecommend></HotRecommend></el-row>
								<el-row><SongList></SongList></el-row>
							</div>
						</template>
					</el-main>
				</el-container>
			</el-container>
		</el-container>
	</div>
</template>

<script>
	import { Aside, Main, Button, Tree} from 'element-ui'
	import HotRecommend from '@/page/song/HotRecommend'
	import SongList from '@/page/song/SongList'
	import LyricsMax from '@/page/lyrics/LyricsMax'

	export default {
		name: 'Mains',
		data() {
			return {
				show: false,
				banner: '',
				treeData: this.$commonData.vipTree,
				defaultTree: {
					children: 'children',
					label: 'label'
				}
			}
		},
		created() {
//			this.$axioss.get('/login/cellphone',{phone:'',password:'',proxy:'http://121.196.226.246:84'}).then((response) => {
//				console.log(response.data);
//			});
			this.$axioss.post('api/playlist/hottags',{limit:5}).then((response) =>{
				console.log(response)
			});
			this.$axioss.post('/api/v2/banner/get',{timeStamp:new Date()}).then((response) => {
				this.banner = response.data.banners;
			});
			this.$axioss.post('api/playlist/highquality/list',{limit:8}).then((response) =>{
				console.log(response)
				this.$store.commit('setSong',{song:response.data});
			});
		},
		components: {
			Aside,
			Main,
			Button,
			LyricsMax,
			Tree,
			HotRecommend,
			SongList
		},
		methods: {
			handleNodeClick(val) {
				console.log(val);
			},
		}
	}
</script>

<style>
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
		padding: 0 !important;
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
</style>