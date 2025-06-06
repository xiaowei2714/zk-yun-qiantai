<template>
	<view>
		<view style="padding: 30rpx;">
			<view v-if="info.is_buy" style="font-weight: bold;font-size: 40rpx;margin-top: 30rpx;">等待卖家确认收款</view>
			<view v-else style="font-weight: bold;font-size: 40rpx;margin-top: 30rpx;">买家已付款，确认收款</view>
			<view style="margin-top: 16rpx;font-weight: 400;font-size: 28rpx;">此卖家{{ info.rate }}%的订单会在5分钟内完成</view>
		</view>
		<view style="width: 100%;height: 1rpx;background-color: #F4F4F4;"></view>
		<view style="padding: 30rpx;">
			<view style="display: flex;align-items: center;">
				<view style="font-weight: 400;font-size: 24rpx;color: #A9ABB6;">还未放币</view>
				<view style="margin-left: 10rpx;">
					<image src="/static/jy-yw.png" style="width: 24rpx;height: 24rpx;" mode=""></image>
				</view>
			</view>
			<view
				style="padding: 30rpx;box-shadow: 0rpx 6rpx 32rpx 2rpx rgba(0,0,0,0.08);border-radius: 32rpx;margin-top: 40rpx;">
				<view>
					<span v-if="info.is_buy" style="color: #2EBD85;font-size: 32rpx;font-weight: bold;">买入</span>
					<span v-else style="color: #F6465D;font-size: 32rpx;font-weight: bold;">卖出</span>
					<span style="font-size: 32rpx;font-weight: bold;margin-left: 10rpx;">USDT</span>
				</view>
				<view>
					<view v-if="upShow" style="margin-top: 26rpx;">
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
						<view style="display: flex;justify-content: space-between;margin-top: 20rpx;">
							<view style="display: flex;align-items: center;">
								<view style="font-weight: 400;font-size: 24rpx;color: #A9ABB6;">订单号</view>
							</view>
							<view
								style="font-weight: bold;font-size: 24rpx;display: flex;align-items: center;color: #A9ABB6;">
								<view>{{info.order_no}}</view>
								<view @click="copy(info.order_no)" style="margin-left: 15rpx;">
									<image src="/static/jy-fz.png" style="width: 24rpx;height: 24rpx;" mode=""></image>
								</view>
							</view>
						</view>
					</view>
					<view style="margin-top: 42rpx;display: flex;justify-content: center;">
						<view v-if="upShow" @click="upShow = false"
							style="margin-top: 42rpx;display: flex;justify-content: center;">
							<view>
								<image src="/static/jy-up.png" style="width: 24rpx;height: 14rpx;" mode=""></image>
							</view>
						</view>
						<view v-else @click="upShow = true"
							style="margin-top: 42rpx;display: flex;justify-content: center;">
							<view>
								<image src="/static/jy-down.png" style="width: 24rpx;height: 14rpx;" mode=""></image>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view style="margin-top: 42rpx;font-weight: bold;font-size: 32rpx;">支付方式</view>
			<view style="display: flex;align-items: center;margin-top: 32rpx;">
				<view v-if="info.pay_type == 'wx'">
					<image src="/static/jy-wx.png" style="width: 30rpx;height: 30rpx;" mode=""></image>
				</view>
				<view v-if="info.pay_type == 'zfb'">
					<image src="/mobile/static/sk-zfb.png" style="width: 30rpx;height: 30rpx;" mode=""></image>
				</view>
				<view v-if="info.pay_type == 'yhk'">
					<image src="/mobile/static/sk-yhk.png" style="width: 30rpx;height: 30rpx;" mode=""></image>
				</view>
				<view v-if="info.pay_type == 'usdt'">
					<image src="/mobile/static/cz-usdt.png" style="width: 30rpx;height: 30rpx;" mode=""></image>
				</view>
				<view style="font-weight: 400;font-size: 28rpx;margin-left: 10rpx;margin-top: -10rpx;">
					{{ info.pay_type_show }}
				</view>
			</view>
			<view style="margin-top: 58rpx;font-weight: bold;font-size: 32rpx;">广告方交易条款</view>
			<view style="margin-top: 26rpx;padding: 30rpx;background: #ECF0F9;border-radius: 32rpx;">
				<view style="font-weight: bold;font-size: 24rpx;">币安小课堂</view>
				<view style="margin-top: 18rpx;font-weight: 500;font-size: 24rpx;color: #757B8C;">
					当您买币付款后，一旦卖家确认收到款，系统将自动把资产转到您的账户。</view>
			</view>
			<view
				style="margin-top: 28rpx;width: 346rpx;height: 70rpx;border-radius: 36rpx;border: 2rpx solid rgba(112,112,112,0.1);display: flex;align-items: center;justify-content: space-between;">
				<view style="display: flex;align-items: center;">
					<view style="margin-top: 20rpx;margin-left: -30rpx;">
						<image src="/static/jy-xxts.png" style="width: 138rpx;height: 138rpx;" mode=""></image>
					</view>
					<view style="margin-left: -10rpx;font-weight: bold;font-size: 24rpx;">卖家信息已核验</view>
				</view>
				<view style="margin-right: 20rpx;margin-top: -10rpx;">
					<image src="/static/info-right.png" style="width: 10rpx;height: 18rpx;" mode=""></image>
				</view>
			</view>
			<view v-if="info.is_buy" style="margin-top: 60rpx;display: flex;align-items: center;">
				<view @click="cancelShow = true"
					style="width: 332rpx;height: 80rpx;background: #EAECEF;border-radius: 32rpx;font-weight: bold;font-size: 26rpx;text-align: center;line-height: 80rpx;">
					取消订单
				</view>
				<view @click="appeal" style="width: 332rpx;height: 80rpx;background: #3742C5;border-radius: 32rpx;font-weight: bold;font-size: 26rpx;text-align: center;line-height: 80rpx;
					color: white;margin-left: 26rpx;">
					申诉
				</view>
			</view>
			<view v-else style="margin-top: 60rpx;display: flex;align-items: center;">
				<view @click="sellerCancelShow = true"
					style="width: 332rpx;height: 80rpx;background: #EAECEF;border-radius: 32rpx;font-weight: bold;font-size: 26rpx;text-align: center;line-height: 80rpx;">
					取消订单
				</view>
				<view @click="complete" style="width: 332rpx;height: 80rpx;background: #3742C5;border-radius: 32rpx;font-weight: bold;font-size: 26rpx;text-align: center;line-height: 80rpx;
					color: white;margin-left: 26rpx;">
					确认收款
				</view>
			</view>
		</view>

		<!-- 买方取消提醒 -->
		<u-popup :show="cancelShow" mode="center" :round="32" :closeable="true" @close="cancelShow = false">
			<view
				style="width: 560rpx;padding: 40rpx;background: linear-gradient( 180deg, #E3E8FF 0%, #FFFFFF 100%);border-radius: 32rpx;">
				<view style="display: flex;justify-content: center;margin-top: 32rpx;">
					<view>
						<image src="/static/jy-qx-gt.png" style="width: 140rpx;height: 140rpx;" mode=""></image>
					</view>
				</view>
				<view style="margin-top: 36rpx;font-weight: 400;font-size: 26rpx;line-height: 40rpx;">
					1.如果您已经付款给卖家，请勿取消订单<br />
					2.如因系统超时订单取消，买家将被记责(完成率受影响)。<br />
					3.如果卖家在 15 分钟内没有回复聊天，则买家无责。您的成单事将不受影响。一天只能5次无责取消。<br />
					4.一天内您最多只能3次有责取消。否则，您的帐户将被暂停，并且您不能在同一天再下订单。
				</view>
				<view @click="cancelOrder" style="margin-top: 52rpx;height: 80rpx;line-height: 80rpx;text-align: center;font-weight: bold;font-size: 28rpx;
					color: #FFFFFF;background: #3742C5;border-radius: 32rpx;">
					取消订单
				</view>
				<view @click="cancelShow = false" style="margin-top: 25rpx;height: 80rpx;line-height: 80rpx;text-align: center;font-weight: bold;font-size: 28rpx;
					background: #EBECF0;border-radius: 32rpx;margin-bottom: 33rpx;">
					暂时不要
				</view>
			</view>
		</u-popup>
	
		<!-- 卖方取消提醒 -->
		<u-popup :show="sellerCancelShow" mode="center" :round="32" :closeable="true" @close="sellerCancelShow = false">
			<view
				style="width: 560rpx;padding: 40rpx;background: linear-gradient( 180deg, #E3E8FF 0%, #FFFFFF 100%);border-radius: 32rpx;">
				<view style="display: flex;justify-content: center;margin-top: 32rpx;">
					<view>
						<image src="/static/jy-qx-gt.png" style="width: 140rpx;height: 140rpx;" mode=""></image>
					</view>
				</view>
				<view style="margin-top: 36rpx;font-weight: 400;font-size: 26rpx;line-height: 40rpx;">
					1.如果买家已经付款，请勿取消订单<br />
					2.如因系统超时订单取消，买家将被记责(完成率受影响)。<br />
					3.如果卖家在 15 分钟内没有回复聊天，则买家无责。您的成单事将不受影响。一天只能5次无责取消。<br />
					4.一天内您最多只能3次有责取消。否则，您的帐户将被暂停，并且您不能在同一天再下订单。
				</view>
				<view @click="sellerCancelOrder" style="margin-top: 52rpx;height: 80rpx;line-height: 80rpx;text-align: center;font-weight: bold;font-size: 28rpx;
					color: #FFFFFF;background: #3742C5;border-radius: 32rpx;">
					取消订单
				</view>
				<view @click="sellerCancelShow = false" style="margin-top: 25rpx;height: 80rpx;line-height: 80rpx;text-align: center;font-weight: bold;font-size: 28rpx;
					background: #EBECF0;border-radius: 32rpx;margin-bottom: 33rpx;">
					暂时不要
				</view>
			</view>
		</u-popup>
	
	</view>
</template>

<script>
	export default {
		data() {
			return {
				cancelShow: false,
				sellerCancelShow: false,
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
			sellerCancelOrder() {
				uni.showLoading({
					title: '取消中',
					mask: true
				})
				this.$request('get', 'api/ad/sellerCancelOrder', {
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
			appeal() {
				uni.showLoading({
					title: '申诉中',
					mask: true
				})
				this.$request('get', 'api/ad/appealOrder', {
					id: this.order_id
				}).then(res => {
					uni.hideLoading()
					if (res.code) {
						uni.navigateTo({
							url: '/pages/my/kf'
						})
					} else {
						uni.$u.toast(res.msg)
					}
				})
			},
			complete() {
				const obj = this
				uni.showModal({
					title: '提示',
					content: '资产不可逆，确认买家已付款成功吗？',
					showCancel: true, // 显示取消按钮
					cancelText: '取消',
					confirmText: '确定',
					success: function(res) {
						uni.showLoading({
							title: '确认中',
							mask: true
						})
						
						if (res.confirm) {
							obj.$request('get', 'api/ad/completeOrder', {
								id: obj.order_id
							}).then(res => {
								uni.hideLoading()
								if (res.code) {
									uni.navigateTo({
										url: '/pages/market/order-detail-success?id=' + obj.order_id
									})
								} else {
									uni.$u.toast(res.msg)
								}
							})
						} else if (res.cancel) {

						}
					}
				});
				
				
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
		}
	}
</script>

<style lang="scss">

</style>