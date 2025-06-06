<template>
	<view style="width: 100%;">
		<view style="padding: 30rpx;">
			<view
				style="width: 100%;height: 422rpx;background: #FFFFFF;box-shadow: 0rpx 6rpx 32rpx 2rpx rgba(0,0,0,0.08);border-radius: 32rpx;">
				<view style="padding: 30rpx;">
					<view style="display: flex;justify-content: space-between;">
						<view style="font-weight: bold;font-size: 30rpx;">订单：{{ infoObj.sn }}</view>
						<view v-if="infoObj.status == 1" class="status_show">待充值</view>
						<view v-else-if="infoObj.status == 2" class="status_show status_recharging">充值中</view>
						<view v-else-if="infoObj.status == 3" class="status_show status_success">已充值</view>
						<view v-else-if="infoObj.status == 4" class="status_show status_fail">已失败</view>
					</view>
					<view style="margin-top: 18rpx;font-weight: 400;font-size: 24rpx;color: #A9ABB6;">
						于 {{ infoObj.time }} 支付
					</view>
				</view>
				<view style="width: 100%;opacity: 0.1;height: 1rpx;background-color: #707070;"></view>
				<view style="padding: 30rpx;">
					<view v-if="infoObj.status == 1" class="j_show">等待订单确认</view>
					<view v-if="infoObj.status == 2" class="j_show j_recharging">订单充值中···</view>
					<view v-if="infoObj.status == 3" class="j_show j_success">订单已完成</view>
					<view v-if="infoObj.status == 4" class="j_show j_fail">订单已失败</view>
					<view style="margin-top: 14rpx;font-weight: 400;font-size: 24rpx;color: #A9ABB6;">
						客服服务团队已收到您的订单，我们会尽快安排订单处理
					</view>
					<view style="display: flex;justify-content: space-between;margin-top: 44rpx;">
						<view @click="toPages('/pages/my/kf')" style="width: 292rpx;height: 80rpx;background: #FFFFFF;border-radius: 18rpx 18rpx 18rpx 18rpx;border: 2rpx solid #3742C5;
							font-weight: bold;font-size: 28rpx;color: #3742C5;text-align: center;line-height: 80rpx;">反馈问题</view>
						<view style="width: 292rpx;height: 80rpx;background: #3742C5;border-radius: 18rpx 18rpx 18rpx 18rpx;border: 2rpx solid #3742C5;
							font-weight: bold;font-size: 28rpx;color: white;text-align: center;line-height: 80rpx;">余额明细</view>
					</view>
				</view>
			</view>
			<view v-if="infoObj.type == 1" class="df">
				<view class="dft">姓名：</view>
				<view class="dfc">{{ infoObj.account_name }}</view>
			</view>
			<view v-if="infoObj.type == 1" class="df">
				<view class="dft">手机号：</view>
				<view class="dfc">{{ infoObj.account }}</view>
			</view>
			<view v-if="infoObj.type == 1" class="df">
				<view class="dft">运营商：</view>
				<view class="dfc">{{ infoObj.operator }}</view>
			</view>
			<view v-if="infoObj.type == 2" class="df">
				<view class="dft">户号：</view>
				<view class="dfc">{{ infoObj.account }}</view>
			</view>
			<view v-if="infoObj.type == 2" class="df">
				<view class="dft">地区：</view>
				<view class="dfc">{{ infoObj.area }}</view>
			</view>
			<view style="margin-top: 58rpx;font-weight: bold;font-size: 32rpx;">支付信息</view>
			<view class="df">
				<view class="dft">充值金额</view>
				<view class="dfc">{{ infoObj.price }}元</view>
			</view>
			<view class="df">
				<view class="dft">优惠信息</view>
				<!-- <view class="dfc">折扣{{ infoObj.meal_discount }}折
					优惠{{ infoObj.distance_price }}元</view> -->
				<view class="dfc">折扣 {{ infoObj.meal_discount }} 折</view>
			</view>
			<view class="df">
				<view class="dft">参考汇率</view>
				<view class="dfc">{{ infoObj.hl }}</view>
			</view>
			<view style="margin-top: 36rpx;display: flex;justify-content: space-between;align-items: center;">
				<view class="dft">合计支付</view>
				<view style="font-weight: bold;font-size: 36rpx;color: #EB8E26;">{{ infoObj.pay_price }} Y币</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				infoObj: {}
			};
		},
		onLoad(options) {
			this.getInfo(options.id)
		},
		methods: {
			getInfo(id) {
				uni.showLoading({
					title: '加载中',
					mask: true
				})
				this.$request('get', 'api/consumeRecharge/info', {
					id: id
				}).then(res => {
					uni.hideLoading()
					if (res.code) {
						this.infoObj = res.data
					}
				})
			},
			toPages(url) {
				uni.navigateTo({
					url: url
				})
			}
		}
	}
</script>

<style lang="scss">
	.status_show {
		font-weight: bold;
		font-size: 26rpx;
		color: #5B87F0;
	}

	.status_recharging {
		color: #EB8E26;
	}

	.status_success {
		color: #7EC050;
	}

	.status_fail {
		color: #E47470;
	}

	.j_show {
		font-weight: bold;
		font-size: 30rpx;
		color: #EB8E26;
	}

	.j_success {
		color: #7EC050;
	}

	.j_fail {
		color: #E47470;
	}

	.df {
		margin-top: 36rpx;
		display: flex;
		justify-content: space-between;
	}

	.dft {
		font-weight: 400;
		font-size: 28rpx;
		color: #757B8C;
	}

	.dfc {
		font-weight: bold;
		font-size: 28rpx;
		color: #000000;
	}
</style>