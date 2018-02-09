<template>
	<el-menu background-color="#242424" text-color="#ccc" active-text-color="#ffd04b" :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
		<el-menu-item index="1">发现音乐</el-menu-item>
		<el-menu-item index="2">我的音乐</el-menu-item>
		<el-menu-item index="3">朋友</el-menu-item>
		<el-menu-item index="4">商城</el-menu-item>
		<el-menu-item index="5">音乐人</el-menu-item>
		<el-menu-item index="6">下载客户端</el-menu-item>
	</el-menu>
</template>

<script>
	import { Menu } from 'element-ui'
	

	export default {
		name: 'Menu',
		data() {
			return {
				activeIndex: '1'
			}
		},
		components: {
			Menu,
		},
		methods: {
			handleSelect(key, keyPath) {
				this.$store.dispatch('setActiveIndex',{data:key});
			}
		}
	}
</script>

<style>
.el-menu-item{
	font-size: 10px !important;
}
</style>