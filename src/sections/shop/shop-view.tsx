'use client';

import type { BoxProps } from '@mui/material/Box';
import type { TMeta } from 'src/interfaces/common';
import type { IProduct, TProductMeta } from 'src/interfaces/product';

import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';

import { MotionContainer } from 'src/components/animate';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';
import { Iconify } from 'src/components/iconify';

import { ProductCard } from './components/product-card';
import ShopFilterToolbar from './components/shop-filter-toolbar';
import { ShopHeroLight } from './components/shop-hero-light';
import { ShopSidebarFilter } from './components/shop-sidebar-filter';

// ----------------------------------------------------------------------

export type TFilterOption = { value: string; label: string };
type Props = {
  products: IProduct[];
  meta: TMeta & TProductMeta;
};



export function ShopView({ products, meta }: Props) {

  return (
    <>
      <ShopHeroLight>
        <CustomBreadcrumbs links={[{ name: 'Speaker' }]} sx={{ mb: 1 }} />
        <MotionContainer>
          {/* <m.div variants={varFade().inUp}>
            <Typography variant="h4" component="h1">
              Speaker price in bangladesh
            </Typography>
          </m.div> */}

          {/* <m.div variants={varFade().inUp}>
            <Typography sx={{ color: 'grey.700', mt: '4px' }}>
              Speaker Price in Bangladesh starts from BDT 3,300 and depending on brand and
              specification the price may go up to BDT 442,000. Buy the Latest original Speaker from
              Techtong speaker shop in BD. Browse below and Order yours now!
            </Typography>
          </m.div> */}
        </MotionContainer>
      </ShopHeroLight>

      <Container sx={{ mt: 3, mb: 15 }} maxWidth="xl">
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          alignItems={{ md: 'flex-start' }}
          gap={3}
          sx={{ px: { lg: 6 } }}
        >
          <ShopSidebarFilter meta={meta} />

          <Stack spacing={3} sx={{ flexGrow: 1 }}>
            <ShopFilterToolbar />
            {
              products.length > 0 ? (
                <Grid>
                  {
                    products.map((product) => (
                      <ProductCard key={product.id} product={product} />
                    ))
                  }
                </Grid>
              ) : (
                <Stack direction='column' alignItems='center' sx={{ py: 10 }}>
                  <Iconify icon="solar:filter-linear" sx={{ width: 60, height: 60 }} />
                  <Typography variant='subtitle2'>No product found!</Typography>
                </Stack>
              )
            }

          </Stack>
        </Stack>
      </Container>
    </>
  );
}

// ----------------------------------------------------------------------

function Grid({ children }: BoxProps) {
  return (
    <Box
      rowGap={3}
      display="grid"
      columnGap={2.5}
      gridTemplateColumns={{
        xs: 'repeat(1, 1fr)',
        sm: 'repeat(3, 1fr)',
        md: 'repeat(4, 1fr)',
      }}
    >
      {children}
    </Box>
  );
}
