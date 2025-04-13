'use client';

import { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import SectorSelection from '@/feature/tools/components/sector-selection';
import SectorForm from '@/feature/tools/components/sector-form';
import MaterialityMatrix from '@/feature/tools/components/materiality-matrix';
import StakeholderGroups from '@/feature/tools/components/stakeholder-groups';
import { materialitySurveyData } from '@/feature/tools/data';
import type { MaterialityData, SectorData } from '@/feature/tools/types';
import { ContentLayout } from '@/components/panel/content-layout';
import { sectorLabels } from '@/feature/sectors/constants';

export default function MaterialityAssessment() {
  const [materialityData, setMaterialityData] = useState<MaterialityData>({});
  const [activeTab, setActiveTab] = useState('sector');
  const [selectedSector, setSelectedSector] = useState<string>('');

  const handleDataUpdate = (sectorName: string, updatedData: SectorData) => {
    setMaterialityData((prev) => ({
      ...prev,
      [sectorName]: updatedData
    }));
  };

  const isSectorComplete =
    selectedSector &&
    materialityData[selectedSector] &&
    Object.keys(materialityData[selectedSector]).length ===
      materialitySurveyData[
        selectedSector as keyof typeof materialitySurveyData
      ].length;

  const handleSectorSelect = (sector: string) => {
    setSelectedSector(sector);
    setActiveTab('form');
  };

  return (
    <ContentLayout title='Materiality' className='px-8 py-2'>
      <h1 className='text-3xl font-bold mb-6 text-center'>
        Evaluación de Materialidad
      </h1>

      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className='w-full max-w-4xl mx-auto'
      >
        <TabsList className='grid w-full grid-cols-4 mb-8'>
          <TabsTrigger className='cursor-pointer' value='sector'>
            Sectores
          </TabsTrigger>
          <TabsTrigger className='cursor-pointer' value='stakeholders'>
            Grupos de Interés
          </TabsTrigger>
          <TabsTrigger
            className={selectedSector ? 'cursor-pointer' : ''}
            value='form'
            disabled={!selectedSector}
          >
            Formulario
          </TabsTrigger>
          <TabsTrigger
            className={isSectorComplete ? 'cursor-pointer' : ''}
            value='matrix'
            disabled={!isSectorComplete}
            title={
              !isSectorComplete ? 'Complete el sector para ver la matriz' : ''
            }
          >
            Matriz
          </TabsTrigger>
        </TabsList>

        <TabsContent value='sector' className='space-y-8'>
          <Card>
            <CardHeader>
              <CardTitle>Selección de Sector</CardTitle>
              <CardDescription>
                Seleccione el sector para el cual desea realizar la evaluación
                de materialidad
              </CardDescription>
            </CardHeader>
            <CardContent>
              <SectorSelection
                sectors={Object.keys(materialitySurveyData)}
                selectedSector={selectedSector}
                onSelectSector={handleSectorSelect}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value='stakeholders'>
          <StakeholderGroups />
        </TabsContent>

        <TabsContent value='form' className='space-y-8'>
          {selectedSector ? (
            <Card>
              <CardHeader>
                <CardTitle>{sectorLabels[selectedSector]}</CardTitle>
                <CardDescription>
                  Evalúe la importancia de cada tema en una escala de 0 a 5
                </CardDescription>
              </CardHeader>
              <CardContent>
                <SectorForm
                  temas={
                    materialitySurveyData[
                      selectedSector as keyof typeof materialitySurveyData
                    ]
                  }
                  existingData={materialityData[selectedSector] || {}}
                  onDataUpdate={(data) =>
                    handleDataUpdate(selectedSector, data)
                  }
                  onComplete={() => setActiveTab('matrix')}
                />
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className='pt-6'>
                <p>Por favor, seleccione un sector primero.</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value='matrix'>
          <Card>
            <CardHeader>
              <CardTitle>
                Matriz de Materialidad - {sectorLabels[selectedSector]}
              </CardTitle>
              <CardDescription>
                Visualización de la importancia de cada tema para la empresa y
                los grupos de interés
              </CardDescription>
            </CardHeader>
            <CardContent>
              <MaterialityMatrix
                data={materialityData}
                selectedSector={selectedSector}
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </ContentLayout>
  );
}
