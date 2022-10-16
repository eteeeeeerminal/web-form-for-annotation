<script lang="ts">
	import Card from '@smui/card';
	import Button, { Label } from '@smui/button';

	export let displayName: string;
	export let timestamp: number;
	export let modifyCallback: () => void;
</script>

<Card style="margin: 1rem 0.2rem;">
	<div class="data-name">{displayName}</div>
	<div class="last-modified">Updated at {new Date(timestamp).toLocaleString()}</div>
	<div class="buttons">
		<Button style="margin: 0rem 0.2rem 0.6rem;" on:click={modifyCallback} variant="unelevated">
			<Label>修正</Label>
		</Button>
		// 削除ボタン予定地
	</div>
</Card>

<style lang="scss">
	.data-name {
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

	.last-modified {
		font-size: small;
		font-weight: bold;
		color: gray;
		margin-right: auto;
		margin-left: 1rem;
	}
</style>
