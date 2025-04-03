<script lang="ts">
	// Assuming CartProduct is defined in or imported from '$lib/cartStore' or '$lib/types'
	import type { CartProduct } from '$lib/types';
	import { Minus, Plus, Trash2 } from 'lucide-svelte';
  
	// Define the expected props
	interface Props {
	  cartItem: CartProduct; // Renamed for clarity, receives the item data
	  removeItem: (id: string) => void; // Function to remove the item entirely
	  updateQuantity: (id: string, newQuantity: number) => void; // Function to change quantity
	}
  
	// Destructure props - no $bindable needed
	let { cartItem, removeItem, updateQuantity }: Props = $props();
  
	// --- Local Helper Functions (Optional but can clean up template) ---
	function handleDecrease() {
	  // Call the updateQuantity function passed from the parent/store
	  // The store's updateQuantity function should handle the case where quantity becomes 0
	  updateQuantity(cartItem.id, cartItem.quantity - 1);
	}
  
	function handleIncrease() {
	  // Call the updateQuantity function passed from the parent/store
	  updateQuantity(cartItem.id, cartItem.quantity + 1);
	}
  
	function handleRemove() {
	  // Call the removeItem function passed from the parent/store
	  removeItem(cartItem.id);
	}
  </script>
  
  <div class="flex items-center justify-between border-b border-gray-200 py-2">
	<!-- Product Info (Reads directly from cartItem prop) -->
	<div class="flex items-center">
	  <img
		src={cartItem.product.imageUrl}
		alt={cartItem.product.name}
		class="mr-4 size-12 rounded object-cover flex-shrink-0"
	  />
	  <div>
		<p class="font-medium">{cartItem.product.name}</p>
		<p class="text-sm text-gray-600">
		  ${(cartItem.product.price / 100).toFixed(2)} each
		</p>
	  </div>
	</div>
  
	<!-- Action Controls -->
	<div class="flex items-center flex-shrink-0 ml-2">
	  <!-- Decrease Quantity Button -->
	  <button
		onclick={handleDecrease}
		class="rounded p-1 hover:bg-gray-200 disabled:opacity-50"
		aria-label="Subtract 1 from quantity"
		disabled={cartItem.quantity <= 0}
	  >
		<Minus class="size-4" />
	  </button>
  
	  <!-- Display Quantity -->
	  <span class="mx-2 w-6 text-center tabular-nums">
		{cartItem.quantity}
	  </span>
  
	  <!-- Increase Quantity Button -->
	  <button
		onclick={handleIncrease}
		class="rounded p-1 hover:bg-gray-200"
		aria-label="Add 1 to quantity"
	  >
		<Plus class="size-4" />
	  </button>
  
	  <!-- Remove Item Button -->
	  <button
		onclick={handleRemove}
		class="ml-4 rounded p-1 text-red-500 hover:bg-red-100"
		aria-label="Remove {cartItem.product.name} from cart"
	  >
		<Trash2 class="size-4" />
	  </button>
	</div>
  </div>
  