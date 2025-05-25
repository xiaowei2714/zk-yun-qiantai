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
								<input v-model="money" type="text" placeholder="100.00"
									placeholder-style="font-weight: 400;font-size: 40rpx;color: #A9ABB6;" />
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

			<view @click="rechargeSubmit" style="margin-top: 40rpx;height: 80rpx;background: #3742C5;border-radius: 32rpx;font-weight: bold;font-size: 28rpx;color: #FFFFFF;
				line-height: 80rpx;text-align: center;">
				确认
			</view>

			<view style="margin-top: 52rpx;font-weight: bold;font-size: 32rpx;">充值明细</view>
			<view style="margin-top: 30rpx;padding: 34rpx;box-shadow: 0rpx 6rpx 32rpx 2rpx rgba(0,0,0,0.08);border-radius: 24rpx;">
				<view v-for="(item, index) in list" :key="index" @click="goDetail(item.id)">
					<view style="display: flex;justify-content: space-between;">
						<view style="font-weight: bold;font-size: 30rpx;">
							<view v-if="item.status == 1">充值待付款</view>
							<view v-else-if="item.status == 2">充值已付款</view>
							<view v-else-if="item.status == 3">充值已到账</view>
							<view v-else-if="item.status == 4">充值失败</view>
						</view>
						<view style="font-weight: bold;font-size: 30rpx;">{{ item.money }} USDT</view>
					</view>
					<view style="margin-top: 28rpx;display: flex;justify-content: space-between;">
						<view style="font-weight: 400;font-size: 24rpx;color: #A9ABB6;">{{ item.time }}</view>
						<!-- <view style="font-weight: 400;font-size: 24rpx;color: #377FF3;">倒计时 15:00</view> -->
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
				money: '',
				list: []
			};
		},
		onLoad() {
			this.getList()
		},
		methods: {
			getList() {
				uni.showLoading({
					title: '加载中',
					mask: true
				})

				this.$request('get', 'api/recharge/list').then(res => {
					uni.hideLoading()
					if (res.code) {
						this.list = res.data.list
					} else {
						uni.$u.toast(res.msg)
					}
				})
			},
			rechargeSubmit() {
				uni.showLoading({
					title: '加载中',
					mask: true
				})

				if (!this.money) {
					this.can_click = true
					uni.hideLoading()
					return uni.$u.toast('请正确充值金额')
				}

				this.$request('post', 'api/recharge/recharge', {
					money: this.money,
				}).then(res => {
					uni.hideLoading()
					if (res.code) {
						uni.navigateTo({
							url: '/pages/my/recharge-detail?id=' + res.data.id
						})
					} else {
						uni.$u.toast(res.msg)
					}
				})
			},
			goDetail(id) {
				uni.navigateTo({
					url: '/pages/my/recharge-detail?id=' + id
				})
			}
		}
	}
</script>

<style lang="scss">

</style>