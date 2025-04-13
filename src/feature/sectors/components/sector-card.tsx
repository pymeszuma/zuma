'use client';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import Link from 'next/link';

interface SectorCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  href: string;
  active?: boolean;
}

export function SectorCard({
  title,
  description,
  icon,
  href,
  active
}: SectorCardProps) {
  return (
    <Card
      className={`flex flex-col justify-between h-full ${
        active ? 'border-green-500 shadow-md' : ''
      }`}
    >
      <div>
        <CardHeader>
          <CardTitle className='flex items-center gap-2'>
            {icon}
            {title}
            {active && (
              <span className='ml-auto text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full'>
                Disponible
              </span>
            )}
          </CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
      </div>
      <CardFooter className='mt-auto flex flex-col gap-1'>
        <Button
          asChild
          variant={active ? 'default' : 'outline'}
          className='w-full'
        >
          {active ? (
            <Link href={`${href}/adaptability`}>Adaptabilidad</Link>
          ) : (
            <span className='text-muted-foreground'>Próximamente</span>
          )}
        </Button>
        <Button
          asChild
          variant={active ? 'default' : 'outline'}
          className='w-full'
        >
          {active ? (
            <Link href={`${href}/mitigation`}>Mitigación</Link>
          ) : (
            <span className='text-muted-foreground'>Próximamente</span>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}
