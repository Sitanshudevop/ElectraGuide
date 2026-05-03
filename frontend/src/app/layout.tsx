import type { Metadata } from 'next';
import PropTypes from 'prop-types';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import TopNav from '@/components/TopNav';
import VoxAssist from '@/components/VoxAssist';
import { LanguageProvider } from '@/context/LanguageContext';
import { AuthProvider } from '@/context/AuthContext';
import { RemoteConfigProvider } from '@/context/RemoteConfigContext';
import { Suspense } from 'react';
import FirebaseAnalytics from '@/components/FirebaseAnalytics';
import ErrorBoundary from '@/components/ErrorBoundary';
import AppHealthFooter from '@/components/AppHealthFooter';
import Script from 'next/script';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'VoxAgent | ElectaGuide',
  description: 'Your unbiased, interactive Election Process Assistant.',
};

/**
 * The root layout component for the entire ElectraGuide application.
 * Wraps pages in global providers (Auth, Language, RemoteConfig) and common UI elements.
 *
 * @param {Object} props - The layout props.
 * @param {React.ReactNode} props.children - The nested page content.
 * @returns {JSX.Element} The rendered root layout component.
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <Script src="https://www.gstatic.com/charts/loader.js" strategy="beforeInteractive" />
      </head>
      <body className="min-h-full flex flex-col bg-slate-50 dark:bg-slate-900">
        <Suspense fallback={null}>
          <FirebaseAnalytics />
        </Suspense>
        <AuthProvider>
          <RemoteConfigProvider>
            <LanguageProvider>
              <TopNav />
              <ErrorBoundary>{children}</ErrorBoundary>
              <VoxAssist />
              <AppHealthFooter />
            </LanguageProvider>
          </RemoteConfigProvider>
        </AuthProvider>
      </body>
    </html>
  );
}

RootLayout.propTypes = {
  children: PropTypes.node.isRequired,
};
