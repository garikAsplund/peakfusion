import type { Product } from "./types";

export const products: Product[] = [
	{
		id: 'soap-001',
		name: 'Lavender Dream',
		slug: 'lavender-dream',
		description: 'Calming lavender soap for relaxing evenings.',
		price: 800,
		imageUrl: '/pics/lavender-soap.jpg',
        weightOz: 10,
        ingredients: '',
        images: [],
    },
    {
		id: 'soap-002',
		name: 'Lavender Dream',
		slug: 'lavender-dream',
		description: 'Calming lavender soap for relaxing evenings.',
		price: 1800,
		imageUrl: '/pics/lavender-soap.jpg',
        weightOz: 10,
        ingredients: '',
        images: [],
	},
];

export function getProductBySlug(slug: string): Product | undefined {
	return products.find((p) => p.slug === slug);
}
