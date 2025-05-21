<template>
	<view style="width: 100%;">
		<view style="height: 20rpx;background-color: white;"></view>
		<view>
			<v-tabs v-model="activeTab" :lineScale="0.25" height="80rpx" activeColor="#3742C5" lineColor="#3742C5"
				:scroll="false" :tabs="['直邀好友', '间接好友', '三级好友']" @change="changeTab"></v-tabs>
		</view>
		<view style="padding: 25rpx;display: flex;justify-content: space-between;font-size: 24rpx;color: #A9ABB6;">
			<view>
				<span v-if="activeTab == 0">直邀好友</span>
				<span v-if="activeTab == 1">间接好友</span>
				<span v-if="activeTab == 2">三级好友</span>
				<span style="color: #EB8E26;">{{list.length}}</span>人
			</view>
			<view style="display: flex;">
				<view>今日收益 <span style="color: black;margin-left: 10rpx;">{{todayTotal ? todayTotal : '0.00'}}Y币</span>
				</view>
				<view style="margin-left: 20rpx;">总收益 <span
						style="color: black;margin-left: 10rpx;">{{total ? total : '0.00'}}Y币</span></view>
			</view>
		</view>
		<view
			style="margin-bottom: 20rpx;padding: 30rpx;display: flex;justify-content: space-between;background-color: white;"
			v-for="(item, index) in list" :key="index">
			<view style="display: flex;">
				<view style="width: 76rpx;height: 76rpx;">
					<image :src="item.avatar" style="width: 100%;height: 100%;border-radius: 100rpx;" mode=""></image>
				</view>
				<view style="margin-left: 20rpx;">
					<view style="font-weight: bold;font-size: 28rpx;">{{item.nickname}}</view>
					<view style="font-weight: 500;font-size: 24rpx;color: #A9ABB6;margin-top: 10rpx;">
						{{item.create_time}}
					</view>
				</view>
			</view>
			<view style="display: flex;justify-content: space-around;">
				<view style="text-align: center;">
					<view style="font-weight: 500;font-size: 24rpx;color: #A9ABB6;">今日收益</view>
					<view style="font-weight: 500;font-size: 24rpx;color: #3742C5;margin-top: 10rpx;">
						{{item.xjTodayTotal}}
					</view>
				</view>
				<view style="text-align: center;margin-left: 45rpx;margin-right: 45rpx;">
					<view style="font-weight: 500;font-size: 24rpx;color: #A9ABB6;">总收益</view>
					<view style="font-weight: 500;font-size: 24rpx;color: #3742C5;margin-top: 10rpx;">{{item.xjTotal}}
					</view>
				</view>
				<view v-if="activeTab == 0" style="text-align: center;">
					<view style="font-weight: 500;font-size: 24rpx;color: #A9ABB6;">折扣</view>
					<view @click="discountSet(item.id, item.nickname)"
						style="font-weight: 500;font-size: 24rpx;color: #EB8E26;margin-top: 10rpx;">设置</view>
				</view>
			</view>
		</view>
		<view v-if="list.length == 0" style="margin-top: 100rpx;">
			<u-empty mode="list" />
		</view>

		<u-popup :show="setModleShow" mode="center" :round="32" :closeable="true" @close="setModleShow = false">
			<view style="width: 560rpx;background: white;border-radius: 32rpx;">
				<view
					style="height: 78rpx;background: #E3E8FF;border-radius: 32rpx 32rpx 0rpx 0rpx;font-weight: bold;font-size: 30rpx;line-height: 78rpx;text-align: center;">
					设置折扣：{{ userName }}
				</view>
				<view style="padding: 34rpx;">
					<view v-for="(item, index) in mealList" :key="index">
						<view style="font-weight: 400;font-size: 24rpx;margin-top: 26rpx;margin-left: 10rpx;">
							{{ item.name }}（{{ item.type }}）
						</view>
						<view style="padding: 15rpx;background: #F6F7F9;border-radius: 32rpx;">
							<input v-model="item.discount" type="text" placeholder="请输入折扣"
								placeholder-style="font-weight: 400;font-size: 30rpx;color: #B7BAC7;width: 100%" />
						</view>
					</view>
					<view style="display: flex;justify-content: center;margin-top: 40rpx;">
						<view @click="confirmSubmit"
							style="width: 260rpx;height: 80rpx;background: #3742C5;border-radius: 18rpx;font-weight: bold;font-size: 28rpx;color: #FFFFFF;text-align: center;line-height: 80rpx;">
							确定
						</view>
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
				activeTab: 0,
				list: [],
				todayTotal: '',
				total: '',
				setModleShow: false,
				userId: '',
				userName: '',
				mealList: [],
				canClick: true
			};
		},
		onLoad(options) {
			if (options.type) {
				this.activeTab = parseInt(options.type)
			}
			this.getList()
		},
		methods: {
			getList() {
				uni.showLoading({
					title: '加载中',
					mask: true
				})
				this.$request('get', 'api/user/getFriendList', {
					type: this.activeTab
				}).then(res => {
					uni.hideLoading()
					if (res.code) {
						this.list = res.data.list
						this.todayTotal = res.data.todayTotal
						this.total = res.data.total
					}
				})
			},
			changeTab(e) {
				this.activeTab = e
				this.getList()
			},
			discountSet(id, name) {
				this.userId = id,
				this.userName = name

				uni.showLoading({
					title: '正在获取配置中',
					mask: true
				})

				this.$request('get', 'api/user/getFriendMealList', {
					user_id: this.userId,
				}).then(res => {
					uni.hideLoading()
					if (res.code) {
						this.setModleShow = true
						this.mealList = res.data
					} else {
						uni.$u.toast(res.msg)
					}
				})
			},
			confirmSubmit() {
				if (this.canClick === false) {
					return uni.$u.toast('正在设置中...')
				}
				this.canClick = false
				uni.showLoading({
					title: '正在设置中',
					mask: true
				})

				if (!this.userId) {
					this.canClick = true
					uni.hideLoading()
					return uni.$u.toast('请正确选择用户')
				}
				if (!this.mealList) {
					this.canClick = true
					uni.hideLoading()
					return uni.$u.toast('请正确输入折扣')
				}

				let newList = []
				for (var value of this.mealList) {
					newList.push({
						'id': value.id,
						'discount': value.discount
					})
				}

				this.$request('post', 'api/user/setFriendDiscount', {
					user_id: this.userId,
					list: JSON.stringify(newList)
				}).then(res => {
					this.canClick = true
					uni.hideLoading()
					if (res.code) {
						uni.$u.toast('设置成功')
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