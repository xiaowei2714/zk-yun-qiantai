<template>
	<view style="padding: 30rpx;">
		<view v-if="wx.id"
			style="box-shadow: 0rpx 6rpx 32rpx 2rpx rgba(0,0,0,0.08);padding: 30rpx;border-radius: 32rpx;margin-bottom: 42rpx;">
			<view style="display: flex;align-items: center;">
				<view>
					<image src="/static/sk-wx.png" style="width: 40rpx;height: 40rpx;" mode=""></image>
				</view>
				<view style="font-weight: 400;font-size: 28rpx;margin-left: 10rpx;margin-top: -10rpx;">微信</view>
			</view>
			<view style="margin-top: 26rpx;font-weight: 400;font-size: 24rpx;">{{wx.name}}</view>
			<view style="margin-top: 10rpx;font-weight: 800;font-size: 36rpx;color: #3742C5;">{{wx.wechat}}</view>
			<view style="display: flex;justify-content: space-between;margin-top: 32rpx;">
				<view>
					<image @click="previewSingleImage(wx.qrcode)" src="/static/sk-qr.png"
						style="width: 30rpx;height: 30rpx;" mode=""></image>
				</view>
				<view @click="editData('wx')">
					<image src="/static/sk-edit.png" style="width: 30rpx;height: 30rpx;" mode=""></image>
				</view>
			</view>
		</view>
		<view v-if="alipay.id"
			style="box-shadow: 0rpx 6rpx 32rpx 2rpx rgba(0,0,0,0.08);padding: 30rpx;border-radius: 32rpx;margin-bottom: 42rpx;">
			<view style="display: flex;align-items: center;">
				<view>
					<image src="/static/sk-zfb.png" style="width: 40rpx;height: 40rpx;" mode=""></image>
				</view>
				<view style="font-weight: 400;font-size: 28rpx;margin-left: 10rpx;margin-top: -10rpx;">支付宝</view>
			</view>
			<view style="margin-top: 26rpx;font-weight: 400;font-size: 24rpx;">{{alipay.name}}</view>
			<view style="margin-top: 10rpx;font-weight: 800;font-size: 36rpx;color: #3742C5;">{{alipay.alipay}}</view>
			<view style="display: flex;justify-content: space-between;margin-top: 32rpx;">
				<view>
					<image @click="previewSingleImage(alipay.qrcode)" src="/static/sk-qr.png" style="width: 30rpx;height: 30rpx;" mode=""></image>
				</view>
				<view @click="editData('zfb')">
					<image src="/static/sk-edit.png" style="width: 30rpx;height: 30rpx;" mode=""></image>
				</view>
			</view>
		</view>
		<view v-if="bank.id"
			style="box-shadow: 0rpx 6rpx 32rpx 2rpx rgba(0,0,0,0.08);padding: 30rpx;border-radius: 32rpx;margin-bottom: 42rpx;">
			<view style="display: flex;align-items: center;">
				<view>
					<image src="/static/sk-yhk.png" style="width: 30rpx;height: 22rpx;" mode=""></image>
				</view>
				<view style="font-weight: 400;font-size: 28rpx;margin-left: 10rpx;">银行卡</view>
			</view>
			<view style="margin-top: 26rpx;font-weight: 400;font-size: 24rpx;">{{bank.name}}</view>
			<view style="margin-top: 10rpx;font-weight: 800;font-size: 36rpx;color: #3742C5;">{{bank.bank_card}}</view>
			<view style="display: flex;justify-content: space-between;margin-top: 32rpx;">
				<view>
					<!-- <image @click="previewSingleImage(alipay.qrcode)" src="/static/sk-qr.png" style="width: 30rpx;height: 30rpx;" mode=""></image> -->
				</view>
				<view @click="editData('yhk')">
					<image src="/static/sk-edit.png" style="width: 30rpx;height: 30rpx;" mode=""></image>
				</view>
			</view>
		</view>
		<view v-if="usdt.id"
			style="box-shadow: 0rpx 6rpx 32rpx 2rpx rgba(0,0,0,0.08);padding: 30rpx;border-radius: 32rpx;margin-bottom: 42rpx;">
			<view style="display: flex;align-items: center;">
				<view>
					<image src="/static/cz-usdt.png" style="width: 30rpx;height: 30rpx;" mode=""></image>
				</view>
				<view style="font-weight: 400;font-size: 28rpx;margin-left: 10rpx;margin-top: -5rpx;">USDT</view>
			</view>
			<view style="margin-top: 26rpx;font-weight: 400;font-size: 24rpx;">{{usdt.name}}</view>
			<view style="margin-top: 10rpx;font-weight: 800;font-size: 36rpx;color: #3742C5;">{{usdt.trc}}</view>
			<view style="display: flex;justify-content: space-between;margin-top: 32rpx;">
				<view>
					<image @click="previewSingleImage(usdt.qrcode)" src="/static/sk-qr.png" style="width: 30rpx;height: 30rpx;" mode=""></image>
				</view>
				<view @click="editData('usdt')">
					<image src="/static/sk-edit.png" style="width: 30rpx;height: 30rpx;" mode=""></image>
				</view>
			</view>
		</view>
		<view v-if="wx.length == 0 || alipay.length == 0 || bank.length == 0 || usdt.length == 0" style="margin-top: 66rpx;font-weight: bold;font-size: 32rpx;">添加收款方式</view>
		<view v-if="wx.length == 0"
			style="margin-top: 42rpx;height: 116rpx;width: 100%;display: flex;justify-content: space-between;border-radius: 32rpx;background: #F2F6FF;align-items: center;">
			<view style="display: flex;align-items: center;margin-left: 34rpx;">
				<view>
					<image src="/static/jy-wx.png" style="width: 40rpx;height: 40rpx;" mode=""></image>
				</view>
				<view style="font-weight: 400;font-size: 28rpx;margin-left: 10rpx;margin-top: -10rpx;">微信</view>
			</view>
			<view style="margin-right: 38rpx;">
				<image @click="addData('wx')" src="/static/sk-add.png" style="width: 28rpx;height: 28rpx;" mode="">
				</image>
			</view>
		</view>
		<view v-if="alipay.length == 0"
			style="margin-top: 42rpx;height: 116rpx;width: 100%;display: flex;justify-content: space-between;border-radius: 32rpx;background: #F2F6FF;align-items: center;">
			<view style="display: flex;align-items: center;margin-left: 34rpx;">
				<view>
					<image src="/static/sk-zfb.png" style="width: 40rpx;height: 40rpx;" mode=""></image>
				</view>
				<view style="font-weight: 400;font-size: 28rpx;margin-left: 10rpx;margin-top: -10rpx;">支付宝</view>
			</view>
			<view style="margin-right: 38rpx;">
				<image @click="addData('zfb')" src="/static/sk-add.png" style="width: 28rpx;height: 28rpx;" mode="">
				</image>
			</view>
		</view>
		<view v-if="bank.length == 0"
			style="margin-top: 42rpx;height: 116rpx;width: 100%;display: flex;justify-content: space-between;border-radius: 32rpx;background: #F2F6FF;align-items: center;">
			<view style="display: flex;align-items: center;margin-left: 34rpx;">
				<view>
					<image src="/static/sk-yhk.png" style="width: 30rpx;height: 22rpx;" mode=""></image>
				</view>
				<view style="font-weight: 400;font-size: 28rpx;margin-left: 10rpx;">银行卡</view>
			</view>
			<view style="margin-right: 38rpx;">
				<image @click="addData('yhk')" src="/static/sk-add.png" style="width: 28rpx;height: 28rpx;" mode="">
				</image>
			</view>
		</view>
		<view v-if="usdt == 0"
			style="margin-top: 32rpx;height: 116rpx;width: 100%;display: flex;justify-content: space-between;border-radius: 32rpx;background: #F2F6FF;align-items: center;">
			<view style="display: flex;align-items: center;margin-left: 34rpx;">
				<view>
					<image src="/static/cz-usdt.png" style="width: 30rpx;height: 30rpx;" mode=""></image>
				</view>
				<view style="font-weight: 400;font-size: 28rpx;margin-left: 10rpx;margin-top: -5rpx;">USDT</view>
			</view>
			<view style="margin-right: 38rpx;">
				<image @click="addData('usdt')" src="/static/sk-add.png" style="width: 28rpx;height: 28rpx;" mode="">
				</image>
			</view>
		</view>
		<!-- <view style="margin-top: 54rpx;display: flex;justify-content: center;">
			<view style="display: flex;align-items: center;">
				<view style="font-weight: 400;font-size: 26rpx;color: #A9ABB6;">查看不支持的收款方式</view>
				<view style="margin-left: 10rpx;margin-top: -15rpx;">
					<image src="/static/sk-xl.png" style="width: 14rpx;height: 9rpx;" mode=""></image>
				</view>
			</view>
		</view> -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				wx: [],
				alipay: [],
				bank: [],
				usdt: []
			};
		},
		onLoad() {
			this.getPayType()
		},
		onShow() {
			this.getPayType()
		},
		methods: {
			previewSingleImage(url) {
				uni.previewImage({
					current: url, // 当前显示图片
					urls: [url], // 所有图片（单图也需放数组）
					indicator: 'number' // 显示指示器
				})
			},
			getPayType() {
				uni.showLoading({
					title: '加载中',
					mask: true
				})
				this.$request('get', 'api/index/getUserPayType').then(res => {
					uni.hideLoading()
					if (res.code) {
						this.wx = res.data.wx
						this.alipay = res.data.alipay
						this.bank = res.data.card
						this.usdt = res.data.usdt
					}
				})
			},
			editData(type) {
				uni.navigateTo({
					url: '/pages/my/add-payment?type=' + type + '&scenc=edit'
				})
			},
			addData(type) {
				uni.navigateTo({
					url: '/pages/my/add-payment?type=' + type + '&scenc=add'
				})
			}
		}
	}
</script>

<style lang="scss">

</style>