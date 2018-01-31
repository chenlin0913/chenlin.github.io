let Formats = {
	formatSearch:function(data){
		if(data.code==400){
			return [];
		}else{
			let songs = new Array();
			for (var i = 0; i < data.result.songs.length; i++) {
				let singer = '';
				for (var j = 0; j < data.result.songs[i].artists.length; j++) {
					singer = singer+' '+data.result.songs[i].artists[j].name;
					songs.push({
						value:data.result.songs[i].name+'-'+singer,
						id:data.result.songs[i].id
					})
				}
			}
			return songs;
		}
			
	}
}

export default Formats;
