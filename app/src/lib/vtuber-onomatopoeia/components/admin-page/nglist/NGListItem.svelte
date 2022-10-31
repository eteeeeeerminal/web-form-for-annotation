<script lang="ts">
	import { getAnnotation } from '$lib/api/database';
	import SecondaryButton from '$lib/button/SecondaryButton.svelte';
	import { datasetId } from '$lib/vtuber-onomatopoeia/dataset/database';

	export let ngDataLog: NGDataLog;

	let expanded = false;
	let ngDataDetail: unknown | null = null;
</script>

<tr>
	<td>{ngDataLog.userId.slice(0, 4)}...</td>
	<td>{ngDataLog.displayName}</td>
	<td>{new Date(ngDataLog.timestamp).toLocaleString()}</td>
	<td>
		{#if expanded}
			<SecondaryButton
				label="閉じる"
				on:click={() => {
					expanded = false;
				}}
			/>
		{:else}
			<SecondaryButton
				label="詳細を表示"
				on:click={async () => {
					if (ngDataDetail == null) {
						ngDataDetail = await getAnnotation(datasetId, ngDataLog.userId, ngDataLog.dataId);
					}
					expanded = true;
				}}
			/>
		{/if}
	</td>
</tr>

<tr colspan="4">
	<td colspan="4">
		<div class="detail {expanded ? '' : 'hidden'}">
			{JSON.stringify(ngDataDetail, null, 2)}
		</div>
	</td>
</tr>

<style lang="scss">
	.detail {
		padding: 0.4rem;
		border: solid 1px gray;
		margin: 0.5rem;
	}

	.hidden {
		display: none;
	}
</style>
