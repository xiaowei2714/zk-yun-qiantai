<template>
	<view style="padding: 30rpx;">
		<view style="padding: 30rpx;box-shadow: 0rpx 6rpx 32rpx 2rpx rgba(0,0,0,0.08);border-radius: 32rpx;">
			<view style="font-weight: 400;font-size: 24rpx;">输入礼品卡卡名</view>
			<view
				style="height: 80rpx;margin-top: 12rpx;background: #F6F7F9;border-radius: 24rpx;display: flex;align-items: center;width: 100%;">
				<view style="width: 100%;margin-left: 34rpx;">
					<input v-model="card_name" type="text" placeholder="请输入"
						placeholder-style="font-weight: 400;font-size: 30rpx;color: #B7BAC7;width: 100%" />
				</view>
			</view>
			<view style="font-weight: 400;font-size: 24rpx;margin-top: 26rpx;">输入购买金额</view>
			<view
				style="height: 80rpx;margin-top: 12rpx;background: #F6F7F9;border-radius: 24rpx;display: flex;align-items: center;width: 100%;">
				<view style="width: 100%;margin-left: 34rpx;">
					<input @input="priceChange" v-model="buy_price" type="number" placeholder="请输入"
						placeholder-style="font-weight: 400;font-size: 30rpx;color: #B7BAC7;width: 100%" />
				</view>
			</view>
		</view>

		<view style="margin-top: 68rpx;font-weight: bold;font-size: 32rpx;">实付金额</view>
		<view style="margin-top: 26rpx;height: 100rpx;background: #F6F7F9;border-radius: 24rpx;display: flex;justify-content: space-between;
			align-items: center;padding-left: 30rpx;padding-right: 30rpx;">
			<view>
				<span style="font-weight: bold;font-size: 40rpx;">¥</span>
				<span style="margin-left: 14rpx;font-weight: bold;font-size: 40rpx;">{{ pay_price }}</span>
			</view>
			<view>
				<image src="/static/index-huaf-bianj.png" style="width: 33rpx;height: 33rpx;" mode=""></image>
			</view>
		</view>
		<view v-if="discount !== ''" style="margin-top: 40rpx;display: flex;justify-content: space-between;">
			<view style="font-weight: 400;font-size: 28rpx;color: #757B8C;">优惠信息</view>
			<view style="font-weight: bold;font-size: 28rpx;color: #000000;">{{ discount }}折 优惠{{ discount_price }}Y币
			</view>
		</view>
		<view style="margin-top: 36rpx;display: flex;justify-content: space-between;">
			<view style="font-weight: 400;font-size: 28rpx;color: #757B8C;">参考汇率</view>
			<view style="font-weight: bold;font-size: 28rpx;color: #000000;">{{ rate }}</view>
		</view>
		<view style="margin-top: 36rpx;display: flex;justify-content: space-between;align-items: center;">
			<view style="font-weight: 400;font-size: 28rpx;color: #757B8C;">合计支付</view>
			<view style="font-weight: bold;font-size: 36rpx;color: #EB8E26;">{{ pay_price }} Y币</view>
		</view>

		<view @click="confirmSubmit" style="margin-top: 60rpx;height: 80rpx;background: #3742C5;border-radius: 32rpx;font-weight: bold;font-size: 28rpx;color: #FFFFFF;
			text-align: center;line-height: 80rpx;">
			确认充值
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				discount: '',
				rate: '',
				card_name: '',
				buy_price: 100,
				pay_price: 100,
				discount_price: 0,
				can_click: true
			};
		},
		onLoad() {
			this.getConfig()
		},
		methods: {
			getConfig() {
				uni.showLoading({
					title: '加载中',
					mask: true
				})
				this.$request('get', 'api/index/cardConf').then(res => {
					uni.hideLoading()
					if (res.code) {
						this.discount = res.data.discount
						this.rate = res.data.rate
						this.priceChange()
					}
				})
			},
			priceChange() {
				let tmp = 1
				if (this.discount !== '') {
					tmp = this.discount / 10
				}

				this.pay_price = (this.buy_price * tmp).toFixed(3)
				this.discount_price = (this.buy_price - this.pay_price).toFixed(3)
			},
			confirmSubmit() {
				if (this.can_click === false) {
					return uni.$u.toast('正在充值中...')
				}
				this.can_click = false
				uni.showLoading({
					title: '充值中',
					mask: true
				})

				if (!this.buy_price || this.buy_price <= 0) {
					this.can_click = true
					uni.hideLoading()
					return uni.$u.toast('请正确输入购买金额')
				}
				if (!this.card_name) {
					this.can_click = true
					uni.hideLoading()
					return uni.$u.toast('请正确输入礼品卡卡名')
				}

				this.$request('post', 'api/consumeRecharge/cardRecharge', {
					name: this.card_name,
					buy_price: this.buy_price,
					discount: this.discount,
					pay_price: this.pay_price
				}).then(res => {
					this.can_click = true
					uni.hideLoading()
					if (res.code) {
						uni.$u.toast('充值成功')
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