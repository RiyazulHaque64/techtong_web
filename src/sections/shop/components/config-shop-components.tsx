import { paramCase } from 'src/utils/change-case';

import { CONFIG } from 'src/config-global';

// ----------------------------------------------------------------------

const getHref = (category: string, name: string) => `/components/${category}/${paramCase(name)}`;

export const foundationNav = ['Colors', 'Typography', 'Shadows', 'Grid', 'Icons'].map((name) => ({
  name,
  href: getHref('foundation', name),
  icon: `${CONFIG.assetsDir}/assets/icons/components/ic-${paramCase(name)}.svg`,
}));
