<template>
	<view style="padding: 30rpx;">
		<view
			style="display: flex;justify-content: space-between;height: 80rpx;align-items: center;background: #F6F7F9;border-radius: 24rpx;">
			<view style="margin-left: 28rpx;">
				<input v-model="saleMoney" type="text" style="font-weight: 400;font-size: 30rpx;"
					placeholder="请输入出售数量Y币" placeholder-style="font-weight: 400;font-size: 30rpx;color: #A9ABB6;" />
			</view>
			<view @click="maxMoney" style="font-weight: 400;font-size: 30rpx;color: #3742C5;margin-right: 28rpx;">最大
			</view>
		</view>

		<view style="margin-top: 18rpx;font-weight: 400;font-size: 24rpx;color: #A9ABB6;">余额最大出售数量<span
				style="color: #464D57;margin-left: 10rpx;">{{userMoney ? userMoney : '0.00'}}</span></view>
		<view
			style="display: flex;height: 80rpx;align-items: center;background: #F6F7F9;border-radius: 24rpx;margin-top: 24rpx;width: 100%;">
			<view style="margin-left: 28rpx;">
				<input v-model="salePrice" type="text" style="font-weight: 400;font-size: 30rpx;width: 100%;"
					placeholder="请输入出售价格(单价)" placeholder-style="font-weight: 400;font-size: 30rpx;color: #A9ABB6;" />
			</view>
		</view>

		<view style="margin-top: 56rpx;display: flex;align-items: center;">
			<view style="font-weight: 400;font-size: 24rpx;color: #464D57;">最小交易额<span
					style="color: #F6465D;margin-left: 10rpx;">*</span></view>
			<view style="font-weight: 400;font-size: 24rpx;color: #464D57;margin-left: 232rpx;">最大交易额<span
					style="color: #F6465D;margin-left: 10rpx;">*</span></view>
		</view>
		<view style="margin-top: 16rpx;display: flex;align-items: center;">
			<view
				style="width: 318rpx;height: 80rpx;background: #F6F7F9;border-radius: 24rpx;display: flex;align-items: center;justify-content: space-between;">
				<view style="margin-left: 28rpx;">
					<input v-model="min_price" type="text" placeholder="最小0.001"
						style="font-weight: 400;font-size: 30rpx;width: 200rpx;"
						placeholder-style="font-weight: 400;font-size: 30rpx;color: #A9ABB6;" />
				</view>
				<view style="margin-right: 28rpx;">Y币</view>
			</view>
			<view style="margin-left: 18rpx;margin-right: 18rpx;">~</view>
			<view
				style="width: 318rpx;height: 80rpx;background: #F6F7F9;border-radius: 24rpx;display: flex;align-items: center;justify-content: space-between;">
				<view style="margin-left: 28rpx;">
					<input v-model="max_price" type="text" placeholder=""
						style="font-weight: 400;font-size: 30rpx;width: 200rpx;"
						placeholder-style="font-weight: 400;font-size: 30rpx;color: #A9ABB6;" />
				</view>
				<view style="margin-right: 28rpx;">Y币</view>
			</view>
		</view>

		<view style="font-weight: 400;font-size: 24rpx;color: #464D57;margin-top: 36rpx;">付款时限<span
				style="color: #F6465D;margin-left: 10rpx;">*</span></view>
		<view
			style="display: flex;justify-content: space-between;height: 80rpx;align-items: center;background: #F6F7F9;border-radius: 24rpx;margin-top: 16rpx;">
			<view style="margin-left: 28rpx;">
				<input v-model="pay_time" type="text" style="font-weight: 400;font-size: 30rpx;" placeholder="10-30"
					placeholder-style="font-weight: 400;font-size: 30rpx;color: #A9ABB6;" />
			</view>
			<view style="font-weight: bold;font-size: 30rpx;margin-right: 28rpx;">分钟</view>
		</view>

		<view style="font-weight: 400;font-size: 24rpx;color: #464D57;margin-top: 36rpx;">
			交易类型
			<span style="color: #F6465D;margin-left: 10rpx;">*</span>
		</view>
		<radio-group v-model="type" class="uni-flex uni-row radio-group" @change="changeType">
			<!-- <radio value="1" :label="1" :checked="true" color="#2EBD85"
				style="margin-top: 16rpx;transform: scale(0.7); margin-right: 15px" class="radio">
				买入
			</radio> -->
			<radio value="2" :label="2" :checked="true" color="#F6465D" style="transform: scale(0.7)" class="radio">卖出</radio>
		</radio-group>

		<view style="font-weight: bold;font-size: 30rpx;color: #464D57;margin-top: 38rpx;">支付方式<span
				style="color: #F6465D;margin-left: 10rpx;">*</span></view>
		<view style="margin-top: 16rpx;font-weight: 400;font-size: 24rpx;color: #A9ABB6;">您最多可以同时选择3种支付方式</view>
		<view @click="showPayType = true"
			style="background: #F6F7F9;padding: 30rpx;margin-top: 28rpx;border-radius: 32rpx;display: flex;justify-content: space-between;align-items: center;">
			<view style="font-weight: 400;font-size: 28rpx;color: #2EBD85;">选择支付方式</view>
			<view>
				<u-icon name="plus" color="#2EBD85" size="16"></u-icon>
			</view>
		</view>
		<view style="margin-top: 38rpx;">
			<view v-if="checkboxValue2.includes('zfb')"
				style="display: flex;align-items: center;justify-content: flex-start;">
				<view style="width: 6rpx;height: 20rpx;background: #06B4FD;border-radius: 4rpx;margin-right: 10rpx;">
				</view>
				<view style="font-weight: 400;font-size: 24rpx;color: #A9ABB6;">支付宝</view>
			</view>
			<view v-if="checkboxValue2.includes('yhk')"
				style="display: flex;align-items: center;margin-top: 14rpx;justify-content: flex-start;">
				<view style="width: 6rpx;height: 20rpx;background: #F3AF55;border-radius: 4rpx;margin-right: 10rpx;">
				</view>
				<view style="font-weight: 400;font-size: 24rpx;color: #A9ABB6;">银行借记卡</view>
			</view>
			<view v-if="checkboxValue2.includes('wx')"
				style="display: flex;align-items: center;margin-top: 14rpx;justify-content: flex-start;">
				<view style="width: 6rpx;height: 20rpx;background: #28C445;border-radius: 4rpx;margin-right: 10rpx;">
				</view>
				<view style="font-weight: 400;font-size: 24rpx;color: #A9ABB6;">微信</view>
			</view>
			<view v-if="checkboxValue2.includes('usdt')"
				style="display: flex;align-items: center;margin-top: 14rpx;justify-content: flex-start;">
				<view style="width: 6rpx;height: 20rpx;background: black;border-radius: 4rpx;margin-right: 10rpx;">
				</view>
				<view style="font-weight: 400;font-size: 24rpx;color: #A9ABB6;">USDT</view>
			</view>
		</view>

		<view style="margin-top: 38rpx;font-weight: bold;font-size: 24rpx;">【商家提示】</view>
		<view style="padding: 24rpx;background: #F6F7F9;border-radius: 24rpx;margin-top: 16rpx;">
			<u-textarea v-model="tips" style="background-color: #F6F7F9;font-weight: 500;font-size: 24rpx;"
				placeholder="请输入" autoHeight border="none"
				placeholder-style="font-weight: 500;font-size: 24rpx;color: #757B8C;"></u-textarea>
		</view>

		<view @click="submit"
			style="margin-top: 56rpx;height: 80rpx;background: #3742C5;border-radius: 32rpx;font-weight: bold;font-size: 28rpx;color: #FFFFFF;text-align: center;line-height: 80rpx;">
			确认发布</view>

		<u-popup :show="showPayType" mode="center" :round="32">
			<view style="width: 560rpx;background: white;border-radius: 32rpx;">
				<view
					style="height: 78rpx;background: #E3E8FF;border-radius: 32rpx 32rpx 0rpx 0rpx;font-weight: bold;font-size: 30rpx;line-height: 78rpx;text-align: center;">
					选择支付方式
				</view>
				<view style="padding: 34rpx;">
					<view style="margin-top: 38rpx;">
						<u-checkbox-group v-model="checkboxValue1" iconPlacement="right" placement="column"
							@change="checkboxChange">
							<u-checkbox :customStyle="{marginBottom: '8px'}" v-for="(item, index) in checkboxList1"
								:key="index" :label="item.name" :name="item.value">
							</u-checkbox>
						</u-checkbox-group>
					</view>
					<view style="display: flex;justify-content: space-between;margin-top: 74rpx;">
						<view @click="showPayType = false" style="width: 220rpx;height: 80rpx;border-radius: 18rpx;font-weight: bold;font-size: 28rpx;color: #3742C5;text-align: center;
							line-height: 80rpx;border: 2rpx solid #3742C5;">取消</view>
						<view @click="payTypeClick" style="width: 220rpx;height: 80rpx;background: #3742C5;border-radius: 18rpx;font-weight: bold;font-size: 28rpx;color: #FFFFFF;text-align: center;
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
				userMoney: '',
				saleMoney: '',
				salePrice: '',
				min_price: '',
				max_price: '',
				pay_time: '',
				type: '2',
				tips: '',
				showPayType: false,
				checkboxValue1: [],
				checkboxValue2: [],
				// 基本案列数据
				checkboxList1: [{
						name: '微信',
						value: 'wx',
						disabled: false
					},
					{
						name: '支付宝',
						value: 'zfb',
						disabled: false
					},
					{
						name: '银行借记卡',
						value: 'yhk',
						disabled: false
					},
					{
						name: 'USDT',
						value: 'usdt',
						disabled: false
					}
				],
			};
		},
		onLoad() {
			this.getAdUserMoney()
		},
		methods: {
			submit() {
				if (!this.saleMoney) return uni.$u.toast('请输入出售数量Y币')
				if (!this.salePrice) return uni.$u.toast('请输入出售价格（单价）')
				if (!this.min_price) return uni.$u.toast('请输入最小交易额')
				if (!this.max_price) return uni.$u.toast('请输入最大交易额')
				if (!this.pay_time) return uni.$u.toast('请输入付款时限')
				if (!this.type) return uni.$u.toast('请输入交易类型')
				if (this.checkboxValue2.length == 0) return uni.$u.toast('请至少选择一种支付方式')
				if (parseFloat(this.max_price) > parseFloat(this.saleMoney)) return uni.$u.toast('最大交易额不得大于出售数量')
				uni.showLoading({
					title: '发布中',
					mask: true
				})
				
				this.$request('post', 'api/ad/addData', {
					num: this.saleMoney,
					price: this.salePrice,
					min_price: this.min_price,
					max_price: this.max_price,
					pay_time: this.pay_time,
					pay_type: this.checkboxValue2,
					type: this.type,
					tips: this.tips
				}).then(res => {
					uni.hideLoading()
					if (res.code) {
						uni.$u.toast('发布成功')
						this.saleMoney = ''
						this.salePrice = ''
						this.min_price = ''
						this.max_price = ''
						this.pay_time = ''
						this.checkboxValue2 = ''
						this.type = 1
						this.tips = ''
						setTimeout(() => {
							uni.navigateBack(1)
						}, 1000)
					} else {
						uni.$u.toast(res.msg)
					}
				})
			},
			checkboxChange(n) {
				this.checkboxValue1 = n
				// console.log('change', n);
			},
			payTypeClick() {
				this.checkboxValue2 = this.checkboxValue1
				this.showPayType = false
			},
			maxMoney() {
				this.saleMoney = this.userMoney
			},
			getAdUserMoney() {
				uni.showLoading({
					title: '加载中',
					mask: true
				})
				this.$request('get', 'api/index/getAdUserMoney').then(res => {
					uni.hideLoading()
					if (res.code) {
						this.userMoney = res.data.user_money
					}
				})
			},
			changeType(value){
				this.type = value.detail.value
			}
		}
	}
</script>

<style lang="scss">

</style>