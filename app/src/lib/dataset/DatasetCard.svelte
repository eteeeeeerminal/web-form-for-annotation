<script lang="ts">
	import Card, { Actions } from '@smui/card';
	import Button, { Label } from '@smui/button';

	export let name: string;
	export let datasetId: string;

	const datasetUrl = '/dataset/' + datasetId;
	// データセットを叩いて存在確認
	// データがあれば次に最後に回答した日時を取得
</script>

<Card style="margin: 1rem 0.2rem;">
	<div class="dataset-name">{name}</div>
	<div class="buttons">
		<Button style="margin: 0.6rem 0.2rem" href={datasetUrl} variant="unelevated">
			<Label>アノテーションする</Label>
		</Button>
		<Button style="margin: 0.6rem 0.2rem;" color="secondary" variant="unelevated">
			<Label>回答を修正する</Label>
		</Button>
	</div>
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
</style>
