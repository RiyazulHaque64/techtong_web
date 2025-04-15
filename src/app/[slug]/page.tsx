import type { TMeta } from 'src/interfaces/common';
import type { IProduct, TProductMeta } from 'src/interfaces/product';

import fetchApi from 'src/utils/fetch-api';

import { NotFoundView } from 'src/sections/error/not-found-view';
import ProductDetailsView from 'src/sections/product-details/product-details-view';
import { ShopView } from 'src/sections/shop/shop-view';

const page = async ({ params, searchParams }: { params: { slug: string }, searchParams: any }) => {
  const queryString = new URLSearchParams(searchParams).toString();

  const product = await fetchApi<IProduct>(`/product/${params.slug}`);

  if (product?.success) {
    return <ProductDetailsView product={product.data} />;
  }

  // If not a product, check if it's a category
  const category = await fetchApi<IProduct[], TProductMeta>(`/product?category=${params.slug}${queryString?.length ? `&${queryString}` : ''}`);
  if (category.success) {
    return <ShopView products={category.data} meta={category.meta as TMeta & TProductMeta} />;
  }

  // If neither, return 404
  return <NotFoundView />;
};

export default page;
