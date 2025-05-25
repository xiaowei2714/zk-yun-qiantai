<template>
	<view style="padding: 30rpx;">
		<view @click="detail(item.id)" v-for="(item, index) in list" :key="index">
			<view
				style="margin-top: 30rpx;font-weight: 400;font-size: 24rpx;color: #A9ABB6;width: 100%;text-align: center;">
				{{ item.ctime }}
			</view>
			<view style="margin-top: 28rpx;border: 2rpx solid #B7BAC7;border-radius: 32rpx;">
				<view style="padding: 30rpx;">
					<view style="font-weight: bold;font-size: 30rpx;">{{ item.title }}</view>
					<view style="margin-top: 22rpx;font-weight: 400;font-size: 24rpx;color: #A9ABB6;">
						{{ item.content }}
					</view>
				</view>
				<view style="width: 100%;height: 1rpx;background-color: #f4f4f4;"></view>
				<view style="padding: 30rpx;display: flex;justify-content: space-between;align-items: center;">
					<view style="font-weight: 400;font-size: 24rpx;color: #A9ABB6;">{{ item.time }}</view>
					<view style="display: flex;align-items: center;">
						<view style="font-weight: 400;font-size: 24rpx;color: #A9ABB6;">查看详情</view>
						<view style="margin-left: 10rpx;margin-top: 1rpx;">
							<image src="/static/tk-right.png" style="width: 26rpx;height: 26rpx;" mode=""></image>
						</view>
					</view>
				</view>
			</view>
		</view>
		
		<!-- 加载更多 -->
		<u-loadmore v-if="list.length != 0" :status="load_status" @loadmore="loadMoreData"
			style="margin-top: 35rpx;"></u-loadmore>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				type: 1,
				list: [],
				last_id: '',
				load_status: 'loadmore',
			};
		},
		onLoad(options) {
			this.type = options.type
			this.getList()
		},
		methods: {
			getList(loadMore = false) {
				uni.showLoading({
					title: '加载中',
					mask: true
				})
				this.$request('get', 'api/notice/listByUser', {
					type: this.type,
					last_id: this.last_id
				}).then(res => {
					uni.hideLoading()
					if (res.code) {
						if (res.data.list.length == 0) {
							this.load_status = 'nomore'
							return
						}
						
						this.last_id = res.data.last_id
						this.load_status = res.data.last_id != '' ? 'loadmore' : 'nomore'
						if (!loadMore) {
							this.list = res.data.list
						} else {
							for (const tmp of res.data.list) {
								this.list.push(tmp)
							}
						}
					}
				})
			},
			loadMoreData() {
				this.load_status = 'loading';
				this.getList(true)
			},
			detail(id) {
				uni.navigateTo({
					url: '/pages/index/notice-detail?id=' + id + '&type=' + this.type
				})
			},
		}
	}
</script>

<style lang="scss">

</style>