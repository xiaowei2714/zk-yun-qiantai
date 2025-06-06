<template>
	<view style="padding: 30rpx;">
		<view style="font-weight: bold;font-size: 40rpx;">订单
			<span v-if="info.status == 1">已生成</span>
			<span v-if="info.status == 2">已付款</span>
			<span v-if="info.status == 3">申述中</span>
			<span v-if="info.status == 4">已完成</span>
			<span v-if="info.status == 5">已取消</span>
		</view>
		<view v-if="info.status == 1" style="margin-top: 16rpx;font-weight: 400;font-size: 28rpx;">
			<view v-if="info.is_buy">请在{{countdown}}内付款给卖家</view>
			<view v-else>等待买家付款：{{countdown}}</view>
		</view>
		<view v-if="info.status == 5" style="margin-top: 16rpx;font-weight: 400;font-size: 28rpx;">未在指定时间内付款，订单已自动取消
		</view>
		<view style="width: 100%;height: 1rpx;margin-top: 32rpx;background-color: #F4F4F4;"></view>
		<view style="margin-top: 44rpx;display: flex;justify-content: space-between;align-items: center;">
			<view>
				<view style="display: flex;align-items: center;">
					<view
						style="width: 44rpx;height: 44rpx;background: #464D57;border-radius: 28rpx;font-weight: bold;font-size: 28rpx;color: #FFFFFF;text-align: center;line-height: 44rpx;">
						{{info.first_nickname}}
					</view>
					<view style="margin-left: 15rpx;font-weight: bold;font-size: 28rpx;">{{info.nickname}}</view>
					<view style="margin-left: 26rpx;margin-top: -8rpx;">
						<image src="/static/info-right.png" style="width: 10rpx;height: 17rpx;" mode=""></image>
					</view>
				</view>
				<!-- <view style="margin-top: 28rpx;font-weight: 400;font-size: 24rpx;color: #A9ABB6;">买方的加率货币由币安托管</view> -->
			</view>
			<!-- <view style="position: relative;">
				<image src="/static/jy-order-xs.png" style="width: 80rpx;height: 80rpx;" mode=""></image>
				<view
					style="position: absolute;top: -10rpx;right: -10rpx;width: 30rpx;height: 30rpx;background: #F63232;text-align: center;line-height: 30rpx;color: white;font-weight: 400;font-size: 20rpx;border-radius: 50rpx;">
					12</view>
			</view> -->
		</view>
		<view
			style="padding: 30rpx;background: #ECF0F9;border-radius: 32rpx;display: flex;align-items: center;margin-top: 32rpx;">
			<view>
				<image src="/static/jy-gt.png" style="width: 24rpx;height: 24rpx;" mode=""></image>
			</view>
			<view style="margin-left: 10rpx;font-weight: 500;font-size: 24rpx;color: #757B8C;">仅使用您自己的支付账户向卖家转账。禁止第三方支付。
			</view>
		</view>
		<view
			style="padding: 30rpx;box-shadow: 0rpx 6rpx 32rpx 2rpx rgba(0,0,0,0.08);border-radius: 32rpx;margin-top: 40rpx;">
			<view>
				<span v-if="info.order_type == 1" style="color: #2EBD85;font-size: 32rpx;font-weight: bold;">买入</span>
				<span v-else style="color: #F6465D;font-size: 32rpx;font-weight: bold;">卖出</span>
				<span style="font-size: 32rpx;font-weight: bold;margin-left: 10rpx;">Y币</span>
			</view>
			<view style="margin-top: 26rpx;">
				<view v-if="upShow">
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
				<view v-if="upShow" @click="upShow = false"
					style="margin-top: 42rpx;display: flex;justify-content: center;">
					<view>
						<image src="/static/jy-up.png" style="width: 24rpx;height: 14rpx;" mode=""></image>
					</view>
				</view>
				<view v-else @click="upShow = true" style="margin-top: 42rpx;display: flex;justify-content: center;">
					<view>
						<image src="/static/jy-down.png" style="width: 24rpx;height: 14rpx;" mode=""></image>
					</view>
				</view>
			</view>
		</view>

		<!-- 支付提示文案 -->
		<view v-if="info.status == 1"
			style="margin-top: 68rpx;display: flex;align-items: center;border-bottom: 1rpx solid #F4F4F4;">
			<view @click="tipsShow = false">
				<view v-if="!tipsShow">
					<view style="font-weight: bold;font-size: 30rpx;">支付</view>
					<view
						style="width: 24rpx;height: 6rpx;background: #3742C5;border-radius: 4rpx;margin-left: 20rpx;margin-top: 5rpx;">
					</view>
				</view>
				<view v-else>
					<view style="font-weight: bold;font-size: 30rpx;color: #A9ABB6;">支付</view>
				</view>
			</view>
			<view @click="tipsShow = true" style="margin-left: 68rpx;">
				<view v-if="tipsShow">
					<view style="font-weight: bold;font-size: 30rpx;">提示</view>
					<view
						style="width: 24rpx;height: 6rpx;background: #3742C5;border-radius: 4rpx;margin-left: 20rpx;margin-top: 5rpx;">
					</view>
				</view>
				<view v-else>
					<view style="font-weight: bold;font-size: 30rpx;color: #A9ABB6;">提示</view>
				</view>
			</view>
		</view>

		<!-- 支付信息 -->
		<view v-if="info.status == 1 && !tipsShow" style="margin-top: 42rpx;display: flex;">
			<view>
				<view>
					<image src="/static/jy-order-1.png" style="width: 44rpx;height: 44rpx;" mode=""></image>
				</view>
				<view
					style="width: 1rpx;height: 84%;border-right: 1rpx dashed  #EB8E26;margin-left: 20rpx;margin-top: -10rpx;">
				</view>
				<view>
					<image src="/static/jy-order-2.png" style="width: 44rpx;height: 44rpx;" mode=""></image>
				</view>
			</view>
			<view style="margin-left: 20rpx;width: 100%;">
				<view style="font-weight: bold;font-size: 28rpx;">通过{{ info.pay_type_show }}转账 ￥{{info.price}}</view>
				<view
					style="box-shadow: 0rpx 6rpx 32rpx 2rpx rgba(0,0,0,0.08);margin-top: 28rpx;border-radius: 32rpx;padding: 30rpx;">
					<view style="display: flex;align-items: center;">
						<view v-if="info.pay_type == 'wx'"
							style="width: 6rpx;height: 20rpx;background: #28C445;border-radius: 4rpx;"></view>
						<view v-if="info.pay_type == 'zfb'"
							style="width: 6rpx;height: 20rpx;background: #06B4FD;border-radius: 4rpx;"></view>
						<view v-if="info.pay_type == 'yhk'"
							style="width: 6rpx;height: 20rpx;background: #F3AF55;border-radius: 4rpx;"></view>
						<view v-if="info.pay_type == 'ustd'"
							style="width: 6rpx;height: 20rpx;background: black;border-radius: 4rpx;"></view>
						<view style="font-weight: 400;font-size: 24rpx;margin-left: 10rpx;margin-top: -5rpx;">
							{{ info.pay_type_show }}
						</view>
					</view>
					<view style="margin-top: 38rpx;">
						<view style="display: flex;justify-content: space-between;align-items: center;">
							<view style="font-weight: 400;font-size: 24rpx;color: #A9ABB6;">
								<view v-if="info.is_buy">您将支付</view>
								<view v-else>对方将支付</view>
							</view>
							<view style="display: flex;align-items: center;">
								<view style="font-weight: bold;font-size: 24rpx;">￥{{info.price}}</view>
								<view @click="copy(info.price)" style="margin-left: 16rpx;">
									<image src="/static/jy-fz.png" style="width: 24rpx;height: 24rpx;" mode=""></image>
								</view>
							</view>
						</view>
						<view
							style="display: flex;justify-content: space-between;align-items: center;margin-top: 10rpx;">
							<view style="font-weight: 400;font-size: 24rpx;color: #A9ABB6;">姓名</view>
							<view style="display: flex;align-items: center;">
								<view style="font-weight: bold;font-size: 24rpx;">{{ info.pay_name }}</view>
								<view @click="copy(info.pay_name)" style="margin-left: 16rpx;">
									<image src="/static/jy-fz.png" style="width: 24rpx;height: 24rpx;" mode=""></image>
								</view>
							</view>
						</view>
						<view
							style="display: flex;justify-content: space-between;align-items: center;margin-top: 10rpx;">
							<view style="font-weight: 400;font-size: 24rpx;color: #A9ABB6;">{{ info.pay_type_show }}账号
							</view>
							<view style="display: flex;align-items: center;">
								<view style="font-weight: bold;font-size: 24rpx;">{{ info.pay_account }}</view>
								<view @click="copy(info.pay_account)" style="margin-left: 16rpx;">
									<image src="/static/jy-fz.png" style="width: 24rpx;height: 24rpx;" mode=""></image>
								</view>
							</view>
						</view>
						<view
							style="display: flex;justify-content: space-between;align-items: center;margin-top: 10rpx;">
							<view style="font-weight: 400;font-size: 24rpx;color: #A9ABB6;">收款二维码</view>
							<view @click="previewSingleImage(info.pay_qrcode)"
								style="display: flex;align-items: center;">
								<view style="margin-left: 16rpx;">
									<image src="/static/jy-qrcode.png" style="width: 24rpx;height: 24rpx;" mode="">
									</image>
								</view>
							</view>
						</view>
					</view>
				</view>
				<view style="font-weight: bold;font-size: 28rpx;margin-top: 50rpx;">
					请确保付款成功
					<view v-if="info.is_buy">
						，然后
						<span style="border-bottom: 1rpx solid black;">点击下面的按钮</span>
						通知卖家
					</view>
				</view>
			</view>
		</view>

		<!-- 提示 -->
		<view v-if="info.status == 1 && tipsShow" style="margin-top: 42rpx;display: flex;">
			<view style="width: 100%;">
				<view style="box-shadow: 0rpx 6rpx 32rpx 2rpx rgba(0,0,0,0.08);border-radius: 32rpx;padding: 30rpx;">
					<view style="display: flex;align-items: center;">
						<view
							style="font-weight: 400;font-size: 24rpx;margin-left: 10rpx;margin-top: -5rpx;min-height: 160rpx;">
							{{ info.tips }}
						</view>
					</view>
				</view>
			</view>
		</view>

		<view v-if="info.status == 1 && info.is_buy"
			style="margin-top: 112rpx;display: flex;align-items: center;justify-content: center;">
			<view @click="cancelShow = true" style="width: 230rpx;height: 80rpx;background: #EAECEF;border-radius: 32rpx;font-weight: bold;font-size: 28rpx;
				text-align: center;line-height: 80rpx;">取消订单</view>
			<view @click="paySuccess" style="width: 440rpx;height: 80rpx;background: #3742C5;border-radius: 32rpx;font-weight: bold;font-size: 28rpx;
				color: #FFFFFF;text-align: center;line-height: 80rpx;margin-left: 20rpx;">我已完成付款，通知卖家</view>
		</view>

		<!-- 取消提醒 -->
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
	</view>
</template>

<script>
	export default {
		data() {
			return {
				upShow: true,
				cancelShow: false,
				order_id: 0,
				info: {},
				countdown: '',
				timer: null,
				tipsShow: false
			};
		},
		onLoad(options) {
			this.order_id = options.id
			this.getDetail()
		},
		beforeDestroy() {
			clearInterval(this.timer);
		},
		methods: {
			padZero(num) {
				return num < 10 ? `0${num}` : num;
			},
			updateCountdown() {
				const now = Date.now();
				// console.log(this.info.expire_time)
				const futureTimestamp = this.info.expire_time * 1000;
				const diff = futureTimestamp - now;
				// console.log(now)
				if (diff <= 0) {
					this.countdown = '00:00';
					clearInterval(this.timer);
					this.timerCancelOrder();
					
					return;
				}

				const minutes = Math.floor(diff / 1000 / 60);
				const seconds = Math.floor((diff / 1000) % 60);

				this.countdown = `${this.padZero(minutes)}:${this.padZero(seconds)}`;
			},
			startCountdown() {
				this.updateCountdown();
				this.timer = setInterval(this.updateCountdown, 1000);
			},
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
						if (this.info.status == 1) {
							this.startCountdown();
						}
					}
				})
			},
			paySuccess() {
				uni.showLoading({
					title: '设置中',
					mask: true
				})
				this.$request('get', 'api/ad/payOrder', {
					id: this.order_id
				}).then(res => {
					uni.hideLoading()
					if (res.code) {
						uni.navigateTo({
							url: '/pages/market/order-detail?id=' + this.order_id
						})
					} else {
						uni.$u.toast(res.msg)
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
			timerCancelOrder() {
				uni.showLoading({
					title: '取消中',
					mask: true
				})
				this.$request('get', 'api/ad/timeCancelOrder', {
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
			previewSingleImage(url) {
				uni.previewImage({
					current: url, // 当前显示图片
					urls: [url], // 所有图片（单图也需放数组）
					indicator: 'number' // 显示指示器
				})
			},
		}
	}
</script>

<style lang="scss">

</style>