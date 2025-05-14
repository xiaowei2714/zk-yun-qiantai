<template>
	<view style="padding: 30rpx;">
		<view style="padding: 30rpx;box-shadow: 0rpx 6rpx 32rpx 2rpx rgba(0,0,0,0.08);border-radius: 32rpx;">
			<view style="font-weight: 400;font-size: 24rpx;">输入礼品卡卡名</view>
			<view
				style="height: 80rpx;margin-top: 12rpx;background: #F6F7F9;border-radius: 24rpx;display: flex;align-items: center;width: 100%;">
				<view style="width: 100%;margin-left: 34rpx;">
					<input type="text" placeholder="请输入"
						placeholder-style="font-weight: 400;font-size: 30rpx;color: #B7BAC7;width: 100%" />
				</view>
			</view>
			<view style="font-weight: 400;font-size: 24rpx;margin-top: 26rpx;">输入购买金额</view>
			<view
				style="height: 80rpx;margin-top: 12rpx;background: #F6F7F9;border-radius: 24rpx;display: flex;align-items: center;width: 100%;">
				<view style="width: 100%;margin-left: 34rpx;">
					<input type="text" placeholder="请输入"
						placeholder-style="font-weight: 400;font-size: 30rpx;color: #B7BAC7;width: 100%" />
				</view>
			</view>
		</view>
		<view style="margin-top: 68rpx;font-weight: bold;font-size: 32rpx;">实付金额</view>
		<view style="margin-top: 26rpx;height: 100rpx;background: #F6F7F9;border-radius: 24rpx;display: flex;justify-content: space-between;
			align-items: center;padding-left: 30rpx;padding-right: 30rpx;">
			<view>
				<span style="font-weight: bold;font-size: 40rpx;">¥</span>
				<span style="margin-left: 14rpx;font-weight: bold;font-size: 40rpx;">168.00</span>
			</view>
			<view>
				<image src="/static/index-huaf-bianj.png" style="width: 33rpx;height: 33rpx;" mode=""></image>
			</view>
		</view>
		<view style="margin-top: 40rpx;display: flex;justify-content: space-between;">
			<view style="font-weight: 400;font-size: 28rpx;color: #757B8C;">优惠信息</view>
			<view style="font-weight: bold;font-size: 28rpx;color: #000000;">8.40折 优惠32.00元</view>
		</view>
		<view style="margin-top: 36rpx;display: flex;justify-content: space-between;">
			<view style="font-weight: 400;font-size: 28rpx;color: #757B8C;">参考汇率</view>
			<view style="font-weight: bold;font-size: 28rpx;color: #000000;">7.18</view>
		</view>
		<view style="margin-top: 36rpx;display: flex;justify-content: space-between;align-items: center;">
			<view style="font-weight: 400;font-size: 28rpx;color: #757B8C;">合计支付</view>
			<view style="font-weight: bold;font-size: 36rpx;color: #EB8E26;">23.50 USDT</view>
		</view>
		<view style="margin-top: 60rpx;height: 80rpx;background: #3742C5;border-radius: 32rpx;font-weight: bold;font-size: 28rpx;color: #FFFFFF;
			text-align: center;line-height: 80rpx;">
			确认充值
		</view>
		
		
		
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss">

</style>
