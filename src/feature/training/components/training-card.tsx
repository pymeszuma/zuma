'use client';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import Link from 'next/link';

interface TrainingCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  type: string;
  duration: string;
  href: string;
}

export function TrainingCard({
  title,
  description,
  icon,
  type,
  duration,
  href
}: TrainingCardProps) {
  return (
    <Card className='flex flex-col justify-between h-full'>
      <CardHeader>
        <div className='flex items-center gap-2 mb-2'>
          {icon}
          <span className='text-xs font-medium px-2 py-1 rounded-full bg-green-100 text-green-800'>
            {type}
          </span>
        </div>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className='text-sm text-muted-foreground'>
          <p>Duración: {duration}</p>
        </div>
      </CardContent>
      <CardFooter className='mt-auto'>
        <Button asChild className='w-full'>
          <Link href={href}>Acceder</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
