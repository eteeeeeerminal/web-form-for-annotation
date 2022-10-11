<script lang="ts">
	import Card from '@smui/card';
</script>

<Card style="margin: 0.5rem 0rem; overflow: hidden">
	<div class="annotation-item">
		<slot />
	</div>
</Card>

<style lang="scss">
	.annotation-item {
		width: 640px;
	}
</style>
