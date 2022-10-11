<script lang="ts">
	import Card, { Actions } from '@smui/card';
	import Button, { Label } from '@smui/button';
	import { onMount } from 'svelte';
	import { existsAnnotationCounts } from '$lib/api/database';

	export let name: string;
	export let datasetId: string;

	const datasetUrl = '/dataset/' + datasetId;
	let readyDataset = false;

	onMount(async () => {
		readyDataset = await existsAnnotationCounts(datasetId);
	});

	// データがあれば次に最後に回答した日時を取得
	// DataSetにバージョン表記を追加
	// 解答にもバージョンを表記するようにしたい
	// admin だったら, データレコード作ってanswercount 数える部分作成
</script>

<Card style="margin: 1rem 0.2rem;">
	<div class="dataset-name">{name}</div>
	{#if readyDataset}
		<div class="buttons">
			<Button style="margin: 0.6rem 0.2rem" href={datasetUrl} variant="unelevated">
				<Label>アノテーションする</Label>
			</Button>
			<Button style="margin: 0.6rem 0.2rem;" color="secondary" variant="unelevated">
				<Label>回答を修正する</Label>
			</Button>
		</div>
	{:else}
		<div class="warning">
			データセットが準備されていません。このフォームの管理者に問い合わせてください。
		</div>
	{/if}
</Card>

<style lang="scss">
	.dataset-name {
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

	.warning {
		color: red;
		margin: 0.2rem 1rem 0.5rem;
	}
</style>
