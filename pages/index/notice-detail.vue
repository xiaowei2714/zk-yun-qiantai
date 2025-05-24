<template>
	<view style="padding: 30rpx;">
		<view style="font-weight: bold;font-size: 30rpx;color: black;">{{info.title}}</view>
		<view style="color: #A9ABB6;font-size: 24rpx;margin-top: 20rpx;">发布时间：{{info.create_time}}</view>
		<view style="font-size: 36rpx;margin-top: 20rpx;">
			<mp-html :content="info.content" />
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				id: 0,
				type: '',
				info: {}
			};
		},
		onLoad(options) {
			this.id = options.id
			this.type = options.type ?? ''
			this.getInfo()
		},
		methods: {
			getInfo() {
				uni.showLoading({
					title: '加载中',
					mask: true
				})
				if (this.type) {
					this.$request('get', 'api/notice/info', {
						id: this.id
					}).then(res => {
						uni.hideLoading()
						if (res.code) {
							this.info = res.data
						} 
					})
				} else {
					this.$request('get', 'api/index/getNoticeDetail', {
						id: this.id
					}).then(res => {
						uni.hideLoading()
						if (res.code) {
							this.info = res.data.info
						} 
					})
				}
			}
		}
	}
</script>

<style lang="scss">

</style>
