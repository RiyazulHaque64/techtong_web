import type { BoxProps } from '@mui/material/Box';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

// ----------------------------------------------------------------------

export function ShopHeroLight({ children, sx, ...other }: BoxProps) {
  return (
    <Box
      sx={{
        py: 2,
        display: 'flex',
        position: 'relative',
        alignItems: 'center',
        ...sx,
      }}
      {...other}
    >
      <Container maxWidth="xl">
        <Box sx={{ px: { lg: 6 } }}>{children}</Box>
      </Container>
    </Box>
  );
}
