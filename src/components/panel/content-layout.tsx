'use client';
import { cn } from '@/lib/utils';

import {
  SidebarInset,
  SidebarTrigger,
  useSidebar
} from '@/components/ui/sidebar';
import { DynamicBreadcrumb } from '@/components/common/dynamic-breadcrumb';

interface ContentLayoutProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

export function ContentLayout({
  title,
  children,
  className
}: ContentLayoutProps) {
  const { open, isMobile } = useSidebar();

  return (
    <SidebarInset>
      <header className='dark:bg-[#f2f2f2]/8 bg-[#808080]/2 fixed top-0 z-50 flex h-16 w-full items-center gap-2 border-b border-[#808080]/10 backdrop-blur-sm dark:border-[#f2f2f2]/10'>
        <div className='flex items-center gap-2 px-4'>
          <SidebarTrigger className='-ml-1' />
          {title !== 'Error' ? (
            <>
              <DynamicBreadcrumb />
            </>
          ) : null}
        </div>
      </header>
      <div
        className={cn(
          'mt-16 h-[calc(100vh)] p-2',
          isMobile && 'w-[calc(100vw-1rem)]',
          open && !isMobile && 'w-[calc(100vw-17rem)]',
          !open && !isMobile && 'w-[calc(100vw-1rem)]',
          className
        )}
      >
        {children}
      </div>
    </SidebarInset>
  );
}
