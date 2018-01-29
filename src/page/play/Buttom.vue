<template>
	<div id="bottom">
		<img class="icon" id="rewind" src=""></img>
		<img class="icon" id="play" src=""></img>
		<img class="icon" id="pause" src=""></img>
		<img class="icon" id="forward" src=""></img>
		<span id="currentTime">00:00</span>
		<div id="time_move"></div>
		<img src="" id="process_img"></img>
		<span id="totalTime">00:00</span>
	</div>
</template>

<script>
	export default{
		name:'Buttom',
	}
</script>

<style>
	#bottom {
		position: absolute;
		width: 72.6%;
		height: 8%;
		top: 90.7%;
		right: 0.5%;
		background-color: white;
		border-radius: 0 0 5px 5px;
		border: 2px solid #777;
		border-bottom: none;
	}
	
	.icon {
		width: 61.4px;
		height: 61.4px;
		vertical-align: middle;
	}
	
	.icon:hover {
		cursor: pointer;
	}
	
	#play {
		display: none;
		vertical-align: middle;
	}
	
	#time_move {
		width: 200px;
		height: 100px;
		background: blue;
		display: inline;
	}
</style>