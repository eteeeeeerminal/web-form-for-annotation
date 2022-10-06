<script lang="ts">
	export let videoId: string;
	export let title: string;
	export let uploaderName: string;
	export let description: string = 'この動画の概要欄は空欄でした。';

	let descriptionOmitted = true;
	const switchExpand = () => {
		descriptionOmitted = !descriptionOmitted;
	};
</script>

<iframe
	src="https://www.youtube.com/embed/{videoId}"
	title="YouTube video player"
	frameborder="0"
	allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
	allowfullscreen
/>

<div>
	<h3>
		{title}
	</h3>
	<div>
		{uploaderName}
	</div>
	<div class={descriptionOmitted ? 'omitted' : 'expanded'}>
		{@html description.replace(/\n/g, '<br/>')}
	</div>
	<button on:click={switchExpand} style={'background: none; border: none; cursor: pointer;'}>
		{descriptionOmitted ? 'もっと見る' : '一部を表示'}
	</button>
</div>

<style>
	.omitted {
		overflow: hidden;
		height: 4.5rem;
		text-overflow: clip;
	}
	.expanded {
	}
</style>
