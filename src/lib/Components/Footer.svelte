<script lang="ts">
	import Watermark from '$lib/Components/Watermark.svelte';
  
	const footerLinks = [
	  { href: '/shop', label: 'Shop' },
	  { href: '/#about', label: 'About' },
	  { href: '/contact', label: 'Contact' },
	  { href: '/policies', label: 'Shipping and Returns' },
	  { href: '/stockists', label: 'Stockists' },
	];
  </script>
  
  <footer
	class="relative mt-auto w-full border-t border-gray-200 bg-gray-50 py-8 text-gray-600"
  >
	<div class="container mx-auto px-4">
	  <nav
		class="mb-6 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 md:gap-x-6"
		aria-label="Footer navigation"
	  >
		{#each footerLinks as link}
		  <a
			href={link.href}
			class="text-sm hover:text-amber-700 hover:underline transition-colors duration-200 ease-in-out"
		  >
			{link.label}
		  </a>
		{/each}
	  </nav>
  
	  <div class="mt-6 flex justify-center">
		<Watermark />
	  </div>
	</div>
  </footer>