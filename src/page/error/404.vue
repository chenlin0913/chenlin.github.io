<template>
	<div>404
		<el-slider v-model="ProgressValue"></el-slider>
		<input name="file" id="btn_file" type="file" accept="image/png,image/gif,image/jpeg" @change="uploadpic" style="display: none;" />
		<div style="width: 80px; height: 80px;"><img v-lazy="urls" style="width: 100%; height: 100%;" /></div>
		<button @click="openFile">上传照片</button>

		<div id="payPwd">
			<div style="text-align: center">
				支付密码设置
			</div>
			<input ref="pwd" type="password" pattern="[0-9]*" maxlength="6" v-model="msg" style="position: absolute;z-index: -1;left:-100%;opacity: 0" />
			<ul class="pwd-wrap" @click="focus">
				<li><i v-if="msgLength > 0"></i></li>
				<li><i v-if="msgLength > 1"></i></li>
				<li><i v-if="msgLength > 2"></i></li>
				<li><i v-if="msgLength > 3"></i></li>
				<li><i v-if="msgLength > 4"></i></li>
				<li><i v-if="msgLength > 5"></i></li>
			</ul>
		</div>
		<input type="button"  value="点击" @click="functionSayHello"/>
	</div>
</template>

<script>
	import { Aside, Slider } from 'element-ui'

	export default {
		data() {
			return {
				ProgressValue: 20,
				urls: '',
				msg: '',
				msgLength: 0,
			}
		},
		created() {
			
		},
		watch: {
			msg(curVal) {
				console.log(this.msg);
				if(/[^\d]/g.test(curVal)) {
					this.msg = this.msg.replace(/[^\d]/g, '');
				} else {
					this.msgLength = curVal.length;
				}
			},
		},
		components: {
			Aside,
			Slider
		},
		methods: {
			s(val) {
				console.log(val);
			},
			uploadpic(e) {
				var self = this
				let file = e.target.files[0];
				if(!/image\/\w+/.test(file.type)) {
					alert("请确保文件为图像类型");
					return false;
				}
				var reader = new FileReader();
				reader.readAsDataURL(file);
				reader.onload = function(e) {
					self.urls = this.result; //获取base64 img
					self.$axioss.post('/img2', {
						imgFile: this.result
					}).then((response) => {
						console.log(response)
					});

				}
			},
			openFile() {
				document.getElementById('btn_file').click();
			},
			focus() {
				this.$refs.pwd.focus();
			},
			functionSayHello(e) {
				e.target.disabled = true;
				alert("HelloWorld");
				e = window.event || e;
				if(e.stopPropagation) {
					e.stopPropagation();
				} else {
					console.log(2);
					e.cancelBubble = true;
				}
				e.target.disabled = false;
			}
		}
	}
</script>

<style>
	#payPwd .pwd-wrap {
		width: 90%;
		height: 44px;
		padding-bottom: 1px;
		margin: 0 auto;
		background: #fff;
		border: 1px solid #ddd;
		display: flex;
		display: -webkit-box;
		display: -webkit-flex;
		cursor: pointer;
	}
	
	.pwd-wrap li {
		list-style-type: none;
		text-align: center;
		line-height: 44px;
		-webkit-box-flex: 1;
		flex: 1;
		-webkit-flex: 1;
		border-right: 1px solid #ddd;
	}
	
	.pwd-wrap li:last-child {
		border-right: 0;
	}
	
	.pwd-wrap li i {
		height: 10px;
		width: 10px;
		border-radius: 50%;
		background: #000;
		display: inline-block;
	}
</style>