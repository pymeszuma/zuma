/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import React from 'react';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from '@/components/ui/breadcrumb';
import { usePathname } from 'next/navigation';

export const DynamicBreadcrumb = () => {
  const pathname = usePathname();

  const pathArray = pathname.split('/').filter(Boolean);

  const breadcrumbs = [
    <BreadcrumbItem key='root'>
      <BreadcrumbLink href='/'>Inicio</BreadcrumbLink>
    </BreadcrumbItem>
  ];

  // console.log('pathArray: ', pathArray);
  // add the rest of the breadcrumbs but the last one use the BreadcrumbPage component
  pathArray.forEach((path, index) => {
    console.log('path: ', path);
    if (index === pathArray.length - 1) {
      breadcrumbs.push(
        <BreadcrumbItem key={path} className='capitalize'>
          <BreadcrumbPage>{path.replaceAll('-', ' ')}</BreadcrumbPage>
        </BreadcrumbItem>
      );
    } else if (path === 'envs') {
      // skip locale
    } else {
      breadcrumbs.push(
        <BreadcrumbItem key={path} className='capitalize'>
          <BreadcrumbLink href={`/${path}`}>
            {path.replaceAll('-', ' ')}
          </BreadcrumbLink>
        </BreadcrumbItem>
      );
    }
  });

  return (
    <Breadcrumb className='hidden md:flex'>
      <BreadcrumbList>
        {breadcrumbs.map((breadcrumb, index) => (
          <React.Fragment key={index}>
            {breadcrumb}
            {index < breadcrumbs.length - 1 && (
              <BreadcrumbSeparator>/</BreadcrumbSeparator>
            )}
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
};
