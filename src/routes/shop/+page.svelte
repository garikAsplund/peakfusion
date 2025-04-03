<!-- src/routes/shop/+page.svelte -->
<script lang="ts">
    import { cart, type Product } from '$lib/cartStore.svelte'; // Import store and Product type
    import { products } from '$lib/products'; // Import your product data
  
    // Assuming 'data' comes from a load function or is passed as props
    // and data.products matches the Product interface
    // let { data } = $props<{ data: { products: Product[] } }>();
  
    // No cart logic needed here anymore
    function formatPrice(price) {
        return (price / 100).toFixed(2);
    }
  </script>
  
  <!-- Keep your Navbar component instance if it's part of the layout -->
  <!-- <Navbar /> -->
  
  <div class="grid grid-cols-1 gap-6 bg-gray-100 p-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
    {#each products as product (product.id)}
      <div class="overflow-hidden rounded-xl bg-white shadow-lg">
        <img src={product.imageUrl} alt={product.name} class="h-48 w-full object-cover" />
        <div class="p-4">
          <p class="mb-2 overflow-hidden truncate text-lg font-medium text-gray-800">
            {product.name}
          </p>
          <div class="flex items-center justify-between">
            <p class="text-xl font-bold">${formatPrice(product.price)}</p>
            <button
              class="bg-gray-600 rounded-lg px-4 py-2 text-white transition-colors duration-300 hover:bg-gray-700"
              onclick={() => {
                // Use the addItem action from the store
                cart.addItem(product);
              }}
            >
              Add to cart
            </button>
          </div>
        </div>
      </div>
    {/each}
  </div>
  