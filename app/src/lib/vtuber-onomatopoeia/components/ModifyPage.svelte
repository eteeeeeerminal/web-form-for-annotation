<script lang="ts">
	import type { DocumentData } from 'firebase/firestore';
	import UpdateLogCard from '$lib/modify/UpdateLogCard.svelte';
	import { getUserData } from '$lib/dataset/user-data';
	import { datasetId } from '$lib/vtuber-onomatopoeia/dataset/database';
	import VTuberForm from './vtuber-form/components/VTuberForm.svelte';

	const { annotationLog, getFormValue } = getUserData(datasetId);

	let modifyMode = false;
	let submitted = false;
	let selectedDataId = '';
	let initValues: DocumentData | undefined = undefined;

	// 編集中に submit されたら編集モード抜けたい
	$: modifyMode = modifyMode && !submitted;
</script>

{#if !modifyMode}
	<h2>回答履歴</h2>
	<p>ここに説明</p>

	{#if $annotationLog}
		{#each [...$annotationLog.log] as log}
			<UpdateLogCard
				displayName={log[1].displayName}
				timestamp={log[1].timestamp}
				modifyCallback={async () => {
					selectedDataId = log[0];
					submitted = false;
					const formValue = await getFormValue(selectedDataId);
					if (formValue == null) initValues = undefined;
					else initValues = formValue;
					modifyMode = true;
				}}
			/>
		{/each}
	{/if}
{:else if selectedDataId === 'common'}
	hoge
{:else}
	<VTuberForm vtuberId={selectedDataId} bind:submitted {initValues} />
{/if}
