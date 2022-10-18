<script lang="ts">
	import { getContext } from 'svelte';
	import type { Modal } from 'svelte-simple-modal';

	import UpdateLogCard from '$lib/modify/UpdateLogCard.svelte';
	import { getUserData } from '$lib/dataset/user-data';
	import { datasetId } from '$lib/vtuber-onomatopoeia/dataset/database';
	import VTuberForm from './vtuber-form/components/VTuberForm.svelte';
	import CommonForm from './common-form/CommonForm.svelte';
	import DeletePopup from '$lib/popup/DeletePopup.svelte';

	const { annotationLog, getFormValue, deleteFormValue } = getUserData(datasetId);

	let modifyMode = false;
	let submitted = false;
	let selectedDataId = '';
	let selectedDataTitle = '';
	let initValues: DBData | undefined = undefined;

	// 編集中に submit されたら編集モード抜けたい
	$: modifyMode = modifyMode && !submitted;

	const { open } = getContext('simple-modal') as Modal;
	const showDeletePopup = () =>
		open(DeletePopup, {
			title: selectedDataTitle,
			deleteCallback: () => {
				deleteFormValue(selectedDataId);
			},

			cancelCallback: () => {}
		});
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
				deleteCallback={async () => {
					selectedDataId = log[0];
					selectedDataTitle = log[1].displayName;
					showDeletePopup();
				}}
			/>
		{/each}
	{/if}
{:else if selectedDataId === 'common'}
	<CommonForm bind:submitted {initValues} />
{:else}
	<VTuberForm vtuberId={selectedDataId} bind:submitted {initValues} />
{/if}
