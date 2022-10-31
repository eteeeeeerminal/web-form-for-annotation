<script lang="ts">
	import { datasetId, pickVtuber } from '$lib/vtuber-onomatopoeia/dataset/database';
	import VTuberForm from './components/VTuberForm.svelte';
	import { vtuberFormInitValues } from './components/init-values';
	import { getUserData } from '$lib/dataset/user-data';

	const { annotationLog, annotationCounts } = getUserData(datasetId);

	let submitted = false;
	let initValues = vtuberFormInitValues;

	let vtuberId = pickVtuber($annotationLog, $annotationCounts);
	$: if (submitted) {
		vtuberId = pickVtuber($annotationLog, $annotationCounts);
		submitted = false;
		initValues = vtuberFormInitValues;
	}
</script>

{#if vtuberId}
	<VTuberForm {vtuberId} bind:submitted {initValues} />
{:else}
	回答可能なものはありません。ご協力ありがとうございます。
{/if}
