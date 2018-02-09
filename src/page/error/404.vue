<template>
	<div>404
	<el-slider v-model="ProgressValue"></el-slider>
	</div>
</template>

<script>
	import {Aside,Slider } from 'element-ui'
	import axios from 'axios'
	
	
	export default{
		data(){
			return{
				ProgressValue:20
			}
		},
		created(){
			console.log(1);
		},
		components:{
			Aside,
			Slider
		},
		methods:{
			s(val){
				console.log(val);
			}
		}
	}
</script>

<style>
</style>