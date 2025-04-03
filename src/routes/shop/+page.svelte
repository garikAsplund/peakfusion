<script lang="ts">
    import { cart } from '$lib/cartStore.svelte'; 
    import { products } from '$lib/products';
  
    function formatPrice(price: number): string {
      return (price / 100).toFixed(2);
    }
  </script>
  
  <section class="flex w-full justify-center px-4">
    <div
      class="grid w-full justify-items-center grid-cols-1 gap-6 p-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
    >
      {#each products as product (product.id)}
        <div class="overflow-hidden rounded-xl bg-white shadow-lg w-full">
          <!-- Added w-full and max-w-xs to card -->
          <a href="/products/{product.slug}" aria-label="View {product.name}">
            <!-- Link the image -->
            <img
              src={product.imageUrl}
              alt={product.name}
              class="h-48 w-full object-cover"
            />
          </a>
          <div class="p-4">
            <a href="/products/{product.slug}">
              <!-- Link the name -->
              <p
                class="mb-2 truncate overflow-hidden text-lg font-medium text-gray-800 hover:text-sky-700"
              >
                {product.name}
              </p>
            </a>
            <div class="flex items-center justify-between">
              <p class="text-xl font-bold">${formatPrice(product.price)}</p>
              <button
                class="rounded-lg bg-gray-600 px-4 py-2 text-white transition-colors duration-300 hover:bg-gray-700"
                onclick={() => {
                  cart.addItem(product);
                }}
                aria-label="Add {product.name} to cart"
              >
                Add to cart
              </button>
            </div>
          </div>
        </div>
      {/each}
    </div>
  </section>
  