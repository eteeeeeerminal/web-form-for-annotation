<script async script lang="ts">
	import Modal from 'svelte-simple-modal';
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

<Modal closeButton={false}>
	<Header />

	<main>
		<slot />
	</main>

	<Footer />
</Modal>
