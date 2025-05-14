<template>
	<view style="padding: 30rpx;">
		<view style="background: #FFFFFF;border-radius: 32rpx;">
			<view style="padding: 35rpx;border-bottom: 1rpx solid #F1F1F4;">
				<view style="font-weight: 400;font-size: 30rpx;">{{email}}</view>
			</view>
			<view style="padding: 35rpx;border-bottom: 1rpx solid #F1F1F4;display: flex;justify-content: space-between;">
				<view style="">
					<input v-model="code" type="text" style="font-weight: 400;font-size: 30rpx;" placeholder="请输入邮箱验证码" placeholder-style="font-weight: 400;font-size: 30rpx;color: #A9ABB6;" />
				</view>
				<view @click="" style="font-weight: 400;font-size: 28rpx;color: #3742C5;">{{codeText}}</view>
			</view>
			<view style="padding: 35rpx;border-bottom: 1rpx solid #F1F1F4;display: flex;justify-content: space-between;">
				<view style="width: 100%;">
					<input v-model="password" type="text" style="font-weight: 400;font-size: 30rpx;width: 100%;" :password="true" placeholder="请输入新密码" placeholder-style="font-weight: 400;font-size: 30rpx;color: #A9ABB6;" />
				</view>
			</view>
			<view style="padding: 35rpx;display: flex;justify-content: space-between;">
				<view style="width: 100%;">
					<input v-model="password_confirm" type="text" style="font-weight: 400;font-size: 30rpx;width: 100%;" :password="true" placeholder="请再次输入新密码" placeholder-style="font-weight: 400;font-size: 30rpx;color: #A9ABB6;" />
				</view>
			</view>
		</view>
		<view style="margin-top: 64rpx;display: flex;justify-content: center;">
			<view @click="submit" style="width: 100%;height: 80rpx;background: #3742C5;border-radius: 32rpx;font-weight: bold;font-size: 28rpx;color: #FFFFFF;line-height: 80rpx;
				text-align: center;">确定</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				email: '',
				codeText: '获取验证码', // 按钮文字
				countdown: 0, // 倒计时秒数
				isCounting: false, // 是否正在倒计时
				code: '',
				password: '',
				password_confirm: ''
			};
		},
		onLoad(options) {
			this.email = options.email
		},
		methods: {
			submit() {
				// if (!this.is_gouxuan) return uni.$u.toast('请阅读并同意使用条款和隐私政策')
				if (!this.email) return uni.$u.toast('请填写邮箱')
				if (!this.code) return uni.$u.toast('请填写邮箱验证码')
				if (!this.password) return uni.$u.toast('请填写密码')
				if (!this.password_confirm) return uni.$u.toast('请再次填写密码')
				if (this.password !== this.password_confirm) return uni.$u.toast('两次密码输入不一致')
				uni.showLoading({
					title:'修改中',
					mask:true
				})
				this.$request('post','api/index/changePwd',{
					email: this.email,
					code: this.code,
					password: this.password,
				}).then(res => {
					uni.hideLoading()
					if (res.code) {
						uni.$u.toast('修改成功')
						this.$request('post','api/index/logout').then(res => {
						})
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
			// 获取验证码
			getCode() {
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
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #F8F8F8;
	}
</style>
