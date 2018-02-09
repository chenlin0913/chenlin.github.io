<template>
	<el-row style="margin: auto 0 !important;">
		<el-col :span="24" class="cl-music-songcol">
			<div style="width: 62%;margin:0 auto;">
				<el-card v-for="(itme,index) in songList" :key="index" class="cl-music-song-card">
					<el-tooltip popper-class="cl-music-tooltip" class="item" effect="dark" :content="itme.name" placement="top">
						<img v-lazy="itme.coverImgUrl" class="image" />
					</el-tooltip>	
					<span class="caption">{{ itme.name }}</span>
				</el-card>
			</div>
		</el-col>
	</el-row>
</template>

<script>
	import { Card, Button, Tooltip} from 'element-ui'
	import { mapState } from 'vuex'

	export default {
		name: 'SongList',
		components: {
			Card,
			Button,
			Tooltip
		},
		computed: {
			...mapState({
				songList: state => state.song.playlists
			})
		},
		created() {

		}
	}
</script>

<style>
	.caption {
		text-align: center !important;
		font-size: 8px;
		color: #999;
		display: -webkit-box;
		height: 13px;
		overflow: hidden;
	}
	
	.image {
		width: 100%;
		display: block;
	}
	
	.cl-music-song-card {
		width: 23%;
		float: left;
		margin: 4px 0px;
	}
	
	.cl-music-song-card:hover {
		cursor: pointer;
	}
	
	.cl-music-songcol {}
	
	.cl-music-song-card .el-card__body {
		padding: 0 !important;
	}
	.cl-music-tooltip{
		text-align: center;
		margin: 4px;
		font-size: 5px !important;
	}
</style>