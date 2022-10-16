<script lang="ts">
	import Button from '@smui/button';
</script>

<div class="submit">
	<Button style="width: 100%; height: 100%" type="submit" variant="unelevated" on:click>
		<div class="button-word">送信</div>
	</Button>
</div>

<style lang="scss">
	.submit {
		display: inline-block;
		width: 4.5rem;
		height: 2.5rem;
		margin: 0.2rem 0.6rem 1rem 0;
	}
	.button-word {
		font-size: larger;
	}
</style>
