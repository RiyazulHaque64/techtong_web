import type { IProduct } from "src/interfaces/product";

import { Box, Stack } from "@mui/material";

import { CustomContainer } from "src/components/container/custom-container";

import { ProductImages } from "./components/product-images";
import { ProductSummary } from "./components/product-summery";

type Props = {
    product: IProduct
}

const ProductDetailsView = ({ product }: Props) => {

    const { thumbnail, images } = product;

    return (
        <CustomContainer>
            <Stack direction={{ xs: 'column', md: 'row' }} gap={6}>
                <Box width={{ xs: '100%', md: '40%' }}>
                    <ProductImages images={thumbnail ? [thumbnail, ...images] : [...images]} />
                </Box>
                <Box width={{ xs: '100%', md: '60%' }}>
                    <ProductSummary product={product} />
                </Box>
            </Stack>
        </CustomContainer>
    )
}

export default ProductDetailsView;