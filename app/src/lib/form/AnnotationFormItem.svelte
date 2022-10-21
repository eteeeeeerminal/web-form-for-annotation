<script lang="ts">
	import AnnotationItem from './AnnotationItem.svelte';
	export let question: string = '';
</script>

<AnnotationItem>
	<div class="form">
		{#if question}
			<div class="question">{question}</div>
		{/if}
		<slot />
	</div>
</AnnotationItem>

<style lang="scss">
	.question {
		margin: 1.2rem 0.8rem 0.4rem;
	}
	.form {
		margin: 0.8rem;
	}
</style>
