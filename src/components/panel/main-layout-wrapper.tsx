import type React from 'react';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/theme/theme-provider';
import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/sidebar/app-sidebar';
import { Toaster } from '@/components/ui/sonner';
import { CSPostHogProvider } from '@/providers/posthog-provider';
import { PymesMiddleware } from '@/components/pymes/middleware';
import { FloatingManualButton } from '@/components/common/floating-manual-button';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Zuma - Calculadora de Huella de Carbono',
  description:
    'Aplicativo informático para evaluar los impactos y avances en sostenibilidad de las pymes según los compromisos de las contribuciones determinadas a nivel nacional (NDC) de Colombia a 2030.'
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='es' suppressHydrationWarning>
      <body className={inter.className}>
        <CSPostHogProvider>
          <ThemeProvider
            attribute='class'
            defaultTheme='light'
            enableSystem
            disableTransitionOnChange
          >
            <PymesMiddleware>
              <SidebarProvider>
                <div className='flex min-h-screen'>
                  <AppSidebar />
                  <main className='flex-1'>{children}</main>
                  <FloatingManualButton />
                  <Toaster />
                </div>
              </SidebarProvider>
            </PymesMiddleware>
          </ThemeProvider>
        </CSPostHogProvider>
      </body>
    </html>
  );
}
