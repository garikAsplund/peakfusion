export interface Product {
	id: number | string;
    name: string;
    slug: string;
    description: string;
    price: number;
	imageUrl: string;
    weightOz: number;
    ingredients: string;
    images: string[];
}

export interface CartProduct {
	id: string;
	quantity: number;
	product: Product;
}