import { paths } from 'src/routes/paths';

import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

export const navData = [
  { title: 'Home', path: '/', icon: <Iconify width={22} icon="solar:home-2-bold-duotone" /> },
  {
    title: 'Speaker',
    path: '/speaker',
    icon: <Iconify width={22} icon="gridicons:speaker" />,
  },
  {
    title: 'Pages',
    path: '/pages',
    icon: <Iconify width={22} icon="solar:file-bold-duotone" />,
    children: [
      {
        subheader: 'Other',
        items: [
          { title: 'About us', path: '' },
          { title: 'Contact us', path: '' },
          { title: 'FAQs', path: paths.faqs },
          { title: 'Pricing', path: '' },
          { title: 'Payment', path: '' },
          { title: 'Maintenance', path: '' },
          { title: 'Coming soon', path: '' },
        ],
      },
    ],
  },
  {
    title: 'Docs',
    icon: <Iconify width={22} icon="solar:notebook-bold-duotone" />,
    path: '',
  },
];
