<template>
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
	</el-container>
</template>

<script>
	import {Header} from 'element-ui'
	import Search from '@/page/search/Search'
	import Menu from '@/page/Menu'
	
	export default{
		name:'Header',
		components:{
			Header,
			Search,
			Menu
		}
	}
	
</script>

<style>
	.el-header{
		background-color: #242424;
		color: #333;
		text-align: center;
		margin-bottom: 1px;
	}
</style>