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
                  Evalúe la importancia de cada tema en una escala de 1 a 5
                  <table className='w-full mt-4 text-sm text-left'>
                    <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
                      <tr>
                        <th scope='col' className='px-6 py-3'>
                          Nivel de Importancia
                        </th>
                        <th scope='col' className='px-6 py-3'>
                          Interpretación del Puntaje
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className='bg-white border-b dark:bg-gray-800 dark:border-gray-700'>
                        <td className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'>
                          1 - Muy bajo
                        </td>
                        <td className='px-6 py-4'>
                          El tema o criterio está ausente o es irrelevante para
                          el sector. No aporta valor ni orientación útil.
                        </td>
                      </tr>
                      <tr className='bg-white border-b dark:bg-gray-800 dark:border-gray-700'>
                        <td className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'>
                          2 - Bajo
                        </td>
                        <td className='px-6 py-4'>
                          Se menciona superficialmente, pero no está bien
                          desarrollado ni adaptado a la realidad del sector.
                        </td>
                      </tr>
                      <tr className='bg-white border-b dark:bg-gray-800 dark:border-gray-700'>
                        <td className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'>
                          3 - Aceptable
                        </td>
                        <td className='px-6 py-4'>
                          Tiene un enfoque general adecuado, pero le falta
                          profundidad, contextualización o aplicabilidad.
                        </td>
                      </tr>
                      <tr className='bg-white border-b dark:bg-gray-800 dark:border-gray-700'>
                        <td className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'>
                          4 - Bueno
                        </td>
                        <td className='px-6 py-4'>
                          Está bien formulado, es útil para el sector y permite
                          tomar decisiones, aunque aún puede fortalecerse.
                        </td>
                      </tr>
                      <tr className='bg-white dark:bg-gray-800'>
                        <td className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'>
                          5 - Excelente
                        </td>
                        <td className='px-6 py-4'>
                          Altamente relevante, contextualizado y claro.
                          Proporciona orientación precisa y aplicable de forma
                          directa.
                        </td>
                      </tr>
                    </tbody>
                  </table>
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
