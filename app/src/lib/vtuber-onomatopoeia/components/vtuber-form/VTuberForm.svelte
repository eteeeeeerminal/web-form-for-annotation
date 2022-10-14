<script lang="ts">
	import { pickVtuber } from '$lib/vtuber-onomatopoeia/dataset/database';
	import YouTubeVideo from '$lib/form/YouTubeVideo.svelte';

	let vtuber = pickVtuber();
	$: vtuberVideo = {
		videoId: vtuber.youtube.target_video.video_id,
		title: vtuber.youtube.target_video.title,
		uploaderName: vtuber.youtube.name,
		youtubeId: vtuber.youtube.channel_id,
		description: vtuber.youtube.target_video.description
	};
</script>

// 編集ページは, 編集ページにいってhistoryが取得できなかったら回答がありませんを表記
<YouTubeVideo {...vtuberVideo} />
<button on:click={() => (vtuber = pickVtuber())}> 回答完了 </button>

これとは別にドロップダウンで、DataSetに不具合があるときのフォーム作る
