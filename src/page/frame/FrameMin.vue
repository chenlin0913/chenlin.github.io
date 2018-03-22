<template>
	<div class="frameMin cl-music-pointer">
		<img v-lazy="urlImg" class="minimg" @click.prevent="detail" />
	</div>
</template>

<script>
	import { mapState } from 'vuex'

	export default {
		name: 'FrameMin',
		computed: {
			...mapState({
				urlImg: state => state.current.detail.al.picUrl,
				name: state => state.current.detail.name,
				id: state => state.current.id
			})
		},
		created() {
			
		},
		methods: {
			detail() {
				this.$axioss.post('api/playlist/detail',{id:this.id}).then((response) =>{
					console.log(response.data)
				});
			}
		}
	}
</script>

<style>
	.frameMin {
		border: #000000 1px solid;
		width: 34px;
		height: 35px;
	}
	
	.minimg {
		width: 100%;
		height: 100%;
	}
</style>