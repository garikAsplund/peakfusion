import { getProductBySlug } from '$lib/products';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params }) => {
    const product = getProductBySlug(params.slug);
    return { product };
};
