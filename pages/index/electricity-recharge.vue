<template>
	<view style="width: 100%;">
		<view style="padding: 30rpx;">
			<view v-if="type == 1"
				style="width: 100%;height: 398rpx;box-shadow: 0rpx 6rpx 32rpx 2rpx rgba(0,0,0,0.08);border-radius: 32rpx;position: relative;">
				<view @click="changeType" style="width: 196rpx;height: 64rpx;background: #E5E6F8;border-radius: 0rpx 32rpx 0rpx 32rpx;position: absolute;top: 0;right: 0;
					font-weight: 400;font-size: 24rpx;color: #3742C5;text-align: center;line-height: 64rpx;">切换批量充值</view>
				<view style="padding: 34rpx;">
					<view style="font-weight: 400;font-size: 24rpx;margin-top: 40rpx;margin-left: 10rpx;">输入户号</view>
					<view
						style="height: 80rpx;margin-top: 12rpx;background: #F6F7F9;border-radius: 24rpx;display: flex;align-items: center;width: 100%;">
						<view style="width: 100%;margin-left: 34rpx;">
							<input v-model="form_data.single_number" type="text" placeholder="请输入户号"
								placeholder-style="font-weight: 400;font-size: 30rpx;color: #B7BAC7;width: 100%" />
						</view>
					</view>
					<view style="font-weight: 400;font-size: 24rpx;margin-top: 26rpx;margin-left: 10rpx;">地区</view>
					<view class="uni-list">
						<view class="uni-list-cell">
							<view class="uni-list-cell-left">
								当前选择
							</view>
							<view class="uni-list-cell-db">
								<picker @change="bindPickerChange" :value="form_data.single_area" :range="areaData">
									<view class="uni-input">{{areaData[form_data.single_area]}}</view>
								</picker>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view v-else
				style="box-shadow: 0rpx 6rpx 32rpx 2rpx rgba(0,0,0,0.08);border-radius: 32rpx;position: relative;padding: 40rpx;">
				<view @click="changeType" style="width: 196rpx;height: 64rpx;background: #E5E6F8;border-radius: 0rpx 32rpx 0rpx 32rpx;position: absolute;top: 0;right: 0;
					font-weight: 400;font-size: 24rpx;color: #3742C5;text-align: center;line-height: 64rpx;">切换单个充值</view>
				<view style="display: flex;align-items: center;">
					<view>
						<image src="/static/hfczje.png" style="width: 27rpx;height: 27rpx;" mode=""></image>
					</view>
					<view style="margin-left: 6rpx;font-weight: 400;font-size: 24rpx;margin-top: -5rpx;">户号批量充值</view>
				</view>
				<view style="margin-top: 20rpx;margin-bottom: 20rpx;">
					<view style="font-weight: 400;font-size: 28rpx;color: #C7CAD2;">当前已导入<span
							style="color: #000000;">{{numbers.length}}</span>个户号</view>
				</view>
				<view v-for="(item, index) in numbers" :key="index"
					style="font-weight: 400;font-size: 28rpx;color: #757B8C;margin-bottom: 22rpx;">{{item}}</view>
				<view @click="pldr_show = true" style="margin-top: 40rpx;background: #3742C5;border-radius: 32rpx;font-weight: bold;font-size: 28rpx;color: #FFFFFF;text-align: center;height: 80rpx;
					line-height: 80rpx;">点击一键导入</view>
			</view>
			<view style="margin-top: 50rpx;display: flex;flex-wrap: wrap;justify-content: space-between;">
				<view style="font-weight: bold;font-size: 32rpx;">充值金额</view>
				<view @click="notice_show = true" style="display: flex;align-items: center;">
					<view style="font-weight: 400;font-size: 24rpx;color: #A9ABB6;">注意事项</view>
					<view style="margin-left: 10rpx;">
						<image src="/static/jy-yw.png" style="width: 24rpx;height: 24rpx;" mode=""></image>
					</view>
				</view>
			</view>
			<view style="margin-top: 28rpx;display: flex;flex-wrap: wrap;justify-content: flex-start;margin-left: -23rpx;">
				<view @click="choosePrice(item)" v-for="(item, index) in list" :key="index"
					style="width: 212rpx;height: 82rpx;border-radius: 24rpx;font-weight: bold;font-size: 36rpx;text-align: center;line-height: 82rpx;margin-bottom: 24rpx;margin-left: 23rpx;"
					:style="{border: activeMeal.id == item.id ? '2rpx solid #3742C5' : '2rpx solid #DEE0E6', color: activeMeal.id == item.id ? '#3742C5' : '#B7BAC7'}">
					{{item.price}}
				</view>
			</view>
			<view style="margin-top: 50rpx;font-weight: bold;font-size: 32rpx;">实付金额</view>
			<view style="margin-top: 26rpx;height: 100rpx;background: #F6F7F9;border-radius: 24rpx;display: flex;justify-content: space-between;
				align-items: center;padding-left: 30rpx;padding-right: 30rpx;">
				<view>
					<span style="font-weight: bold;font-size: 40rpx;">Y币</span>
					<span v-if="type == 1"
						style="margin-left: 14rpx;font-weight: bold;font-size: 40rpx;">{{activeMeal.discountedPrice}}</span>
					<span v-if="type == 2"
						style="margin-left: 14rpx;font-weight: bold;font-size: 40rpx;">{{(activeMeal.discountedPrice * numbers.length).toFixed(3)}}</span>
				</view>
				<view>
					<image src="/static/index-huaf-bianj.png" style="width: 33rpx;height: 33rpx;" mode=""></image>
				</view>
			</view>
			<view style="margin-top: 40rpx;display: flex;justify-content: space-between;">
				<view style="font-weight: 400;font-size: 28rpx;color: #757B8C;">优惠信息</view>
				<view style="font-weight: bold;font-size: 28rpx;color: #000000;">
					{{activeMeal.discount}}折
				</view>
			</view>
			<view style="margin-top: 36rpx;display: flex;justify-content: space-between;">
				<view style="font-weight: 400;font-size: 28rpx;color: #757B8C;">参考汇率</view>
				<view style="font-weight: bold;font-size: 28rpx;color: #000000;">{{reference_rate}}</view>
			</view>
			<view style="margin-top: 36rpx;display: flex;justify-content: space-between;align-items: center;">
				<view style="font-weight: 400;font-size: 28rpx;color: #757B8C;">合计支付</view>
				<view v-if="type == 1" style="font-weight: bold;font-size: 36rpx;color: #EB8E26;">
					{{activeMeal.discountedPrice}} Y币
				</view>
				<view v-if="type == 2" style="font-weight: bold;font-size: 36rpx;color: #EB8E26;">
					{{(activeMeal.discountedPrice * numbers.length).toFixed(3)}} Y币
				</view>
			</view>
			<view @click="confirmSubmit" style="margin-top: 60rpx;height: 80rpx;background: #3742C5;border-radius: 32rpx;font-weight: bold;font-size: 28rpx;color: #FFFFFF;
				text-align: center;line-height: 80rpx;">
				确认充值
			</view>

			<u-popup :show="pldr_show" mode="center" :round="32" :closeable="true" @close="pldr_show = false">
				<view style="width: 560rpx;background: white;border-radius: 32rpx;">
					<view
						style="height: 78rpx;background: #E3E8FF;border-radius: 32rpx 32rpx 0rpx 0rpx;font-weight: bold;font-size: 30rpx;line-height: 78rpx;text-align: center;">
						输入框
					</view>
					<view style="padding: 34rpx;">
						<view style="padding: 15rpx;background: #F6F7F9;border-radius: 32rpx;">
							<u-textarea v-model="numbers_txt" border="none"
								style="font-weight: 400;font-size: 28rpx;background-color: #F6F7F9;" height="150rpx"
								placeholder="请输入户号 地区"
								placeholder-style="font-weight: 400;font-size: 28rpx;color: #A9ABB6;">
							</u-textarea>
						</view>
						<view
							style="width: 100%;text-align: center;margin-top: 32rpx;font-weight: 400;font-size: 24rpx;color: #757B8C;">
							注：多个户号请换行隔开，一行填写一个号码
						</view>
						<view style="display: flex;justify-content: center;margin-top: 40rpx;">
							<view @click="daoru"
								style="width: 260rpx;height: 80rpx;background: #3742C5;border-radius: 18rpx;font-weight: bold;font-size: 28rpx;color: #FFFFFF;text-align: center;line-height: 80rpx;">
								确定
							</view>
						</view>
					</view>
				</view>
			</u-popup>

			<!-- 温馨提示 -->
			<u-popup :show="notice_show" mode="center" :round="32" :closeable="true" @close="notice_show = false">
				<view style="width: 560rpx;background: white;border-radius: 32rpx;">
					<view
						style="height: 78rpx;background: #E3E8FF;border-radius: 32rpx 32rpx 0rpx 0rpx;font-weight: bold;font-size: 30rpx;line-height: 78rpx;text-align: center;">
						温馨提示
					</view>
					<view style="padding: 34rpx;">
						<view style="color: #757B8C;font-size: 28rpx;width: 100%;margin-top: 38rpx;">
							<view v-for="(item, index) in noticeList" :key="index">
								<view style="color: #000000;">{{ item.title }}</view>
								<view style="padding: 2rpx;">{{ item.content }}</view><br />
							</view>
							<view>
								<u-checkbox-group @change="checkboxGroupChange" placement="column"
									style="display: grid;place-items: center;">
									<u-checkbox v-if="notice_today" checked key="1" label="今天不再显示"
										name="1"></u-checkbox>
									<u-checkbox v-else key="1" label="今天不再显示" name="1"></u-checkbox>
								</u-checkbox-group>
							</view>
						</view>
						<view style="margin-top: 30rpx;">
							<view @click="noticeSubmit" style="width: 100%;height: 80rpx;background: #3742C5;border-radius: 18rpx;font-weight: bold;font-size: 28rpx;color: #FFFFFF;text-align: center;
								line-height: 80rpx;">确定</view>
						</view>
					</view>
				</view>
			</u-popup>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				type: 1,
				activeMeal: {},
				pldr_show: false,
				numbers_txt: '',
				numbers: [],
				reference_rate: '',
				list: [],
				notice_show: false,
				notice_today: false,
				noticeList: [],
				count: 0,
				form_data: {
					single_area: 0,
					single_number: ''
				},
				can_click: true,
				areaIndex: 0,
				areaData: [
					"北京", "天津", "辽宁", "江苏", "浙江",
					"山东", "湖南", "陕西", "冀北", "新疆",
					"宁夏", "安徽", "重庆", "福建", "河南",
					"青海", "湖北", "蒙东", "黑龙江", "吉林",
					"上海", "甘肃", "山西", "四川", "江西", "河北"
				]
			};
		},
		onLoad() {
			this.getMealList()
			this.getNotice()
		},
		methods: {
			bindPickerChange: function(e) {
				console.log('picker发送选择改变，携带值为', e.detail.value)
				this.form_data.single_area = e.detail.value
			},
			daoru() {
				this.numbers = this.stringToLines(this.numbers_txt)
				this.pldr_show = false
			},
			confirmSubmit() {
				if (this.can_click === false) {
					return uni.$u.toast('正在充值中...')
				}
				this.can_click = false
				uni.showLoading({
					title: '充值中',
					mask: true
				})

				if (this.type == 1) { // 单个充值
					if (!this.form_data.single_number) {
						this.can_click = true
						uni.hideLoading()
						return uni.$u.toast('请正确输入户号')
					}
					if (!this.activeMeal) {
						this.can_click = true
						uni.hideLoading()
						return uni.$u.toast('请选择充值金额')
					}

					this.$request('post', 'api/consumeRecharge/electricityRecharge', {
						area: this.form_data.single_area,
						number: this.form_data.single_number,
						meal_id: this.activeMeal.id,
						meal_discount: this.activeMeal.discount,
						meal_discounted_price: this.activeMeal.discountedPrice,
						money: this.activeMeal.price
					}).then(res => {
						this.can_click = true
						uni.hideLoading()
						if (res.code) {
							uni.$u.toast('充值成功')
						} else {
							uni.$u.toast(res.msg)
						}
					})
				} else { // 批量充值
					if (!this.numbers_txt) {
						this.can_click = true
						uni.hideLoading()
						return uni.$u.toast('请正确输入批量户号')
					}
					if (!this.activeMeal) {
						this.can_click = true
						uni.hideLoading()
						return uni.$u.toast('请选择充值金额')
					}

					this.$request('post', 'api/consumeRecharge/batchElectricityRecharge', {
						batch_data: this.numbers_txt,
						meal_id: this.activeMeal.id,
						meal_discount: this.activeMeal.discount,
						meal_discounted_price: this.activeMeal.discountedPrice,
						money: this.activeMeal.price
					}).then(res => {
						this.can_click = true
						uni.hideLoading()
						if (res.code) {
							uni.$u.toast(res.data.msg)
						} else {
							uni.$u.toast(res.msg)
						}
					})

				}

			},
			stringToLines(text, removeEmpty = true) {
				let lines = text.split(/\r?\n|\r/);
				if (removeEmpty) {
					lines = lines.filter(line => line.trim() !== '');
				}
				return lines;
			},
			getMealList() {
				uni.showLoading({
					title: '加载中',
					mask: true
				})
				this.$request('get', 'api/index/getMealElectricityList').then(res => {
					uni.hideLoading()
					if (res.code) {
						this.list = res.data.list
						this.activeMeal = this.list[0]
						this.reference_rate = res.data.reference_rate
					}
				})
			},
			choosePrice(e) {
				this.activeMeal = e
			},
			changeType() {
				if (this.type == 1) {
					this.type = 2
					uni.setNavigationBarTitle({
						title: '批量充值'
					})
				} else {
					this.type = 1
					this.numbers = []
					this.numbers_txt = ''
					uni.setNavigationBarTitle({
						title: '电费充值'
					})
				}
			},
			getNotice() {
				this.$request('get', 'api/notice/noticeList', {
					type: 3
				}).then(res => {
					if (res.code) {
						this.noticeList = res.data.data
						this.notice_today = !res.data.show
						this.notice_show = res.data.show && res.data.data.length != 0
					}
				})
			},
			checkboxGroupChange(e) {
				this.notice_today = e.includes('1')
			},
			noticeSubmit() {
				uni.showLoading({
					title: '加载中',
					mask: true
				})
				this.$request('post', 'api/notice/todayShow', {
					type: 3,
					show: this.notice_today ? 1 : 2
				}).then(res => {
					uni.hideLoading()
					this.notice_show = false
				})
			}
		}
	}
</script>

<style lang="scss">
	.uni-list-cell {
		margin-top: 10rpx;
		position: relative;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		background: #f6f7f9;
		font-weight: 400;
		font-size: 30rpx;
		width: 100%;
		border-radius: 12px;
	}

	.uni-list-cell-left {
		white-space: nowrap;
		font-size: 14px;
		padding: 0 15px;
		color: #B7BAC7;
	}

	.uni-list-cell-db,
	.uni-list-cell-right {
		flex: 1;
	}

	.uni-input {
		height: 25px;
		padding: 7px 12px;
		line-height: 25px;
		font-size: 14px;
		flex: 1;
		text-align: center;
	}
</style>