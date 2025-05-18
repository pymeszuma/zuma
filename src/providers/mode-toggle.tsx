'use client';

import { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useSidebar, SidebarMenuButton } from '@/components/ui/sidebar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';

export function ModeToggle() {
  const { setTheme, theme } = useTheme();
  const { state: sidebarState } = useSidebar();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const readableTheme =
    theme === 'dark' ? 'Oscuro' : theme === 'light' ? 'Claro' : 'Sistema';

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <SidebarMenuButton size='lg' className='cursor-pointer'>
          <div className='relative flex size-6 items-center justify-center'>
            <Sun className='h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0' />
            <Moon className='absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100' />
          </div>
          {sidebarState === 'expanded' && (
            <div className='flex flex-col text-left text-sm leading-tight'>
              <span className='font-medium'>Cambiar tema</span>
              <span className='text-xs text-muted-foreground'>
                {mounted ? readableTheme : '...'}
              </span>
            </div>
          )}
        </SidebarMenuButton>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='start' sideOffset={4}>
        <DropdownMenuItem onClick={() => setTheme('light')}>
          Claro
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme('dark')}>
          Oscuro
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme('system')}>
          Sistema
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>

    // <div className='w-full flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-2 sm:space-y-0 sm:space-x-4'>
    //   <div className='flex flex-col'>
    //     <span className='text-sm font-medium'>Cambiar tema</span>
    //     <span className='text-xs text-muted-foreground'>
    //       {mounted ? readableTheme : '...'}
    //     </span>
    //   </div>
    //   <DropdownMenu>
    //     <DropdownMenuTrigger asChild>
    //       <Button variant='outline' size='icon'>
    //         <Sun className='h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0' />
    //         <Moon className='absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100' />
    //         <span className='sr-only'>Cambiar tema</span>
    //       </Button>
    //     </DropdownMenuTrigger>
    //     <DropdownMenuContent align='end'>
    //       <DropdownMenuItem onClick={() => setTheme('light')}>
    //         Claro
    //       </DropdownMenuItem>
    //       <DropdownMenuItem onClick={() => setTheme('dark')}>
    //         Oscuro
    //       </DropdownMenuItem>
    //       <DropdownMenuItem onClick={() => setTheme('system')}>
    //         Sistema
    //       </DropdownMenuItem>
    //     </DropdownMenuContent>
    //   </DropdownMenu>
    // </div>
  );
}
