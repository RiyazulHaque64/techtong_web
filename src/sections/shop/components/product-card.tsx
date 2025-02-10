import { m } from 'framer-motion';

import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import {
  Box,
  List,
  Stack,
  Button,
  Divider,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';

import { RouterLink } from 'src/routes/components';

import { varAlpha } from 'src/theme/styles';

import { Image } from 'src/components/image';
import { Iconify } from 'src/components/iconify';
import { varHover, varTranHover } from 'src/components/animate';

// ----------------------------------------------------------------------

type Props = {
  item: {
    name: string;
    icon: string;
    href: string;
    category?: string;
  };
};

export function ProductCard({ item }: Props) {
  return (
    <Paper
      variant="outlined"
      sx={{
        overflow: 'hidden',
        position: 'relative',
        textDecoration: 'none',
        pb: 2,
        borderColor: (theme) => varAlpha(theme.vars.palette.grey['500Channel'], 0.12),
      }}
    >
      <Box component={RouterLink} href={item.href} sx={{ textDecoration: 'none' }}>
        <CardActionArea
          component={m.div}
          whileHover="hover"
          sx={{
            borderRadius: 0,
            color: 'text.secondary',
            bgcolor: (theme) => varAlpha(theme.vars.palette.grey['500Channel'], 0.04),
          }}
        >
          <m.div variants={varHover(1.1)} transition={varTranHover()}>
            <Image
              alt={item.name}
              src="https://img.freepik.com/free-vector/white-product-podium-with-green-tropical-palm-leaves-golden-round-arch-green-wall_87521-3023.jpg"
              ratio="1/1"
              sx={{ width: '100%', maxWidth: 1, objectFit: 'cover' }}
            />
          </m.div>
        </CardActionArea>

        <Typography variant="subtitle2" sx={{ px: 2, mt: 2, color: 'text.primary' }}>
          Gigabyte H110M Motherboard
        </Typography>
      </Box>
      <Stack sx={{ px: 2 }}>
        <List>
          <ListItem sx={{ color: 'grey.700', p: 0 }}>
            <ListItemIcon sx={{ mr: '2px' }}>
              <Iconify icon="radix-icons:dot" />
            </ListItemIcon>
            <ListItemText sx={{ '& .css-1byyml8-MuiTypography-root': { fontWeight: 500 } }}>
              Model: H110M H
            </ListItemText>
          </ListItem>
          <ListItem sx={{ color: 'grey.700', p: 0 }}>
            <ListItemIcon sx={{ mr: '2px' }}>
              <Iconify icon="radix-icons:dot" />
            </ListItemIcon>
            <ListItemText sx={{ '& .css-1byyml8-MuiTypography-root': { fontWeight: 500 } }}>
              Output: 50W
            </ListItemText>
          </ListItem>
          <ListItem sx={{ color: 'grey.700', p: 0 }}>
            <ListItemIcon sx={{ mr: '2px' }}>
              <Iconify icon="radix-icons:dot" />
            </ListItemIcon>
            <ListItemText sx={{ '& .css-1byyml8-MuiTypography-root': { fontWeight: 500 } }}>
              2 Year warrranty
            </ListItemText>
          </ListItem>
        </List>
        <Divider sx={{ my: 1, borderStyle: 'dashed' }} />
        <Stack direction="row" alignItems="center" justifyContent="center">
          <Typography
            variant="caption"
            sx={{ fontWeight: 'bold', fontSize: '1.2rem', color: 'grey.700' }}
          >
            {new Intl.NumberFormat('en-US').format(1020)}
          </Typography>
          <Iconify
            icon="tabler:currency-taka"
            sx={{ width: 24, height: 24, color: 'grey.700', ml: '-5px', mt: '-4px' }}
          />
        </Stack>
        <Button
          variant="soft"
          color="primary"
          sx={{ mt: 1 }}
          startIcon={<Iconify icon="mdi:cart" />}
        >
          Buy Now
        </Button>
      </Stack>
    </Paper>
  );
}
