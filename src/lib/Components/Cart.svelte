<script lang="ts">
	// Assuming lucide-svelte is installed: npm install lucide-svelte
	import { ShoppingCart, X } from 'lucide-svelte';
	import CartItem from '$lib/Components/CartItem.svelte'; // Verify path
	import { cart } from '$lib/cartStore.svelte'; // Ensure .svelte is removed if it's a .ts file
	import { onMount } from 'svelte';
	import { loadStripe, type Stripe } from '@stripe/stripe-js';

	let stripe: Stripe | null = null;
	let checkingOut = $state(false);
	let stripeError = $state<string | null>(null);

	// Load Stripe.js on component mount (client-side)
	$effect(() => {
		// Ensure PUBLIC_STRIPE_PUBLISHABLE_KEY is set in .env
		if (!import.meta.env.VITE_STRIPE_PUBLIC_KEY) {
			console.error('FATAL: PUBLIC_STRIPE_PUBLISHABLE_KEY is not set.');
			stripeError = 'Payment system configuration error.';
			return;
		}
		loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY)
			.then((s) => (stripe = s))
			.catch((err) => {
				console.error('Failed to load Stripe.js', err);
				stripeError = 'Could not initialize payment system.';
			});
	});

	async function handleCheckout() {
		// Ensure Stripe.js loaded, not already processing, and cart isn't empty
		if (!stripe || checkingOut || cart.items.length === 0) return;

		checkingOut = true;
		stripeError = null;

		try {
			// 1. Call your backend endpoint
			const response = await fetch('/api/checkout', {
				// The endpoint we defined earlier
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				// Send the current cart items from the store
				body: JSON.stringify(cart.items)
			});

			const sessionData = await response.json();

			if (!response.ok) {
				// Handle errors from your backend (e.g., validation failed)
				stripeError = sessionData.error || 'Could not initiate checkout.';
				checkingOut = false;
				return;
			}

			// 2. Get the sessionId returned from your backend
			const sessionId = sessionData.sessionId;
			if (!sessionId) {
				stripeError = 'Could not retrieve checkout session.';
				checkingOut = false;
				return;
			}

			// 3. Redirect to Stripe Checkout using Stripe.js
			const { error } = await stripe.redirectToCheckout({
				sessionId: sessionId
			});

			// If redirectToCheckout fails (uncommon), display error
			if (error) {
				console.error('Stripe redirect error:', error);
				stripeError = error.message || 'Failed to redirect to payment page.';
				checkingOut = false; // Stop loading only if redirect fails
			}
			// If redirect succeeds, user navigates away, no need to set checkingOut = false
		} catch (err: any) {
			console.error('Checkout fetch/process error:', err);
			stripeError = 'An unexpected error occurred. Please try again.';
			checkingOut = false;
		}
	}

	// cartOpen state should ideally be managed in the parent component (e.g., the Navbar layout)
	// and passed down or controlled via a store/context if needed elsewhere.
	// For this example, we assume it's passed correctly.
	let { cartOpen: isCartOpen = $bindable() } = $props<{ cartOpen: boolean }>();

	// Placeholder for checkout loading state later
	let cartNode: HTMLDivElement | undefined = $state();

	// function handleCheckout() {
	//   checkingOut = true;
	//   // TODO: Implement Stripe checkout logic here
	//   // Call fetch('/api/create-checkout-session'), then stripe.redirectToCheckout()
	//   console.log('Initiating checkout...');
	//   // Simulate loading for now
	//   setTimeout(() => {
	//     checkingOut = false;
	//     // cartOpen = false; // Optionally close cart on checkout attempt
	//   }, 2000);
	// }

	onMount(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (isCartOpen && cartNode && !cartNode.contains(event.target as Node)) {
				isCartOpen = false;
			}
		};

		document.addEventListener('mousedown', handleClickOutside);

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	});
</script>

<!-- Cart Toggle Button -->
<button
	onclick={() => (isCartOpen = true)}
	class="relative flex cursor-pointer items-center rounded-md p-2 text-gray-700 hover:bg-gray-100 focus:ring-2 focus:ring-amber-500 focus:ring-offset-1 focus:outline-none"
	aria-label="Toggle shopping cart"
	aria-expanded={isCartOpen}
>
	<ShoppingCart class="size-6" />
	{#if cart.itemCount > 0}
		<span
			class="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-amber-600 text-xs font-medium text-white"
		>
			{cart.itemCount}
		</span>
	{/if}
	<span class="sr-only">Cart</span>
	<!-- Screen reader text if icon only -->
</button>

<!-- Cart Dropdown Panel -->
{#if isCartOpen}
	<div
		class="ring-opacity-5 absolute top-full right-0 z-20 mt-2 flex max-h-[calc(100vh-100px)] w-80 origin-top-right flex-col rounded-lg bg-white shadow-xl ring-1 ring-black focus:outline-none"
		role="dialog"
		aria-modal="true"
		aria-labelledby="cart-heading"
		bind:this={cartNode}
	>
		<!-- Header -->
		<div class="flex flex-shrink-0 items-center justify-between border-b border-gray-200 p-4">
			<h2 id="cart-heading" class="text-lg font-medium text-gray-900">Your Cart</h2>
			<button
				class="rounded-md p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:ring-2 focus:ring-amber-500 focus:outline-none"
				aria-label="Close cart"
				onclick={() => (isCartOpen = false)}
			>
				<X class="size-5" />
			</button>
		</div>

		<!-- Cart Items Area (Scrollable) -->
		<div class="flex-grow overflow-y-auto p-4">
			{#if cart.items.length === 0}
				<div class="flex flex-col items-center justify-center py-10 text-center">
					<ShoppingCart class="mb-4 size-12 text-gray-300" />
					<p class="text-gray-500">Your cart is empty.</p>
				</div>
			{:else}
				<ul role="list" class="-my-4 divide-y divide-gray-200">
					{#each cart.items as item (item.id)}
						<li class="py-4">
							<CartItem
								cartItem={item}
								removeItem={cart.removeItem}
								updateQuantity={cart.updateQuantity}
							/>
						</li>
					{/each}
				</ul>
			{/if}
		</div>

		<!-- Footer (Only show if cart not empty) -->
		{#if cart.items.length > 0}
			<div class="flex-shrink-0 border-t border-gray-200 p-4">
				<!-- Total -->
				<div class="mb-4 flex items-center justify-between text-base font-medium">
					<p class="text-gray-700">Subtotal</p>
					<p class="text-gray-900">${cart.totalFormatted}</p>
				</div>

				<!-- Checkout Button -->
				<button
					onclick={handleCheckout}
					disabled={checkingOut}
					class="flex w-full items-center justify-center rounded-md border border-transparent bg-amber-600 px-4 py-2 text-base font-medium text-white shadow-sm transition-all duration-200 hover:bg-amber-700 focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
				>
					{#if checkingOut}
						<!-- Basic Spinner -->
						<svg
							class="mr-3 -ml-1 h-5 w-5 animate-spin text-white"
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
						>
							<circle
								class="opacity-25"
								cx="12"
								cy="12"
								r="10"
								stroke="currentColor"
								stroke-width="4"
							></circle>
							<path
								class="opacity-75"
								fill="currentColor"
								d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
							></path>
						</svg>
						Processing...
					{:else}
						Proceed to Checkout
					{/if}
				</button>

				<!-- Clear Cart Button (Less prominent) -->
				<div class="mt-4 text-center">
					<button
						onclick={() => {
							cart.clearCart();
							isCartOpen = false; // Close cart after clearing
						}}
						class="text-black-600 hover:text-black-500 text-sm font-medium hover:underline"
					>
						Clear Cart
					</button>
				</div>
			</div>
		{/if}
	</div>
{/if}
