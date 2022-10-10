<script>
	import YouTubeVideo from '$lib/components/dataset/YouTubeVideo.svelte';
	import { pickVtuber } from '$lib/vtuber-onomatopoeia/dataset/database';

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
	<YouTubeVideo {...vtuberVideo} />
</div>
<button on:click={() => (vtuber = pickVtuber())}> 回答完了 </button>

<style lang="scss">
	.center {
		display: flex;
		justify-content: center;
	}
</style>
