'use client';

import { SimpleLayout } from 'src/layouts/simple';

import { NotFoundView } from './not-found-view';

// ----------------------------------------------------------------------

export function NotFoundLayout() {
  return (
    <SimpleLayout content={{ compact: true }}>
      <NotFoundView />
    </SimpleLayout>
  );
}
