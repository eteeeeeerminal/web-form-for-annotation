<script lang="ts">
	import Button from '@smui/button';

	export let label: string | null;
	export let href: string | undefined = undefined;
	export let type = 'button';
</script>

<Button on:click {href} color="secondary" {type} style="background: whitesmoke">
	<div class="label">{label}</div>
</Button>

<style lang="scss">
	.label {
		color: $text-color;
	}
</style>
