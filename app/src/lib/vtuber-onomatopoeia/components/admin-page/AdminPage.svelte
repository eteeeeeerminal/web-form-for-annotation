<script lang="ts">
	import { getUserData } from '$lib/dataset/user-data';
	import { updateDataset } from '$lib/api/database';
	import AnnotationFormItem from '$lib/form/AnnotationFormItem.svelte';
	import PrimaryButton from '$lib/button/PrimaryButton.svelte';
	import { datasetId } from '$lib/vtuber-onomatopoeia/dataset/database';
	import Title from '$lib/form/Title.svelte';

	const { annotationCounts, fetch } = getUserData(datasetId);

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

	$: readyDataset = Boolean($annotationCounts);
	$: counts = shapeCounts($annotationCounts);
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
</AnnotationFormItem>

<AnnotationFormItem>ngデータ一覧取得ボタン/ ngデータ一覧</AnnotationFormItem>

<AnnotationFormItem>
	締め切り/募集開始ボタン
	<PrimaryButton
		label={readyDataset ? 'データセットを更新' : 'データセットを準備'}
		on:click={async () => {
			await updateDataset(datasetId);
			location.reload();
		}}
	/>
	データのダウンロードボタン
</AnnotationFormItem>
