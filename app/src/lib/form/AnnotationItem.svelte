<script lang="ts">
	import Card from '@smui/card';
</script>

<Card style="margin: 0.2rem 0rem;">
	<div class="annotation-item">
		<slot />
	</div>
</Card>

<style lang="scss">
	.annotation-item {
		max-width: $form-item-width;
	}
</style>
