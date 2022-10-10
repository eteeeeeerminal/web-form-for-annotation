<script lang="ts">
	import Card from '@smui/card';
</script>

<Card style="margin: 1rem 0.2rem; overflow: hidden">
	<div class="annotation-item">
		<slot />
	</div>
</Card>

<style lang="scss">
	.annotation-item {
		max-width: 640px;
		width: 100vw;
	}
</style>
