<!--
	作者：cl
	时间：2018-02-02
	描述：热门推荐
-->
<template>
	<el-breadcrumb separator="|">
		<el-row class="cl-music-plist-size cl-music-hotrow">
			<el-col :span="2" style="font-size: 11px; color: #666; font-weight: 600;cursor: pointer;">
				<span @click="getSong('全部')">热门推荐</span>
			</el-col>
			<el-col :span="14" class="cl-music-pointer">
				<el-breadcrumb-item class="cl-music-breadlist" v-for="(item,index) in list" :key="index">
					<span @click="getSong(item.name)">{{item.name}}</span>
				</el-breadcrumb-item>
			</el-col>
		</el-row>
	</el-breadcrumb>
</template>

<script>
	import {Breadcrumb} from 'element-ui'
	
	export default{
		name:'HotRecommend',
		data(){
			return{
				list:this.$commonData.songType
			}
		},
		components:{
			Breadcrumb
		},
		methods:{
			getSong(val){
				this.$store.dispatch('setSong',{data:val});
			}
		}
	}
	
</script>

<style>
	.cl-music-bread{
		font-size: 11px;
		color: #666;
	}
	
	.cl-music-breadlist .el-breadcrumb__inner{
		font-weight: 500 !important;
		font-size: 8px;
		color: #666 !important;
	}
	
	.cl-music-breadlist .el-breadcrumb__inner:hover{
		font-weight: 700 !important;
		cursor: pointer !important;
		color: #666;
		text-decoration:underline;
	}
	
	.cl-music-hotrow{
		background-color: white;
		border-bottom: 2px solid #C10D0C;
	}
</style>