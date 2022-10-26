<script lang="ts">
	import { getContext } from 'svelte';
	import type { Modal } from 'svelte-simple-modal';

	import PrimaryButton from '$lib/button/PrimaryButton.svelte';
	import SecondaryButton from '$lib/button/SecondaryButton.svelte';
	import { getAllAnnotations } from '$lib/api/database';

	export let datasetId: string;

	const { close } = getContext('simple-modal') as Modal;
</script>

<p>アノテーションされたデータをすべてダウンロードします。</p>
<p><b><red>大量のデータをデータベースからダウンロードします。</red></b></p>

<PrimaryButton
	label="Export"
	on:click={async () => {
		const exports = await getAllAnnotations(datasetId);
		const blob = new Blob([JSON.stringify(exports, null, 2)], { type: 'application/json' });
		const url = URL.createObjectURL(blob);
		const a = document.createElement('a');
		document.body.appendChild(a);
		a.download = datasetId + '.json';
		a.href = url;
		a.click();
		a.remove();
		URL.revokeObjectURL(url);
		close();
	}}
/>
<SecondaryButton
	label="Cancel"
	on:click={() => {
		close();
	}}
/>
