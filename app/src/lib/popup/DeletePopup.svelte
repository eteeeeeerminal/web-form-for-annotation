<script lang="ts">
	import { getContext } from 'svelte';
	import type { Modal } from 'svelte-simple-modal';

	import PrimaryButton from '$lib/button/PrimaryButton.svelte';
	import SecondaryButton from '$lib/button/SecondaryButton.svelte';

	export let title: string;
	export let deleteCallback: () => {};
	export let cancelCallback: () => {};

	const { close } = getContext('simple-modal') as Modal;
</script>

<p>本当に削除しますか？</p>
<p>削除対象: {title}</p>

<PrimaryButton
	label="削除する"
	on:click={() => {
		deleteCallback();
		close();
	}}
/>
<SecondaryButton
	label="削除しない"
	on:click={() => {
		cancelCallback();
		close();
	}}
/>
