<template>
	<view>
		<view style="padding: 30rpx;">
			<view @click="toPage('/pages/my/personal-avatar?avatar='+userInfo.avatar)"
				style="padding: 20rpx;border-bottom: 1rpx solid #F6F6F9;display: flex;justify-content: space-between;align-items: center;">
				<view style="font-weight: bold;font-size: 28rpx;">头像</view>
				<view style="display: flex;align-items: center;">
					<view style="margin-right: 28rpx;">
						<image :src="userInfo.avatar" style="width: 66rpx;height: 66rpx;border-radius: 50rpx;" mode=""></image>
					</view>
					<view style="margin-top: -10rpx;">
						<image src="/static/info-right.png" style="width: 12rpx;height: 21rpx;" mode=""></image>
					</view>
				</view>
			</view>
			<view @click="toPage('/pages/my/change-nickname?nickname='+userInfo.nickname)"
				style="padding: 20rpx;border-bottom: 1rpx solid #F6F6F9;display: flex;justify-content: space-between;align-items: center;padding-top: 40rpx;padding-bottom: 40rpx;">
				<view style="font-weight: bold;font-size: 28rpx;">昵称</view>
				<view style="display: flex;align-items: center;">
					<view style="margin-right: 28rpx;color: #A9ABB6;font-size: 28rpx;">
						{{userInfo.nickname}}
					</view>
					<view style="margin-top: -5rpx;">
						<image src="/static/info-right.png" style="width: 12rpx;height: 21rpx;" mode=""></image>
					</view>
				</view>
			</view>
			<view
				style="padding: 20rpx;border-bottom: 1rpx solid #F6F6F9;display: flex;justify-content: space-between;align-items: center;padding-top: 40rpx;padding-bottom: 40rpx;">
				<view style="font-weight: bold;font-size: 28rpx;">ID</view>
				<view style="display: flex;align-items: center;">
					<view style="margin-right: 28rpx;color: #A9ABB6;font-size: 28rpx;">
						{{userInfo.sn}}
					</view>
					<view style="margin-top: -5rpx;">
						<image src="/static/info-right.png" style="width: 12rpx;height: 21rpx;" mode=""></image>
					</view>
				</view>
			</view>
			<view
				style="padding: 20rpx;border-bottom: 1rpx solid #F6F6F9;display: flex;justify-content: space-between;align-items: center;padding-top: 40rpx;padding-bottom: 40rpx;">
				<view style="font-weight: bold;font-size: 28rpx;">邮箱</view>
				<view style="display: flex;align-items: center;">
					<view style="margin-right: 28rpx;color: #A9ABB6;font-size: 28rpx;">
						{{userInfo.account}}
					</view>
					<view style="margin-top: -5rpx;">
						<image src="/static/info-right.png" style="width: 12rpx;height: 21rpx;" mode=""></image>
					</view>
				</view>
			</view>
			<view @click="toPage('/pages/my/changePwd?email='+userInfo.account)"
				style="padding: 20rpx;border-bottom: 1rpx solid #F6F6F9;display: flex;justify-content: space-between;align-items: center;padding-top: 40rpx;padding-bottom: 40rpx;">
				<view style="font-weight: bold;font-size: 28rpx;">修改登录密码</view>
				<view style="display: flex;align-items: center;">
					<view style="margin-top: -5rpx;">
						<image src="/static/info-right.png" style="width: 12rpx;height: 21rpx;" mode=""></image>
					</view>
				</view>
			</view>
			<view @click="toPage('/pages/my/email-remind')"
				style="padding: 20rpx;border-bottom: 1rpx solid #F6F6F9;display: flex;justify-content: space-between;align-items: center;padding-top: 40rpx;padding-bottom: 40rpx;">
				<view style="font-weight: bold;font-size: 28rpx;">邮件提醒</view>
				<view style="display: flex;align-items: center;">
					<view style="margin-top: -5rpx;">
						<image src="/static/info-right.png" style="width: 12rpx;height: 21rpx;" mode=""></image>
					</view>
				</view>
			</view>
			<view @click="cancelShow = true"
				style="padding: 20rpx;border-bottom: 1rpx solid #F6F6F9;display: flex;justify-content: space-between;align-items: center;padding-top: 40rpx;padding-bottom: 40rpx;">
				<view style="font-weight: bold;font-size: 28rpx;">注销账号</view>
				<view style="display: flex;align-items: center;">
					<view style="margin-top: -5rpx;">
						<image src="/static/info-right.png" style="width: 12rpx;height: 21rpx;" mode=""></image>
					</view>
				</view>
			</view>


			<view style="position: fixed;bottom: 80rpx;left: 0;width: 100%">
				<view style="padding: 30rpx;">
					<view @click="loginOutShow = true" style="width: 100%;height: 80rpx;border: 2rpx solid #3742C5;border-radius: 32rpx;font-weight: bold;font-size: 28rpx;color: #3742C5;text-align: center;
						line-height: 80rpx;">退出登录</view>
				</view>
			</view>
		</view>


		
		<u-popup :show="cancelShow" mode="center" :round="32" :closeable="true">
			<view style="width: 560rpx;padding: 40rpx;background: linear-gradient( 180deg, #E3E8FF 0%, #FFFFFF 100%);border-radius: 32rpx;">
				<view style="width: 100%;text-align: center;font-weight: bold;font-size: 32rpx;padding-top: 22rpx;">注销账号</view>
				<view style="margin-top: 22rpx;font-weight: bold;font-size: 28rpx;text-align: center;width: 100%;">请输入“确定注销”后点击确定</view>
				<view style="width: 100%;height: 104rpx;background: #FFFFFF;border-radius: 32rpx;display: flex;justify-content: center;align-items: center;margin-top: 50rpx;">
					<input v-model="cancelValue" type="text" style="font-weight: 400;font-size: 30rpx;text-align: center;" placeholder='请输入“确定注销”' placeholder-style="font-weight: 400;font-size: 30rpx;color: #A9ABB6;text-align: center;" />
				</view>
				<view style="margin-top: 36rpx;font-weight: 400;font-size: 24rpx;color: #3742C5;width: 100%;text-align: center;">该操作将会永远删除你的账号及数据</view>
				<view style="margin-top: 92rpx;display: flex;justify-content: space-between;">
					<view @click="cancelShow = false" style="width: 260rpx;height: 80rpx;border-radius: 18rpx;border: 2rpx solid #3742C5;text-align: center;line-height: 80rpx;font-weight: bold;
						font-size: 28rpx;color: #3742C5;">取消</view>
					<view @click="cancelAccount" style="width: 260rpx;height: 80rpx;border-radius: 18rpx;text-align: center;line-height: 80rpx;font-weight: bold;background-color: #3742C5;
						font-size: 28rpx;color: white;">确定</view>
				</view>
			</view>
		</u-popup>

		<u-popup :show="loginOutShow" mode="center" :round="32" :closeable="true">
			<view style="width: 560rpx;padding: 40rpx;background: linear-gradient( 180deg, #E3E8FF 0%, #FFFFFF 100%);border-radius: 32rpx;">
				<view style="width: 100%;text-align: center;font-weight: bold;font-size: 32rpx;padding-top: 22rpx;">退出登录</view>
				<view style="font-weight: bold;font-size: 28rpx;color: #3742C5;width: 100%;text-align: center;margin-top: 76rpx;">确定退出登录吗?</view>
				<view style="margin-top: 92rpx;display: flex;justify-content: space-between;">
					<view @click="loginOutShow = false" style="width: 260rpx;height: 80rpx;border-radius: 18rpx;border: 2rpx solid #3742C5;text-align: center;line-height: 80rpx;font-weight: bold;
						font-size: 28rpx;color: #3742C5;">取消</view>
					<view @click="loginOut" style="width: 260rpx;height: 80rpx;border-radius: 18rpx;text-align: center;line-height: 80rpx;font-weight: bold;background-color: #3742C5;
						font-size: 28rpx;color: white;">确定</view>
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userInfo: {},
				loginOutShow: false,
				cancelShow: false,
				cancelValue: '',
			};
		},
		onLoad() {
			this.getInfo()
		},
		methods: {
			cancelAccount() {
				if (!this.cancelValue) return uni.$u.toast('请输入“确定注销”')
				uni.showLoading({
					title:'注销中',
					mask:true
				})
				this.$request('post','api/index/cancelAccount').then(res => {
					uni.hideLoading()
					if (res.code) {
						uni.$u.toast('注销成功')
						this.$request('post','api/index/logout').then(res => {
							setTimeout(() => {
								uni.reLaunch({
									url: '/pages/login/login'
								})
							}, 1000)
						})
					} else {
						uni.$u.toast(res.msg)
					}
				})
			},
			toPage(url) {
				uni.navigateTo({
					url: url
				})
			},
			loginOut() {
				uni.showLoading({
					title:'退出中',
					mask:true
				})
				this.$request('post','api/index/logout').then(res => {
					uni.hideLoading()
					uni.$u.toast('退出成功')
					setTimeout(() => {
						uni.reLaunch({
							url: '/pages/login/login'
						})
					}, 1000)
				})
			},
			getInfo() {
				uni.showLoading({
					title: '加载中',
					mask: true
				})
				this.$request('get', 'api/index/getUserInfo').then(res => {
					uni.hideLoading()
					if (res.code) {
						this.userInfo = res.data.info
					}
				})
			},
		}
	}
</script>

<style lang="scss">

</style>