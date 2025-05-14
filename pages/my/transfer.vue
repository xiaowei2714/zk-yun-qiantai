<template>
	<view style="width: 100%;">
		<view style="padding: 30rpx;">
			<view style="background: #F8F8F8;border-radius: 24rpx;">
				<view style="padding: 30rpx;">
					<view style="font-weight: 400;font-size: 30rpx;color: #A9ABB6;">请输入划转数量</view>
					<view style="margin-top: 40rpx;display: flex;">
						<view style="display: flex;align-items: center;">
							<view style="font-weight: bold;font-size: 40rpx;">＄</view>
							<view style="margin-left: 12rpx;">
								<input type="text" placeholder="100.00" placeholder-style="font-weight: 400;font-size: 40rpx;color: #A9ABB6;" />
							</view>
						</view>
					</view>
				</view>
				<view style="height: 1rpx;background-color: #EAEAEA;width: 100%;"></view>
				<view style="width: 1rpx;height: 30rpx;"></view>
			</view>
			<view style="margin-top: 28rpx;padding: 30rpx;background: #F8F8F8;border-radius: 24rpx;">
				<view style="font-weight: bold;font-size: 30rpx;">划转地址</view>
				<view style="margin-top: 22rpx;width: 100%;">
					<input type="text" style="width: 100%;" placeholder="请输入划转地址" placeholder-style="font-weight: 400;font-size: 30rpx;color: #A9ABB6;" />
				</view>
			</view>
			<view style="margin-top: 44rpx;height: 80rpx;background: #3742C5;border-radius: 32rpx;font-weight: bold;font-size: 28rpx;color: #FFFFFF;
				text-align: center;line-height: 80rpx;">
				确认划转
			</view>
			<view style="margin-top: 44rpx;font-weight: bold;font-size: 32rpx;">
				划转明细
			</view>
			<view style="margin-top:  30rpx;padding: 30rpx;display: flex;box-shadow: 0rpx 6rpx 32rpx 2rpx rgba(0,0,0,0.08);border-radius: 24rpx;" v-for="(item, index) in 3" :key="index">
				<view>
					<image src="/static/qb-tix.png" style="width: 84rpx;height: 84rpx;" mode=""></image>
				</view>
				<view style="margin-left: 24rpx;width: 100%;">
					<view style="display: flex;justify-content: space-between;">
						<view style="font-weight: bold;font-size: 30rpx;">USDT划转</view>
						<view style="font-weight: bold;font-size: 30rpx;color: #EB8E26;">-0.04＄</view>
					</view>
					<view style="font-weight: 400;font-size: 24rpx;color: #A9ABB6;margin-top: 14rpx;">2024-02-29 12:11:40</view>
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
		}
	}
</script>

<style lang="scss">

</style>
