<template>
	<view style="padding: 30rpx;">
		<view style="background: #ECF0F9;border-radius: 32rpx;padding: 30rpx;">
			<view style="font-weight: 500;font-size: 24rpx;color: #757B8C;line-height: 32rpx;">
				<mp-html :content="open_substation_tips" />
			</view>
		</view>
		<view style="display: flex;justify-content: center;width: 100%;margin-top: 68rpx;">
			<view @click="kt_show = true" style="width: 100%;height: 80rpx;background: #3742C5;border-radius: 32rpx;font-weight: bold;font-size: 28rpx;color: #FFFFFF;
				text-align: center;line-height: 80rpx;">立即开通</view>
		</view>
		
		<u-popup :show="kt_show" mode="center" :round="32" :closeable="true" @close="kt_show = false">
			<view style="width: 560rpx;background: white;border-radius: 32rpx;">
				<view style="height: 78rpx;background: #E3E8FF;border-radius: 32rpx 32rpx 0rpx 0rpx;font-weight: bold;font-size: 30rpx;line-height: 78rpx;text-align: center;">
					温馨提示
				</view>
				<view style="padding: 34rpx;">
					<view style="color: #757B8C;font-size: 28rpx;text-align: center;width: 100%;margin-top: 38rpx;">确认使用 <span style="font-size: 36rpx;color: black;">{{substation_price ? substation_price : 0}}Y币</span> 开通分站吗?</view>
					<view style="display: flex;justify-content: space-between;margin-top: 74rpx;">
						<view @click="kt_show = false" style="width: 220rpx;height: 80rpx;border-radius: 18rpx;font-weight: bold;font-size: 28rpx;color: #3742C5;text-align: center;
							line-height: 80rpx;border: 2rpx solid #3742C5;">取消</view>
						<view @click="submit" style="width: 220rpx;height: 80rpx;background: #3742C5;border-radius: 18rpx;font-weight: bold;font-size: 28rpx;color: #FFFFFF;text-align: center;
							line-height: 80rpx;">确定</view>
					</view>
				</view>
			</view>
		</u-popup>
		<u-popup :show="kt_show2" mode="center" :round="32">
			<view style="width: 560rpx;background: white;border-radius: 32rpx;">
				<view style="height: 78rpx;background: #E3E8FF;border-radius: 32rpx 32rpx 0rpx 0rpx;font-weight: bold;font-size: 30rpx;line-height: 78rpx;text-align: center;">
					温馨提示
				</view>
				<view style="padding: 34rpx;">
					<view style="color: #757B8C;font-size: 28rpx;text-align: center;width: 100%;margin-top: 38rpx;">
						<span v-if="substation.status == 1">您已经开通啦</span>
						<span v-if="substation.status == 2">您的分站资格已被停用</span>
					</view>
					<view style="display: flex;justify-content: space-between;margin-top: 74rpx;">
						<view @click="back" style="width: 220rpx;height: 80rpx;border-radius: 18rpx;font-weight: bold;font-size: 28rpx;color: #3742C5;text-align: center;
							line-height: 80rpx;border: 2rpx solid #3742C5;">取消</view>
						<view @click="back" style="width: 220rpx;height: 80rpx;background: #3742C5;border-radius: 18rpx;font-weight: bold;font-size: 28rpx;color: #FFFFFF;text-align: center;
							line-height: 80rpx;">确定</view>
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
				kt_show: false,
				kt_show2: false,
				open_substation_tips: '',
				substation: {},
				substation_price: ''
			};
		},
		onLoad() {
			this.getSubstation()
		},
		methods: {
			submit() {
				uni.showLoading({
					title: '开通中',
					mask: true
				})
				this.$request('post', 'api/index/openSub').then(res => {
					uni.hideLoading()
					if (res.code) {
						uni.$u.toast('恭喜您，开通成功')
						this.getSubstation()
					} else {
						uni.$u.toast(res.msg)
					}
				})
			},
			back() {
				uni.navigateBack(1)
			},
			getSubstation() {
				uni.showLoading({
					title: '加载中',
					mask: true
				})
				this.$request('get', 'api/index/getSubstation').then(res => {
					uni.hideLoading()
					if (res.code) {
						this.open_substation_tips = res.data.open_substation_tips
						this.substation = res.data.substation
						this.substation_price = res.data.substation_price
						if (this.substation.status == 1 || this.substation == 2) {
							this.kt_show2 = true
						}
					}
				})
			}
		}
	}
</script>

<style lang="scss">

</style>
