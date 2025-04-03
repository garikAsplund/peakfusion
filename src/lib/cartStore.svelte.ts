import { browser } from '$app/environment';
import type { CartProduct, Product } from './types';

const LOCAL_STORAGE_KEY = 'peak_fusion_cart'; 

// --- Helper Functions ---
function getInitialCart(): CartProduct[] {
  if (!browser) return [];
  const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (stored) {
    try {
      // Add validation if needed
      return JSON.parse(stored);
    } catch {
      localStorage.removeItem(LOCAL_STORAGE_KEY);
    }
  }
  return [];
}

function formatPrice(price: number): string {
  return (price / 100).toFixed(2); // Keep it simple
}

// --- Reactive State ---
let items = $state<CartProduct[]>(getInitialCart());

// --- Derived State ---
const stats = $derived.by(() => {
  let quantity = 0;
  let total = 0;
  for (const item of items) {
    quantity += item.quantity;
    total += item.product.price * item.quantity;
  }
  return {
    quantity,
    total,
    totalFormatted: formatPrice(total),
  };
});

// --- Actions ---
function addItem(productToAdd: Product, quantityToAdd: number = 1) {
  if (quantityToAdd <= 0) return;

  const existingItem = items.find(
    (item) => item.product.id === productToAdd.id
  );

  if (existingItem) {
    // Increase quantity of existing item
    existingItem.quantity += quantityToAdd;
  } else {
    // Add new item
    items.push({
      id: crypto.randomUUID(), // Unique ID for this cart entry
      quantity: quantityToAdd,
      product: productToAdd,
    });
  }
}

function removeItem(cartItemId: string) {
  items = items.filter((item) => item.id !== cartItemId);
}

function updateQuantity(cartItemId: string, newQuantity: number) {
  if (newQuantity <= 0) {
    removeItem(cartItemId);
    return;
  }
  const item = items.find((item) => item.id === cartItemId);
  if (item) {
    item.quantity = newQuantity;
  }
}

function clearCart() {
  items.length = 0;
}

// --- Exported Store Object ---
export const cart = {
  // Read-only accessors for state
  get items() { return items; },
  get itemCount() { return stats.quantity; },
  get total() { return stats.total; },
  get totalFormatted() { return stats.totalFormatted; },

  // Actions
  addItem,
  removeItem,
  updateQuantity,
  clearCart,
};

// --- Side Effect (Optional but recommended: Add to +layout.svelte) ---
// We'll put the localStorage sync and the alert in the layout effect
