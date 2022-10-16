<script lang="ts">
	import PrimaryButton from './PrimaryButton.svelte';
</script>

<div class="submit">
	<PrimaryButton label="送信" on:click />
</div>

<style lang="scss">
	.submit {
		display: inline-block;
		width: 4.5rem;
		height: 2.5rem;
		margin: 0.2rem 0.6rem 1rem 0;
	}
</style>
