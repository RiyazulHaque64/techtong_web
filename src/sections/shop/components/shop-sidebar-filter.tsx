import Stack from '@mui/material/Stack';

import { hideScrollY } from 'src/theme/styles';

import PriceRange from 'src/components/slider/price-range';

// ----------------------------------------------------------------------

export function ShopSidebarFilter() {
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
    >
      <PriceRange />
    </Stack>
  );
}
