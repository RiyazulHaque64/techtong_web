import { CONFIG } from 'src/config-global';

import { NotFoundLayout } from 'src/sections/error';

// ----------------------------------------------------------------------

export const metadata = { title: `404 page not found! | Error - ${CONFIG.appName}` };

export default function Page() {
  return <NotFoundLayout />;
}
