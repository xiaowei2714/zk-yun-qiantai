import siteInfo from "siteinfo";
// 对数据请求的封装
const request = async function(method, url, data = {}) {
	uni.showNavigationBarLoading()
	let token = uni.getStorageSync('token')
	// data.token = token
	return new Promise((resolve, reject) => {
		uni.request({
			url: siteInfo.apiroot + url,
			// url: url,
			method,
			data,
			timeout: 600000,
			sslVerify: false,
			header: {
				"Content-Type": "application/x-www-form-urlencoded",
				"token": token
			},
			success: res => {
				// console.log(res)
				// uni.$u.toast(res.data.msg);
				if (res.data.code == -1 || res.data.code == '-1' || res.data.msg == '登录超时，请重新登录' || res.data.msg == '请求参数缺token') {
					uni.$u.toast('请重新登录');
					// #ifdef H5
					setTimeout(() => {
						window.location.href = '/mobile/#/pages/login/login';
					}, 1000);
					// #endif
					
					// #ifndef H5
					setTimeout(() => {
						uni.reLaunch({
							url: '/pages/login/login',
							success: () => console.log('跳转成功'),
							fail: (err) => console.error('跳转失败:', err)
						});
					}, 1000);
					// #endif
				// 	setTimeout(() => {
				// 		uni.reLaunch({
				// 			url: '/pages/login/login'
				// 		})
				// 	}, 1000)
				}
				resolve(res.data)
			},
			fail: rej => {
				reject(rej)
			},
			complete: function() {
				uni.hideNavigationBarLoading()
			}
		})
	})
	// return request(url, method, data)
}

export default request;