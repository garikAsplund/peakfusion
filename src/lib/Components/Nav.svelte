<script lang="ts">
	import { onMount } from 'svelte';
	import Logo from '$lib/SVGs/Logo.svelte';
	import Instagram from '$lib/SVGs/Instagram.svelte';
	import Cart from '$lib/SVGs/Cart.svelte';

	let scrolled = $state(false);
	let logoContainer: HTMLElement | null = null;
	let scrollThreshold = 50;

	onMount(() => {
		if (logoContainer) {
			scrollThreshold = logoContainer.offsetTop + logoContainer.offsetHeight - 10;
		}

		const handleScroll = () => {
			scrolled = window.scrollY > scrollThreshold;
		};

		window.addEventListener('scroll', handleScroll);
		handleScroll();

		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	});
</script>

<div bind:this={logoContainer} class="flex justify-center">
	<a href="/" aria-label="Back to home" class="transition-all duration-200 hover:opacity-85">
		<Logo /></a
	>
</div>

<div
	class="sticky top-0 z-40 w-full {scrolled
		? 'bg-white/80 shadow-md backdrop-blur-lg transition-all duration-300'
		: 'bg-transparent transition-all duration-300'}"
>
	<div class="relative container mx-auto px-4 md:px-6">
		<!-- Added relative here for the icon positioning -->
		<div class="flex items-center justify-center gap-4 py-4 md:space-x-10">
			<!-- Menu Links -->
			<a
				href="/"
				class="text-sm font-normal text-gray-900 transition hover:text-gray-600 md:text-lg">Home</a
			>
			<a
				href="/shop"
				class="text-sm font-normal text-gray-900 transition hover:text-gray-600 md:text-lg">Shop</a
			>
			<a
				href="/#about"
				class="text-sm font-normal whitespace-nowrap text-gray-900 transition hover:text-gray-600 md:text-lg"
				>About</a
			>
			<!-- <a
				href="#farmers-market"
				class="text-sm font-normal whitespace-nowrap text-gray-900 transition hover:text-gray-600 md:text-lg"
				>Farmers Market</a
			> -->
			<a
				href="https://www.instagram.com/peakfusion/"
				target="_blank"
				rel="noopener noreferrer"
				class="text-gray-800 transition hover:text-pink-600"
				aria-label="Pier 303 Seafood on Instagram"
			>
				<Instagram />
			</a>
			<div class="absolute end-0">
				<Cart />
			</div>
		</div>
	</div>
</div>
