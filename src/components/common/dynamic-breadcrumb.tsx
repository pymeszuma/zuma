'use client';

import React from 'react';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from '@/components/ui/breadcrumb';

export function DynamicBreadcrumb() {
  const pathname = usePathname();

  // Don't render breadcrumb on homepage
  if (pathname === '/') return null;

  // Split the pathname into segments and remove empty strings
  const segments = pathname.split('/').filter(Boolean);

  // Generate breadcrumb items
  const breadcrumbItems = (() => {
    const base = [{ label: 'Inicio', href: '/' }];

    const dynamicItems = segments.map((segment, index) => {
      const href = `/${segments.slice(0, index + 1).join('/')}`;
      const label = segment
        .split('-')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
      return { label, href };
    });

    // Si hay más de 4 segmentos, colapsamos los intermedios
    if (dynamicItems.length > 2) {
      return [
        base[0],
        { label: '...', href: '#' }, // Aquí podrías poner un dropdown en el futuro
        ...dynamicItems.slice(-2)
      ];
    }

    return [...base, ...dynamicItems];
  })();

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {breadcrumbItems.map((item, index) => {
          // Check if this is the last item (current page)
          const isLastItem = index === breadcrumbItems.length - 1;

          return (
            <React.Fragment key={item.href}>
              <BreadcrumbItem>
                {isLastItem ? (
                  <BreadcrumbPage>{item.label}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink asChild>
                    <Link href={item.href}>
                      {index === 0 ? (
                        <span className='flex items-center'>{item.label}</span>
                      ) : (
                        item.label
                      )}
                    </Link>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
              {!isLastItem && <BreadcrumbSeparator />}
            </React.Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
