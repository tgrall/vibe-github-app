// This file is only needed to redirect root requests to the default locale
// The actual layout is in [locale]/layout.tsx

import {redirect} from 'next/navigation';

export default function RootLayout() {
  // This should only be reached when accessing "/" directly
  redirect('/en');
}
