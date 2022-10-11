<script lang="ts">
	export let title: string;
</script>

<div class="title">{title}</div>

<style lang="scss">
	.title {
		border-radius: 5px;
		border-top: solid $accent-color 0.8rem;
		margin: 1rem 0rem 0rem;
		padding: 0.5rem 1.2rem;
		max-width: $form-item-width;
		font-size: x-large;
		color: $text-color;
		background-color: $background-color2;
	}
</style>
