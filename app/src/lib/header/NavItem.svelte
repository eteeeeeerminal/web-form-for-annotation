<script lang="ts">
	export let href = '';
</script>

<li><a {href}><slot /></a></li>

<style lang="scss">
	li {
		display: inline-block;
	}
</style>
