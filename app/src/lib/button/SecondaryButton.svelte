<script lang="ts">
	import Button from '@smui/button';

	export let label: string | null;
	export let href: string | undefined = undefined;
</script>

<Button on:click {href} color="secondary" type="button" style="background: whitesmoke">
	<div class="label">{label}</div>
</Button>

<style lang="scss">
	.label {
		color: $text-color;
	}
</style>
