<template>
	<div class="progressslider-wrapper" @touchstart="handleTouchStart" @touchend="handleTouchEnd" @touchcancel="handleTouchEnd">
		<div class="progressslider-track"></div>
		<div class="progressslider-fill" :style="wStyle"></div>
		<div class="progressslider-thumb" :style="lStyle"></div>
	</div>
</template>

<script type="text/ecmascript-6">
	export default {
		props: {
			mwidth: {
				type: Number
			}
		},
		data() {
			return {
				mymwidth: this.mwidth,
				wStyle: {
					width: '0%'
				},
				lStyle: {
					left: '0%'
				},
				disabled: false
			};
		},
		watch: {
			mwidth(val) {
				this.mymwidth = val;
				this.wStyle.width = val + '%';
				this.lStyle.left = val + '%';
			}
		},
		methods: {
			handleTouchStart(e) {
				if(this.disabled) return;
				this.setValue(e.touches[0]);
				document.addEventListener('touchmove', this.handleTouchMove);
				document.addEventListener('touchup', this.handleTouchEnd);
				document.addEventListener('touchend', this.handleTouchEnd);
				document.addEventListener('touchcancel', this.handleTouchEnd);
				e.preventDefault();
			},
			handleTouchEnd(e) {
				if(this.disabled) return;
				document.removeEventListener('touchmove', this.handleTouchMove);
				document.removeEventListener('touchup', this.handleTouchEnd);
				document.removeEventListener('touchend', this.handleTouchEnd);
				document.removeEventListener('touchcancel', this.handleTouchEnd);
			},
			handleTouchMove(e) {
				this.setValue(e.touches[0]);
			},
			setValue(e) {
				let value = (e.clientX - this.$el.getBoundingClientRect().left) / this.$el.offsetWidth * 100;
				value = parseFloat(value.toFixed(5));
				console.log(value);
				if(value > 100) {
					value = 100;
				} else if(value < 0) {
					value = 0;
				}
				this.mymwidth = value;
				this.$emit('change', value);
			}
		}
	};
</script>
<style>

</style>