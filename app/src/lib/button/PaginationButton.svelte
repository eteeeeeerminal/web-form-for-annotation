<script lang="ts">
	import SecondaryButton from './SecondaryButton.svelte';
	export let name: string;
</script>

<div class="pagination">
	<SecondaryButton on:click label={name} />
</div>

<style lang="scss">
	.pagination {
		display: inline-block;
		width: 4.5rem;
		height: 2.5rem;
		margin: 0.2rem 0.6rem 1rem 0;
	}
</style>
