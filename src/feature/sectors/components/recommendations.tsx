'use client';

import Image from 'next/image';
import {
  Lightbulb,
  Target,
  Activity,
  BarChart3,
  Award,
  Zap,
  CalendarClock,
  Sigma,
  PencilLine
} from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import type { Question } from '@/feature/sectors/types';

interface RecommendationsProps {
  noAnswered: Question[];
  isExportingPdf?: boolean;
}

export function Recommendations({ noAnswered, isExportingPdf = false }: RecommendationsProps) {
  if (noAnswered.length === 0) return null;

  const allItemValues = noAnswered.map((_, idx) => `item-${idx}`);

  return (
    <Card className='w-full shadow-sm'>
      <CardHeader className='pb-3'>
        <CardTitle className='flex items-center text-xl font-semibold text-primary'>
          <Lightbulb className='mr-2 h-5 w-5 text-amber-500 fill-amber-200' />
          Recomendaciones
        </CardTitle>
        <CardDescription>
          {`Basado en tus respuestas, aquí tienes ${noAnswered.length} recomendaciones para mejorar tu desempeño.`}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Accordion
          type='multiple'
          className='space-y-2 pb-5'
          defaultValue={isExportingPdf ? allItemValues : undefined}
        >
          {noAnswered.map((recommendation, idx) => (
            <AccordionItem
              key={idx}
              value={`item-${idx}`}
              className='border rounded-lg overflow-hidden'
            >
              <AccordionTrigger className='px-4 py-3 text-left hover:bg-muted/50 data-[state=open]:bg-muted/50 group'>
                <div className='flex items-center gap-3'>
                  <Badge
                    variant='outline'
                    className='bg-primary/10 text-primary border-primary/30'
                  >
                    {idx + 1}
                  </Badge>
                  <div className='flex flex-col gap-1'>
                    <span className='font-medium text-base group-data-[state=open]:text-primary transition-colors flex items-center'>
                      {recommendation.actions.length > 35
                        ? `${recommendation.actions.substring(0, 35)}...`
                        : recommendation.actions}
                    </span>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className='px-0 pt-0 pb-0'>
                <div className='bg-muted/30 p-4 rounded-b-lg'>
                  <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
                    <div className='lg:col-span-2 space-y-4'>
                      <div className='space-y-3'>
                        <h4 className='font-semibold flex items-center gap-2'>
                          <Activity className='h-4 w-4 text-emerald-500' />
                          Acción
                        </h4>
                        <p className='text-sm'>{recommendation.actions}</p>
                      </div>

                      <Separator />

                      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                        <div className='space-y-3'>
                          <h4 className='font-semibold flex items-center gap-2'>
                            <BarChart3 className='h-4 w-4 text-blue-500' />
                            Indicador
                          </h4>
                          <div className='space-y-2 text-sm'>
                            <div className='flex flex-col'>
                              <span className='text-muted-foreground text-xs flex items-center gap-1'>
                                <PencilLine className='h-4 w-4 text-indigo-400' />
                                Nombre:
                              </span>
                              <span>{recommendation.name_indicator}</span>
                            </div>
                            <div className='flex flex-col'>
                              <span className='text-muted-foreground text-xs flex items-center gap-1'>
                                <CalendarClock className='h-4 w-4 text-indigo-400' />
                                Frecuencia:
                              </span>
                              <span>{recommendation.frequency_indicator}</span>
                            </div>
                            <div className='flex flex-col'>
                              <span className='text-muted-foreground text-xs flex items-center gap-1'>
                                <Sigma className='h-4 w-4 text-indigo-400' />
                                Ecuación:
                              </span>
                              <span className='font-mono text-xs bg-muted p-1 rounded'>
                                {recommendation.equation_indicator}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className='space-y-3'>
                          {recommendation.recommended_goal_indicator && (
                            <div className='space-y-2'>
                              <h4 className='font-semibold flex items-center gap-2'>
                                <Target className='h-4 w-4 text-purple-500' />
                                Meta recomendada
                              </h4>
                              <p className='text-sm'>
                                {recommendation.recommended_goal_indicator}
                              </p>
                            </div>
                          )}

                          {recommendation.co_benefits && (
                            <div className='space-y-2'>
                              <h4 className='font-semibold flex items-center gap-2'>
                                <Zap className='h-4 w-4 text-amber-500' />
                                Co-beneficios
                              </h4>
                              <p className='text-sm'>
                                {recommendation.co_benefits}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className='flex flex-col gap-3 items-center lg:items-start'>
                      <div className='bg-muted/50 p-3 rounded-lg w-full'>
                        <h4 className='font-semibold flex items-center gap-2 mb-2'>
                          <Award className='h-4 w-4 text-teal-500' />
                          Objetivos de Desarrollo Sostenible
                        </h4>
                        <div className='flex items-center gap-4'>
                          <div className='relative w-16 h-16 shrink-0'>
                            <Image
                              src={
                                recommendation.ods_url_image ||
                                'https://mvmqtbdmqnqbejeyeruu.supabase.co/storage/v1/object/public/ods//13.png'
                              }
                              alt={`ODS ${recommendation.ods_id}`}
                              fill
                              className='object-contain'
                            />
                          </div>
                          <div className='text-sm'>
                            <p className='font-medium capitalize'>
                              {recommendation.ods}
                            </p>
                            <p className='text-xs text-muted-foreground mt-1'>
                              {recommendation.ods_goal}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </CardContent>
    </Card>
  );
}
