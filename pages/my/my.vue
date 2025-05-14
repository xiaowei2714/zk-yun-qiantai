<template>
	<view style="width: 100%;">
		<view style="padding: 30rpx;padding-bottom: 245rpx;">
			<view style="display: flex;margin-top: 100rpx;width: 100%;align-items: center;">
				<view @click="login" style="width: 140rpx;height: 140rpx;background-color: #CEB29D;border-radius: 100%;">
					<image :src="userInfo.avatar" style="width: 100%;height: 100%;border-radius: 100%;" mode=""></image>
				</view>
				<view v-if="userInfo.id" style="margin-left: 32rpx;width: 75%;" @click="login">
					<view style="display: flex;">
						<view style="font-weight: bold;font-size: 32rpx;">{{userInfo.nickname}}</view>
						<view v-if="userInfo.is_substation" style="margin-left: 26rpx;border: 2rpx solid #3742C5;border-radius: 28rpx;color: #3742C5;font-size: 24rpx;font-weight: 500;
							text-align: center;width: 138rpx;height: 48rpx;line-height: 48rpx;">分站站长</view>
					</view>
					<view style="display: flex;justify-content: space-between;margin-top: 15rpx;">
						<view style="display: flex;align-items: center;">
							<view style="width: 30rpx;height: 30rpx;background: #A9ABB6;border-radius: 6rpx;text-align: center;line-height: 30rpx;
								font-weight: 500;font-size: 24rpx;color: #FFFFFF;">ID</view>
							<view style="margin-left: 20rpx;font-weight: 500;font-size: 24rpx;color: #A9ABB6;">{{userInfo.sn}}</view>
						</view>
						<view>
							<image src="/static/index-notice-right.png" style="width: 13rpx;height: 22rpx;" mode=""></image>
						</view>
					</view>
					<view style="display: flex;align-items: center;margin-top: -10rpx;">
						<view>
							<image src="/static/order-email.png" style="width: 30rpx;height: 25rpx;" mode=""></image>
						</view>
						<view style="margin-left: 20rpx;font-weight: 500;font-size: 24rpx;color: #A9ABB6;">{{userInfo.account}}</view>
					</view>
				</view>
				<view v-else style="font-weight: bold;font-size: 32rpx;margin-left: 20rpx;">点击登录</view>
			</view>
			<view style="margin-top: 65rpx;display: flex;justify-content: space-around;">
				<view @click="toPages('/pages/my/purse')" style="text-align: center;">
					<view style="font-weight: bold;font-size: 30rpx;">Y币 {{userInfo.user_money ? userInfo.user_money : '0.00'}}</view>
					<view style="font-weight: 400;font-size: 26rpx;color: #A9ABB6;margin-top: 10rpx;">可用资产</view>
				</view>
				<view style="text-align: center;">
					<view style="font-weight: bold;font-size: 30rpx;">Y币 {{userInfo.freeze_money ? userInfo.freeze_money : '0.00'}}</view>
					<view style="font-weight: 400;font-size: 26rpx;color: #A9ABB6;margin-top: 10rpx;">冻结资产</view>
				</view>
				<view @click="toPages('/pages/my/payment-type')" style="text-align: center;">
					<view style="font-weight: bold;font-size: 30rpx;">{{userInfo.pay_type_count ? userInfo.pay_type_count : 0}}个</view>
					<view style="font-weight: 400;font-size: 26rpx;color: #A9ABB6;margin-top: 10rpx;">收款账号</view>
				</view>
			</view>
			<view style="margin-top: 50rpx;display: flex;justify-content: space-between;">
				<view @click="toOrder" style="width: 290rpx;background: #FCF2E9;border-radius: 32rpx;padding: 24rpx;">
					<view style="display: flex;align-items: center;">
						<view>
							<image src="/static/my-chongzhidd.png" style="width: 56rpx;height: 56rpx;" mode=""></image>
						</view>
						<view style="font-weight: bold;font-size: 28rpx;margin-left: 15rpx;margin-top: -10rpx;">充值订单</view>
					</view>
					<view style="font-weight: 400;font-size: 24rpx;color: #A9ABB6;margin-left: 72rpx;margin-top: -15rpx;">账号充值/购买订单</view>
				</view>
				<view @click="toPages('/pages/my/withdrawal')" style="width: 290rpx;background: #ECF0F9;border-radius: 32rpx;padding: 24rpx;">
					<view style="display: flex;align-items: center;">
						<view>
							<image src="/static/my-chongzhitix.png" style="width: 56rpx;height: 56rpx;" mode=""></image>
						</view>
						<view style="font-weight: bold;font-size: 28rpx;margin-left: 15rpx;margin-top: -10rpx;">充值提现</view>
					</view>
					<view style="font-weight: 400;font-size: 24rpx;color: #A9ABB6;margin-left: 72rpx;margin-top: -15rpx;">账号提现</view>
				</view>
			</view>
			<view style="margin-top: 40rpx;">
				<image @click="toPages('/pages/market/market')" src="/static/my-jiaoyishic.png" style="width: 100%;height: 178rpx;" mode=""></image>
			</view>
			<view style="margin-top: 58rpx;font-weight: bold;font-size: 32rpx;">平台服务</view>
			<view style="margin-top: 68rpx;display: flex;flex-wrap: wrap;">
				<view @click="toPages('/pages/my/invite')" style="width: 25%;text-align: center;margin-bottom: 48rpx;">
					<image src="/static/my-yaoqingtg.png" style="width: 46rpx;height: 46rpx;" mode=""></image>
					<view style="margin-top: 28rpx;font-weight: 400;font-size: 24rpx;color: #9C9EA8;">邀请推广</view>
				</view>
				<view @click="toPages('/pages/my/open-substation')" style="width: 25%;text-align: center;margin-bottom: 48rpx;">
					<image src="/static/my-kaitongfz.png" style="width: 46rpx;height: 46rpx;" mode=""></image>
					<view style="margin-top: 28rpx;font-weight: 400;font-size: 24rpx;color: #9C9EA8;">开通分站</view>
				</view>
				<view @click="toPages('/pages/my/billing-detail')" style="width: 25%;text-align: center;margin-bottom: 48rpx;">
					<image src="/static/my-zhangdanmx.png" style="width: 46rpx;height: 46rpx;" mode=""></image>
					<view style="margin-top: 28rpx;font-weight: 400;font-size: 24rpx;color: #9C9EA8;">账单明细</view>
				</view>
				<view style="width: 25%;text-align: center;margin-bottom: 48rpx;">
					<image src="/static/my-api.png" style="width: 46rpx;height: 46rpx;" mode=""></image>
					<view style="margin-top: 28rpx;font-weight: 400;font-size: 24rpx;color: #9C9EA8;">API</view>
				</view>
				<view @click="toPages('/pages/index/notice')" style="width: 25%;text-align: center;">
					<image src="/static/my-gonggzx.png" style="width: 46rpx;height: 46rpx;" mode=""></image>
					<view style="margin-top: 28rpx;font-weight: 400;font-size: 24rpx;color: #9C9EA8;">公告中心</view>
				</view>
				<view @click="toPages('/pages/my/info-center/info-center')" style="width: 25%;text-align: center;">
					<image src="/static/my-xinxizx.png" style="width: 46rpx;height: 46rpx;" mode=""></image>
					<view style="margin-top: 28rpx;font-weight: 400;font-size: 24rpx;color: #9C9EA8;">信息中心</view>
				</view>
				<view @click="toPages('/pages/my/email-remind')" style="width: 25%;text-align: center;">
					<image src="/static/my-youjiantz.png" style="width: 46rpx;height: 46rpx;" mode=""></image>
					<view style="margin-top: 28rpx;font-weight: 400;font-size: 24rpx;color: #9C9EA8;">邮件通知</view>
				</view>
				<view @click="toPages('/pages/my/kf')" style="width: 25%;text-align: center;">
					<image src="/static/my-lianxiwm.png" style="width: 46rpx;height: 46rpx;" mode=""></image>
					<view style="margin-top: 28rpx;font-weight: 400;font-size: 24rpx;color: #9C9EA8;">联系我们</view>
				</view>
			</view>
			
			
			
			
		</view>
		<nav-bar :nav-index="3"/>
	</view>
</template>

<script>
	import NavBar from '@/components/navBar.vue'; // 引入组件
	export default {
		components: {
			NavBar // 注册组件
		},
		data() {
			return {
				userInfo: {}
			};
		},
		onLoad() {
			this.getInfo()
		},
		onShow() {
			this.getInfo()
		},
		methods: {
			toOrder() {
				uni.reLaunch({
					url: '/pages/order/order'
				})
			},
			getInfo() {
				uni.showLoading({
					title:'加载中',
					mask:true
				})
				this.$request('get','api/index/getUserInfo').then(res => {
					uni.hideLoading()
					if (res.code) {
						this.userInfo = res.data.info
					}
				})
			},
			login() {
				if (this.userInfo.id) {
					uni.navigateTo({
						url:'/pages/my/my-info'
					})
				} else {
					uni.navigateTo({
						url: '/pages/login/login'
					})
				}
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

</style>
