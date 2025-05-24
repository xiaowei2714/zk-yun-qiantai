<template>
	<view style="width: 100%;">
		<view style="padding: 30rpx;">
			<view
				style="padding: 34rpx;background: #F2F6FF;border-radius: 32rpx;display: flex;justify-content: center;align-items: center;">
				<view style="">
					<view style="display: flex;align-items: center;justify-content: center;">
						<view style="font-weight: 400;font-size: 24rpx;color: #A9ABB6;">总资产</view>
						<view style="margin-left: 10rpx;margin-top: -10rpx;">
							<image src="/static/qb-yanj.png" style="width: 23rpx;height: 15rpx;" mode=""></image>
						</view>
					</view>
					<view style="display: flex;margin-top: 14rpx;">
						<view style="font-weight: 800;font-size: 48rpx;">{{ sumData.user_money }}</view>
						<view style="display: flex;align-items: center;margin-top: 20rpx;">
							<view style="margin-left: 20rpx;font-weight: bold;font-size: 24rpx;">Y币</view>
							<!-- <view style="margin-left: 15rpx;margin-top: -20rpx;">
								<image src="/static/qb-xial.png" style="width: 14rpx;height: 9rpx;" mode=""></image>
							</view> -->
						</view>
					</view>
				</view>
			</view>
			<view style="margin-top: 40rpx;display: flex;justify-content: space-between;">
				<view @click="toPages('/pages/my/recharge')" style="width: 214rpx;height: 80rpx;border-radius: 18rpx;font-weight: bold;font-size: 28rpx;text-align: center;line-height: 80rpx;
					background: #EB8E26;color: #FFFFFF;">
					充值</view>
				<view @click="toPages('/pages/my/withdrawal')" style="width: 214rpx;height: 80rpx;border-radius: 18rpx;font-weight: bold;font-size: 28rpx;text-align: center;line-height: 80rpx;
					background-color: #EEEFF3;">
					提现</view>
				<view @click="toPages('/pages/my/transfer')" style="width: 214rpx;height: 80rpx;border-radius: 18rpx;font-weight: bold;font-size: 28rpx;text-align: center;line-height: 80rpx;
					background-color: #EEEFF3;">
					划转</view>
			</view>
			<view v-if="tabIndex == 0" style="margin-top: 84rpx;">
				<view style="font-weight: bold;font-size: 32rpx;">资产</view>
				<view style="margin-top: 28rpx;padding: 28rpx;box-shadow: 0rpx 6rpx 32rpx 2rpx rgba(0,0,0,0.08);border-radius: 32rpx;display: flex;
						justify-content: space-between;align-items: center;">
					<view style="display: flex;align-items: center;">
						<view>
							<image src="/static/order-huaf.png" style="width: 80rpx;height: 80rpx;" mode=""></image>
						</view>
						<view style="margin-left: 14rpx;font-weight: bold;font-size: 24rpx;margin-top: -15rpx;">话费明细
						</view>
					</view>
					<view style="display: flex;">
						<view style="text-align: center;">
							<view style="font-weight: bold;font-size: 24rpx;">{{ sumData.phone_today_money }} Y币</view>
							<view style="margin-top: 6rpx;font-weight: 400;font-size: 24rpx;color: #A9ABB6;">今日支出</view>
						</view>
						<view style="text-align: center;margin-left: 60rpx;">
							<view style="font-weight: bold;font-size: 24rpx;">{{ sumData.phone_money }} Y币</view>
							<view style="margin-top: 6rpx;font-weight: 400;font-size: 24rpx;color: #A9ABB6;">总支出</view>
						</view>
					</view>
				</view>
				<view style="margin-top: 28rpx;padding: 28rpx;box-shadow: 0rpx 6rpx 32rpx 2rpx rgba(0,0,0,0.08);border-radius: 32rpx;display: flex;
						justify-content: space-between;align-items: center;">
					<view style="display: flex;align-items: center;">
						<view>
							<image src="/static/qb-dfmx.png" style="width: 80rpx;height: 80rpx;" mode=""></image>
						</view>
						<view style="margin-left: 14rpx;font-weight: bold;font-size: 24rpx;margin-top: -15rpx;">电费明细
						</view>
					</view>
					<view style="display: flex;">
						<view style="text-align: center;">
							<view style="font-weight: bold;font-size: 24rpx;">{{ sumData.electricity_today_money }} Y币</view>
							<view style="margin-top: 6rpx;font-weight: 400;font-size: 24rpx;color: #A9ABB6;">今日支出</view>
						</view>
						<view style="text-align: center;margin-left: 60rpx;">
							<view style="font-weight: bold;font-size: 24rpx;">{{ sumData.electricity_money }} Y币</view>
							<view style="margin-top: 6rpx;font-weight: 400;font-size: 24rpx;color: #A9ABB6;">总支出</view>
						</view>
					</view>
				</view>
				<view style="margin-top: 28rpx;padding: 28rpx;box-shadow: 0rpx 6rpx 32rpx 2rpx rgba(0,0,0,0.08);border-radius: 32rpx;display: flex;
						justify-content: space-between;align-items: center;">
					<view style="display: flex;align-items: center;">
						<view>
							<image src="/static/qb-cxmx.png" style="width: 80rpx;height: 80rpx;" mode=""></image>
						</view>
						<view style="margin-left: 14rpx;font-weight: bold;font-size: 24rpx;margin-top: -15rpx;">查询明细
						</view>
					</view>
					<view style="display: flex;">
						<view style="text-align: center;">
							<view style="font-weight: bold;font-size: 24rpx;">{{ sumData.query_today_money }} Y币</view>
							<view style="margin-top: 6rpx;font-weight: 400;font-size: 24rpx;color: #A9ABB6;">今日支出</view>
						</view>
						<view style="text-align: center;margin-left: 60rpx;">
							<view style="font-weight: bold;font-size: 24rpx;">{{ sumData.query_money }} Y币</view>
							<view style="margin-top: 6rpx;font-weight: 400;font-size: 24rpx;color: #A9ABB6;">总支出</view>
						</view>
					</view>
				</view>
				<view style="margin-top: 28rpx;padding: 28rpx;box-shadow: 0rpx 6rpx 32rpx 2rpx rgba(0,0,0,0.08);border-radius: 32rpx;display: flex;
						justify-content: space-between;align-items: center;">
					<view style="display: flex;align-items: center;">
						<view>
							<image src="/static/qb-xjsy.png" style="width: 80rpx;height: 80rpx;" mode=""></image>
						</view>
						<view style="margin-left: 14rpx;font-weight: bold;font-size: 24rpx;margin-top: -15rpx;">下级收益
						</view>
					</view>
					<view style="display: flex;">
						<view style="text-align: center;">
							<view style="font-weight: bold;font-size: 24rpx;">{{ sumData.next_today_money }} Y币</view>
							<view style="margin-top: 6rpx;font-weight: 400;font-size: 24rpx;color: #A9ABB6;">今日获得</view>
						</view>
						<view style="text-align: center;margin-left: 60rpx;">
							<view style="font-weight: bold;font-size: 24rpx;">{{ sumData.next_money }} Y币</view>
							<view style="margin-top: 6rpx;font-weight: 400;font-size: 24rpx;color: #A9ABB6;">总获得</view>
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
				tabIndex: 0,
				sumData: {},
			};
		},
		onShow() {
			this.getSum()
		},
		methods: {
			getSum() {
				uni.showLoading({
					title: '加载中',
					mask: true
				})
				this.$request('get', 'api/user/countMoney').then(res => {
					uni.hideLoading()
					if (res.code) {
						this.sumData = res.data
					}
				})
			},
			toPages(url) {
				uni.navigateTo({
					url: url
				})
			},
			changeTab(e) {
				this.tabIndex = e
			}
		}
	}
</script>

<style lang="scss">

</style>