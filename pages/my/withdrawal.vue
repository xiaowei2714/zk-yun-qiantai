<template>
	<view style="width: 100%;">
		<view style="padding: 30rpx;">
			<view style="background: #F8F8F8;border-radius: 24rpx;">
				<view style="padding: 30rpx;">
					<view style="font-weight: 400;font-size: 30rpx;color: #A9ABB6;">请输入提现数量</view>
					<view style="margin-top: 40rpx;display: flex;">
						<view style="display: flex;align-items: center;">
							<view style="font-weight: bold;font-size: 40rpx;">$</view>
							<view style="margin-left: 12rpx;">
								<input v-model="money" type="text" placeholder="100.00" placeholder-style="font-weight: 400;font-size: 40rpx;color: #A9ABB6;" />
							</view>
						</view>
					</view>
				</view>
				<view style="height: 1rpx;background-color: #EAEAEA;width: 100%;"></view>
				<view style="width: 1rpx;height: 30rpx;"></view>
			</view>
			<view style="margin-top: 28rpx;padding: 30rpx;background: #F8F8F8;border-radius: 24rpx;">
				<view style="font-weight: bold;font-size: 30rpx;">提现地址</view>
				<view style="margin-top: 22rpx;width: 100%;">
					<input v-model="address" type="text" style="width: 100%;" placeholder="请输入提现地址" placeholder-style="font-weight: 400;font-size: 30rpx;color: #A9ABB6;" />
				</view>
			</view>
			<view @click="submit" style="margin-top: 44rpx;height: 80rpx;background: #3742C5;border-radius: 32rpx;font-weight: bold;font-size: 28rpx;color: #FFFFFF;
				text-align: center;line-height: 80rpx;">
				确认提现
			</view>
			<view style="margin-top: 44rpx;font-weight: bold;font-size: 32rpx;">
				提现明细
			</view>
			<view style="margin-top:  30rpx;padding: 30rpx;display: flex;box-shadow: 0rpx 6rpx 32rpx 2rpx rgba(0,0,0,0.08);border-radius: 24rpx;" v-for="(item, index) in list" :key="index">
				<view>
					<image src="/static/qb-tix.png" style="width: 84rpx;height: 84rpx;" mode=""></image>
				</view>
				<view style="margin-left: 24rpx;width: 100%;">
					<view style="display: flex;justify-content: space-between;">
						<view style="font-weight: bold;font-size: 30rpx;">USDT提现</view>
						<view style="font-weight: bold;font-size: 30rpx;color: #EB8E26;">-{{item.money}}Y币</view>
					</view>
					<view style="display: flex;justify-content: space-between;align-items: center;">
						<view style="font-weight: 400;font-size: 24rpx;color: #A9ABB6;margin-top: 14rpx;">{{item.create_time}}</view>
						<view style="font-weight: bold;font-size: 24rpx;color: red;">
							<span v-if="item.status == 2" style="color: seagreen;">提现成功</span>
							<span v-if="item.status == 3">提现失败：已返回余额</span>
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
				money: '',
				address: '',
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
				this.$request('get','api/index/getTxList').then(res => {
					uni.hideLoading()
					if (res.code) {
						this.list = res.data.list
					}
				})
			},
			submit() {
				if (!this.money) return uni.$u.toast('请输入提现数量')
				if (!this.address) return uni.$u.toast('请输入提现地址')
				uni.showLoading({
					title: '提现中',
					mask: true
				})
				this.$request('post', 'api/index/submitWithDrawal', {
					money: this.money,
					address: this.address
				}).then(res => {
					uni.hideLoading()
					if (res.code) {
						uni.$u.toast('提现成功')
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
