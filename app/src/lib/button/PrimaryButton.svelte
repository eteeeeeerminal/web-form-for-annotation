<script lang="ts">
	import Button from '@smui/button';

	export let label: string;
	export let href: string | undefined = undefined;
	export let type = 'button';
</script>

<Button color="primary" variant="unelevated" {type} {href} on:click>
	<div>{label}</div>
</Button>
