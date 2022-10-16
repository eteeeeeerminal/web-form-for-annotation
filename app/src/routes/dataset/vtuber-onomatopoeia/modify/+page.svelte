<script lang="ts">
	import ModifyPage from '$lib/vtuber-onomatopoeia/components/ModifyPage.svelte';
</script>

<div class="center">
	<div class="centered-item">
		<ModifyPage />
	</div>
</div>

<style lang="scss">
	.center {
		max-width: 95vw;
		margin: auto;
	}

	.centered-item {
		max-width: $form-item-width;
		margin: auto;
		display: block;
	}
</style>
