module.exports = {
	proxyList: {
		'/apis': {
			// 测试环境
			//          target: 'http://47.94.16.170:3000',  // 网易接口1
			//          target: 'http://192.168.51.46:3000',  // 网易接口1
			target: 'http://music.163.com/', // 网易接口1
			changeOrigin: true, //是否跨域
			pathRewrite: {
				'^/apis': '' //需要rewrite重写的,
			},
			headers: {
				'Accept': '*/*',
				'Accept-Language': 'zh-CN,zh;q=0.8,gl;q=0.6,zh-TW;q=0.4',
				'Connection': 'keep-alive',
				'Content-Type': 'application/x-www-form-urlencoded',
				'Referer': 'http://music.163.com',
				'Cookie': 'appver=2.0.2',
				'Host': 'music.163.com',
				// 'Cookie': cookie,
				'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/33.0.1750.152 Safari/537.36',

			},
		}
	}
}