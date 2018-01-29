<template>
	<transition-group name="fade">
		<div class="musicsong-wrapper" v-show="showFlag" key="musicsong">
			<div class="scroll-warpper">
				<div class="menu-title border-1px">
					<div class="back" @click="hide">
						<img src="../../../static/img/back.png" alt="" width=24 height=24>
					</div>
					<div class="title-name">
						{{song.name}}- {{songname}}
					</div>
					<div class="setting">
						<img src="../../../static/img/list-1.png" alt="" width=24 height=24>
					</div>
				</div>
				<div class="rotate">
					<div class="rotate-img" :class="{'cd-paly':!playing}">
						<img src="../../../static/img/stick_bg.png" alt="" height=140>
					</div>
					<div class="rotate-mid" :class="{'cd-rotate':!playing}">
						<img :src="albumPic + '?param=500y500'" alt="">
					</div>
				</div>
				<div class="bottom">
					<div class="menu">
						<span></span>
						<span></span>
						<span></span>
						<span></span>
					</div>
					<div class="progress">
						<progressslider :mwidth="mwidth" @change="setTime"></progressslider>
						<div class="time">
							<span id="cur">{{time.start}}</span>
							<span id="total">{{time.end}}</span>
						</div>
					</div>
					<div class="action">
						<span></span>
						<span @click="pre"></span>
						<span @click="togglePlay" :class="{'isplay':playing,'noplay':!playing}"></span>
						<span @click="next"></span>
						<span @click="showlist"></span>
					</div>
				</div>
			</div>
			<div class="bg">
				<img :src="albumPic + '?param=500y500'" alt="" width="100%" height="100%">
			</div>
			<div class="">
				<audio :src="audiourl" id="audioPlay" @canplay="canPlaySong" @timeupdate="updateTime"></audio>
			</div>
			<div class="tip" v-show="tipshow">
				<div class="content">
					歌曲加载错误！
				</div>
				<div class="fun" @click="tipshow = !tipshow">
					确定
				</div>
			</div>
			<div class="list">
				<transition name="fade">
					<div class="list-bg" @click="hidelist" v-show="listshow"></div>
				</transition>
				<transition name="fold">
					<div class="list-song" v-show="listshow">
						<div class="title" @click="nulllist">清空</div>
						<div ref="songlistWrapper" class="ul-song">
							<ul>
								<li v-for="(item,index) in list" class="li border-1px" @click="playsong(index,item)">
									<div :class="{'active':item.songname === song.songname}">
										<span>{{index}}</span>
										<span>{{item.songname}}</span>
										<span>{{item.name}}</span>
									</div>
								</li>
							</ul>
						</div>
					</div>
				</transition>
			</div>
		</div>
	</transition-group>
</template>

<script type="text/ecmascript-6">
	import Progressslider from '../Progressslider/Progressslider.vue';
	import { changeTime } from '../../common/js/changeTime';
	import BScroll from 'better-scroll';
	import api from '../../api';
	export default {
		data() {
			return {
				index: -1,
				listshow: false,
				showFlag: false,
				playing: true,
				tipshow: false,
				mwidth: 0,
				time: {
					start: '00:00',
					end: '00:00'
				},
				song: {},
				audiourl: '',
				albumPic: '../../../static/img/placeholder_disk_play_song.png',
				songname: '暂无歌曲',
				list: []
			};
		},
		created() {
			this.$nextTick(() => {
				this.canPlaySong();
			});
		},
		methods: {
			pre() {
				if(this.index > 0) {
					console.log('pre');
					this.index--;
					this.item = this.list[this.index];
					this.playsong(this.index, this.item);
				}
			},
			next() {
				if(this.index < this.list.length - 1) {
					console.log('next');
					this.index++;
					this.item = this.list[this.index];
					this.playsong(this.index, this.item);
				}
			},
			_initScroll() {
				if(!this.songlistScroll) {
					this.songlistScroll = new BScroll(this.$refs.songlistWrapper, {
						click: true
					});
				} else {
					this.songlistScroll.refresh();
				}
			},
			nulllist() {
				this.list.splice(0, this.list.length);
				this.hide();
			},
			hidelist() {
				this.listshow = false;
			},
			showlist() {
				this.listshow = true;
			},
			show(item) {
				//      this.albumPic = item.al.picUrl;
				this.showFlag = true;
				if(item) {
					let index = 0;
					var thisindex = 0;
					for(let i in this.list) {
						if(this.list[i].songname === item.songname) {
							thisindex = i;
							index++;
						}
					}
					if(index === 0) {
						this.list.push(item);
						this.$nextTick(() => {
							this._initScroll();
						});
						this.playsong(this.list.length - 1, item);
					} else {
						this.playsong(thisindex, item);
					}
				}
			},
			playsong(index, item) {
				console.log(index);
				this.hidelist();
				this.index = index;
				this.song = item;
				this.albumPic = item.migUrl;
				this.songname = item.songname;
				this.name = item.name;
				if(item.audiosrc !== undefined) {
					this.audiourl = item.audiosrc;
					this.$nextTick(() => {
						this.canPlaySong();
					});
				} else {
					this.get(item);
					this.canPlaySong();
				}
			},
			canPlaySong() {
				document.getElementById('audioPlay').play();
				this.playing = false;
			},
			get(item) {
				this.$http.get(api.getSong(item.id)).then((res) => {
					console.log('加载成功');
					if(res.data.data[0].url === null) {
						console.log('歌曲加载错误');
					} else {
						this.audiourl = res.data.data[0].url;
						this.canPlaySong();
						this.$nextTick(() => {
							this.canPlaySong();
						});
					}
				}).catch((error) => {
					console.log('加载歌曲信息出错:' + error);
				});
			},
			hide() {
				this.showFlag = false;
			},
			togglePlay() {
				if(this.playing === false) {
					document.getElementById('audioPlay').pause();
					this.playing = true;
				} else {
					document.getElementById('audioPlay').play();
					this.playing = false;
				}
			},
			updateTime() {
				var myaudio = document.getElementById('audioPlay');
				var time = parseInt(myaudio.currentTime);
				var timelength = myaudio.duration;
				if(isNaN(timelength)) {
					this.tipshow = true;
				} else {
					this.tipshow = false;
					this.mwidth = time / timelength * 100;
					this.time.start = changeTime(time);
					this.time.end = changeTime(timelength);
					if(timelength === time) {
						this.togglePlay();
					}
				}
			},
			setTime(value) {
				var myaudio = document.getElementById('audioPlay');
				var timelength = myaudio.duration;
				myaudio.currentTime = timelength * value / 100;
			}
		},
		components: {
			Progressslider
		}
	};
</script>
<style>

</style>