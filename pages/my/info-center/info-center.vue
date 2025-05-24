<template>
	<view style="padding: 30rpx;">
		<view @click="toPage(0)"
			style="display: flex;justify-content: space-between;align-items: center;margin-top: 50rpx;">
			<view style="display: flex;align-items: center;">
				<view>
					<image src="/static/my-gg.png" style="width: 80rpx;height: 80rpx;" mode=""></image>
				</view>
				<view style="margin-left: 20rpx;">
					<view style="font-weight: bold;font-size: 30rpx;">公告</view>
					<view style="margin-top: 8rpx;font-weight: 400;font-size: 24rpx;color: #A9ABB6;">{{ notice.title }}
					</view>
				</view>
			</view>
			<view style="font-weight: 400;font-size: 24rpx;color: #A9ABB6;">{{ notice.time }}</view>
		</view>
		<view @click="toPage(1)"
			style="display: flex;justify-content: space-between;align-items: center;margin-top: 74rpx;">
			<view style="display: flex;align-items: center;">
				<view>
					<image src="/static/my-ddtz.png" style="width: 80rpx;height: 80rpx;" mode=""></image>
				</view>
				<view style="margin-left: 20rpx;">
					<view style="font-weight: bold;font-size: 30rpx;">订单通知</view>
					<view style="margin-top: 8rpx;font-weight: 400;font-size: 24rpx;color: #A9ABB6;">{{ order.title }}
					</view>
				</view>
			</view>
			<view style="font-weight: 400;font-size: 24rpx;color: #A9ABB6;">{{ order.time }}</view>
		</view>
		<view @click="toPage(2)"
			style="display: flex;justify-content: space-between;align-items: center;margin-top: 74rpx;">
			<view style="display: flex;align-items: center;">
				<view>
					<image src="/static/my-jytz.png" style="width: 80rpx;height: 80rpx;" mode=""></image>
				</view>
				<view style="margin-left: 20rpx;">
					<view style="font-weight: bold;font-size: 30rpx;">交易通知</view>
					<view style="margin-top: 8rpx;font-weight: 400;font-size: 24rpx;color: #A9ABB6;">
						{{ transfer.title }}</view>
				</view>
			</view>
			<view style="font-weight: 400;font-size: 24rpx;color: #A9ABB6;">{{ transfer.time }}</view>
		</view>
		<view @click="toPage(3)"
			style="display: flex;justify-content: space-between;align-items: center;margin-top: 74rpx;">
			<view style="display: flex;align-items: center;">
				<view>
					<image src="/static/my-cztz.png" style="width: 80rpx;height: 80rpx;" mode=""></image>
				</view>
				<view style="margin-left: 20rpx;">
					<view style="font-weight: bold;font-size: 30rpx;">充值通知</view>
					<view style="margin-top: 8rpx;font-weight: 400;font-size: 24rpx;color: #A9ABB6;">
						{{ recharge.title }}</view>
				</view>
			</view>
			<view style="font-weight: 400;font-size: 24rpx;color: #A9ABB6;">{{ recharge.time }}</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				notice: {},
				order: {},
				transfer: {},
				recharge: {}
			};
		},
		onLoad() {
			this.getData()
		},
		methods: {
			getData() {
				uni.showLoading({
					title: '加载中',
					mask: true
				})
				this.$request('get', 'api/notice/everyNewest', {}).then(res => {
					uni.hideLoading()
					if (res.code) {
						this.notice = res.data.notice
						this.order = res.data.order
						this.transfer = res.data.transfer
						this.recharge = res.data.recharge
					}
				})
			},
			toPage(type) {
				if (type != 0) {
					uni.navigateTo({
						url: '/pages/my/info-center/order-notice?type=' + type
					})
				} else {
					uni.navigateTo({
						url: '/pages/index/notice'
					})
				}
			}
		}
	}
</script>

<style lang="scss">

</style>