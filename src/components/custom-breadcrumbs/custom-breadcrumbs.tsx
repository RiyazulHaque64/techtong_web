import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';

import { RouterLink } from 'src/routes/components';

import { Iconify } from '../iconify';
import { BreadcrumbsLink } from './breadcrumb-link';

import type { CustomBreadcrumbsProps } from './types';

// ----------------------------------------------------------------------

export function CustomBreadcrumbs({
  links,
  action,
  heading,
  moreLink,
  activeLast,
  slotProps,
  sx,
  ...other
}: CustomBreadcrumbsProps) {
  const lastLink = links[links.length - 1].name;

  const renderHeading = (
    <Typography variant="h4" sx={{ mb: 2, ...slotProps?.heading }}>
      {heading}
    </Typography>
  );

  const renderLinks = (
    <Breadcrumbs
      separator={<Separator />}
      sx={{ ...slotProps?.breadcrumbs, '& .css-1pzxt2r-MuiBreadcrumbs-ol': { columnGap: '0px' } }}
      {...other}
    >
      <Box component={RouterLink} href="/" sx={{ color: 'text.primary', mt: '4px' }}>
        <Iconify icon="ic:round-home" />
      </Box>
      {links.map((link, index) => (
        <BreadcrumbsLink
          key={link.name ?? index}
          link={link}
          activeLast={activeLast}
          disabled={link.name === lastLink}
        />
      ))}
    </Breadcrumbs>
  );

  const renderAction = <Box sx={{ flexShrink: 0, ...slotProps?.action }}> {action} </Box>;

  const renderMoreLink = (
    <Box component="ul">
      {moreLink?.map((href) => (
        <Box key={href} component="li" sx={{ display: 'flex' }}>
          <Link href={href} variant="body2" target="_blank" rel="noopener" sx={slotProps?.moreLink}>
            {href}
          </Link>
        </Box>
      ))}
    </Box>
  );

  return (
    <Box gap={2} display="flex" flexDirection="column" sx={sx} {...other}>
      <Box display="flex" alignItems="center">
        <Box sx={{ flexGrow: 1 }}>
          {heading && renderHeading}

          {!!links.length && renderLinks}
        </Box>

        {action && renderAction}
      </Box>

      {!!moreLink && renderMoreLink}
    </Box>
  );
}

// ----------------------------------------------------------------------

function Separator() {
  return (
    <Iconify
      icon="heroicons:slash-16-solid"
      sx={{ width: 16, height: 16, color: 'text.disabled' }}
    />
  );
}
