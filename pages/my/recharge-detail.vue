<template>
	<view style="width: 100%;">
		<view style="display: flex;justify-content: center;margin-top: 80rpx;">
			<view style="width: 276rpx;height: 276rpx;border: 2rpx solid #3742C5;padding: 6rpx;">
				<view style="width: 100%;height: 100%;background-color: bisque;"></view>
			</view>
		</view>
		<view style="padding: 30rpx;">
			<view style="font-weight: bold;font-size: 32rpx;">网络</view>
			<view style="padding: 20rpx;background: #F6F7F9;border-radius: 32rpx;font-weight: 400;font-size: 32rpx;color: #757B8C;margin-top: 18rpx;">
				<view style="margin-left: 12rpx;">Tron (TRC20)</view>
			</view>
			<view style="font-weight: bold;font-size: 32rpx;margin-top: 38rpx;">充值地址</view>
			<view style="padding: 20rpx;background: #F6F7F9;border-radius: 32rpx;font-weight: 400;font-size: 32rpx;color: #757B8C;margin-top: 18rpx;
				display: flex;justify-content: space-between;align-items: center;">
				<view style="margin-left: 12rpx;">TDFSjksdf35rYSM+hdsk20HLsje</view>
				<view>
					<image src="/static/czxqfz.png" style="width: 26rpx;height: 26rpx;" mode=""></image>
				</view>
			</view>
			<view style="margin-top: 80rpx;display: flex;justify-content: space-between;">
				<view style="font-weight: 400;font-size: 28rpx;color: #757B8C;">订单号</view>
				<view style="font-weight: 400;font-size: 28rpx;">{{ info.order_no }}</view>
			</view>
			<view style="margin-top: 30rpx;display: flex;justify-content: space-between;">
				<view style="font-weight: 400;font-size: 28rpx;color: #757B8C;">订单充值金额</view>
				<view style="font-weight: 400;font-size: 28rpx;">{{ info.money }} USDT</view>
			</view>
			<view style="margin-top: 55rpx;padding: 24rpx;background: #ECF0F9;border-radius: 32rpx;font-weight: 400;font-size: 24rpx;color: #757B8C;line-height: 36rpx;">
				<view>必须按照订单充值金额进行汇款，小数点以后也要转，否则不会自动到账。</view>
				<view>请在20:00分钟内完成汇款，以防订单时效无法到账</view>
			</view>
			<view v-if="info.status == 2" style="margin-top: 150rpx;height: 80rpx;background: #3742C5;border-radius: 32rpx;font-weight: bold;font-size: 28rpx;color: #FFFFFF;text-align: center;
				line-height: 80rpx;">
				充值未到账？
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				order_id: '',
				info: {}
			};
		},
		onLoad(options) {
			this.order_id = options.id
			this.getDetail()
		},
		methods: {
			getDetail() {
				uni.showLoading({
					title: '加载中',
					mask: true
				})
				
				this.$request('get', 'api/recharge/info', {
					id: this.order_id
				}).then(res => {
					uni.hideLoading()
					if (res.code) {
						this.info = res.data.info
					} else {
						uni.$u.toast(res.msg)
					}
				})
			}
		}
	}
</script>

<style lang="scss">

</style>
