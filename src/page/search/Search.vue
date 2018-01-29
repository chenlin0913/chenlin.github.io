<template>
	<el-autocomplete v-model="state4" :trigger-on-focus="false" :fetch-suggestions="querySearchAsync" placeholder="请输入内容" @select="handleSelect"></el-autocomplete>
</template>

<script>
	import { Autocomplete } from 'element-ui'

	export default {
		name: 'Search',
		data() {
			return {
				restaurants: [],
				state4: '',
				timeout: null
			}
		},
		created(){
			
		},
		components: {
			Autocomplete
		},
		mounted() {
			
		},
		methods: {
			querySearchAsync(queryString, callbacks) {
				this.$axioss.get('/search',{keywords:queryString,limit:10}).then((response) =>{
					this.getValue(this.$formats.formatSearch(response.data),queryString,callbacks);
				});
			},
			createStateFilter(queryString) {
				return(state) => {
					return(state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
				};
			},
			handleSelect(item) {
				this.$store.dispatch('setMusicId',{data:item.id});
				this.$store.dispatch('setPlayUrl',{id:item.id});
				this.$axioss.get('/lyric',{id:item.id}).then((response) =>{
					this.$store.dispatch('setfromatLyrics',{data:response.data.lrc?response.data.lrc.lyric:[],lyricsFalg:response.data.lrc?true:false});
				})
			},
			getValue(restaurants,queryString,callbacks){
				clearTimeout(this.timeout);
				this.timeout = setTimeout(() => {
					callbacks(restaurants);
				}, 1500 * Math.random());
			}
		}
	}
</script>

<style>

</style>