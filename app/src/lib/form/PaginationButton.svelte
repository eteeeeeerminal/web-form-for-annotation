<script lang="ts">
	import Button from '@smui/button';
	export let name: string;
</script>

<div class="pagination">
	<Button style="width: 100%; height: 100%" color="primary" variant="unelevated">
		<div>{name}</div>
	</Button>
</div>

<style lang="scss">
	.pagination {
		display: inline-block;
		width: 4.5rem;
		height: 2.5rem;
		margin: 0.2rem 0.6rem 1rem 0;
	}
</style>
