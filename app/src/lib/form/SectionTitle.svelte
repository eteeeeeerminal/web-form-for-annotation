<script lang="ts">
	export let title: string;
</script>

<div class="title">{title}</div>

<style lang="scss">
	.title {
		border-radius: 5px;
		margin: 1.5rem 0rem 0.2rem;
		padding: 0.3rem 1rem;
		max-width: $form-item-width;
		font-size: larger;
		color: $background-color2;
		background-color: $accent-color;
	}
</style>
