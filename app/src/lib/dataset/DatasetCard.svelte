<script lang="ts">
	import Card from '@smui/card';
	import Button, { Label } from '@smui/button';
	import { onMount } from 'svelte';
	import { checkIsAdmin } from '$lib/api/database';
	import { currentUser } from '$lib/api/auth';
	import { getUserData, getAnnotationNum } from '$lib/dataset/user-data';

	import PrimaryButton from '$lib/button/PrimaryButton.svelte';
	import SecondaryButton from '$lib/button/SecondaryButton.svelte';

	export let name: string;
	export let datasetId: string;
	export let version: string;

	const datasetUrl = '/dataset/' + datasetId;
	const modifyUrl = datasetUrl + '/modify';
	const adminUrl = datasetUrl + '/admin';
	const qAndAUrl = datasetUrl + '/QandA';
	const { annotationLog, annotationCounts, datasetStatus } = getUserData(datasetId);
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
	$: annotationNum = Math.max(getAnnotationNum($annotationLog)-1, 0); // common の分引く

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
			{#if $datasetStatus?.isOpen}
				<div class="button">
					<PrimaryButton href={datasetUrl} label="アノテーションする" />
				</div>
				<div class="button">
					<SecondaryButton href={modifyUrl} label="回答を修正する" />
				</div>
			{:else}
				<div class="button">
					<PrimaryButton label="アノテーション期間外です。" />
				</div>
			{/if}
		</div>
	{:else}
		<div class="warning">
			データセットが準備されていません。このフォームの管理者に問い合わせてください。
		</div>
	{/if}
	{#if lastModified}
		<div class="last-modified">Updated at {lastModified.toLocaleString()}</div>
		<div class="last-modified">回答数 {annotationNum} (現在の謝金 図書カード{Math.floor(annotationNum/6)*1000}円分。あと {6-annotationNum%6} 回答で謝金追加)</div>
	{/if}
	<Button href={qAndAUrl}><Label>Q and A ページ</Label></Button>
	{#if isAdmin}
		<Button href={adminUrl}><Label>管理者ページ</Label></Button>
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

	.button {
		margin: 0.6rem 0.2rem;
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
