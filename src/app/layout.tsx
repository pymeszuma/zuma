import { ReactNode } from 'react';
import './globals.css';
import MainLayoutWrapper from '@/components/panel/main-layout-wrapper';

type Props = {
  children: ReactNode;
};

// Since we have a `not-found.tsx` page on the root, a layout file
// is required, even if it's just passing children through.
export default function RootLayout({ children }: Props) {
  return <MainLayoutWrapper>{children}</MainLayoutWrapper>;
}
