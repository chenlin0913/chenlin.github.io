<template>
	<el-container>
		<el-footer>
			<LyricsMin></LyricsMin>
			<Auidos></Auidos>
		</el-footer>
	</el-container>
</template>

<script>
	import {Footer} from 'element-ui'
	import Auidos from '@/page/play/Auidos'
	import LyricsMin from '@/page/lyrics/LyricsMin'
	
	export default{
		name:'Bottom',
		components:{
			Footer,
			Auidos,
			LyricsMin
		}
	}
	
</script>

<style>
	.el-footer {
		background-color: #242424;
		color: #333;
		text-align: center;
	}
	
	.el-footer{
		padding: 0;
	}
</style>