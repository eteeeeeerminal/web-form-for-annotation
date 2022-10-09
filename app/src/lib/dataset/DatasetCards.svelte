<script lang="ts">
	import { datasets } from './datasets';
	import DatasetCard from './DatasetCard.svelte';
</script>

{#each datasets as dataset}
	<DatasetCard name={dataset.name} datasetId={dataset.datasetId} />
{/each}
