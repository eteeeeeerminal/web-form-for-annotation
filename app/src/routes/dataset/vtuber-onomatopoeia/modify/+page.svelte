<script lang="ts">
	import ModifyPage from '$lib/vtuber-onomatopoeia/components/ModifyPage.svelte';
	import { getUserData } from '$lib/dataset/user-data';
	import { datasetId } from '$lib/vtuber-onomatopoeia/dataset/database';
	const { datasetStatus } = getUserData(datasetId);
</script>

<div class="center">
	<div class="centered-item">
		{#if $datasetStatus?.isOpen}
			<ModifyPage />
		{:else}
			<h2>アノテーション期間外です。</h2>
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
