'use client';

import type React from 'react';
import { Building } from 'lucide-react';
import { SECTOR_METADATA } from '@/feature/sectors/constants';

interface SectorSelectionProps {
  sectors: string[];
  selectedSector: string;
  onSelectSector: (sector: string) => void;
}

export default function SectorSelection({
  sectors,
  selectedSector,
  onSelectSector
}: SectorSelectionProps) {
  const defaultIcon = <Building className='h-10 w-10 mb-2 text-gray-500' />;

  return (
    <div className='space-y-6'>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
        {sectors.map((sectorKey) => {
          const { name, icon } = SECTOR_METADATA[sectorKey] || {
            name: sectorKey,
            icon: defaultIcon
          };

          return (
            <div
              key={sectorKey}
              className={`border rounded-lg p-6 cursor-pointer transition-all hover:shadow-md flex flex-col items-center text-center ${
                selectedSector === sectorKey
                  ? 'border-primary bg-primary/5 shadow-sm'
                  : 'hover:border-gray-300'
              }`}
              onClick={() => onSelectSector(sectorKey)}
            >
              {icon}
              <h3 className='font-medium text-lg'>{name}</h3>
            </div>
          );
        })}
      </div>
    </div>
  );
}
