<script lang="ts">
	import { goto } from '$app/navigation';
	import { currentUser } from '$lib/api/auth';
	import { onMount } from 'svelte';

	onMount(() => {
		if ($currentUser == null) {
			goto('/');
		}
	});
</script>

{#if $currentUser == null}
	<h2>トップページへリダイレクトします…</h2>
{:else}
	<slot />
{/if}
