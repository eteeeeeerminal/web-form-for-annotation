<script lang="ts">
	import AdminPage from '$lib/vtuber-onomatopoeia/components/admin-page/AdminPage.svelte';
	import { datasetId } from '$lib/vtuber-onomatopoeia/dataset/database';
	import { getUserData } from '$lib/dataset/user-data';
	const { isAdmin } = getUserData(datasetId);

</script>

<div class="center">
	<div class="centered-item">
		{#if $isAdmin == null}
			Loading...
		{:else if $isAdmin}
			<AdminPage />
		{:else}
			<h2>管理者以外は表示できません。</h2>
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
