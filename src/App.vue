<template>
  <div id="app">
  	<Header></Header>
    <router-view/>
    <Bottom></Bottom>
  </div>
</template>

<script>
	import Header from './components/common/Header'
	import Bottom from './components/common/Bottom'
	
export default {
  name: 'App',
  components:{
  	Header,
  	Bottom
  }
}
</script>

<style>
@import url("../static/font/iconfont.css");
body,div,dl,dt,dd,ul,ol,li,h1,h2,h3,h4,h5,h6,pre,form,fieldset,input,textarea,p,blockquote,th,td {margin:0;padding:0;} 
table {border-collapse:collapse;border-spacing:0;} 
fieldset,img {border:0} 
address,caption,cite,code,dfn,em,strong,th,var {font-style:normal;font-weight:normal} 
ol,ul {list-style:none} 
caption,th {text-align:left} 
h1,h2,h3,h4,h5,h6 {font-size:100%;font-weight:normal} 
q:before,q:after {content:''} 
abbr,acronym { border:0}
input{border:0;outline:none;}
.times-cl {
		font-size: 10px;
	}
	.highBright{
		color:#fff;
	}
</style>
