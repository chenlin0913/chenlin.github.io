let Formats = {
	formatSearch:function(data){
		if(data.code==400){
			return [];
		}else{
			let songs = new Array();
			for (var i = 0; i < data.result.songs.length; i++) {
				songs.push({
					value:data.result.songs[i].name,
					id:data.result.songs[i].id
				})
			}
			return songs;
		}
			
	}
}

export default Formats;
