<script lang="ts">
	import Footer from '$lib/Components/Footer.svelte';
	import Nav from '$lib/Components/Nav.svelte';
	import '../app.css';

	let { children } = $props();
</script>

<main class="relative flex min-h-screen w-full flex-col">
	<Nav />
	{@render children()}
	<Footer />
</main>
