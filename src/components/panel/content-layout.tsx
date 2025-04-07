'use client';
import { cn } from '@/lib/utils';

import {
  SidebarInset,
  SidebarTrigger,
  useSidebar
} from '@/components/ui/sidebar';
import { Separator } from '@/components/ui/separator';
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
          <Separator orientation='vertical' className='mr-2 h-4' />
          <h1 className='text-sm'>{title}</h1>
          {title !== 'Error' ? (
            <>
              <Separator className='hidden w-2 md:flex' />
              {/* <DynamicBreadcrumb /> */}
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
