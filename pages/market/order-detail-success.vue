<template>
	<view style="padding: 30rpx;">
		<view style="width: 100%;text-align: center;margin-top: 30rpx;font-weight: 800;font-size: 44rpx;">{{info.num}}
			Y币</view>
		<view style="display: flex;justify-content: center;margin-top: 15rpx;">
			<view>
				<image src="/static/order-ywc.png" style="width: 25rpx;height: 25rpx;" mode=""></image>
			</view>
			<view style="margin-left: 10rpx;font-weight: bold;font-size: 24rpx;color: #2EBD85;margin-top: 5rpx;">已完成
			</view>
		</view>
		<view v-if="info.is_buy"
			style="margin-top: 18rpx;width: 100%;text-align: center;font-weight: 400;font-size: 24rpx;color: #A9ABB6;">
			您已成功购买 {{info.num}} Y币
		</view>
		<view v-else
			style="margin-top: 18rpx;width: 100%;text-align: center;font-weight: 400;font-size: 24rpx;color: #A9ABB6;">
			您已成功放行 {{info.num}} Y币
		</view>
		<view style="margin-top: 68rpx;box-shadow: 0rpx 6rpx 32rpx 2rpx rgba(0,0,0,0.08);border-radius: 32rpx;">
			<view style="padding: 30rpx;">
				<view>
					<span v-if="info.is_buy" style="color: #2EBD85;font-size: 32rpx;font-weight: bold;">买入</span>
					<span v-else style="color: #F6465D;font-size: 32rpx;font-weight: bold;">卖出</span>
					<span style="font-size: 32rpx;font-weight: bold;margin-left: 10rpx;">USDT</span>
				</view>
				<view style="margin-top: 26rpx;">
					<view style="display: flex;justify-content: space-between;">
						<view style="display: flex;align-items: center;">
							<view style="font-weight: 400;font-size: 24rpx;color: #A9ABB6;">总额</view>
							<view style="margin-left: 10rpx;margin-top: -2rpx;">
								<image src="/static/jy-gt.png" style="width: 21rpx;height: 21rpx;" mode=""></image>
							</view>
						</view>
						<view style="font-weight: bold;font-size: 24rpx;">￥{{info.price}}</view>
					</view>
					<view style="display: flex;justify-content: space-between;margin-top: 20rpx;">
						<view style="display: flex;align-items: center;">
							<view style="font-weight: 400;font-size: 24rpx;color: #A9ABB6;">价格</view>
						</view>
						<view style="font-weight: bold;font-size: 24rpx;">￥{{info.dan_price}}</view>
					</view>
					<view style="display: flex;justify-content: space-between;margin-top: 20rpx;">
						<view style="display: flex;align-items: center;">
							<view style="font-weight: 400;font-size: 24rpx;color: #A9ABB6;">接收数量</view>
						</view>
						<view style="font-weight: bold;font-size: 24rpx;">{{info.num}} Y币</view>
					</view>
				</view>
			</view>
			<view style="width: 100%;height: 1rpx;background-color: #F7F7F7;"></view>
			<view style="padding: 30rpx;">
				<view style="display: flex;justify-content: space-between;">
					<view style="display: flex;align-items: center;">
						<view style="font-weight: 400;font-size: 24rpx;color: #A9ABB6;">订单号</view>
					</view>
					<view style="font-weight: bold;font-size: 24rpx;display: flex;align-items: center;color: #A9ABB6;">
						<view>{{info.order_no}}</view>
						<view @click="copy(info.order_no)" style="margin-left: 15rpx;">
							<image src="/static/jy-fz.png" style="width: 24rpx;height: 24rpx;" mode=""></image>
						</view>
					</view>
				</view>
				<view style="margin-top: 20rpx;display: flex;justify-content: space-between;align-items: center;">
					<view style="display: flex;align-items: center;">
						<view style="font-weight: 400;font-size: 24rpx;color: #A9ABB6;">创建时间</view>
					</view>
					<view style="font-weight: bold;font-size: 24rpx;color: #A9ABB6;">{{info.time}}</view>
				</view>
				<view style="margin-top: 20rpx;display: flex;justify-content: space-between;align-items: center;">
					<view style="display: flex;align-items: center;">
						<view v-if="info.is_buy" style="font-weight: 400;font-size: 24rpx;color: #A9ABB6;">卖家昵称</view>
						<view v-else style="font-weight: 400;font-size: 24rpx;color: #A9ABB6;">买家昵称</view>
					</view>
					<view style="font-weight: bold;font-size: 24rpx;">{{info.nickname}}</view>
				</view>
				<view style="margin-top: 42rpx;display: flex;justify-content: center;">
					<view>
						<image src="/static/jy-up.png" style="width: 24rpx;height: 14rpx;" mode=""></image>
					</view>
				</view>
			</view>
		</view>
		<view style="padding: 30rpx;">
			<view style="margin-top: 34rpx;display: flex;justify-content: space-between;">
				<view style="font-weight: 400;font-size: 30rpx;">支付方式</view>
				<view style="display: flex;align-items: center;">
					<view v-if="info.pay_type == 'wx'">
						<image src="/static/jy-wx.png" style="width: 31rpx;height: 31rpx;" mode=""></image>
					</view>
					<view v-if="info.pay_type == 'zfb'">
						<image src="/mobile/static/sk-yhk.png" style="width: 31rpx;height: 31rpx;" mode=""></image>
					</view>
					<view v-if="info.pay_type == 'yhk'">
						<image src="/mobile/static/jy-wx.png" style="width: 31rpx;height: 31rpx;" mode=""></image>
					</view>
					<view v-if="info.pay_type == 'usdt'">
						<image src="/mobile/static/cz-usdt.png" style="width: 31rpx;height: 31rpx;" mode=""></image>
					</view>
					<view style="margin-left: 10rpx;font-weight: 400;font-size: 28rpx;margin-top: -10rpx;">
						{{ info.pay_type_show }}
					</view>
				</view>
			</view>
			<view style="margin-top: 34rpx;display: flex;justify-content: space-between;">
				<view style="font-weight: 400;font-size: 30rpx;">对订单有疑问</view>
				<view style="display: flex;align-items: center;">
					<view>
						<image src="/static/info-right.png" style="width: 11rpx;height: 19rpx;" mode=""></image>
					</view>
				</view>
			</view>
			<view v-if="info.is_buy" @click="buy(info.ad_id)"
				style="margin-top: 252rpx;height: 80rpx;background: #3742C5;border-radius: 32rpx;text-align: center;line-height: 80rpx;font-weight: bold;font-size: 28rpx;color: #FFFFFF;">
				再次下单
			</view>
			<view v-else @click="moreAd"
				style="margin-top: 252rpx;height: 80rpx;background: #3742C5;border-radius: 32rpx;text-align: center;line-height: 80rpx;font-weight: bold;font-size: 28rpx;color: #FFFFFF;">
				查看更多广告</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				cancelShow: false,
				order_id: '',
				info: {},
				upShow: true,
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
			cancelOrder() {
				uni.showLoading({
					title: '取消中',
					mask: true
				})
				this.$request('get', 'api/ad/cancelOrder', {
					id: this.order_id
				}).then(res => {
					uni.hideLoading()
					if (res.code) {
						uni.navigateTo({
							url: '/pages/market/cancel-order?id=' + this.order_id
						})
					} else {
						uni.$u.toast(res.msg)
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
			buy(id) {
				uni.navigateTo({
					url: '/pages/market/buy?id=' + id
				})
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