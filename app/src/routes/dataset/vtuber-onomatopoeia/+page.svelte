<script lang="ts">
	import { currentUser } from '$lib/api/auth';
	import { getAnnotationCounts, getAnnotationLog } from '$lib/api/database';
	import Title from '$lib/form/title.svelte';
	import YouTubeVideo from '$lib/form/YouTubeVideo.svelte';
	import CommonForm from '$lib/vtuber-onomatopoeia/components/common-form/common-form.svelte';
	import { pickVtuber } from '$lib/vtuber-onomatopoeia/dataset/database';
	import { onMount } from 'svelte';

	const datasetName = 'vtuber-onomatopoeia';
	const commonAnsKey = 'common';

	// ちょっとこいつらの扱い合ってるかわからない
	let annotationCounts: AnnotationCounts | null;
	let annotationLog: AnnotationLog | null;

	let isLoaded = false;
	let isAnsweredCommon = false;

	onMount(async () => {
		if ($currentUser) {
			annotationCounts = await getAnnotationCounts(datasetName);
			annotationLog = await getAnnotationLog(datasetName, $currentUser.uid);
		}
		isLoaded = true;
	});

	$: isAnsweredCommon = Boolean(annotationLog?.get(commonAnsKey));

	let vtuber = pickVtuber();
	$: vtuberVideo = {
		videoId: vtuber.youtube.target_video.video_id,
		title: vtuber.youtube.target_video.title,
		uploaderName: vtuber.youtube.name,
		youtubeId: vtuber.youtube.channel_id,
		description: vtuber.youtube.target_video.description
	};
</script>

<div class="center">
	<div class="centered-item">
		<Title title="VTuberオノマトペ印象アノテーション" />
		{#if isLoaded}
			{#if isAnsweredCommon}
				// 編集ページは, 編集ページにいってhistoryが取得できなかったら回答がありませんを表記
				<YouTubeVideo {...vtuberVideo} />
				<button on:click={() => (vtuber = pickVtuber())}> 回答完了 </button>
			{:else}
				<CommonForm bind:annotationLog />
			{/if}
		{:else}
			<h3>ローディング中です......</h3>
		{/if}
	</div>
</div>

<style lang="scss">
	.center {
		display: flex;
		justify-content: center;
	}

	.centered-item {
		max-width: $form-item-width;
		padding: 5px;
	}
</style>
