'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BarChart3, BookOpen, Building2, Home, Leaf } from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
  useSidebar
} from '@/components/ui/sidebar';
import { ModeToggle } from '@/components/theme/mode-toggle';
import { sectors } from '@/feature/sectors/constants';
import packageJson from '@/../package.json';

const applicationVersion = packageJson?.version ?? '0.0.0';

export function AppSidebar() {
  const pathname = usePathname();
  const { state: sidebarState } = useSidebar();

  return (
    <Sidebar collapsible='icon'>
      <SidebarHeader className='border-b'>
        <div className='flex h-14 items-center px-4'>
          <Link href='/' className='flex items-baseline justify-center w-full'>
            <div className='flex items-center gap-2'>
              <div className='flex h-8 w-8 items-center justify-center rounded'>
                <Leaf className='h-6 w-6 text-green-600' />
              </div>
              {sidebarState === 'expanded' && (
                <>
                  <span className='text-xl font-semibold'>ZUMA</span>
                  <span className='text-xs text-muted-foreground'>
                    {` v${applicationVersion}`}
                  </span>
                </>
              )}
            </div>
          </Link>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu className='p-2'>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={pathname === '/'}>
              <Link href='/'>
                <Home className='h-4 w-4' />
                <span>Inicio</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              isActive={pathname?.startsWith('/sectors')}
            >
              <Link href='/sectors'>
                <Building2 className='h-4 w-4' />
                <span>Sectores</span>
              </Link>
            </SidebarMenuButton>
            <SidebarMenuSub>
              {sectors.map((sector) => (
                <SidebarMenuSubItem key={sector.path}>
                  <SidebarMenuSubButton
                    asChild
                    isActive={pathname === sector.path}
                    className={
                      !sector.isActive ? 'text-muted-foreground' : undefined
                    }
                  >
                    {sector.isActive ? (
                      <Link href={sector.path} className='truncate'>
                        {sector.icon}
                        {sector.title}
                      </Link>
                    ) : (
                      <div className='truncate cursor-not-allowed'>
                        {sector.icon}
                        {sector.title}
                      </div>
                    )}
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
              ))}
            </SidebarMenuSub>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              isActive={pathname?.startsWith('/tools')}
            >
              <Link href='/tools'>
                <Leaf className='h-4 w-4' />
                <span>Herramientas</span>
              </Link>
            </SidebarMenuButton>
            <SidebarMenuSub>
              <SidebarMenuSubItem>
                <SidebarMenuSubButton
                  asChild
                  isActive={pathname === '/tools/materiality'}
                >
                  <Link href='/tools/materiality'>Materialidad</Link>
                </SidebarMenuSubButton>
              </SidebarMenuSubItem>
              <SidebarMenuSubItem>
                <SidebarMenuSubButton
                  asChild
                  isActive={pathname === '/tools/gei-estimation'}
                >
                  <Link href='/tools/gei-estimation'>Estimación GEI</Link>
                </SidebarMenuSubButton>
              </SidebarMenuSubItem>
            </SidebarMenuSub>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              isActive={pathname?.startsWith('/training')}
            >
              <Link href='/training'>
                <BookOpen className='h-4 w-4' />
                <span>Capacitación</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              isActive={pathname?.startsWith('/dashboard')}
            >
              <Link href='/dashboard'>
                <BarChart3 className='h-4 w-4' />
                <span>Dashboard</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>
      {/* Footer */}
      <SidebarFooter className='border-t'>
        <SidebarMenu>
          <SidebarMenuItem>
            <div className='px-1 py-2'>
              <ModeToggle />
            </div>
          </SidebarMenuItem>
          {/* AUTH */}
          {/* <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link href='/profile'>
                <User className='h-4 w-4' />
                <span>Perfil</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link href='/settings'>
                <Settings className='h-4 w-4' />
                <span>Configuración</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <button className='w-full'>
                <LogOut className='h-4 w-4' />
                <span>Cerrar sesión</span>
              </button>
            </SidebarMenuButton>
          </SidebarMenuItem> */}
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
