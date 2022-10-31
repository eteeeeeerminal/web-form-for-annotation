<script lang="ts">
	import NgListItem from './NGListItem.svelte';

	export let ngDataList: NGDataLog[];
</script>

{#if ngDataList.length == 0}
	<p>スキップされたデータはありません。</p>
{/if}

<table class="ng-table">
	<tbody>
		{#each ngDataList as ngData}
			<NgListItem ngDataLog={ngData} />
		{/each}
	</tbody>
</table>

<style lang="scss">
	.ng-table {
		margin: 10px 0px;
		max-height: 600px;
		overflow-y: auto;
	}
</style>
