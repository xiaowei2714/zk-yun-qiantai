<template>
	<view style="width: 100%;">
		<view style="background-color: white;padding-left: 30rpx;padding-right: 30rpx;">
			<view
				style="width: 100%;height: 70rpx;background: #F6F7F9;border-radius: 24rpx;display: flex;align-items: center;">
				<view style="margin-left: 30rpx;">
					<image src="/static/order-sous.png" style="width: 30rpx;height: 30rpx;" mode=""></image>
				</view>
				<view style="margin-left: 15rpx;width: 100%;">
					<input type="text" style="width: 100%;" placeholder="请输入卡号/订单号"
						placeholder-style="font-weight: 500;font-size: 26rpx;color: #757B8C;" />
				</view>
			</view>
			<view style="height: 10rpx;width: 1rpx;"></view>
			<view>
				<v-tabs v-model="activeTab" :lineScale="0.25" height="80rpx" activeColor="#3742C5" lineColor="#3742C5"
					:scroll="false" :tabs="['全部', '充值中', '已完成', '已失败']" @change="changeTab"></v-tabs>
			</view>
		</view>
		<view style="padding: 30rpx;padding-bottom: 245rpx;">
			<view style="height: 442rpx;background: #FFFFFF;border-radius: 32rpx;position: relative;">
				<view style="position: absolute;top: 0;right: 0;width: 132rpx;height: 58rpx;background: #EB8E26;border-radius: 0rpx 32rpx 0rpx 32rpx;
					text-align: center;font-weight: 500;font-size: 28rpx;color: #FFFFFF;line-height: 58rpx;">
					充值中
				</view>
				<view style="padding-top: 24rpx;margin-left: 34rpx;">
					<view style="display: flex;">
						<view style="font-weight: bold;font-size: 28rpx;">订单：A51528</view>
						<view style="width: 68rpx;height: 38rpx;background: #3742C5;border-radius: 18rpx 18rpx 18rpx 0rpx;font-weight: 400;
							font-size: 24rpx;color: #FFFFFF;line-height: 38rpx;text-align: center;margin-left: 20rpx;">话费</view>
					</view>
					<view style="margin-top: 10rpx;font-weight: 500;font-size: 24rpx;color: #A9ABB6;">2024-10-29
						21:30:04</view>
				</view>
				<view style="width: 100%;opacity: 0.1;margin-top: 20rpx;height: 1rpx;background-color: #707070;"></view>
				<view style="margin-left: 34rpx;margin-top: 20rpx;margin-right: 32rpx;">
					<view style="display: flex;justify-content: space-between;">
						<view style="display: flex;align-items: center;">
							<view>
								<image src="/static/order-huaf.png" style="width: 72rpx;height: 72rpx;" mode=""></image>
							</view>
							<view
								style="margin-left: 14rpx;font-weight: 400;font-size: 30rpx;color: #000000;font-weight: bold;margin-top: -20rpx;">
								15836852580<span
									style="font-weight: 400;font-size: 28rpx;color: #3742C5;margin-left: 10rpx;">(移动)</span>
							</view>
						</view>
						<view style="font-weight: bold;font-size: 30rpx;color: #EB8E26;margin-top: 12rpx;">￥190.00
						</view>
					</view>
					<view style="margin-top: 26rpx;display: flex;justify-content: space-between;">
						<view style="text-align: center;">
							<view style="font-weight: bold;font-size: 24rpx;">200.00元</view>
							<view style="margin-top: 5rpx;font-weight: 400;font-size: 24rpx;color: #A9ABB6;">充值</view>
						</view>
						<view style="text-align: center;">
							<view style="font-weight: bold;font-size: 24rpx;">100.00元</view>
							<view style="margin-top: 5rpx;font-weight: 400;font-size: 24rpx;color: #A9ABB6;">已充</view>
						</view>
						<view style="text-align: center;">
							<view style="font-weight: bold;font-size: 24rpx;">125.00元</view>
							<view style="margin-top: 5rpx;font-weight: 400;font-size: 24rpx;color: #A9ABB6;">初始</view>
						</view>
						<view style="text-align: center;">
							<view style="font-weight: bold;font-size: 24rpx;">250.00元</view>
							<view style="margin-top: 5rpx;font-weight: 400;font-size: 24rpx;color: #A9ABB6;">当前</view>
						</view>
					</view>
					<view style="width: 100%;opacity: 0.1;margin-top: 22rpx;height: 1rpx;background-color: #707070;">
					</view>
					<view style="display: flex;justify-content: space-between;align-items: center;margin-top: 18rpx;">
						<view style="font-weight: 400;font-size: 28rpx;color: #3742C5;">更多</view>
						<view style="display: flex;">
							<view style="width: 156rpx;height: 64rpx;background: #FAFAFA;border-radius: 32rpx;font-weight: 400;
								font-size: 28rpx;text-align: center;line-height: 64rpx;">取消订单</view>
							<view style="width: 156rpx;height: 64rpx;background: #FAFAFA;border-radius: 32rpx;font-weight: 400;
								font-size: 28rpx;text-align: center;line-height: 64rpx;margin-left: 14rpx;">更新余额</view>
							<view @click="detail" style="width: 156rpx;height: 64rpx;background: #FAFAFA;border-radius: 32rpx;font-weight: 400;
								font-size: 28rpx;text-align: center;line-height: 64rpx;margin-left: 14rpx;">查看详情</view>
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
				activeTab: 0
			};
		},
		onLoad(options) {
			if (options.type == 'oil') {
				uni.setNavigationBarTitle({
					title: '油卡订单'
				})
			} else if (options.type == 'electricity') {
				uni.setNavigationBarTitle({
					title: '电费订单'
				})
			} else if (options.type == 'mobile') {
				uni.setNavigationBarTitle({
					title: '话费订单'
				})
			}
			let newActiveTab = Number(options.index)
			this.activeTab = newActiveTab
		},
		methods: {
			detail() {
				uni.navigateTo({
					url: '/pages/order/detail'
				})
			},
			changeTab(e) {
				console.log(e)
				this.activeTab = e
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #F8F8F8;
	}
</style>