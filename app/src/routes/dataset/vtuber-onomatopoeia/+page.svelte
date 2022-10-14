<script lang="ts">
	import Title from '$lib/form/Title.svelte';
	import CommonForm from '$lib/vtuber-onomatopoeia/components/common-form/CommonForm.svelte';
	import VTuberForm from '$lib/vtuber-onomatopoeia/components/vtuber-form/VTuberForm.svelte';

	let isSubmittedCommon = false;
</script>

<div class="center">
	<div class="centered-item">
		<Title title="VTuberオノマトペ印象アノテーション" />
		{#if isSubmittedCommon}
			<VTuberForm />
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
