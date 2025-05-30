<template>
	<view>
		<view style="padding: 65rpx;">
			<view style="display: flex;align-items: center;padding-top: 80rpx;">
				<view>
					<image :src="info.shop_logo" style="width: 75rpx;height: 46rpx;" mode=""></image>
				</view>
				<view style="font-weight: 400;font-size: 42rpx;color: #3742C5;margin-left: 18rpx;">{{info.shop_name}}</view>
			</view>
			<view style="margin-top: 40rpx;font-family: PingFang SC, PingFang SC;font-weight: 600;font-size: 46rpx;">
				欢迎注册{{info.shop_name}}</view>
			<view style="margin-top: 116rpx;">
				<view style="font-weight: bold;font-size: 24rpx;">邮箱</view>
				<input v-model="email" type="text" placeholder="请输入邮箱" style="font-size: 30rpx;margin-top: 20rpx;"
					placeholder-style="color: #C7CAD2;font-size: 30rpx;" />
				<view style="width: 100%;height: 1rpx;background-color: #F0F0F0;margin-top: 26rpx;"></view>
			</view>
			<view style="margin-top: 24rpx;">
				<view style="display: flex;justify-content: space-between;align-items: center;">
					<view style="width: 60%;margin-top: -20rpx;">
						<input v-model="code" type="text" placeholder="请输入邮箱验证码"
							style="font-size: 30rpx;margin-top: 20rpx;width: 100%;"
							placeholder-style="color: #C7CAD2;font-size: 30rpx;" />
					</view>
					<view @click="getCode" style="padding: 10rpx 20rpx 10rpx 20rpx;border: 2rpx solid #3742C5;border-radius: 34rpx;font-weight: 400;font-size: 28rpx;
						color: #3742C5;">{{codeText}}</view>
				</view>
				<view style="width: 100%;height: 1rpx;background-color: #F0F0F0;margin-top: 26rpx;"></view>
			</view>
			<view style="margin-top: 44rpx;">
				<view style="font-weight: bold;font-size: 24rpx;">密码</view>
				<view style="display: flex;justify-content: space-between;align-items: center;">
					<view style="width: 100%;">
						<input v-model="password" type="safe-password" :password="true" placeholder="请输入密码"
							style="font-size: 30rpx;margin-top: 20rpx;width: 100%;"
							placeholder-style="color: #C7CAD2;font-size: 30rpx;" />
					</view>
				</view>
				<view style="width: 100%;height: 1rpx;background-color: #F0F0F0;margin-top: 26rpx;"></view>
			</view>
			<view style="margin-top: 44rpx;">
				<view style="font-weight: bold;font-size: 24rpx;">再次输入</view>
				<view style="display: flex;justify-content: space-between;align-items: center;">
					<view style="width: 100%;">
						<input v-model="password_confirm" type="safe-password" :password="true" placeholder="请重新输入密码"
							style="font-size: 30rpx;margin-top: 20rpx;width: 100%;"
							placeholder-style="color: #C7CAD2;font-size: 30rpx;" />
					</view>
				</view>
				<view style="width: 100%;height: 1rpx;background-color: #F0F0F0;margin-top: 26rpx;"></view>
			</view>
			<view style="margin-top: 44rpx;">
				<view style="font-weight: bold;font-size: 24rpx;">邀请码</view>
				<view style="display: flex;justify-content: space-between;align-items: center;">
					<view style="width: 100%;">
						<input v-model="invite_code" type="text" placeholder="请输入邀请码"
							style="font-size: 30rpx;margin-top: 20rpx;width: 100%;"
							placeholder-style="color: #C7CAD2;font-size: 30rpx;" />
					</view>
				</view>
				<view style="width: 100%;height: 1rpx;background-color: #F0F0F0;margin-top: 26rpx;"></view>
			</view>
			<view style="margin-top: 100rpx;display: flex;" @click="gouxuan">
				<view>
					<image :src="is_gouxuan ? '/static/xz.png' : '/static/wxz.png'" style="width: 26rpx;height: 26rpx;"
						mode=""></image>
				</view>
				<view style="margin-left: 20rpx;font-weight: 400;font-size: 24rpx;color: #939CAC;">
					<view>注册即代表同意 <span @click.stop="yinsi(1)" style="color: #3742C5;margin-left: 10rpx;margin-right: 10rpx;">使用条款</span> 与
						<span @click.stop="yinsi(2)" style="color: #3742C5;margin-left: 10rpx;">隐私政策</span>
					</view>
					<view>请合法使用本软件，提高防诈意识，保护财产安全，</view>
					<view>点击查看<span @click.stop="yinsi(3)" style="color: #3742C5;">《安全手册》</span></view>
				</view>
			</view>
			<view @click="submit" style="margin-top: 50rpx;width: 100%;height: 100rpx;background: #3742C5;border-radius: 50rpx;font-weight: 500;font-size: 32rpx;color: #FFFFFF;line-height: 100rpx;
				text-align: center;">
				立即注册
			</view>
			<view @click="login"
				style="width: 100%;text-align: center;font-weight: 400;font-size: 32rpx;color: #939CAC;margin-top: 52rpx;">
				已注册，去登录
			</view>



		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				is_gouxuan: false,
				countdown: 0, // 倒计时秒数
				codeText: '获取验证码', // 按钮文字
				isCounting: false, // 是否正在倒计时
				info: {},
				email: '',
				code: '',
				password: '',
				password_confirm: '',
				invite_code: ''
			};
		},
		onLoad(options) {
			if (options.invite !== '') {
				this.invite_code = options.invite
			}
			this.getInfo()
		},
		methods: {
			submit() {
				if (!this.is_gouxuan) return uni.$u.toast('请阅读并同意使用条款和隐私政策')
				if (!this.email) return uni.$u.toast('请填写邮箱')
				if (!this.code) return uni.$u.toast('请填写邮箱验证码')
				if (!this.password) return uni.$u.toast('请填写密码')
				if (!this.password_confirm) return uni.$u.toast('请再次填写密码')
				if (this.password !== this.password_confirm) return uni.$u.toast('两次密码输入不一致')
				uni.showLoading({
					title:'注册中',
					mask:true
				})
				this.$request('post','api/index/register',{
					email: this.email,
					code: this.code,
					password: this.password,
					invite_code: this.invite_code
				}).then(res => {
					uni.hideLoading()
					if (res.code) {
						uni.$u.toast('注册成功')
						setTimeout(() => {
							uni.reLaunch({
								url: '/pages/login/login'
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
			login() {
				uni.reLaunch({
					url: '/pages/login/login'
				})
			},
			// 获取验证码
			getCode() {
				if (this.isCounting) return
				if (!this.email) return uni.$u.toast('请填写邮箱')

				uni.showLoading({
					title: '获取中',
					mask: true
				})
				this.$request('post', 'api/index/sendCode', {email: this.email}).then(res => {
					uni.hideLoading()
					if (res.code) {
						uni.$u.toast('发送成功')
						// 设置倒计时时间（60秒）
						this.countdown = 60
						this.isCounting = true
						
						// 更新按钮文字
						this.codeText = `${this.countdown}秒后重新获取`
						
						// 设置定时器
						const timer = setInterval(() => {
							this.countdown--
							this.codeText = `${this.countdown}秒后重新获取`
						
							// 倒计时结束
							if (this.countdown <= 0) {
								clearInterval(timer)
								this.codeText = '获取验证码'
								this.isCounting = false
							}
						}, 1000)
					} else {
						uni.$u.toast(res.msg)
					}
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