<script lang="ts">
	import { getContext } from 'svelte';
	import type { Modal } from 'svelte-simple-modal';

	import { getUserData } from '$lib/dataset/user-data';
	import { getNGList, updateDataset } from '$lib/api/database';
	import AnnotationFormItem from '$lib/form/AnnotationFormItem.svelte';
	import PrimaryButton from '$lib/button/PrimaryButton.svelte';
	import { datasetId } from '$lib/vtuber-onomatopoeia/dataset/database';
	import Title from '$lib/form/Title.svelte';
	import NgList from './nglist/NGList.svelte';
	import ExportPopup from './ExportPopup.svelte';

	const {
		annotationCounts,
		datasetStatus,
		fetch,
		openDataset,
		closeDataset,
		updateAnnotationCounts
	} = getUserData(datasetId);

	const shapeCounts = (counts: AnnotationCounts | null) => {
		if (counts == null) return null;
		const ret = new Map();
		counts.forEach((value) => {
			if (ret.has(value)) {
				ret.set(value, ret.get(value) + 1);
			} else {
				ret.set(value, 1);
			}
		});
		return ret;
	};

	let ngListExpanded = false;
	let ngList: NGDataLog[] = [];

	$: readyDataset = Boolean($annotationCounts);
	$: counts = shapeCounts($annotationCounts);

	const { open } = getContext('simple-modal') as Modal;
	const showExportPopup = () => open(ExportPopup, { datasetId });
</script>

<Title title="VTuberオノマトペアノテーションの管理者フォーム" />

<AnnotationFormItem>
	<h4>回答状況一覧</h4>
	<p>
		データ総数: {$annotationCounts?.size}
		{#if counts}
			<br />
			アノテーションされた回数: データ数 <br />
			{#each [...counts] as count}
				{count[0]}回: {count[1]}<br />
			{/each}
		{/if}
	</p>
	<PrimaryButton label="更新" on:click={fetch} />
	<PrimaryButton label="数え直す" on:click={updateAnnotationCounts} />
</AnnotationFormItem>

<AnnotationFormItem>
	{#if $datasetStatus?.isOpen}
		<PrimaryButton label="アノテーションを締め切る" on:click={closeDataset} />
	{:else}
		<PrimaryButton label="アノテーションを開始する" on:click={openDataset} />
	{/if}
	<PrimaryButton
		label={readyDataset ? 'データセットを更新' : 'データセットを準備'}
		on:click={async () => {
			await updateDataset(datasetId);
			location.reload();
		}}
	/>
	<PrimaryButton label="EXPORT" on:click={showExportPopup} />
</AnnotationFormItem>

<AnnotationFormItem>
	<h4>スキップされたデータ一覧</h4>
	{#if ngListExpanded}
		<NgList ngDataList={ngList} />

		<PrimaryButton
			label="リストの更新"
			on:click={async () => {
				ngList = await getNGList(datasetId);
			}}
		/>
	{:else}
		<button
			style="font-size: small; color: gray: display: block; border: none; background: none;"
			on:click={async () => {
				ngListExpanded = true;
				ngList = await getNGList(datasetId);
			}}
		>
			リストを読み込む
		</button>
	{/if}
</AnnotationFormItem>
