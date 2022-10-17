<script lang="ts">
	import Title from '$lib/form/Title.svelte';
	import CommonForm from '$lib/vtuber-onomatopoeia/components/common-form/CommonForm.svelte';
	import VTuberFormPage from '$lib/vtuber-onomatopoeia/components/vtuber-form/VTuberFormPage.svelte';
	import { getUserData } from '$lib/dataset/user-data';
	import { datasetId } from '$lib/vtuber-onomatopoeia/dataset/database';

	const { annotationLog } = getUserData(datasetId);

	$: isSubmittedCommon = Boolean($annotationLog?.log.get('common'));
</script>

<div class="center">
	<div class="centered-item">
		<Title title="VTuberオノマトペ印象アノテーション" />
		{#if $annotationLog == null}
			Loading...
		{:else if isSubmittedCommon}
			<VTuberFormPage />
		{:else}
			<CommonForm bind:submitted={isSubmittedCommon} />
		{/if}
	</div>
</div>

<style lang="scss">
	.center {
		max-width: 95vw;
		margin: auto;
	}

	.centered-item {
		max-width: $form-item-width;
		margin: auto;
		display: block;
	}
</style>
