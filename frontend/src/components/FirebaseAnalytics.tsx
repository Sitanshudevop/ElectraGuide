'use client';

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { analytics } from '../firebase';
import { logEvent } from 'firebase/analytics';

/**
 * A client-side component that initializes Firebase Analytics and logs page views on route changes.
 *
 * @returns {null} This component does not render any visible UI.
 */
export default function FirebaseAnalytics() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (pathname && analytics) {
      const url =
        pathname +
        (searchParams?.toString() ? `?${searchParams.toString()}` : '');
      analytics.then((a) => {
        if (a) {
          logEvent(a, 'page_view', {
            page_path: url,
          });
        }
      });
    }
  }, [pathname, searchParams]);

  return null;
}
