import type React from 'react';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/providers/theme-provider';
import { QueryProvider } from '@/providers/query-provider';
import { CSPostHogProvider } from '@/providers/posthog-provider';
import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/sidebar/app-sidebar';
import { Toaster } from '@/components/ui/sonner';
import { PymesMiddleware } from '@/components/pymes/middleware';
import { FloatingManualButton } from '@/components/common/floating-manual-button';
import { FloatingBubbleProvider } from '@/providers/floating-bubble-provider';

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
            <QueryProvider>
              <PymesMiddleware>
                <SidebarProvider>
                  <div className='flex min-h-screen'>
                    <AppSidebar />
                    <main className='flex-1'>{children}</main>
                    <FloatingManualButton />
                    <FloatingBubbleProvider iframeUrl='https://docs.google.com/forms/d/e/1FAIpQLSfKNiB0sgcxW6ckluqfntdLYYQKBL9gNmuCR3ho7PhBLdzksg/viewform?embedded=true' />
                    <Toaster />
                  </div>
                </SidebarProvider>
              </PymesMiddleware>
            </QueryProvider>
          </ThemeProvider>
        </CSPostHogProvider>
      </body>
    </html>
  );
}
