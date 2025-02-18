import type { TMeta } from 'src/interfaces/common';
import type { IProduct, TProductMeta } from 'src/interfaces/product';

import React from 'react';

import fetchApi from 'src/utils/fetch-api';

import { ShopView } from 'src/sections/shop/shop-view';
import { NotFoundView } from 'src/sections/error/not-found-view';

const page = async ({ params }: { params: { slug: string } }) => {
  // const products = await fetchApi('/product');
  const product = await fetchApi<IProduct>(`/product/${params.slug}`);
  if (product?.success) {
    return (
      <div>
        <h1>product name</h1>
        <p>product description</p>
        <p>price</p>
        {/* Add product details */}
      </div>
    );
  }

  // If not a product, check if it's a category
  const category = await fetchApi<IProduct[], TProductMeta>(`/product?category=${params.slug}`);
  if (category.success) {
    return <ShopView data={category.data} meta={category.meta as TMeta & TProductMeta} />;
  }

  // If neither, return 404
  return <NotFoundView />;
};

export default page;
