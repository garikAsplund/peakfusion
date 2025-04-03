// src/lib/products.ts
// export interface Product {
// 	id: string;
// 	name: string;
// 	slug: string;
// 	description: string;
// 	price: number; // Store price in cents!
// 	imageUrl: string;
// 	weightOz: number;
// }

// Define or import your Product type (matching what data.products provides)
// Assuming it looks something like this based on your shop page code:
export interface Product {
    id: number | string; // Or whatever the actual type is
    name: string;
    price: number;
    thumbnail: string;
    // Add other fields if necessary
  }
  
  // Define the structure for items in the cart
  export interface CartProduct {
    id: string; // Unique ID for the cart line item (using crypto.randomUUID)
    quantity: number;
    product: Product; // The original product details
  }

export const products: Product[] = [
	{
		id: 'soap-001',
		name: 'Lavender Dream',
		slug: 'lavender-dream',
		description: 'Calming lavender soap for relaxing evenings.',
		price: 800, // $8.00
		imageUrl: '/pics/lavender-soap.jpg',
		weightOz: 10
	}
	// ... more products
];

export function getProductBySlug(slug: string): Product | undefined {
	return products.find((p) => p.slug === slug);
}
