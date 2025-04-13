'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Leaf, Users, Building, CheckCircle2, AlertCircle } from 'lucide-react';
import type { SectorData } from '@/feature/tools/types';

interface SectorFormProps {
  temas: Array<{ tema: string; categoria: string }>;
  existingData: SectorData;
  onDataUpdate: (data: SectorData) => void;
  onComplete?: () => void;
}

export default function SectorForm({
  temas,
  existingData,
  onDataUpdate,
  onComplete
}: SectorFormProps) {
  const [formData, setFormData] = useState<SectorData>(existingData || {});
  const [isComplete, setIsComplete] = useState(false);
  const [completionPercentage, setCompletionPercentage] = useState(0);

  useEffect(() => {
    // Calculate completion percentage and check if all temas have ratings
    let completedItems = 0;
    const totalFields = temas.length * 2; // Two ratings per tema

    temas.forEach(({ tema }) => {
      if (formData[tema]?.empresaRating !== undefined) completedItems++;
      if (formData[tema]?.interesRating !== undefined) completedItems++;
    });

    const percentage = Math.round((completedItems / totalFields) * 100);
    setCompletionPercentage(percentage);
    setIsComplete(percentage === 100);
  }, [formData, temas]);

  const handleRatingChange = (
    tema: string,
    field: 'empresaRating' | 'interesRating',
    value: string
  ) => {
    const numValue = Number.parseFloat(value);

    // Validate input is between 0 and 5
    if (isNaN(numValue) || numValue < 0 || numValue > 5) return;

    setFormData((prev) => ({
      ...prev,
      [tema]: {
        ...prev[tema],
        [field]: numValue
      }
    }));
  };

  const handleSubmit = () => {
    onDataUpdate(formData);
    if (onComplete && isComplete) {
      onComplete();
    }
  };

  const getCategoryColor = (categoria: string) => {
    switch (categoria.toLowerCase()) {
      case 'ambiental':
        return 'bg-green-100 text-green-800 hover:bg-green-100';
      case 'sociales':
        return 'bg-blue-100 text-blue-800 hover:bg-blue-100';
      case 'económico y de gobernanza':
        return 'bg-amber-100 text-amber-800 hover:bg-amber-100';
      default:
        return 'bg-gray-100 text-gray-800 hover:bg-gray-100';
    }
  };

  const getCategoryIcon = (categoria: string) => {
    switch (categoria.toLowerCase()) {
      case 'ambiental':
        return <Leaf className='h-5 w-5 text-green-600' />;
      case 'sociales':
        return <Users className='h-5 w-5 text-blue-600' />;
      case 'económico y de gobernanza':
        return <Building className='h-5 w-5 text-amber-600' />;
      default:
        return null;
    }
  };

  const getCategoryBorderColor = (categoria: string) => {
    switch (categoria.toLowerCase()) {
      case 'ambiental':
        return 'border-green-200';
      case 'sociales':
        return 'border-blue-200';
      case 'económico y de gobernanza':
        return 'border-amber-200';
      default:
        return 'border-gray-200';
    }
  };

  return (
    <div className='space-y-6'>
      <div className='space-y-2'>
        <div className='flex justify-between text-sm'>
          <span>Progreso</span>
          <span className='flex items-center gap-1'>
            {isComplete ? (
              <CheckCircle2 className='h-4 w-4 text-green-500' />
            ) : (
              <AlertCircle className='h-4 w-4 text-amber-500' />
            )}
            {completionPercentage}% completado
          </span>
        </div>
        <Progress value={completionPercentage} className='h-2' />
      </div>

      {temas.map(({ tema, categoria }, index) => (
        <div
          key={`${tema}-${index}`}
          className={`p-6 border-2 rounded-lg space-y-6 shadow-sm ${getCategoryBorderColor(categoria)}`}
        >
          <div className='flex flex-wrap items-center gap-2'>
            <div className='flex items-center gap-2'>
              {getCategoryIcon(categoria)}
              <h3 className='font-medium text-lg'>{tema}</h3>
            </div>
            <Badge
              className={`${getCategoryColor(categoria)} font-normal ml-auto`}
            >
              {categoria}
            </Badge>
          </div>

          <div className='grid md:grid-cols-2 gap-6'>
            <div className='space-y-4 p-4 rounded-lg'>
              <div className='flex justify-between items-center'>
                <label className='font-medium'>
                  Importancia para la empresa
                </label>
                <div
                  className={`text-xl font-bold px-3 py-1 rounded-md ${
                    formData[tema]?.empresaRating !== undefined
                      ? 'bg-primary text-white dark:bg-gray-700 dark:text-white'
                      : 'bg-gray-200 text-gray-500 dark:bg-gray-500 dark:text-gray-400'
                  }`}
                >
                  {formData[tema]?.empresaRating !== undefined
                    ? formData[tema]?.empresaRating.toFixed(1)
                    : '-'}
                </div>
              </div>
              <div className='flex items-center'>
                <div className='flex-1'>
                  <Input
                    type='number'
                    min='0'
                    max='5'
                    step='0.1'
                    value={formData[tema]?.empresaRating ?? ''}
                    onChange={(e) =>
                      handleRatingChange(tema, 'empresaRating', e.target.value)
                    }
                    placeholder='0.0 - 5.0'
                  />
                </div>
              </div>
              <div className='flex justify-between text-xs text-muted-foreground'>
                <span>Baja importancia (0.0)</span>
                <span>Alta importancia (5.0)</span>
              </div>
            </div>

            <div className='space-y-4 p-4 rounded-lg'>
              <div className='flex justify-between items-center'>
                <label className='font-medium'>
                  Importancia para Grupos de Interés
                </label>
                <div
                  className={`text-xl font-bold px-3 py-1 rounded-md ${
                    formData[tema]?.interesRating !== undefined
                      ? 'bg-primary text-white dark:bg-gray-800 dark:text-white'
                      : 'bg-gray-200 text-gray-500 dark:bg-gray-600 dark:text-gray-400'
                  }`}
                >
                  {formData[tema]?.interesRating !== undefined
                    ? formData[tema]?.interesRating.toFixed(1)
                    : '-'}
                </div>
              </div>
              <div className='flex items-center'>
                <div className='flex-1'>
                  <Input
                    type='number'
                    min='0'
                    max='5'
                    step='0.1'
                    value={formData[tema]?.interesRating ?? ''}
                    onChange={(e) =>
                      handleRatingChange(tema, 'interesRating', e.target.value)
                    }
                    placeholder='0.0 - 5.0'
                  />
                </div>
              </div>
              <div className='flex justify-between text-xs text-muted-foreground'>
                <span>Baja importancia (0.0)</span>
                <span>Alta importancia (5.0)</span>
              </div>
            </div>
          </div>
        </div>
      ))}

      <Button
        onClick={handleSubmit}
        disabled={!isComplete}
        className={`w-full py-6 text-lg ${isComplete ? 'cursor-pointer' : ''}`}
        size='lg'
      >
        {isComplete ? (
          <span className='flex items-center gap-2 cursor-pointer'>
            <CheckCircle2 className='h-5 w-5 cursor-pointer' />
            Guardar y Ver Matriz
          </span>
        ) : (
          `Complete todos los campos (${completionPercentage}%)`
        )}
      </Button>
    </div>
  );
}
