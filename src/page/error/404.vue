<template>
	<div>404
	<el-slider v-model="ProgressValue"></el-slider>
	<transition v-if="show" name="fade">
				<el-aside width="200px">
					<!--Aside-->
					<el-slider v-model="ProgressValue" :show-tooltip="false"></el-slider>
				</el-aside>
			</transition>
	</div>
</template>

<script>
	import {Aside,Slider } from 'element-ui'
	export default{
		data(){
			return{
				ProgressValue:20
			}
		},
		components:{
			Aside,
			Slider
		}
	}
</script>

<style>
</style>