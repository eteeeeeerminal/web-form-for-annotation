<script lang="ts">
	import Card from '@smui/card';
	import Button, { Label } from '@smui/button';
	import { onMount } from 'svelte';
	import { checkIsAdmin, updateDataset } from '$lib/api/database';
	import { currentUser } from '$lib/api/auth';
	import { getUserData } from '$lib/dataset/user-data';

	export let name: string;
	export let datasetId: string;
	export let version: string;

	const datasetUrl = '/dataset/' + datasetId;
	const modifyUrl = datasetUrl + '/modify';
	const { annotationLog, annotationCounts } = getUserData(datasetId);
	let readyDataset = false;
	let isAdmin = false;
	let lastModified: Date | null = null;

	const getLastModified = (log: AnnotationLog | null) => {
		if (log == null || log.log.size == 0) return null;
		const lastModifiedTime = log.log.values().next().value.timestamp;
		return new Date(lastModifiedTime);
	};

	$: readyDataset = Boolean($annotationCounts);
	$: lastModified = getLastModified($annotationLog);

	onMount(async () => {
		// これだと, dataset 一覧ページでログイン状態変化するとまずそうだけど
		// そもそも, ログアウトしてるとすぐにトップページへリダイレクトされるので問題なし
		// 普通に $: ~ で書くとasyncまわりがめんどい
		if ($currentUser) {
			isAdmin = await checkIsAdmin($currentUser.uid);
		}
	});
	// 解答にもバージョンを表記するようにしたい
</script>

<Card style="margin: 1rem 0.2rem;">
	<div class="dataset-name">{name} v{version}</div>
	{#if readyDataset}
		<div class="buttons">
			<Button
				style="margin: 0.6rem 0.2rem"
				href={datasetUrl}
				color="secondary"
				variant="unelevated"
			>
				<Label>アノテーションする</Label>
			</Button>
			<Button style="margin: 0.6rem 0.2rem;" href={modifyUrl} variant="unelevated">
				<Label>回答を修正する</Label>
			</Button>
		</div>
	{:else}
		<div class="warning">
			データセットが準備されていません。このフォームの管理者に問い合わせてください。
		</div>
	{/if}
	{#if lastModified}
		<div class="last-modified">Updated at {lastModified.toLocaleString()}</div>
	{/if}
	{#if isAdmin}
		<Button
			on:click={async () => {
				await updateDataset(datasetId);
				location.reload();
			}}
			variant="unelevated"
		>
			<Label>{readyDataset ? 'データセットを更新' : 'データセットを準備'}</Label>
		</Button>
	{/if}
</Card>

<style lang="scss">
	.dataset-name {
		margin: 0.8rem 1rem 0rem;
		font-size: larger;
		font-weight: bold;
		width: fit-content;
	}

	.last-modified {
		font-size: small;
		font-weight: bold;
		color: gray;
		margin-right: 1rem;
		margin-left: auto;
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
