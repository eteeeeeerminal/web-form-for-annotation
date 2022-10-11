<script lang="ts">
	import { currentUser } from '$lib/api/auth';
</script>

{#if $currentUser == null}
	<h2>操作を行うには右上よりサインイン、もしくはサインアップしてください……</h2>
{:else}
	<slot />
{/if}
