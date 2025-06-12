<template>
	<view style="width: 100%;">
		<view style="padding: 30rpx;">
			<view
				style="padding: 34rpx;background: #F2F6FF;border-radius: 32rpx;display: flex;justify-content: center;align-items: center;">
				<view style="">
					<view style="display: flex;align-items: center;justify-content: center;">
						<view style="font-weight: 400;font-size: 24rpx;color: #A9ABB6;">用户KEY</view>
					</view>
					<view style="display: flex;margin-top: 14rpx;">
						<view style="font-weight: 800;font-size: 24rpx;">{{ key }}</view>
						<view style="margin-left: 20rpx;">
							<image @click="copy" src="/static/czxqfz.png" style="width: 27rpx;height: 27rpx;" mode="">
							</image>
						</view>
					</view>
				</view>
			</view>
			<view style="margin-top: 84rpx;">
				<web-view :src="url"
					style="width: 92%;margin-left: 4%;margin-top: 220rpx;box-shadow: 0rpx 6rpx 32rpx 2rpx rgba(0,0,0,0.08);border-radius: 32rpx;"></web-view>
			</view>
		</view>
	</view>
</template>

<script>
	import siteInfo from "siteinfo";
	export default {
		data() {
			return {
				key: '',
				data: '',
				url: ''
			};
		},
		onShow() {
			this.url = siteInfo.apiroot + 'static/api.html'
			this.getData()
		},
		methods: {
			getData() {
				uni.showLoading({
					title: '加载中',
					mask: true
				})
				this.$request('get', 'api/user/getUserAPI').then(res => {
					uni.hideLoading()
					if (res.code) {
						this.key = res.data.key
						this.data = res.data.data
					}
				})
			},
			toPages(url) {
				uni.navigateTo({
					url: url
				})
			},
			copy() {
				// #ifdef H5
				this.$copyText(this.key).then(
					res => {
						uni.$u.toast('复制成功')
					}
				)
				// #endif
				// #ifdef APP-PLUS
				uni.setClipboardData({
					data: this.key,
					success: () => {
						uni.$u.toast('复制成功')
					},
					fail: () => {
						uni.$u.toast('复制失败')
					}
				});
				// #endif
			},
		}
	}
</script>

<style lang="scss">

</style>