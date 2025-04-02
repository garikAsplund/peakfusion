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
	  handleScroll(); // Initial check
	  return () => window.removeEventListener('scroll', handleScroll);
	});
  </script>
  
  <!-- Logo remains centered above -->
  <div bind:this={logoContainer} class="flex justify-center pt-4 md:pt-6">
	<a href="/" aria-label="Back to home" class="transition-opacity duration-200 hover:opacity-85">
	  <Logo />
	</a>
  </div>
  
  <!-- Sticky Nav Bar -->
  <div
	class="sticky top-0 z-40 w-full {scrolled
	  ? 'bg-white/90 shadow-md backdrop-blur-lg transition-all duration-300'
	  : 'bg-transparent transition-all duration-300'}"
  >
	<div class="container mx-auto px-4 md:px-6">
	  <div class="relative flex h-16 items-center justify-center">
		<!-- Mobile Layout (Links Left, Icons Right) -->
		<div class="flex w-full items-center justify-between md:hidden">
		  <nav class="flex items-center gap-3">
			<a href="/" class="text-sm font-normal text-gray-800 transition hover:text-amber-700">Home</a>
			<a href="/shop" class="text-sm font-normal text-gray-800 transition hover:text-amber-700">Shop</a>
			<a href="/#about" class="text-sm font-normal whitespace-nowrap text-gray-800 transition hover:text-amber-700">About</a>
		  </nav>
		  <div class="flex items-center gap-3">
			<a
			  href="https://www.instagram.com/peakfusion/"
			  target="_blank"
			  rel="noopener noreferrer"
			  class="text-gray-800 transition hover:text-pink-600"
			  aria-label="Peak Fusion on Instagram"
			>
			  <Instagram />
			</a>
			<a href="/cart" aria-label="View Cart" class="text-gray-800 transition hover:text-amber-700">
			  <Cart />
			</a>
		  </div>
		</div>
  
		<!-- Desktop Links (Centered) -->
		<nav class="hidden items-center gap-4 md:flex md:gap-6 lg:gap-10">
		  <a href="/" class="text-base font-normal text-gray-800 transition hover:text-amber-700">Home</a>
		  <a href="/shop" class="text-base font-normal text-gray-800 transition hover:text-amber-700">Shop</a>
		  <a href="/#about" class="text-base font-normal whitespace-nowrap text-gray-800 transition hover:text-amber-700">About</a>
		  <a
			href="https://www.instagram.com/peakfusion/"
			target="_blank"
			rel="noopener noreferrer"
			class="text-gray-800 transition hover:text-pink-600"
			aria-label="Peak Fusion on Instagram"
		  >
			<Instagram />
		  </a>
		</nav>
  
		<!-- Desktop Cart Icon (Absolute Right) -->
		<div class="absolute end-4 hidden md:block">
		  <a href="/cart" aria-label="View Cart" class="text-gray-800 transition hover:text-amber-700">
			<Cart />
		  </a>
		</div>
	  </div>
	</div>
  </div>