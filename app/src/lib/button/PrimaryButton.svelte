<script lang="ts">
	import Button from '@smui/button';

	export let label: string;
	export let href: string | undefined = undefined;
</script>

<Button color="primary" variant="unelevated" type="button" {href} on:click>
	<div>{label}</div>
</Button>
