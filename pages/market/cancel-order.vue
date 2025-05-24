<template>
	<view style="padding: 30rpx;">
		<view style="font-weight: bold;font-size: 60rpx;margin-top: 70rpx;width: 100%;text-align: center;">{{ info.num  }} Y币
		</view>
		<view style="margin-top: 20rpx;display: flex;justify-content: center;">
			<view style="display: flex;align-items: center;">
				<view>
					<image src="/static/jy-gt.png" style="width: 25rpx;height: 25rpx;" mode=""></image>
				</view>
				<view style="font-weight: 400;font-size: 28rpx;color: #A9ABB6;margin-left: 10rpx;">已取消</view>
			</view>
		</view>
		<view
			style="margin-top: 16rpx;width: 100%;text-align: center;font-weight: 400;font-size: 28rpx;color: #A9ABB6;">
			<view v-if="info.cancel_type == 1">
				<view>超时，系统已自动取消订单</view>
			</view>
			<view v-else>
				<view v-if="info.buy">您已取消订单</view>
				<view v-else>买房已取消订单</view>
			</view>
		</view>
		<view
			style="margin-top: 60rpx;padding: 30rpx;background: #FFFFFF;box-shadow: 0rpx 6rpx 32rpx 2rpx rgba(0,0,0,0.08);border-radius: 32rpx;">
			<view>
				<span v-if="info.is_buy" style="color: #2EBD85;font-size: 32rpx;font-weight: bold;">买入</span>
				<span v-else style="color: #F6465D;font-size: 32rpx;font-weight: bold;">卖出</span>
				<span style="font-weight: bold;font-size: 32rpx;margin-left: 10rpx;">USDT</span>
			</view>
			<view style="margin-top: 34rpx;display: flex;justify-content: space-between;align-items: center;">
				<view style="display: flex;align-items: center;">
					<view style="font-weight: 400;font-size: 24rpx;color: #A9ABB6;">总额</view>
					<view style="margin-left: 10rpx;margin-top: -5rpx;">
						<image src="/static/jy-gt.png" style="width: 21rpx;height: 21rpx;" mode=""></image>
					</view>
				</view>
				<view style="font-size: 24rpx;font-weight: bold;">￥{{info.price}}</view>
			</view>
			<view style="margin-top: 20rpx;display: flex;justify-content: space-between;align-items: center;">
				<view style="display: flex;align-items: center;">
					<view style="font-weight: 400;font-size: 24rpx;color: #A9ABB6;">价格</view>
				</view>
				<view style="font-size: 24rpx;font-weight: bold;">￥{{info.dan_price}}</view>
			</view>
			<view style="margin-top: 20rpx;display: flex;justify-content: space-between;align-items: center;">
				<view style="display: flex;align-items: center;">
					<view style="font-weight: 400;font-size: 24rpx;color: #A9ABB6;">接受数量</view>
				</view>
				<view style="font-size: 24rpx;font-weight: bold;">{{info.num}} Y币</view>
			</view>
			<view style="height: 1rpx;background-color: #F4F4F4;margin-top: 40rpx;margin-bottom: 40rpx;"></view>
			<view style="margin-top: 20rpx;display: flex;justify-content: space-between;align-items: center;">
				<view style="display: flex;align-items: center;">
					<view style="font-weight: 400;font-size: 24rpx;color: #A9ABB6;">订单号</view>
				</view>
				<view style="font-size: 24rpx;font-weight: bold;display: flex;align-items: center;">
					<view style="color: #A9ABB6;">{{info.order_no}}</view>
					<view @click="copy(info.order_no)" style="margin-left: 10rpx;">
						<image src="/static/jy-fz.png" style="width: 24rpx;height: 24rpx;" mode=""></image>
					</view>
				</view>
			</view>
			<view style="margin-top: 20rpx;display: flex;justify-content: space-between;align-items: center;">
				<view style="display: flex;align-items: center;">
					<view style="font-weight: 400;font-size: 24rpx;color: #A9ABB6;">创建时间</view>
				</view>
				<view style="font-size: 24rpx;font-weight: bold;color: #A9ABB6;">{{info.time}}</view>
			</view>
			<view style="margin-top: 20rpx;display: flex;justify-content: space-between;align-items: center;">
				<view style="display: flex;align-items: center;">
					<view style="font-weight: 400;font-size: 24rpx;color: #A9ABB6;">卖家昵称</view>
				</view>
				<view style="font-size: 24rpx;font-weight: bold;">{{info.nickname}}</view>
			</view>
		</view>
		<view style="position: fixed;bottom: 50rpx;left: 0;width: 100%;">
			<view style="padding: 30rpx;display: flex;width: 100%;">
				<view @click="moreAd" style="height: 80rpx;background: #3742C5;border-radius: 32rpx;font-weight: bold;font-size: 28rpx;color: #FFFFFF;text-align: center;line-height: 80rpx;
					width: 92%;">查看更多广告</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				order_id: '',
				info: {},
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
				this.$request('get', 'api/ad/adOrderInfo', {
					id: this.order_id
				}).then(res => {
					uni.hideLoading()
					if (res.code) {
						this.info = res.data
					}
				})
			},
			copy(value) {
				// #ifdef H5
				this.$copyText(value).then(
					res => {
						uni.$u.toast('复制成功')
					}
				)
				// #endif
				// #ifdef APP-PLUS
				uni.setClipboardData({
					data: value,
					success: () => {
						uni.$u.toast('复制成功')
					},
					fail: () => {
						uni.$u.toast('复制失败')
					}
				});
				// #endif
			},
			moreAd() {
				uni.navigateTo({
					url: '/pages/market/market'
				})
			}
		}
	}
</script>

<style lang="scss">

</style>