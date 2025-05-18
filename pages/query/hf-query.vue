<template>
	<view style="padding: 30rpx;">
		<view v-if="type == 1"
			style="width: 100%;box-shadow: 0rpx 6rpx 32rpx 2rpx rgba(0,0,0,0.08);border-radius: 32rpx;position: relative;">
			<view @click="changeType" style="width: 196rpx;height: 64rpx;background: #E5E6F8;border-radius: 0rpx 32rpx 0rpx 32rpx;position: absolute;top: 0;right: 0;
				font-weight: 400;font-size: 24rpx;color: #3742C5;text-align: center;line-height: 64rpx;">切换批量查询</view>
			<view style="padding: 34rpx;">
				<view style="font-weight: 400;font-size: 24rpx;margin-top: 40rpx;margin-left: 10rpx;">输入手机号</view>
				<view
					style="height: 80rpx;margin-top: 12rpx;background: #F6F7F9;border-radius: 24rpx;display: flex;align-items: center;width: 100%;">
					<view style="width: 100%;margin-left: 34rpx;">
						<input v-model="single_phone" type="text" placeholder="请输入手机号"
							placeholder-style="font-weight: 400;font-size: 30rpx;color: #B7BAC7;width: 100%" />
					</view>
				</view>
			</view>
			<view style="padding: 30rpx;">
				<view @click="confirmSubmit" class="find_content">确认查询</view>
			</view>

		</view>
		<view v-else
			style="box-shadow: 0rpx 6rpx 32rpx 2rpx rgba(0,0,0,0.08);border-radius: 32rpx;position: relative;padding: 40rpx;">
			<view @click="changeType" style="width: 196rpx;height: 64rpx;background: #E5E6F8;border-radius: 0rpx 32rpx 0rpx 32rpx;position: absolute;top: 0;right: 0;
				font-weight: 400;font-size: 24rpx;color: #3742C5;text-align: center;line-height: 64rpx;">切换单个查询</view>
			<view style="display: flex;align-items: center;">
				<view>
					<image src="/static/hfczje.png" style="width: 27rpx;height: 27rpx;" mode=""></image>
				</view>
				<view style="margin-left: 6rpx;font-weight: 400;font-size: 24rpx;margin-top: -5rpx;">号码批量查询</view>
			</view>
			<view style="margin-top: 20rpx;">
				<view style="font-weight: 400;font-size: 28rpx;color: #C7CAD2;">当前已导入<span
						style="color: #000000;">{{ numbers_txt.length }}</span>个号码</view>
			</view>
			<view @click="pldr_show = true" style="margin-top: 40rpx;background: #3742C5;border-radius: 32rpx;font-weight: bold;font-size: 28rpx;color: #FFFFFF;text-align: center;height: 80rpx;
				line-height: 80rpx;">点击一键导入</view>
		</view>
		<view v-if="type == 1 && cur_number !== ''" class="res">
			<view class="res_phone_line">
				<view class="res_phone">{{ cur_number }}</view>
				<view class="res_isp">{{ cur_isp }}</view>
			</view>
			<view style="width: 100%;height: 1rpx;background-color: #F2F2F2;"></view>
			<view style="padding: 30rpx;">
				<view class="res_balance">
					<span v-if="account != ''">最新记录</span>
					<span v-else>当前</span>
					余额：{{ cur_balance }}
				</view>
				<view v-for="(item, index) in cur_list" :key="index"
					style="margin-top: 42rpx;display: flex;justify-content: space-between;align-items: center;">
					<view style="font-weight: 400;font-size: 28rpx;color: #757B8C;">{{ item.time }}</view>
					<view style="font-weight: bold;font-size: 28rpx;">￥ {{ item.balance }}</view>
				</view>
			</view>
		</view>

		<view v-if="go_batch_confirm" style="padding: 30rpx;margin-top: 40rpx;">
			<view v-for="(item, index) in numbers_txt" :key="index"
				style="font-weight: 400;font-size: 28rpx;color: #757B8C;margin-bottom: 52rpx;">{{ item }}</view>
			<view @click="confirmBatchSubmit" style="margin-top: 92rpx;height: 80rpx;background: #3742C5;border-radius: 32rpx;font-weight: bold;font-size: 28rpx;color: #FFFFFF;
				text-align: center;line-height: 80rpx;">确认查询</view>
		</view>
		<view v-if="type == 2 && batch_data.length !== 0">
			<view v-for="(item, index) in batch_data" :key="index" class="res">
				<view class="res_phone_line">
					<view class="res_phone">{{ item.number }}</view>
					<view v-if="!item.cs" index class="res_msg"> {{ item.msg }}</view>
					<view v-if="item.cs" class="res_isp">{{ item.isp }}</view>
				</view>
				<view style="width: 100%;height: 1rpx;background-color: #F2F2F2;"></view>
				<view v-if="item.cs" style="padding: 30rpx;">
					<view class="res_balance">
						当前余额：{{ item.balance }}
					</view>
				</view>
			</view>
		</view>
		<u-popup :show="pldr_show" mode="center" :round="32" :closeable="true" @close="pldr_show = false">
			<view style="width: 560rpx;background: white;border-radius: 32rpx;">
				<view
					style="height: 78rpx;background: #E3E8FF;border-radius: 32rpx 32rpx 0rpx 0rpx;font-weight: bold;font-size: 30rpx;line-height: 78rpx;text-align: center;">
					输入框
				</view>
				<view style="padding: 34rpx;">
					<view style="padding: 15rpx;background: #F6F7F9;border-radius: 32rpx;">
						<u-textarea v-model="numbers" border="none"
							style="font-weight: 400;font-size: 28rpx;background-color: #F6F7F9;" height="150rpx"
							placeholder="请输入..."
							placeholder-style="font-weight: 400;font-size: 28rpx;color: #A9ABB6;"></u-textarea>
					</view>
					<view
						style="width: 100%;text-align: center;margin-top: 32rpx;font-weight: 400;font-size: 24rpx;color: #757B8C;">
						注：多个号码请换行隔开，一行填写一个号码</view>
					<view style="display: flex;justify-content: center;margin-top: 40rpx;">
						<view @click="moreLineConfirm" style="width: 260rpx;height: 80rpx;background: #3742C5;border-radius: 18rpx;font-weight: bold;font-size: 28rpx;color: #FFFFFF;text-align: center;
							line-height: 80rpx;">确定</view>
					</view>
				</view>
			</view>
		</u-popup>
		<nav-bar :nav-index="0" />
	</view>
</template>

<script>
	import NavBar from '@/components/navBar3.vue'; // 引入组件
	export default {
		components: {
			NavBar // 注册组件
		},
		data() {
			return {
				type: 1,
				query_price: '',
				pldr_show: false,
				single_phone: '',
				numbers: '',
				numbers_txt: [],
				can_click: true,
				cur_number: '',
				cur_balance: 0,
				cur_isp: '',
				cur_list: [],
				batch_data: [],
				go_batch_confirm: false,
				account: ''
			};
		},
		onLoad(options) {
			this.getQueryConfig()
			
			this.account = options.account
			if (options.account) {
				this.getHistory(options.account)
			}
		},
		methods: {
			getQueryConfig() {
				uni.showLoading({
					title: '加载中',
					mask: true
				})
				this.$request('get', 'api/ConsumeQuery/queryPhoneConfig', {}).then(res => {
					uni.hideLoading()
					if (res.code) {
						this.query_price = res.data.query
					}
				})
			},
			changeType() {
				if (this.type == 1) {
					this.type = 2
					uni.setNavigationBarTitle({
						title: '话费批量查询'
					})
				} else {
					this.type = 1
					uni.setNavigationBarTitle({
						title: '话费余额查询'
					})
				}
			},
			moreLineConfirm() {
				this.pldr_show = false
				this.numbers_txt = this.numbers.split('\n')
				this.go_batch_confirm = this.numbers_txt.length !== 0
				this.batch_data = []
			},
			confirmSubmit() {
				if (this.can_click === false) {
					return uni.$u.toast('正在查询中...')
				}

				if (this.query_price === '') {
					uni.$u.toast('未设置查询余额功能，请联系客服')
					return
				}

				this.can_click = false
				this.cur_number = ''
				this.cur_balance = 0
				this.cur_isp = ''
				this.account = ''
				this.cur_list = []

				const obj = this
				uni.showModal({
					title: '提示',
					content: '需要花费' + obj.query_price + 'Y币，确定要查询余额吗？',
					showCancel: true, // 显示取消按钮
					cancelText: '取消',
					confirmText: '确定',
					success: function(res) {
						if (res.confirm) {
							if (!obj.single_phone) {
								obj.can_click = true
								return uni.$u.toast('请正确输入手机号')
							}
							if (!/^1[3-9]\d{9}$/.test(obj.single_phone)) {
								obj.can_click = true
								return uni.$u.toast('请正确输入手机号')
							}

							obj.$request('post', 'api/ConsumeQuery/queryPhone', {
								phone: obj.single_phone,
							}).then(res => {
								obj.can_click = true
								uni.hideLoading()
								if (res.code) {
									obj.cur_number = res.data.number
									obj.cur_balance = res.data.balance
									obj.cur_isp = res.data.isp
									obj.cur_list = res.data.list
									uni.$u.toast('查询成功')
								} else {
									uni.$u.toast(res.msg)
								}
							})
						} else if (res.cancel) {
							obj.can_click = true
						}
					}
				});
			},
			confirmBatchSubmit() {
				if (this.can_click === false) {
					return uni.$u.toast('正在查询中...')
				}
				this.can_click = false
				
				const price = this.query_price * this.numbers_txt.length
				const obj = this
				uni.showModal({
					title: '提示',
					content: '需要花费' + price + 'Y币，确定要查询余额吗？',
					showCancel: true, // 显示取消按钮
					cancelText: '取消',
					confirmText: '确定',
					success: function(res) {
						if (res.confirm) {
							if (obj.numbers_txt.length == 0) return uni.$u.toast('请正确输入充值号码')
							
							obj.$request('post', 'api/ConsumeQuery/batchQueryPhone', {
								batch_data: obj.numbers_txt,
							}).then(res => {
								obj.can_click = true
								uni.hideLoading()
								if (res.code) {
									obj.go_batch_confirm = false
									obj.batch_data = res.data
									uni.$u.toast('查询成功')
								} else {
									uni.$u.toast(res.msg)
								}
							})
						} else if (res.cancel) {
							obj.can_click = true
						}
					}
				});
			},
			getHistory(value) {
				this.$request('get', 'api/ConsumeQuery/accountHistory', {
					number: value,
					type: 1
				}).then(res => {
					uni.hideLoading()
					if (res.code) {
						this.cur_number = res.data.number
						this.cur_balance = res.data.balance
						this.cur_isp = res.data.isp
						this.cur_list = res.data.list
					} else {
						uni.$u.toast(res.msg)
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	.res {
		margin-top: 40rpx;
		box-shadow: 0rpx 6rpx 32rpx 2rpx rgba(0, 0, 0, 0.08);
		border-radius: 32rpx;
	}

	.res_phone_line {
		padding: 30rpx;
		display: flex;
		align-items: center;
	}

	.res_phone {
		font-weight: bold;
		font-size: 32rpx;
	}

	.res_msg {
		margin-left: 32rpx;
	}

	.res_isp {
		margin-left: 32rpx;
		width: 144rpx;
		height: 54rpx;
		background: #E5E6F8;
		border-radius: 20rpx 0rpx 20rpx 0rpx;
		font-weight: 500;
		font-size: 26rpx;
		color: #3742C5;
		text-align: center;
		line-height: 54rpx;
	}

	.res_balance {
		font-weight: bold;
		font-size: 32rpx;
		color: #3742C5;
		width: 100%;
		text-align: center;
	}

	.find_content {
		background: #3742C5;
		border-radius: 32rpx;
		font-weight: bold;
		font-size: 28rpx;
		color: #FFFFFF;
		text-align: center;
		height: 80rpx;
		line-height: 80rpx;
	}
</style>