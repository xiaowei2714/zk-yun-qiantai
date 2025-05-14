<template>
	<view style="padding: 30rpx;">
		<view @click="toPage(('/pages/index/notice'))" style="display: flex;justify-content: space-between;align-items: center;margin-top: 50rpx;">
			<view style="display: flex;align-items: center;">
				<view>
					<image src="/static/my-gg.png" style="width: 80rpx;height: 80rpx;" mode=""></image>
				</view>
				<view style="margin-left: 20rpx;">
					<view style="font-weight: bold;font-size: 30rpx;">公告</view>
					<view style="margin-top: 8rpx;font-weight: 400;font-size: 24rpx;color: #A9ABB6;">币安合约调整多个U本位永续合约杠杆及...</view>
				</view>
			</view>
			<view style="font-weight: 400;font-size: 24rpx;color: #A9ABB6;">02/21</view>
		</view>
		<view @click="toPage('/pages/my/info-center/order-notice')" style="display: flex;justify-content: space-between;align-items: center;margin-top: 74rpx;">
			<view style="display: flex;align-items: center;">
				<view>
					<image src="/static/my-ddtz.png" style="width: 80rpx;height: 80rpx;" mode=""></image>
				</view>
				<view style="margin-left: 20rpx;">
					<view style="font-weight: bold;font-size: 30rpx;">订单通知</view>
					<view style="margin-top: 8rpx;font-weight: 400;font-size: 24rpx;color: #A9ABB6;">币安合约调整多个U本位永续合约杠杆及...</view>
				</view>
			</view>
			<view style="font-weight: 400;font-size: 24rpx;color: #A9ABB6;">02/21</view>
		</view>
		<view @click="toPage('/pages/my/info-center/jy-notice')" style="display: flex;justify-content: space-between;align-items: center;margin-top: 74rpx;">
			<view style="display: flex;align-items: center;">
				<view>
					<image src="/static/my-jytz.png" style="width: 80rpx;height: 80rpx;" mode=""></image>
				</view>
				<view style="margin-left: 20rpx;">
					<view style="font-weight: bold;font-size: 30rpx;">交易通知</view>
					<view style="margin-top: 8rpx;font-weight: 400;font-size: 24rpx;color: #A9ABB6;">Y币充值成功提醒</view>
				</view>
			</view>
			<view style="font-weight: 400;font-size: 24rpx;color: #A9ABB6;">02/21</view>
		</view>
		<view @click="toPage('/pages/my/info-center/cz-notice')" style="display: flex;justify-content: space-between;align-items: center;margin-top: 74rpx;">
			<view style="display: flex;align-items: center;">
				<view>
					<image src="/static/my-cztz.png" style="width: 80rpx;height: 80rpx;" mode=""></image>
				</view>
				<view style="margin-left: 20rpx;">
					<view style="font-weight: bold;font-size: 30rpx;">充值通知</view>
					<view style="margin-top: 8rpx;font-weight: 400;font-size: 24rpx;color: #A9ABB6;">Y币充值成功提醒</view>
				</view>
			</view>
			<view style="font-weight: 400;font-size: 24rpx;color: #A9ABB6;">02/21</view>
		</view>
		
		
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		onLoad() {
			
		},
		methods: {
			toPage(url) {
				uni.navigateTo({
					url: url
				})
			}
		}
	}
</script>

<style lang="scss">

</style>
