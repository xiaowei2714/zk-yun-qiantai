<template>
	<view>
		<view style="padding: 60rpx;">
			<view style="padding-top: 30rpx;" class="yq-bg">
				<view style="font-weight: bold;font-size: 44rpx;color: #97BAFF;text-align: center;margin-top: 20rpx;">邀请好友，获取更多奖励！</view>
				<view style="margin-top: 70rpx;display: flex;justify-content: center;">
					<view>
						<image src="/static/yq-bg2.png" style="width: 400rpx;height: 400rpx;" mode=""></image>
					</view>
				</view>
				<view style="margin-top: 68rpx;display: flex;justify-content: space-between;margin-left: 30rpx;margin-right: 30rpx;">
					<view>
						<image :src="invite_logo" style="width: 124rpx;height: 124rpx;" mode=""></image>
					</view>
					<view>
						<image :src="qrcode" style="width: 124rpx;height: 124rpx;" mode=""></image>
					</view>
				</view>
			</view>
		</view>
		<view style="width: 93%;position: fixed;bottom: 0;left: 0;padding: 30rpx;background: #192638;border-radius: 60rpx 60rpx 0rpx 0rpx;">
			<view style="width: 100%;height: 90rpx;background-color: #384453;border-radius: 50rpx;display: flex;align-items: center;justify-content: space-between;">
				<view style="font-weight: 400;font-size: 24rpx;color: #A9ABB6;margin-left: 35rpx;">邀请码</view>
				<view style="display: flex;align-items: center;margin-right: 35rpx;">
					<view style="font-weight: 400;font-size: 24rpx;color: #FFFFFF;">{{invite ? invite : ''}}</view>
					<view style="margin-left: 20rpx;">
						<image @click="copy" src="/static/yq-fz.png" style="width: 27rpx;height: 27rpx;" mode=""></image>
					</view>
				</view>
			</view>
			<view style="width: 100%;height: 90rpx;background-color: #384453;border-radius: 50rpx;display: flex;align-items: center;justify-content: space-between;
				margin-top: 30rpx;">
				<view style="font-weight: 400;font-size: 24rpx;color: #A9ABB6;margin-left: 35rpx;">邀请链接</view>
				<view style="display: flex;align-items: center;margin-right: 35rpx;">
					<view class="single-line-text" style="font-weight: 400;font-size: 24rpx;color: #FFFFFF;">{{link}}</view>
					<view style="margin-left: 20rpx;">
						<image @click="copy2" src="/static/yq-fz.png" style="width: 27rpx;height: 27rpx;" mode=""></image>
					</view>
				</view>
			</view>
			<view style="width: 100%;margin-top: 54rpx;display: flex;justify-content: space-between;padding-bottom: 30rpx;">
				<view>
					<image src="/static/yq-xz.png" style="width: 80rpx;height: 80rpx;" mode=""></image>
				</view>
				<view style="height: 80rpx;background: #3742C5;border-radius: 32rpx;font-weight: bold;font-size: 28rpx;color: #FFFFFF;text-align: center;line-height: 80rpx;
					width: 85%;">保存图片</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				invite: '',
				link: '',
				invite_logo: '',
				qrcode: ''
			};
		},
		onLoad() {
			this.getInviteFriend()
		},
		methods: {
			copy2() {
				// #ifdef H5
				this.$copyText(this.link).then(
					res => {
						uni.$u.toast('复制成功')
					}
				)
				// #endif
				// #ifdef APP-PLUS
				uni.setClipboardData({
					data: this.link,
					success: () => {
						uni.$u.toast('复制成功')
					},
					fail: () => {
						uni.$u.toast('复制失败')
					}
				});
				// #endif
			},
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
			getInviteFriend() {
				uni.showLoading({
					title: '加载中',
					mask: true
				})
				this.$request('get', 'api/index/getInviteFriend').then(res => {
					uni.hideLoading()
					if (res.code) {
						this.invite = res.data.invite
						this.link = res.data.link
						this.invite_logo = res.data.invite_logo
						this.qrcode = res.data.qrcode
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #071529;
	}
	.single-line-text {
	  width: 300rpx; /* 必须设置宽度 */
	  white-space: nowrap; /* 禁止换行 */
	  overflow: hidden; /* 隐藏溢出内容 */
	  text-overflow: ellipsis; /* 显示省略号 */
	}
	.yq-bg {
		background-image: url('/mobile/static/yq-bg.png');
		background-size: cover; 
		background-repeat: no-repeat; /* 不重复 */
		// background-position: center;
		padding: 30rpx;
	}
</style>
