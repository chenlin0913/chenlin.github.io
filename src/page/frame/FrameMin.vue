<template>
	<div class="frameMin cl-music-pointer">
		<img :src="urlImg" class="minimg"/>
	</div>
</template>

<script>
	import {mapState} from 'vuex'
	
	export default{
		name:'FrameMin',
		computed:{
			...mapState({
				urlImg:state => state.current.detail.al.picUrl,
				name:state =>state.current.detail.name
			})
		},
		created(){
			
		}
		
	}
</script>

<style>
	.frameMin{
		border: #000000 1px solid;
		width: 34px;
    	height: 35px;
	}
	.minimg{
		width: 100%;
    	height: 100%;
	}
</style>