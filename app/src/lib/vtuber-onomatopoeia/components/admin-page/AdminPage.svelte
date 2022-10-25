<script lang="ts">
	// 回答状況一覧表示
	// 締め切る / 募集開始 ボタン
	// データのダウンロード実装
	// ng データ一覧取得して表示ボタン

	import { getUserData } from '$lib/dataset/user-data';
	import { updateDataset } from '$lib/api/database';
	import AnnotationFormItem from '$lib/form/AnnotationFormItem.svelte';
	import PrimaryButton from '$lib/button/PrimaryButton.svelte';
	import { datasetId } from '$lib/vtuber-onomatopoeia/dataset/database';

	const { annotationLog, annotationCounts } = getUserData(datasetId);

	$: readyDataset = Boolean($annotationCounts);
</script>

<AnnotationFormItem>
	<PrimaryButton
		label={readyDataset ? 'データセットを更新' : 'データセットを準備'}
		on:click={async () => {
			await updateDataset(datasetId);
			location.reload();
		}}
	/>
</AnnotationFormItem>
