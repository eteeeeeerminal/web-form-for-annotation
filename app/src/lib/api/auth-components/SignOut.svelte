<script lang="ts">
	import { signOut } from '$lib/api/auth';
</script>

<button on:click={signOut}>sign out</button>
