<template>
	<view style="padding: 30rpx;">
		<mp-html :content="content" />
	</view>
</template>

<script>
	export default {
		data() {
			return {
				type: '',
				content: ''
			};
		},
		onLoad(options) {
			this.type = options.type
			this.getInfo()
		},
		methods: {
			getInfo() {
				uni.showLoading({
					title: '加载中',
					mask: true
				})
				this.$request('get', 'api/index/getPrivacy', {
					type: this.type
				}).then(res => {
					uni.hideLoading()
					if (res.code) {
						uni.setNavigationBarTitle({
							title: res.data.title
						});
						this.content = res.data.content
					}
				})
			}
		}
	}
</script>

<style lang="scss">

</style>