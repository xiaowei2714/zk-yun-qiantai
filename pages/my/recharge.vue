<template>
	<view style="width: 100%;">
		<view style="padding: 30rpx;">
			<view style="background: #F8F8F8;border-radius: 24rpx;">
				<view style="padding: 30rpx;">
					<view style="font-weight: 400;font-size: 30rpx;color: #A9ABB6;">请输入充值金额</view>
					<view style="margin-top: 40rpx;display: flex;justify-content: space-between;">
						<view style="display: flex;align-items: center;">
							<view style="font-weight: bold;font-size: 40rpx;">＄</view>
							<view style="margin-left: 12rpx;">
								<input type="text" placeholder="100.00" placeholder-style="font-weight: 400;font-size: 40rpx;color: #A9ABB6;" />
							</view>
						</view>
						<view style="display: flex;align-items: center;">
							<view style="font-weight: 400;font-size: 30rpx;">USDT</view>
							<view style="margin-left: 18rpx;margin-top: 12rpx;">
								<image src="/static/cz-usdt.png" style="width: 38rpx;height: 38rpx;" mode=""></image>
							</view>
						</view>
					</view>
				</view>
				<view style="height: 1rpx;background-color: #EAEAEA;width: 100%;"></view>
				<view style="width: 1rpx;height: 30rpx;"></view>
			</view>
			<view @click="toPages('/pages/my/recharge-detail')" style="margin-top: 40rpx;height: 80rpx;background: #3742C5;border-radius: 32rpx;font-weight: bold;font-size: 28rpx;color: #FFFFFF;
				line-height: 80rpx;text-align: center;">确认</view>
			<view style="margin-top: 52rpx;font-weight: bold;font-size: 32rpx;">充值明细</view>
			<view style="margin-top: 30rpx;padding: 34rpx;box-shadow: 0rpx 6rpx 32rpx 2rpx rgba(0,0,0,0.08);border-radius: 24rpx;" v-for="(item, index) in 3" :key="index">
				<view style="display: flex;justify-content: space-between;">
					<view style="font-weight: bold;font-size: 30rpx;">充值已到账</view>
					<view style="font-weight: bold;font-size: 30rpx;">1.8102 USDT</view>
				</view>
				<view style="margin-top: 28rpx;display: flex;justify-content: space-between;">
					<view style="font-weight: 400;font-size: 24rpx;color: #A9ABB6;">2024-02-29 12:11:40</view>
					<view style="font-weight: 400;font-size: 24rpx;color: #377FF3;">倒计时 15:00</view>
				</view>
			</view>
			
			
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		methods: {
			toPages(url) {
				uni.navigateTo({
					url: url
				})
			},
		}
	}
</script>

<style lang="scss">

</style>
