<template>
	<view>
		<u-navbar title="我的邀请码" @rightClick="rightClick" :autoBack="true">
			<!-- <view slot="right" style="font-weight: 400;font-size: 28rpx;color: #3742C5;">
				我的邀请人
			</view> -->
		</u-navbar>
		<view style="padding: 30rpx;">
			<view style="margin-top: 92rpx;font-weight: bold;font-size: 56rpx;width: 100%;text-align: center;">
				{{invite}}</view>
			<view style="display: flex;justify-content: center;margin-top: 26rpx;">
				<view @click="copy" style="width: 194rpx;height: 80rpx;background: #F1F1FB;border-radius: 40rpx;font-weight: 400;font-size: 30rpx;color: #3742C5;
					text-align: center;line-height: 80rpx;">复制</view>
			</view>
			<view style="padding: 30rpx;margin-top: 52rpx;background: #FFFFFF;box-shadow: 0rpx 6rpx 32rpx 2rpx rgba(0,0,0,0.08);border-radius: 32rpx;display: flex;
				justify-content: space-around;">
				<view @click="toPage('/pages/extend/my-friend?type=0')" style="text-align: center;">
					<view style="font-weight: 800;font-size: 36rpx;color: #3742C5;">{{one_xj ? one_xj : 0}}</view>
					<view style="font-weight: 400;font-size: 24rpx;margin-top: 20rpx;">直邀好友</view>
					<!-- <view style="font-weight: bold;font-size: 24rpx;margin-top: 48rpx;">100.00元</view> -->
					<!-- <view style="font-weight: 400;font-size: 24rpx;color: #A9ABB6;margin-top: 6rpx;">今日收益</view> -->
				</view>
				<view
					style="width: 2rpx;height: 102rpx;background-color: #F1F1F4;margin-left: 52rpx;margin-right: 52rpx;">
				</view>
				<view @click="toPage('/pages/extend/my-friend?type=1')" style="text-align: center;">
					<view style="font-weight: 800;font-size: 36rpx;color: #3742C5;">{{two_xj ? two_xj : 0}}</view>
					<view style="font-weight: 400;font-size: 24rpx;margin-top: 20rpx;">二级好友</view>
					<!-- <view style="font-weight: bold;font-size: 24rpx;margin-top: 48rpx;">150.00元</view> -->
					<!-- <view style="font-weight: 400;font-size: 24rpx;color: #A9ABB6;margin-top: 6rpx;">昨日收益</view> -->
				</view>
				<view
					style="width: 2rpx;height: 102rpx;background-color: #F1F1F4;margin-left: 52rpx;margin-right: 52rpx;">
				</view>
				<view @click="toPage('/pages/extend/my-friend?type=2')" style="text-align: center;">
					<view style="font-weight: 800;font-size: 36rpx;color: #3742C5;">{{three_xj ? three_xj : 0}}</view>
					<view style="font-weight: 400;font-size: 24rpx;margin-top: 20rpx;">三级好友</view>
					<!-- <view style="font-weight: bold;font-size: 24rpx;margin-top: 48rpx;">10000.00元</view> -->
					<!-- <view style="font-weight: 400;font-size: 24rpx;color: #A9ABB6;margin-top: 6rpx;">全部收益</view> -->
				</view>
			</view>
			<view style="margin-top: 56rpx;background: #ECF0F9;border-radius: 32rpx;padding: 30rpx;">
				<view style="font-weight: bold;font-size: 28rpx;color: #464D57;">邀请奖励规则</view>
				<view style="font-weight: 500;font-size: 24rpx;color: #757B8C;line-height: 32rpx;margin-top: 24rpx;">
					<mp-html :content="share_rules" />
				</view>
			</view>
			<view style="display: flex;justify-content: center;width: 100%;margin-top: 68rpx;">
				<view @click="toPage('/pages/my/invite-friend')" style="width: 100%;height: 80rpx;background: #3742C5;border-radius: 32rpx;font-weight: bold;font-size: 28rpx;color: #FFFFFF;
					text-align: center;line-height: 80rpx;">邀请好友</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				invite: '',
				one_xj: '',
				two_xj: '',
				three_xj: '',
				share_rules: ''
			};
		},
		onLoad() {
			this.getInvite()
		},
		methods: {
			copy() {
				// #ifdef H5
				this.$copyText(this.invite).then(
					res => {
						uni.$u.toast('复制成功')
					}
				)
				// #endif
				// #ifdef APP-PLUS
				uni.setClipboardData({
					data: this.invite,
					success: () => {
						uni.$u.toast('复制成功')
					},
					fail: () => {
						uni.$u.toast('复制失败')
					}
				});
				// #endif
			},
			getInvite() {
				uni.showLoading({
					title: '加载中',
					mask: true
				})
				this.$request('get', 'api/index/getInvite').then(res => {
					uni.hideLoading()
					if (res.code) {
						this.invite = res.data.invite
						this.one_xj = res.data.one_xj
						this.two_xj = res.data.two_xj
						this.three_xj = res.data.three_xj
						this.share_rules = res.data.share_rules
					}
				})
			},
			toPage(url) {
				uni.navigateTo({
					url: url
				})
			},
			rightClick(e) {
				console.log('点击')
			}
		}
	}
</script>

<style lang="scss">

</style>