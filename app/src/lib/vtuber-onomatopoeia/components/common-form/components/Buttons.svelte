<script lang="ts">
	import SubmitButton from '$lib/button/SubmitButton.svelte';
	import PaginationButton from '$lib/button/PaginationButton.svelte';

	export let pageNum: number;
	export let pageMax: number;
	export let onSubmit: () => void;
</script>

{#if pageNum > 0}
	<PaginationButton
		name="戻る"
		on:click={() => {
			pageNum--;
			if (window != null) {
				window.scroll({ top: 0, behavior: 'smooth' });
			}
		}}
	/>
{/if}
{#if pageNum < pageMax}
	<PaginationButton
		name="次へ"
		on:click={() => {
			pageNum++;
			if (window != null) {
				window.scroll({ top: 0, behavior: 'smooth' });
			}
		}}
	/>
{/if}
{#if pageNum == pageMax}
	<SubmitButton on:click={onSubmit} />
{/if}
