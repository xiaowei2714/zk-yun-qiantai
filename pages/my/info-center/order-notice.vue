<template>
	<view style="padding: 30rpx;">
		<view @click="detail(item.id)" v-for="(item, index) in list" :key="index">
			<view
				style="margin-top: 30rpx;font-weight: 400;font-size: 24rpx;color: #A9ABB6;width: 100%;text-align: center;">
				{{ item.ctime }}
			</view>
			<view style="margin-top: 28rpx;border: 2rpx solid #B7BAC7;border-radius: 32rpx;">
				<view style="padding: 30rpx;">
					<view style="font-weight: bold;font-size: 30rpx;">{{ item.title }}</view>
					<view style="margin-top: 22rpx;font-weight: 400;font-size: 24rpx;color: #A9ABB6;">
						{{ item.content }}
					</view>
				</view>
				<view style="width: 100%;height: 1rpx;background-color: #f4f4f4;"></view>
				<view style="padding: 30rpx;display: flex;justify-content: space-between;align-items: center;">
					<view style="font-weight: 400;font-size: 24rpx;color: #A9ABB6;">{{ item.time }}</view>
					<view style="display: flex;align-items: center;">
						<view style="font-weight: 400;font-size: 24rpx;color: #A9ABB6;">查看详情</view>
						<view style="margin-left: 10rpx;margin-top: 1rpx;">
							<image src="/static/tk-right.png" style="width: 26rpx;height: 26rpx;" mode=""></image>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				type: 1,
				list: [],
			};
		},
		onLoad(options) {
			this.type = options.type
			this.getList()
		},
		methods: {
			getList() {
				uni.showLoading({
					title: '加载中',
					mask: true
				})
				this.$request('get', 'api/notice/listByUser', {
					type: this.type
				}).then(res => {
					uni.hideLoading()
					if (res.code) {
						this.list = res.data
					}
				})
			},
			detail(id) {
				uni.navigateTo({
					url: '/pages/index/notice-detail?id=' + id + '&type=' + this.type
				})
			},
		}
	}
</script>

<style lang="scss">

</style>