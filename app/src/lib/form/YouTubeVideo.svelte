<script lang="ts">
	import AnnotationItem from './AnnotationItem.svelte';

	export let videoId: string;
	export let title: string;
	export let uploaderName: string;
	export let youtubeId: string;
	export let description: string = 'この動画の概要欄は空欄でした。';

	let descriptionOmitted = true;
	const switchExpand = () => {
		descriptionOmitted = !descriptionOmitted;
	};
	$: descriptionOmitted = true || videoId;
</script>

<AnnotationItem>
	<div class="video-wrapper">
		<iframe
			src="https://www.youtube.com/embed/{videoId}"
			class="video"
			title="YouTube video player"
			frameborder="0"
			allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
			allowfullscreen
		/>
	</div>

	<div>
		<div class="title">
			{title}
		</div>
		<div class="description">
			<a class="name" href="https://www.youtube.com/channel/{youtubeId}">
				{uploaderName}
			</a>
			<div class={descriptionOmitted ? 'omitted' : 'expanded'}>
				{@html description.replace(/\n/g, '<br/>')}
			</div>
		</div>
		<button class="expandButton" on:click={switchExpand}>
			{descriptionOmitted ? 'もっと見る' : '一部を表示'}
		</button>
	</div>
</AnnotationItem>

<style lang="scss">
	.video {
		position: absolute;
		top: 0;
		right: 0;
		width: 100%;
		height: 100%;
	}
	.video-wrapper {
		position: relative;
		width: 100%;
		padding-top: 56.25%;
	}

	.title {
		font-weight: bold;
		font-size: large;
		margin: 0.5rem 0.4rem 0.2rem 0.4rem;
	}

	.description {
		margin: 0.4rem 1rem 0rem 1rem;
	}

	.name {
		display: inline-block;
		margin: 0px 0px 1rem;
		color: $text-color;
		text-decoration: none;
	}

	.omitted {
		overflow: hidden;
		height: 4.5rem;
		text-overflow: clip;
	}
	.expanded {
		overflow-y: auto;
		max-height: 13.5rem;
	}

	.expandButton {
		color: dimgray;
		background: none;
		border: none;
		cursor: pointer;
		margin: 0.2rem 1rem 0.2rem 1rem;
	}
</style>
