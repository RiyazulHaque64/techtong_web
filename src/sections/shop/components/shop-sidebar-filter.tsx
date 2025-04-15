
import type { TMeta } from 'src/interfaces/common';
import type { TProductMeta } from 'src/interfaces/product';

import { Divider } from '@mui/material';
import Stack from '@mui/material/Stack';

import { hideScrollY } from 'src/theme/styles';

import PriceRange from 'src/components/slider/price-range';

import FilterSection from './filter-section';

// ----------------------------------------------------------------------

type Props = {
  meta: TMeta & TProductMeta;
};

export function ShopSidebarFilter({ meta }: Props) {
  return (
    <Stack
      component="nav"
      sx={{
        ...hideScrollY,
        width: 280,
        flexShrink: 0,
        position: 'sticky',
        display: { xs: 'none', md: 'flex' },
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: 1,
        p: 3,
        top: 'calc(var(--layout-header-desktop-height) + 24px)',
        maxHeight: 'calc(100vh - var(--layout-header-desktop-height) * 2)',
      }}
      divider={<Divider sx={{ mt: 2, mb: 1, borderStyle: 'dashed' }} />}
    >
      <PriceRange maxPrice={meta.max_price} />
      {meta?.attributes.map((attribute) => (
        <FilterSection key={attribute.id} attribute={attribute} />
      ))}
    </Stack>
  );
}
