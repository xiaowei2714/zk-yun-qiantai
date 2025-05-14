<template>
	<view>
		<view style="padding: 65rpx;">
			<view style="display: flex;align-items: center;padding-top: 170rpx;">
				<view>
					<image :src="info.shop_logo" style="width: 75rpx;height: 46rpx;" mode=""></image>
				</view>
				<view style="font-family: 迷你简菱心, 迷你简菱心;font-weight: 400;font-size: 42rpx;color: #3742C5;margin-left: 18rpx;">{{info.shop_name}}</view>
			</view>
			<view style="margin-top: 40rpx;font-family: PingFang SC, PingFang SC;font-weight: 600;font-size: 46rpx;">欢迎来到{{info.shop_name}}</view>
			<view style="margin-top: 116rpx;">
				<view style="font-weight: bold;font-size: 24rpx;">邮箱</view>
				<input v-model="email" type="text" placeholder="请输入邮箱" style="font-size: 30rpx;margin-top: 20rpx;" placeholder-style="color: #C7CAD2;font-size: 30rpx;" />
				<view style="width: 100%;height: 1rpx;background-color: #F0F0F0;margin-top: 26rpx;"></view>
			</view>
			<view style="margin-top: 44rpx;">
				<view style="font-weight: bold;font-size: 24rpx;">密码</view>
				<view style="display: flex;justify-content: space-between;align-items: center;">
					<view style="width: 100%;">
						<input v-model="password" type="safe-password" :password="true" placeholder="请输入密码" style="font-size: 30rpx;margin-top: 20rpx;width: 100%;" placeholder-style="color: #C7CAD2;font-size: 30rpx;" />
					</view>
				</view>
				<view style="width: 100%;height: 1rpx;background-color: #F0F0F0;margin-top: 26rpx;"></view>
			</view>
			<view @click="forgetPwd" style="margin-top: 55rpx;display: flex;align-items: center;">
				<view style="font-weight: 400;font-size: 24rpx;color: #3742C5;">忘记了</view>
				<view style="margin-left: 8rpx;">
					<image src="/static/yiwen.png" style="width: 24rpx;height: 24rpx;" mode=""></image>
				</view>
				<view style="margin-left: 8rpx;font-weight: 400;font-size: 24rpx;color: #3742C5;">找回密码</view>
			</view>
			<view style="margin-top: 100rpx;display: flex;" @click="gouxuan">
				<view>
					<image :src="is_gouxuan ? '/static/xz.png' : '/static/wxz.png'" style="width: 26rpx;height: 26rpx;" mode=""></image>
				</view>
				<view style="margin-left: 20rpx;font-weight: 400;font-size: 24rpx;color: #939CAC;">
					<view>登录即代表同意 <span @click.stop="yinsi(1)" style="color: #3742C5;margin-left: 10rpx;margin-right: 10rpx;">使用条款</span> 与 <span @click.stop="yinsi(2)" style="color: #3742C5;margin-left: 10rpx;">隐私政策</span></view>
					<view>请合法使用本软件，提高防诈意识，保护财产安全，</view>
					<view>点击查看<span @click.stop="yinsi(3)" style="color: #3742C5;">《安全手册》</span></view>
				</view>
			</view>
			<view @click="submit" style="margin-top: 50rpx;width: 100%;height: 100rpx;background: #3742C5;border-radius: 50rpx;font-weight: 500;font-size: 32rpx;color: #FFFFFF;line-height: 100rpx;
				text-align: center;">
				立即登录
			</view>
			<view @click="register" style="width: 100%;text-align: center;font-weight: 400;font-size: 32rpx;color: #939CAC;margin-top: 52rpx;">
				注册
			</view>
			
			
			
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				is_gouxuan: false,
				info: {},
				email: '',
				password: ''
			};
		},
		onLoad() {
			this.getInfo()
		},
		methods: {
			submit() {
				if (!this.is_gouxuan) return uni.$u.toast('请阅读并同意使用条款和隐私政策')
				if (!this.email) return uni.$u.toast('请输入邮箱')
				if (!this.password) return uni.$u.toast('请输入密码')
				uni.showLoading({
					title:'登录中',
					mask:true
				})
				this.$request('post','api/index/login',{
					email: this.email,
					password: this.password
				}).then(res => {
					uni.hideLoading()
					if (res.code) {
						uni.$u.toast('登录成功')
						uni.setStorageSync('token', res.data.token)
						setTimeout(() => {
							uni.reLaunch({
								url: '/pages/my/my'
							})
						}, 1000)
					} else {
						uni.$u.toast(res.msg)
					}
				})
			},
			getInfo() {
				uni.showLoading({
					title:'加载中',
					mask:true
				})
				this.$request('get','api/index/getSetting').then(res => {
					// uni.$u.toast('成功')
					uni.hideLoading()
					if (res.code) {
						this.info = res.data.info
					}
				})
			},
			yinsi(type) {
				uni.navigateTo({
					url: '/pages/privacy/privacy?type=' + type
				})
			},
			forgetPwd() {
				uni.navigateTo({
					url: '/pages/forget_pwd/forget_pwd'
				})
			},
			register() {
				uni.navigateTo({
					url: '/pages/register/register'
				})
			},
			gouxuan() {
				this.is_gouxuan = !this.is_gouxuan
			}
		}
	}
</script>

<style lang="scss">

</style>
