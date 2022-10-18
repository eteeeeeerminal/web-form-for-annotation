<script lang="ts">
	import { ValidationMessage } from '@felte/reporter-svelte';

	export let name: string;
</script>

<ValidationMessage for={name} let:messages>
	<ul class="error-list">
		{#if Array.isArray(messages)}
			{#each messages as message}
				<li>{message}</li>
			{/each}
		{:else if messages != null}
			<li>{messages}</li>
		{/if}
	</ul>
</ValidationMessage>

<style lang="scss">
	.error-list {
		list-style: '* ';
		color: $accent-color;
		font-weight: bold;
	}
</style>
