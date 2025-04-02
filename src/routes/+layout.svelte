<script lang="ts">
	import Footer from '$lib/Components/Footer.svelte';
	import Nav from '$lib/Components/Nav.svelte';
	import '../app.css';
	let { children } = $props();
</script>

<main class="flex w-full flex-col min-h-screen relative">
	<Nav />
	{@render children()}
	<Footer />
</main>
