<script lang="ts">
    import { cart } from '$lib/cartStore.svelte';

    let { data } = $props();

    let product = data.product;

    let quantity = $state(1);
</script>

{#if product}
    <div class="product-detail">
        <h1>{product.name}</h1>
        <img src={product.imageUrl} alt={product.name} />
        <p>{product.description}</p>
        <p>${(product.price / 100).toFixed(2)}</p>

        <div class="quantity-selector">
            <button onclick={() => quantity > 1 ? quantity-- : null}>-</button>
            <span>{quantity}</span>
            <button onclick={() => quantity++}>+</button>
        </div>

        <button onclick={() => cart.addItem(product, quantity)}>
            Add to Cart
        </button>
    </div>
{:else}
    <p>Product not found</p>
{/if}

<style>
    .product-detail {
        max-width: 800px;
        margin: 0 auto;
        padding: 2rem;
    }
    img {
        max-width: 100%;
        height: auto;
    }
    .quantity-selector {
        display: flex;
        align-items: center;
        gap: 1rem;
        margin: 1rem 0;
    }
</style>
