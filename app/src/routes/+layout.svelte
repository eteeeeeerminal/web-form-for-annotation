<script async script lang="ts">
	import Header from '$lib/header/Header.svelte';
	import Footer from '$lib/footer/Footer.svelte';
</script>

<svelte:head>
	<!-- Roboto -->
	<link
		rel="stylesheet"
		href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,600,700"
	/>
	<!-- Roboto Mono -->
	<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto+Mono" />
	<link rel="stylesheet" href="/smui.css" />
</svelte:head>

<Header />

<main>
	<slot />
</main>

<Footer />

<style lang="scss">
	main {
		margin: auto;
		width: 100%;
		max-width: 800px;
	}
</style>
