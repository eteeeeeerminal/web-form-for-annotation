<script lang="ts">
	import AnnotationItem from './AnnotationItem.svelte';
</script>

<AnnotationItem>
	<div class="text">
		<slot />
	</div>
</AnnotationItem>

<style lang="scss">
	.text {
		padding: 1.5rem;
	}
</style>
