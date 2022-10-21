<script lang="ts">
	import Card from '@smui/card';
	import PrimaryButton from '$lib/button/PrimaryButton.svelte';
	import SecondaryButton from '$lib/button/SecondaryButton.svelte';

	export let displayName: string;
	export let timestamp: number;
	export let modifyCallback: () => void;
	export let deleteCallback: () => void;
</script>

<Card style="margin: 1rem 0.2rem;">
	<div class="data-name">{displayName}</div>
	<div class="last-modified">Updated at {new Date(timestamp).toLocaleString()}</div>
	<div class="buttons">
		<div style="margin: 0rem 0.2rem 0.6rem;">
			<PrimaryButton on:click={modifyCallback} label="修正" />
		</div>
		<div style="margin: 0rem 0.2rem 0.6rem;">
			<SecondaryButton on:click={deleteCallback} label="削除" />
		</div>
	</div>
</Card>

<style lang="scss">
	.data-name {
		margin: 0.8rem 1rem 0rem;
		font-size: larger;
		font-weight: bold;
		width: fit-content;
	}

	.buttons {
		padding: 0rem 0.5rem;
		display: flex;
		justify-content: flex-end;
	}

	.last-modified {
		font-size: small;
		font-weight: bold;
		color: gray;
		margin-right: auto;
		margin-left: 1rem;
	}
</style>
