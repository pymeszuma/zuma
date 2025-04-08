import { SectorCard } from '@/feature/sectors/components/sector-card';
import { sectors } from '@/feature/sectors/constants';

export const ContainerSectorCards = () => {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
      {
        sectors.map((sector, index) => (
          <SectorCard
            key={index}
            title={sector.title}
            description={sector.description}
            icon={sector.icon}
            href={sector.path}
            active={sector.isActive}
          />
        ))
      }
    </div>
  );
};
