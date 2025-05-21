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
			<view style="margin-top: 68rpx;box-shadow: 0rpx 6rpx 38rpx 2rpx rgba(0,0,0,0.08);border-radius: 32rpx;padding: 34rpx;">
				<view style="display: flex;justify-content: center;align-items: center;">
					<view style="margin-right: 100rpx;text-align: center;">
						<view style="font-weight: bold;font-size: 30rpx;">今日奖励</view>
						<view style="font-weight: 800;font-size: 32rpx;color: #3742C5;margin-top: 14rpx;">Y币 {{todayTotal ? todayTotal : '0.00'}}</view>
					</view>
					<view style="width: 1rpx;height: 130rpx;background-color: #F5F5F7;"></view>
					<view style="margin-left: 100rpx;text-align: center;">
						<view style="font-weight: bold;font-size: 30rpx;">累计奖励</view>
						<view style="font-weight: 800;font-size: 32rpx;color: #3742C5;margin-top: 14rpx;">Y币 {{total_award_price ? total_award_price : '0.00'}}</view>
					</view>
				</view>
				<view @click="toPages('/pages/my/billing-detail')" style="height: 80rpx;margin-top: 44rpx;border-radius: 32rpx;border: 2rpx solid #3742C5;display: flex;justify-content: center;align-items: center;">
					<view style="font-weight: bold;font-size: 28rpx;color: #3742C5;">查看明细</view>
					<view style="margin-left: 15rpx;">
						<image src="/static/tk-right.png" style="width: 26rpx;height: 26rpx;" mode=""></image>
					</view>
				</view>
			</view>
			<view @click="toPages('/pages/extend/my-friend')" style="margin-top: 56rpx;display: flex;justify-content: space-between;align-items: center;">
				<view style="font-weight: bold;font-size: 32rpx;">我的好友：{{totalSubordinates ? totalSubordinates : 0}}人</view>
				<view style="display: flex;align-items: center;">
					<view v-if="subList.length >= 3" style="width: 52rpx;height: 52rpx;margin-right: -15rpx;z-index: 2;border: 2rpx solid #FFFFFF;">
						<image :src="subList[2].avatar" style="width: 100%;height: 100%;border-radius: 100rpx;" mode=""></image>
					</view>
					<view v-if="subList.length >= 2" style="width: 52rpx;height: 52rpx;margin-right: -15rpx;z-index: 1;border: 2rpx solid #FFFFFF;">
						<image :src="subList[1].avatar" style="width: 100%;height: 100%;border-radius: 100rpx;" mode=""></image>
					</view>
					<view v-if="subList.length >= 1" style="width: 52rpx;height: 52rpx;border-radius: 100%;border: 2rpx solid #FFFFFF;">
						<image :src="subList[0].avatar" style="width: 100%;height: 100%;border-radius: 100rpx;" mode=""></image>
					</view>
					<view style="margin-left: 24rpx;">
						<image src="/static/tk-right.png" style="width: 26rpx;height: 26rpx" mode=""></image>
					</view>
				</view>
			</view>
			<view style="display: flex;justify-content: center;">
				<view @click="toPages('/pages/my/invite-friend')" style="width: 620rpx;margin-top: 46rpx;height: 80rpx;background: #3742C5;border-radius: 32rpx;text-align: center;color: #FFFFFF;font-size: 28rpx;
					font-weight: bold;line-height: 80rpx;">
					邀请好友，获得丰富奖励
				</view>
			</view>
			<view style="background: #ECF0F9;border-radius: 32rpx;padding: 30rpx;font-weight: 500;font-size: 24rpx;color: #757B8C;line-height: 40rpx;
				margin-top: 48rpx;">
				<mp-html :content="share_tips" />
			</view>
			<view style="margin-top: 36rpx;display: flex;justify-content: space-between;align-items: center;">
				<view style="font-weight: bold;font-size: 32rpx;">我的邀请人</view>
				<view style="display: flex;align-items: center;">
					<view v-if="!parent" style="font-weight: 400;font-size: 26rpx;color: #A9ABB6;">无邀请人</view>
					<!-- <view style="margin-left: 24rpx;">
						<image src="/static/tk-right.png" style="width: 26rpx;height: 26rpx;" mode=""></image>
					</view> -->
				</view>
			</view>
			<view v-if="parent" style="margin-top: 40rpx;display: flex;align-items: center;">
				<view style="width: 92rpx;height: 92rpx;border: 2rpx solid #FFFFFF;">
					<image :src="parent.avatar" style="width: 100%;height: 100%;border-radius: 100rpx;" mode=""></image>
				</view>
				<view style="margin-left: 24rpx;">
					<view style="font-weight: bold;font-size: 30rpx;">{{parent.nickname}}</view>
					<view style="font-weight: 500;font-size: 24rpx;color: #A9ABB6;margin-top: 10rpx;">他邀请了<span style="color: #EB8E26;">{{parent.xj_nums}}</span>人</view>
				</view>
			</view>
			
			
		</view>
		<nav-bar :nav-index="2"/>
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
				userInfo: {},
				total_award_price: '',
				todayTotal: '',
				totalSubordinates: '',
				subList: [],
				share_tips: '',
				parent: {}
			};
		},
		onLoad() {
			this.getInfo()
		},
		methods: {
			getInfo() {
				uni.showLoading({
					title:'加载中',
					mask:true
				})
				this.$request('get','api/index/getUserInfo').then(res => {
					if (res.code) {
						this.userInfo = res.data.info
					}
					this.$request('get', 'api/index/getUserExtend').then(res2 => {
						uni.hideLoading()
						this.total_award_price = res2.data.total_award_price
						this.todayTotal = res2.data.todayTotal
						this.totalSubordinates = res2.data.totalSubordinates
						this.subList = res2.data.subList
						this.share_tips = res2.data.share_tips
						this.parent = res2.data.parent
					})
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
