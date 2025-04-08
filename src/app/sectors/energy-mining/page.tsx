'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Lightbulb, ArrowRight, Save, FileText } from 'lucide-react';
import Link from 'next/link';
import { EnergySurvey } from '@/feature/sectors/surveys/energy-mining';
import { ContentLayout } from '@/components/panel/content-layout';

export default function EnergyMiningSectorPage() {
  

  return (
    <ContentLayout title='Energy Mining' className='px-8 py-2'>
      <EnergySurvey onComplete={()=> {}}/>
    </ContentLayout>
  );
}
