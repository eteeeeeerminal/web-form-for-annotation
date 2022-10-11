<script lang="ts">
	import { onMount } from 'svelte';
	import { currentUser } from '$lib/api/auth';
	import { getAnnotationCounts, getAnnotationLog } from '$lib/api/database';
	import Title from '$lib/form/Title.svelte';
	import CommonForm from '$lib/vtuber-onomatopoeia/components/common-form/CommonForm.svelte';
	import VTuberForm from '$lib/vtuber-onomatopoeia/components/vtuber-form/VTuberForm.svelte';

	const datasetName = 'vtuber-onomatopoeia';
	const commonAnsKey = 'common';

	// ちょっとこいつらの扱い合ってるかわからない
	let annotationCounts: AnnotationCounts | null;
	let annotationLog: AnnotationLog | null;

	let isLoaded = false;
	let isAnsweredCommon = false;

	onMount(async () => {
		if ($currentUser) {
			annotationCounts = await getAnnotationCounts(datasetName);
			annotationLog = await getAnnotationLog(datasetName, $currentUser.uid);
		}
		isLoaded = true;
	});

	$: isAnsweredCommon = Boolean(annotationLog?.get(commonAnsKey));
</script>

<div class="center">
	<div class="centered-item">
		<Title title="VTuberオノマトペ印象アノテーション" />
		{#if isLoaded}
			{#if isAnsweredCommon}
				<VTuberForm bind:annotationLog bind:annotationCounts />
			{:else}
				<CommonForm bind:annotationLog />
			{/if}
		{:else}
			<h3>ローディング中です......</h3>
		{/if}
	</div>
</div>

<style lang="scss">
	.center {
		display: flex;
		justify-content: center;
	}

	.centered-item {
		max-width: $form-item-width;
		padding: 5px;
	}
</style>
