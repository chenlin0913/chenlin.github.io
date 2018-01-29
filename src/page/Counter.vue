<template>
	<div>
		Counter is: {{getterCount}}<br />
		Loading is: {{getterLoading}}
		<button @click="increment">+</button>
		<button @click="decrement">-</button>
		<button @click="loadings">loading状态12356</button>
		<i class="iconfont icon-font-cl-category"></i>
	</div>
</template>

<script>
	import {mapGetters} from 'vuex'
	
	export default{
		name:'Counter',
		created(){
			console.log('created');
		},
		computed:{
			getterCount(){
				return this.$store.getters.count;
			},
			getterLoading(){
				return this.$store.getters.isLoading;
			}
		},
		methods:{
			decrement(){
				this.$store.dispatch('decrement');
			},
			increment(){
				this.$store.dispatch('increment');
			},
			loadings(){
				this.$store.dispatch('updateLoadingStatus',{isLoading:true});
			},
		}
	}
</script>

<style>
</style>