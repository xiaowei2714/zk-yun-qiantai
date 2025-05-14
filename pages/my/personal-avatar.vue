<template>
	<view>
		<view style="margin-top: 250rpx;">
			<image :src="avatar" style="width: 100%;height: 750rpx;" mode=""></image>
		</view>
		<view style="position: fixed;bottom: 80rpx;left: 0;width: 100%;">
			<view style="padding: 30rpx;display: flex;justify-content: center;">
				<view @click="chooseImage" style="width: 100%;height: 80rpx;background: #FFFFFF;border-radius: 32rpx;border: 2rpx solid #3742C5;font-weight: bold;
					font-size: 28rpx;color: #3742C5;text-align: center;line-height: 80rpx;">更换头像</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				avatar: '',
				new_avatar: ''
			};
		},
		onLoad(options) {
			this.avatar = options.avatar
		},
		methods: {
			chooseImage() {
				uni.chooseImage({
					count: 1,
					sizeType: ['compressed'],
					sourceType: ['album', 'camera'],
					success: res => {
						let token = uni.getStorageSync('token')
						uni.showLoading({
							title:'上传中',
							mask:true
						})
						uni.uploadFile({
							url: this.$apiUrl + 'api/upload/image',
							filePath: res.tempFilePaths[0],
							name: 'file',
							header: {
								token: token
							},
							formData: {
								'timestamp': Date.now()
							},
							success: uploadRes => {
								uni.hideLoading()
								let data = JSON.parse(uploadRes.data)
								this.avatar = this.$apiUrl + data.data.url
								this.new_avatar = data.data.url
								uni.showLoading({
									title:'更换中',
									mask:true
								})
								this.$request('post','api/index/changeAvatar',{url: this.new_avatar}).then(res => {
									uni.hideLoading()
									if (res.code) {
										uni.$u.toast('更换成功')
									} else {
										uni.$u.toast(res.msg)
									}
								})
								
							},
						})
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: black;
	}
</style>