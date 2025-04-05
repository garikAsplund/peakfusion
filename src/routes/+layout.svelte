<script lang="ts">
	import Footer from '$lib/Components/Footer.svelte';
	import Nav from '$lib/Components/Nav.svelte';
	import '../app.css';
	import { cart } from '$lib/cartStore.svelte';
	import { onMount } from 'svelte';
	import type { CartProduct } from '$lib/types';

	const CART_STORAGE_KEY = 'peakfusion_cart';
	const CART_EXPIRY_DAYS = 7;

	// Load cart from localStorage if available and not expired
	onMount(() => {
		const savedCart = localStorage.getItem(CART_STORAGE_KEY);
		if (savedCart) {
			try {
				const { items, timestamp } = JSON.parse(savedCart);
				const expiryDate = new Date(timestamp);
				expiryDate.setDate(expiryDate.getDate() + CART_EXPIRY_DAYS);

				if (new Date() < expiryDate) {
					// Clear current cart and add saved items
					cart.clearCart();
					items.forEach((item: CartProduct) => cart.addItem(item.product, item.quantity));
				} else {
					localStorage.removeItem(CART_STORAGE_KEY);
				}
			} catch (e) {
				console.error('Failed to parse saved cart', e);
			}
		}

		// Subscribe to cart changes to save to localStorage
		const unsubscribe = () => {
			localStorage.setItem(
				CART_STORAGE_KEY,
				JSON.stringify({
					items: cart.items,
					timestamp: new Date().toISOString()
				})
			);
		};

		// Save whenever cart changes
		$effect(() => {
			// This runs whenever cart.items changes
			unsubscribe();
		});

		return () => {
			// Cleanup - save final state
			unsubscribe();
		};
	});

	let { children } = $props();
</script>

<main class="relative flex min-h-screen w-full flex-col">
	<Nav />
	{@render children()}
	<Footer />
</main>
