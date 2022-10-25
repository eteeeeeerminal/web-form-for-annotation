<script lang="ts">
	import { onMount } from 'svelte';

	import AdminPage from '$lib/vtuber-onomatopoeia/components/admin-page/AdminPage.svelte';
	import { checkIsAdmin } from '$lib/api/database';
	import { currentUser } from '$lib/api/auth';

	let isAdmin: boolean | null = null;

	onMount(async () => {
		if ($currentUser) {
			isAdmin = await checkIsAdmin($currentUser.uid);
		}
	});
</script>

<div class="center">
	<div class="centered-item">
		{#if isAdmin == null}
			Loading...
		{:else if isAdmin}
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
