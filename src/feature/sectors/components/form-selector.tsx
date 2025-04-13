'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';

export interface FormOption {
  id: string;
  title: string;
  description: string;
  content: string;
  icon: React.ReactNode;
  bullets: string[];
  color: string; // example: 'green' or 'blue'
  url: string;
}

interface SelectFormProps {
  surveyTitle: string;
  surveySubtitle: string;
  options: FormOption[];
}

export default function SelectForm({
  surveyTitle,
  surveySubtitle,
  options
}: SelectFormProps) {
  const router = useRouter();

  const handleSelect = (url: string) => {
    router.push(`${url}`);
  };

  return (
    <>
      <div className='text-center mb-10'>
        <h1 className='text-3xl font-bold mb-3'>{surveyTitle}</h1>
        <p className='text-muted-foreground max-w-2xl mx-auto'>
          {surveySubtitle}
        </p>
      </div>

      <div className='grid md:grid-cols-2 gap-6 items-stretch'>
        {options.map((option) => (
          <Card
            key={option.id}
            className='flex flex-col justify-between cursor-pointer transition-all hover:shadow-md h-full'
            onClick={() => handleSelect(option.url)}
          >
            <div>
              <CardHeader className='pb-2'>
                <div
                  className={`w-12 h-12 rounded-full bg-${option.color}-100 flex items-center justify-center mb-2`}
                >
                  {option.icon}
                </div>
                <CardTitle>{option.title}</CardTitle>
                <CardDescription>{option.description}</CardDescription>
              </CardHeader>

              <CardContent>
                <p className='text-sm text-muted-foreground'>
                  {option.content}
                </p>
                <div className='mt-4 space-y-2'>
                  {option.bullets.map((bullet, i) => (
                    <div key={i} className='flex items-center gap-2'>
                      <div
                        className={`w-1.5 h-1.5 rounded-full bg-${option.color}-500`}
                      ></div>
                      <span className='text-sm'>{bullet}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </div>

            <CardFooter className='mt-auto'>
              <Button
                className='w-full cursor-pointer'
                onClick={() => handleSelect(option.url)}
              >
                Seleccionar {option.title}{' '}
                <ArrowRight className='ml-2 h-4 w-4' />
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </>
  );
}
