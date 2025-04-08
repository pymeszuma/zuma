import {
  Car,
  Drill,
  Factory,
  HandHeart,
  Lightbulb,
  Tractor
} from 'lucide-react';

export const sectors = [
  {
    title: 'Energía y Minería',
    icon: <Lightbulb className='h-10 w-10' />,
    path: '/sectors/energy-mining',
    description:
      'Cálculo de huella de carbono para empresas del sector energético y minero',
    isActive: true
  },
  {
    title: 'Transporte y Logística',
    icon: <Car className='h-10 w-10' />,
    path: '/sectors/transportation',
    description:
      'Cálculo de huella de carbono para empresas de transporte y logística',
    isActive: false
  },
  {
    title: 'Construcción e Infraestructura',
    icon: <Drill className='h-10 w-10' />,
    path: '/sectors/construction',
    description:
      'Cálculo de huella de carbono para empresas de construcción e infraestructura',
    isActive: false
  },
  {
    title: 'Industrial y Manufacturero',
    icon: <Factory className='h-10 w-10' />,
    path: '/sectors/manufacturing',
    description:
      'Cálculo de huella de carbono para empresas industriales y manufactureras',
    isActive: false
  },
  {
    title: 'Agropecuario y Forestal',
    icon: <Tractor className='h-10 w-10' />,
    path: '/sectors/agriculture',
    description:
      'Cálculo de huella de carbono para empresas agropecuarias y forestales',
    isActive: false
  },
  {
    title: 'Servicios y Comercio',
    icon: <HandHeart className='h-10 w-10' />,
    path: '/sectors/services',
    description:
      'Cálculo de huella de carbono para empresas de servicios y comercio',
    isActive: false
  }
];
