<template>
	<view style="padding: 30rpx;">
		<view style="padding: 30rpx;background-color: white;border-radius: 32rpx;">
			<view style="font-weight: bold;width: 100%;text-align: center;font-size: 30rpx;">添加客服二维码</view>
			<view style="width: 100%;height: 1rpx;background-color: #f1f1ff;margin-top: 30rpx;margin-bottom: 30rpx;">
			</view>
			<view style="display: flex;justify-content: center;">
				<view>
					<image :src="kf_qrcode" style="width: 200rpx;height: 200rpx;" mode=""></image>
				</view>
			</view>
			<view
				style="margin-top: 20rpx;color: #3742C5;font-size: 28rpx;width: 100%;text-align: center;text-decoration: underline;">
				{{kf_mobile}}
			</view>
			<view style="margin-top: 20rpx;color: #b2b2b2;font-size: 28rpx;width: 100%;text-align: center;">
				服务时间：{{kf_time}}</view>
			<view style="display: flex;justify-content: center;margin-top: 50rpx;margin-bottom: 50rpx;">
				<view @click="saveImage" style="width: 350rpx;height: 80rpx;border-radius: 100rpx;text-align: center;line-height: 80rpx;font-size: 30rpx;color: white;background-color: #3742C5;
					">保存客服二维码</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				kf_qrcode: '',
				kf_mobile: '',
				kf_time: ''
			};
		},
		onLoad() {
			this.getKf()
		},
		onShow() {
			this.getKf()
		},
		methods: {
			saveImage() {
				// #ifdef H5
				this.saveImageInH5(this.kf_qrcode)
				// #endif

				// #ifdef APP-PLUS
				this.saveImageInApp(this.kf_qrcode)
				// #endif
			},
			saveImageInH5(imagePath) {
				if (!imagePath.startsWith('http') && !imagePath.startsWith('data:image')) {
					imagePath = imagePath.startsWith('/') ? imagePath : '/' + imagePath
					imagePath = window.location.origin + imagePath
				}

				// 创建a标签下载
				const a = document.createElement('a')
				a.href = imagePath
				a.download = 'image_' + new Date().getTime() + '.jpg'
				document.body.appendChild(a)
				a.click()
				document.body.removeChild(a)
				uni.$u.toast('保存成功')
			},
			saveImageInApp(imagePath) {
				// 检查权限
				plus.gallery.requestAuthorization().then(() => {
					// 保存到相册
					plus.gallery.save(imagePath, () => {
						resolve({
							errMsg: '保存成功'
						})
						console.log(errMsg)
					}, (err) => {
						reject({
							errMsg: '保存失败 ' + err.message
						})
						console.log(errMsg)
					})
				}).catch(err => {
					reject({
						errMsg: '保存失败 ' + err.message
					})
					console.log(errMsg)
				})
			},
			getKf() {
				uni.showLoading({
					title: '加载中',
					mask: true
				})
				this.$request('get', 'api/index/getKf').then(res => {
					uni.hideLoading()
					if (res.code) {
						this.kf_qrcode = res.data.kf_qrcode
						this.kf_mobile = res.data.kf_mobile
						this.kf_time = res.data.kf_time
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #f1f1ff;
	}
</style>