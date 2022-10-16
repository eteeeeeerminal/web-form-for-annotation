<script lang="ts">
	import UpdateLogCard from '$lib/modify/UpdateLogCard.svelte';
	import { getUserData } from '$lib/dataset/user-data';
	import { datasetId } from '$lib/vtuber-onomatopoeia/dataset/database';

	const { annotationLog } = getUserData(datasetId);

	let modifyMode = false;
	let submitted = false;
	let selectedDataId = '';

	// 編集中に submit されたら編集モード抜けたい
	$: modifyMode = modifyMode && !submitted;
</script>

// common だけとっぷ あとは新しい順にvtuberの履歴並べる common を押したときはtrue渡しながら...
vtuber は dataid と true 渡して...

{#if !modifyMode}
	<h2>回答履歴</h2>
	<p>ここに説明</p>

	{#if $annotationLog}
		{#each [...$annotationLog.log] as log}
			<UpdateLogCard
				displayName={log[1].displayName}
				timestamp={log[1].timestamp}
				modifyCallback={() => {
					selectedDataId = log[0];
					submitted = false;
					modifyMode = true;
				}}
			/>
		{/each}
	{/if}
{:else if selectedDataId === 'common'}
	hoge
{:else}
	fuga
{/if}
