<script async script lang="ts">
	import Header from '$lib/header/Header.svelte';
	import Footer from '$lib/footer/Footer.svelte';
</script>

<Header />

<main>
	<slot />
</main>

<Footer />

<style lang="scss">
</style>
