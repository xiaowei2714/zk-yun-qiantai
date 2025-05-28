<template>
	<view style="padding: 30rpx;">
		<!-- <view style="display: flex;align-items: center;margin-left: 10rpx;">
			<view style="color: #A9ABB6;font-size: 24rpx;">单价</view>
			<view style="font-size: 24rpx;margin-left: 10rpx;">￥7.16</view>
			<view style="margin-left: 16rpx;">
				<image src="/static/jy-sx.png" style="width: 21rpx;height: 21rpx;" mode=""></image>
			</view>
		</view> -->
		<view style="margin-top: 22rpx;padding: 35rpx;box-shadow: 0rpx 6rpx 32rpx 2rpx rgba(0,0,0,0.08);border-radius: 32rpx;">
			<view style="margin-left: 10rpx;">
				<view style="font-weight: bold;font-size: 30rpx;">按金额</view>
				<view style="background: #3742C5;width: 34rpx;height: 6rpx;border-radius: 4rpx;margin-left: 30rpx;margin-top: 5rpx;"></view>
			</view>
			<view style="margin-top: 22rpx;height: 80rpx;background: #F6F7F9;border-radius: 32rpx;display: flex;justify-content: space-between;align-items: center;">
				<view style="margin-left: 35rpx;">
					<input v-model="inputMoney" @input="changeMoney" type="number" placeholder="请输入金额" />
				</view>
				<view @click="allMoney" style="font-weight: 400;font-size: 30rpx;color: #3742C5;margin-right: 35rpx;">全部</view>
			</view>
			<view style="margin-top: 20rpx;margin-left: 10rpx;">
				<span style="color: #A9ABB6;font-size: 24rpx;">限额</span>
				<span style="margin-left: 5rpx;color: #464D57;font-size: 24rpx;">CNY {{info.zxjye}}-CNY {{info.zdjye}}</span>
			</view>
			<view @click="sk_show = true" style="margin-top: 34rpx;display: flex;justify-content: space-between;align-items: center;height: 80rpx;background: #F6F7F9;border-radius: 32rpx;">
				<view v-if="chosePayType == 'zfb'" style="display: flex;align-items: center;margin-left: 35rpx;">
					<view style="width: 6rpx;height: 24rpx;background: #06B4FD;border-radius: 4rpx;margin-right: 15rpx;"></view>
					<view style="font-weight: bold;font-size: 30rpx;">支付宝</view>
				</view>
				<view v-if="chosePayType == 'wx'" style="display: flex;align-items: center;margin-left: 35rpx;">
					<view style="width: 6rpx;height: 24rpx;background: #28C445;border-radius: 4rpx;margin-right: 15rpx;"></view>
					<view style="font-weight: bold;font-size: 30rpx;">微信</view>
				</view>
				<view v-if="chosePayType == 'yhk'" style="display: flex;align-items: center;margin-left: 35rpx;">
					<view style="width: 6rpx;height: 24rpx;background: #F3AF55;border-radius: 4rpx;margin-right: 15rpx;"></view>
					<view style="font-weight: bold;font-size: 30rpx;">银行卡</view>
				</view>
				<view v-if="chosePayType == 'usdt'" style="display: flex;align-items: center;margin-left: 35rpx;">
					<view style="width: 6rpx;height: 24rpx;background: #A9ABB6;border-radius: 4rpx;margin-right: 15rpx;"></view>
					<view style="font-weight: bold;font-size: 30rpx;">USDT</view>
				</view>
				<view style="margin-right: 35rpx;margin-top: -10rpx;">
					<image src="/static/jy-xl.png" style="width: 19rpx;height: 12rpx;" mode=""></image>
				</view>
			</view>
			<view style="margin-top: 36rpx;display: flex;justify-content: space-between;align-items: center;">
				<view style="font-weight: 400;font-size: 28rpx;color: #A9ABB6;margin-left: 10rpx;">您收到</view>
				<view style="font-weight: bold;font-size: 28rpx;color: #464D57;margin-right: 10rpx;">{{(inputMoney / info.price).toFixed(3)}} Y币</view>
			</view>
		</view>
		<view style="margin-top: 30rpx;padding: 30rpx;box-shadow: 0rpx 6rpx 32rpx 2rpx rgba(0,0,0,0.08);border-radius: 32rpx;">
			<!-- <view style="display: flex;justify-content: space-between;">
				<view style="font-weight: 400;font-size: 24rpx;color: #A9ABB6;margin-left: 10rpx;">广告方状态</view>
				<view style="display: flex;align-items: center;margin-right: 10rpx;">
					<view style="width: 10rpx;height: 10rpx;background: #2EBD85;border-radius: 50rpx;"></view>
					<view style="margin-left: 12rpx;font-weight: bold;font-size: 24rpx;">6分钟前在线</view>
				</view>
			</view> -->
			<view style="display: flex;justify-content: space-between;">
				<view style="font-weight: 400;font-size: 24rpx;color: #A9ABB6;margin-left: 10rpx;">付款时限</view>
				<view style="display: flex;align-items: center;margin-right: 10rpx;">
					<!-- <view style="width: 10rpx;height: 10rpx;background: #2EBD85;border-radius: 50rpx;"></view> -->
					<view style="margin-left: 12rpx;font-weight: bold;font-size: 24rpx;">{{info.pay_time}}分钟</view>
				</view>
			</view>
		</view>
		<!-- <view style="margin-top: 44rpx;display: flex;align-items: center;">
			<view>
				<image src="/static/jy-b.png" style="width: 25rpx;height: 25rpx;" mode=""></image>
			</view>
			<view style="font-weight: 400;font-size: 24rpx;color: #A9ABB6;border-bottom: 1rpx dashed #A9ABB6;margin-left: 10rpx;">T+1提现保护生效</view>
		</view> -->
		<view style="margin-top: 50rpx;font-weight: bold;font-size: 32rpx;">交易条款</view>
		<view style="margin-top: 30rpx;background: #ECF0F9;border-radius: 32rpx;padding: 30rpx;">
			<view style="font-weight: bold;font-size: 24rpx;">请在下单前仔细阅读广告方条款</view>
			<view style="margin-top: 18rpx;font-weight: 500;font-size: 24rpx;color: #757B8C;">
				您好！请您知晓并同意以下交易要求(不满足要求，请取消订单)
				1、【实名付款】请使用与平台实名一致的账户付款，否则不会放行。
				2、【资金安全】请使用微信零钱通、支付宝余额宝付款。黑钱勿扰，发现报警并通知客服处理这笔交易!
				3、【重要提醒】近期诈骗频发，请勿在他人的引诱至平台下单完成后将币转到【资金盘】、【赌博网站】、【跨境电商】等骗局APP网站。买币后听从他人诱导将币转出，会有云失币和被诈骗的风险，Y币等值于美元，切记保管好自己的资产，注意各种投资理财等骗局。放币后不得转给任何人或者其他平台，被骗与本账号
			</view>
		</view>
		<view style="margin-top: 40rpx;box-shadow: 0rpx 6rpx 32rpx 2rpx rgba(0,0,0,0.08);border-radius: 32rpx;padding: 30rpx;">
			<view style="display: flex;align-items: center;">
				<view style="width: 44rpx;height: 44rpx;background: #464D57;border-radius: 28rpx;font-weight: bold;font-size: 28rpx;color: #FFFFFF;text-align: center;line-height: 44rpx;">{{info.first_nickname}}</view>
				<view style="margin-left: 15rpx;font-weight: bold;font-size: 28rpx;">{{info.nickname}}</view>
				<view style="margin-left: 10rpx;">
					<image src="/static/jy-v.png" style="width: 28rpx;height: 28rpx;" mode=""></image>
				</view>
			</view>
			<view style="display: flex;align-items: center;margin-top: 25rpx;">
				<view>
					<image src="/static/jy-v.png" style="width: 28rpx;height: 28rpx;" mode=""></image>
				</view>
				<view style="margin-left: 5rpx;font-weight: 500;font-size: 24rpx;color: #A9ABB6;">认证广告方</view>
				<view style="width: 1rpx;height: 20rpx;background-color: #E0E1E5;margin-left: 20rpx;margin-right: 20rpx;"></view>
				<view style="font-weight: 500;font-size: 24rpx;color: #A9ABB6;">保证金{{ info.num }} Y币</view>
				<view style="margin-left: 16rpx;margin-top: -5rpx;">
					<image src="/static/jy-gt.png" style="width: 19rpx;height: 19rpx;" mode=""></image>
				</view>
			</view>
		</view>
		<view style="margin-top: 50rpx;" v-if="thirtyCompleteData.cou">
			<view style="display: flex;justify-content: space-between;">
				<view style="font-weight: 400;font-size: 28rpx;color: #757B8C;">30日成单数</view>
				<view style="font-weight: bold;font-size: 28rpx;">{{ thirtyCompleteData.cou }}</view>
			</view>
			<view style="display: flex;justify-content: space-between;margin-top: 35rpx;">
				<view style="font-weight: 400;font-size: 28rpx;color: #757B8C;">30日成单率</view>
				<view style="font-weight: bold;font-size: 28rpx;">{{ thirtyCompleteData.rate }}%</view>
			</view>
			<view style="display: flex;justify-content: space-between;margin-top: 35rpx;">
				<view style="font-weight: 400;font-size: 28rpx;color: #757B8C;">30日平均放行时间</view>
				<view style="font-weight: bold;font-size: 28rpx;">{{ thirtyCompleteData.complete_time }} 分钟</view>
			</view>
			<view style="display: flex;justify-content: space-between;margin-top: 35rpx;">
				<view style="font-weight: 400;font-size: 28rpx;color: #757B8C;">30日平均付款</view>
				<view style="font-weight: bold;font-size: 28rpx;">{{ thirtyCompleteData.pay_time }} 分钟</view>
			</view>
		</view>
		<view style="margin-top: 118rpx;display: flex;justify-content: center;width: 100%;">
			<view @click="buySubmit" style="height: 80rpx;background: #2EBD85;border-radius: 32rpx;font-weight: bold;font-size: 28rpx;color: #FFFFFF;text-align: center;line-height: 80rpx;width: 100%;">确认买入</view>
		</view>
		
		
		<u-popup :show="sk_show" mode="bottom" :round="32" :closeable="true" @close="sk_show = false" bgColor="#F8F8F8">
			<view style="width: 100%;background: #F8F8F8;border-radius: 32rpx;margin-bottom: 50rpx;">
				<view style="height: 78rpx;background: #E3E8FF;border-radius: 32rpx 32rpx 0rpx 0rpx;font-weight: bold;font-size: 30rpx;line-height: 78rpx;text-align: center;">
					选择支付方式
				</view>
				<view style="padding: 34rpx;">
					<view @click="chosePayTypeF('zfb')" v-if="infoPayType.includes('zfb')" style="padding: 30rpx;background-color: white;border-radius: 32rpx;display: flex;align-items: center;">
						<view style="display: flex;justify-content: space-between;align-items: center;width: 100%;">
							<view style="display: flex;align-items: center;">
								<view>
									<image src="/static/sk-zfb.png" style="width: 31rpx;height: 31rpx;" mode=""></image>
								</view>
								<view style="margin-left: 10rpx;font-weight: 400;font-size: 28rpx;margin-top: -5rpx;">支付宝</view>
							</view>
							<view>
								<image v-if="chosePayType == 'zfb'" style="width: 35rpx;height: 35rpx;" src="/static/xz.png" mode=""></image>
							</view>
						</view>
						
					</view>
					<view @click="chosePayTypeF('wx')" v-if="infoPayType.includes('wx')" style="padding: 30rpx;background-color: white;border-radius: 32rpx;display: flex;align-items: center;margin-top: 30rpx;">
						<view style="display: flex;justify-content: space-between;align-items: center;width: 100%;">
							<view style="display: flex;align-items: center;">
								<view>
									<image src="/static/sk-wx.png" style="width: 31rpx;height: 31rpx;" mode=""></image>
								</view>
								<view style="margin-left: 10rpx;font-weight: 400;font-size: 28rpx;margin-top: -5rpx;">微信</view>
							</view>
							<view>
								<image v-if="chosePayType == 'wx'" style="width: 35rpx;height: 35rpx;" src="/static/xz.png" mode=""></image>
							</view>
						</view>
						
					</view>
					<view @click="chosePayTypeF('yhk')" v-if="infoPayType.includes('yhk')" style="padding: 30rpx;background-color: white;border-radius: 32rpx;display: flex;align-items: center;margin-top: 30rpx;">
						<view style="display: flex;justify-content: space-between;align-items: center;width: 100%;">
							<view style="display: flex;align-items: center;">
								<view>
									<image src="/static/sk-yhk.png" style="width: 31rpx;height: 28rpx;" mode=""></image>
								</view>
								<view style="margin-left: 10rpx;font-weight: 400;font-size: 28rpx;margin-top: -5rpx;">银行卡</view>
							</view>
							<view>
								<image v-if="chosePayType == 'yhk'" style="width: 35rpx;height: 35rpx;" src="/static/xz.png" mode=""></image>
							</view>
						</view>
						
					</view>
					<view @click="chosePayTypeF('usdt')" v-if="infoPayType.includes('usdt')" style="padding: 30rpx;background-color: white;border-radius: 32rpx;display: flex;align-items: center;margin-top: 30rpx;">
						<view style="display: flex;justify-content: space-between;align-items: center;width: 100%;">
							<view style="display: flex;align-items: center;">
								<view>
									<image src="/static/cz-usdt.png" style="width: 31rpx;height: 31rpx;" mode=""></image>
								</view>
								<view style="margin-left: 10rpx;font-weight: 400;font-size: 28rpx;margin-top: -5rpx;">USTD</view>
							</view>
							<view>
								<image v-if="chosePayType == 'usdt'" style="width: 35rpx;height: 35rpx;" src="/static/xz.png" mode=""></image>
							</view>
						</view>
						
					</view>
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				sk_show: false,
				id: 0,
				info: {},
				infoPayType: [],
				chosePayType: '',
				inputMoney: '',
				thirtyCompleteData: {}
			};
		},
		onLoad(options) {
			this.id = options.id
		},
		onShow() {
			this.getDetail()
			this.getThirtyComplete()
		},
		methods: {
			allMoney() {
				this.inputMoney = this.info.zdjye2
			},
			changeMoney(e) {
				console.log(e.detail.value)
			},
			chosePayTypeF(type) {
				this.chosePayType = type
				this.sk_show = false
			},
			getDetail() {
				uni.showLoading({
					title: '加载中',
					mask: true
				})
				this.$request('get', 'api/ad/info', {
					id: this.id
				}).then(res => {
					uni.hideLoading()
					if (res.code) {
						this.info = res.data
						this.infoPayType = this.info.pay_type
						this.chosePayType = this.info.pay_type[0]
					}
				})
			},
			getThirtyComplete() {
				this.$request('get', 'api/ad/thirtyCompleteData', {
					id: this.id
				}).then(res => {
					if (res.code) {
						this.thirtyCompleteData = res.data
					}
				})
			},
			buySubmit() {
				if (!this.inputMoney) return uni.$u.toast('请输入金额')
				uni.showLoading({
					title: '订单创建中',
					mask: true
				})
				this.$request('post', 'api/ad/buy', {
					price: this.inputMoney,
					pay_type: this.chosePayType,
					id: this.id
				}).then(res => {
					uni.hideLoading()
					if (res.code) {
						uni.navigateTo({
							url: '/pages/market/order?id=' + res.data.order_id
						})
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
