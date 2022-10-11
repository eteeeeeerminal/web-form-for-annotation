<script lang="ts">
	import { datasets } from './datasets';
	import DatasetCard from './DatasetCard.svelte';
</script>

{#each datasets as dataset}
	<DatasetCard {...dataset} />
{/each}
