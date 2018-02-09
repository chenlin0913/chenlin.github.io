<template>
	<el-autocomplete class="cl-music-search" v-model="state4" :trigger-on-focus="false" :fetch-suggestions="querySearchAsync" placeholder="音乐/视频/电台/用户" @select="handleSelect">
		<i slot="prefix" class="el-input__icon el-icon-search"></i>
	</el-autocomplete>
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
		created() {

		},
		components: {
			Autocomplete
		},
		mounted() {

		},
		methods: {
			querySearchAsync(queryString, callbacks) {
				this.$axioss.post('/api/search/pc', {
					offset:0,
					type:1,
					s: queryString,
					limit: 10
				}).then((response) => {
					console.log(response.data);
					this.getValue(this.$formats.formatSearch(response.data), queryString, callbacks);
				});
			},
			createStateFilter(queryString) {
				return(state) => {
					return(state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
				};
			},
			handleSelect(item) {
				this.$store.dispatch('setMusicId', {
					data: item.id
				});
				this.$store.dispatch('setPlayUrl', {
					id: item.id
				});
				this.$axioss.post('/api/song/lyric', {
					id: item.id,
					os:'pc',
					lv:-1,
					kv:-1,
					tv:-1
				}).then((response) => {
					console.log(response);
					this.$store.dispatch('setfromatLyrics', {
						data: response.data.lrc ? response.data.lrc.lyric : [],
						lyricsFalg: response.data.lrc ? true : false
					});
				})
			},
			getValue(restaurants, queryString, callbacks) {
				clearTimeout(this.timeout);
				this.timeout = setTimeout(() => {
					callbacks(restaurants);
				}, 1500 * Math.random());
			}
		}
	}
</script>

<style>
	.cl-music-search input {
		border-radius: 14px !important;
		font-size: 8px;
		/*margin-top: 14px;*/
	}
	.cl-music-search .el-input__inner{
		height: 25px;
		border: none;
	}
	
	.cl-music-search .el-input--small .el-input__icon{
		line-height: 25px;
	}
	
	.cl-music-search .el-input--small {
		margin-top: 17px;
	}
	
	.cl-music-search input::-webkit-input-placeholder {
		/* WebKit browsers */
		font-size: 8px;
		color:#9b9b9b;
	}
	
	.cl-music-search input:-moz-placeholder {
		/* Mozilla Firefox 4 to 18 */
		font-size: 8px;
		color:#9b9b9b;
	}
	
	.cl-music-search input::-moz-placeholder {
		/* Mozilla Firefox 19+ */
		font-size: 8px;
		color:#9b9b9b;
	}
	
	.cl-music-search input:-ms-input-placeholder {
		/* Internet Explorer 10+ */
		font-size: 8px;
		color:#9b9b9b;
	}
	.el-autocomplete-suggestion li{
		font-size: 10px !important;
	}
</style>