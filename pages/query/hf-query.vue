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
						<input type="text" placeholder="请输入手机号"
							placeholder-style="font-weight: 400;font-size: 30rpx;color: #B7BAC7;width: 100%" />
					</view>
				</view>
			</view>
			<view style="padding: 30rpx;">
				<view style="background: #3742C5;border-radius: 32rpx;font-weight: bold;font-size: 28rpx;color: #FFFFFF;text-align: center;height: 80rpx;
					line-height: 80rpx;">确认查询</view>
			</view>
			
		</view>
		<view v-else style="box-shadow: 0rpx 6rpx 32rpx 2rpx rgba(0,0,0,0.08);border-radius: 32rpx;position: relative;padding: 40rpx;">
			<view @click="changeType" style="width: 196rpx;height: 64rpx;background: #E5E6F8;border-radius: 0rpx 32rpx 0rpx 32rpx;position: absolute;top: 0;right: 0;
				font-weight: 400;font-size: 24rpx;color: #3742C5;text-align: center;line-height: 64rpx;">切换单个查询</view>
			<view style="display: flex;align-items: center;">
				<view>
					<image src="/static/hfczje.png" style="width: 27rpx;height: 27rpx;" mode=""></image>
				</view>
				<view style="margin-left: 6rpx;font-weight: 400;font-size: 24rpx;margin-top: -5rpx;">号码批量查询</view>
			</view>
			<view style="margin-top: 20rpx;">
				<view style="font-weight: 400;font-size: 28rpx;color: #C7CAD2;">当前已导入<span style="color: #000000;">0</span>个号码</view>
			</view>
			<view @click="pldr_show = true" style="margin-top: 40rpx;background: #3742C5;border-radius: 32rpx;font-weight: bold;font-size: 28rpx;color: #FFFFFF;text-align: center;height: 80rpx;
				line-height: 80rpx;">点击一键导入</view>
		</view>
		<view v-if="type == 1" style="margin-top: 40rpx;box-shadow: 0rpx 6rpx 32rpx 2rpx rgba(0,0,0,0.08);border-radius: 32rpx;">
			<view style="padding: 30rpx;display: flex;align-items: center;">
				<view style="font-weight: bold;font-size: 32rpx;">19999923220</view>
				<view style="margin-left: 32rpx;width: 144rpx;height: 54rpx;background: #E5E6F8;border-radius: 20rpx 0rpx 20rpx 0rpx;font-weight: 500;
					font-size: 26rpx;color: #3742C5;text-align: center;line-height: 54rpx;">安徽移动</view>
			</view>
			<view style="width: 100%;height: 1rpx;background-color: #F2F2F2;"></view>
			<view style="padding: 30rpx;">
				<view style="font-weight: bold;font-size: 32rpx;color: #3742C5;width: 100%;text-align: center;">当前余额：594.80</view>
				<view v-for="(item, index) in 6" :key="index" style="margin-top: 42rpx;display: flex;justify-content: space-between;align-items: center;">
					<view style="font-weight: 400;font-size: 28rpx;color: #757B8C;">2025-03-23 13:22</view>
					<view style="font-weight: bold;font-size: 28rpx;">￥ 294.80</view>
				</view>
			</view>
		</view>
		<view v-if="type == 2" style="padding: 30rpx;margin-top: 40rpx;">
			<view v-for="(item, index) in 8" :key="index" style="font-weight: 400;font-size: 28rpx;color: #757B8C;margin-bottom: 52rpx;">19999992520 湖北移动</view>
			<view style="margin-top: 92rpx;height: 80rpx;background: #3742C5;border-radius: 32rpx;font-weight: bold;font-size: 28rpx;color: #FFFFFF;
				text-align: center;line-height: 80rpx;">确认查询</view>
		</view>
		
		
		
		<u-popup :show="pldr_show" mode="center" :round="32" :closeable="true" @close="pldr_show = false">
			<view style="width: 560rpx;background: white;border-radius: 32rpx;">
				<view style="height: 78rpx;background: #E3E8FF;border-radius: 32rpx 32rpx 0rpx 0rpx;font-weight: bold;font-size: 30rpx;line-height: 78rpx;text-align: center;">
					输入框
				</view>
				<view style="padding: 34rpx;">
					<view style="padding: 30rpx;background: #F6F7F9;border-radius: 32rpx;">
						<u-textarea v-model="numbers" border="none" style="font-weight: 400;font-size: 28rpx;background-color: #F6F7F9;" autoHeight height="204rpx" placeholder="请输入..." placeholder-style="font-weight: 400;font-size: 28rpx;color: #A9ABB6;" ></u-textarea>
					</view>
					<view style="width: 100%;text-align: center;margin-top: 32rpx;font-weight: 400;font-size: 24rpx;color: #757B8C;">注：多个号码请换行隔开，一行填写一个号码</view>
					<view style="display: flex;justify-content: center;margin-top: 40rpx;">
						<view style="width: 260rpx;height: 80rpx;background: #3742C5;border-radius: 18rpx;font-weight: bold;font-size: 28rpx;color: #FFFFFF;text-align: center;
							line-height: 80rpx;">确定</view>
					</view>
				</view>
			</view>
		</u-popup>
		<nav-bar :nav-index="0"/>
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
				pldr_show: false,
				numbers: ''
			};
		},
		onLoad() {
			
		},
		methods: {
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
			}
		}
	}
</script>

<style lang="scss">

</style>
