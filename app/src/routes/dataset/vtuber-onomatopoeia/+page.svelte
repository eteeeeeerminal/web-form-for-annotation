<script>
	import YouTubeVideo from '$lib/components/dataset/YouTubeVideo.svelte';
	import { pickVtuber } from './dataset/database';

	let vtuber = pickVtuber();
	$: vtuberVideo = {
		videoId: vtuber.youtube.target_video.video_id,
		title: vtuber.youtube.target_video.title,
		uploaderName: vtuber.youtube.name,
		description: vtuber.youtube.target_video.description
	};
</script>

<YouTubeVideo {...vtuberVideo} />
<button on:click={() => (vtuber = pickVtuber())}> 回答完了 </button>
