import {
  Factory,
  HandHeart,
  Lightbulb,
  Leaf,
  CloudLightning,
  Truck,
  HardHat
} from 'lucide-react';

export const sectors = [
  {
    title: 'Energía y Minería',
    icon: <Lightbulb className='h-10 w-10' />,
    path: '/sectors/energy-mining',
    description:
      'Evalúa cómo tu empresa del sector energético o minero está enfrentando el cambio climático, identificando acciones para reducir impactos y adaptarse a nuevos riesgos.',
    isActive: true
  },
  {
    title: 'Transporte y Logística',
    icon: <Truck className='h-10 w-10' />,
    path: '/sectors/transportation',
    description:
      'Conoce cómo tu empresa de transporte o logística puede contribuir a la acción climática, mejorando procesos y preparándose frente a los efectos del clima.',
    isActive: true
  },
  {
    title: 'Construcción e Infraestructura',
    icon: <HardHat className='h-10 w-10' />,
    path: '/sectors/construction',
    description:
      'Explora cómo las empresas del sector construcción pueden avanzar hacia un futuro más sostenible y resiliente ante el cambio climático',
    isActive: false
  },
  {
    title: 'Industrial y Manufacturero',
    icon: <Factory className='h-10 w-10' />,
    path: '/sectors/manufacturing',
    description:
      'Identifica cómo tu empresa industrial o manufacturera puede mejorar su impacto climático y adoptar prácticas más sostenibles.',
    isActive: false
  },
  {
    title: 'Agropecuario y Forestal',
    icon: <Leaf className='h-10 w-10' />,
    path: '/sectors/agriculture',
    description:
      'Conoce cómo las empresas pueden adaptarse al cambio climático y reducir su huella ambiental.',
    isActive: false
  },
  {
    title: 'Servicios y Comercio',
    icon: <HandHeart className='h-10 w-10' />,
    path: '/sectors/services',
    description:
      'Evalúa cómo las empresas de servicios y comercio pueden sumarse a la acción climática y responder a las nuevas demandas del mercado sostenible',
    isActive: false
  }
];

const commonSurveyTitle = 'Encuesta de Acción Climática';
const commonSurveySubtitle =
  'Seleccione el tipo de encuesta que desea completar para evaluar las acciones climáticas de su organización.';

export const sectorForms = {
  energiaMineria: {
    sectorTitle: 'Energía y Minería',
    surveyTitle: commonSurveyTitle,
    surveySubtitle: commonSurveySubtitle,
    options: [
      {
        id: 'mitigacion',
        title: 'Mitigación',
        description:
          'Evaluación de acciones para reducir emisiones de gases de efecto invernadero',
        content:
          'Este formulario evalúa las acciones que su organización está tomando para reducir su huella de carbono y mitigar el cambio climático.',
        icon: <Leaf className='h-6 w-6 text-green-600' />,
        bullets: [
          'Reducción de emisiones',
          'Eficiencia energética',
          'Transición a energías limpias'
        ],
        color: 'green',
        url: '/sectors/energy-mining/mitigation'
      },
      {
        id: 'adaptación',
        title: 'Adaptación',
        description:
          'Evaluación de medidas para adaptarse a los efectos del cambio climático',
        content:
          'Este formulario evalúa cómo su organización se está preparando para los impactos del cambio climático.',
        icon: <CloudLightning className='h-6 w-6 text-blue-600' />,
        bullets: [
          'Gestión de riesgos climáticos',
          'Resiliencia ante eventos extremos',
          'Adaptación de infraestructura'
        ],
        color: 'blue',
        url: '/sectors/energy-mining/adaptability'
      }
    ]
  },

  transporteLogistica: {
    sectorTitle: 'Transporte y Logística',
    surveyTitle: commonSurveyTitle,
    surveySubtitle: commonSurveySubtitle,
    options: [
      {
        id: 'mitigacion',
        title: 'Mitigación',
        description: 'Reducción de emisiones en movilidad y transporte',
        content:
          'Evaluación de esfuerzos para disminuir emisiones del parque vehicular, optimización de rutas y uso de combustibles limpios.',
        icon: <Leaf className='h-6 w-6 text-green-600' />,
        bullets: [
          'Uso de vehículos eléctricos',
          'Optimización logística',
          'Combustibles alternativos'
        ],
        color: 'green',
        url: '/sectors/transportation/mitigation'
      },
      {
        id: 'adaptación',
        title: 'Adaptación',
        description: 'Preparación ante eventos climáticos extremos',
        content:
          'Medidas para proteger infraestructura de transporte y continuidad operativa ante inundaciones u otros fenómenos.',
        icon: <CloudLightning className='h-6 w-6 text-blue-600' />,
        bullets: [
          'Planes de contingencia',
          'Infraestructura resiliente',
          'Gestión de rutas críticas'
        ],
        color: 'blue',
        url: '/sectors/transportation/adaptability'
      }
    ]
  },

  construccionInfraestructura: {
    sectorTitle: 'Construcción e Infraestructura',
    surveyTitle: commonSurveyTitle,
    surveySubtitle: commonSurveySubtitle,
    options: [
      {
        id: 'mitigacion',
        title: 'Mitigación',
        description: 'Construcción sostenible y reducción de emisiones',
        content:
          'Evaluación del uso de materiales sostenibles, eficiencia energética y prácticas bajas en carbono.',
        icon: <Leaf className='h-6 w-6 text-green-600' />,
        bullets: [
          'Diseño pasivo',
          'Materiales reciclados',
          'Gestión energética de obra'
        ],
        color: 'green',
        url: '/sectors/energy-mining/mitigation'
      },
      {
        id: 'adaptación',
        title: 'Adaptación',
        description: 'Diseño de infraestructura resiliente al clima',
        content:
          'Medidas para asegurar que edificaciones resistan condiciones climáticas futuras.',
        icon: <CloudLightning className='h-6 w-6 text-blue-600' />,
        bullets: [
          'Infraestructura resiliente',
          'Sistemas de drenaje eficientes',
          'Diseño con proyección climática'
        ],
        color: 'blue',
        url: '/sectors/energy-mining/adaptability'
      }
    ]
  },

  industrialManufacturero: {
    sectorTitle: 'Industrial y Manufacturero',
    surveyTitle: commonSurveyTitle,
    surveySubtitle: commonSurveySubtitle,
    options: [
      {
        id: 'mitigacion',
        title: 'Mitigación',
        description: 'Optimización de procesos industriales',
        content:
          'Acciones para mejorar eficiencia energética y reducir emisiones en procesos de manufactura.',
        icon: <Leaf className='h-6 w-6 text-green-600' />,
        bullets: [
          'Procesos energéticamente eficientes',
          'Uso de energía renovable',
          'Reducción de residuos'
        ],
        color: 'green',
        url: '/sectors/energy-mining/mitigation'
      },
      {
        id: 'adaptación',
        title: 'Adaptación',
        description: 'Adaptación de la producción ante variabilidad climática',
        content:
          'Planes para mantener la operación y el abastecimiento ante eventos climáticos extremos.',
        icon: <CloudLightning className='h-6 w-6 text-blue-600' />,
        bullets: [
          'Gestión de cadena de suministro',
          'Protección de instalaciones',
          'Planes de continuidad operativa'
        ],
        color: 'blue',
        url: '/sectors/energy-mining/adaptability'
      }
    ]
  },

  agropecuarioForestal: {
    sectorTitle: 'Agropecuario y Forestal',
    surveyTitle: commonSurveyTitle,
    surveySubtitle: commonSurveySubtitle,
    options: [
      {
        id: 'mitigacion',
        title: 'Mitigación',
        description: 'Prácticas sostenibles en agricultura y silvicultura',
        content:
          'Evaluación de prácticas que reducen emisiones como agricultura regenerativa y manejo de suelos.',
        icon: <Leaf className='h-6 w-6 text-green-600' />,
        bullets: [
          'Captura de carbono en suelos',
          'Reducción de uso de fertilizantes',
          'Reforestación'
        ],
        color: 'green',
        url: '/sectors/energy-mining/mitigation'
      },
      {
        id: 'adaptación',
        title: 'Adaptación',
        description: 'Resiliencia agroforestal ante cambios climáticos',
        content:
          'Medidas para enfrentar sequías, plagas y eventos climáticos extremos en cultivos y bosques.',
        icon: <CloudLightning className='h-6 w-6 text-blue-600' />,
        bullets: [
          'Manejo de cultivos resistentes',
          'Tecnologías de riego',
          'Prevención de incendios forestales'
        ],
        color: 'blue',
        url: '/sectors/energy-mining/adaptability'
      }
    ]
  },

  serviciosComercio: {
    sectorTitle: 'Servicios y Comercio',
    surveyTitle: commonSurveyTitle,
    surveySubtitle: commonSurveySubtitle,
    options: [
      {
        id: 'mitigacion',
        title: 'Mitigación',
        description: 'Reducción de huella operativa y energética',
        content:
          'Evaluación de acciones como digitalización, eficiencia energética en oficinas y logística verde.',
        icon: <Leaf className='h-6 w-6 text-green-600' />,
        bullets: [
          'Uso eficiente de recursos',
          'Digitalización de procesos',
          'Reducción de viajes y logística sostenible'
        ],
        color: 'green',
        url: '/sectors/energy-mining/mitigation'
      },
      {
        id: 'adaptación',
        title: 'Adaptación',
        description: 'Continuidad del servicio ante eventos climáticos',
        content:
          'Estrategias para mantener la operación y atender a los clientes durante crisis climáticas.',
        icon: <CloudLightning className='h-6 w-6 text-blue-600' />,
        bullets: [
          'Planes de resiliencia empresarial',
          'Protección de infraestructuras críticas',
          'Comunicación en crisis'
        ],
        color: 'blue',
        url: '/sectors/energy-mining/adaptability'
      }
    ]
  }
};

export const sectorLabels: Record<string, string> = {
  'sector-1': 'Energía y Minería',
  'sector-2': 'Transporte y Logística',
  'sector-3': 'Construcción e Infraestructura',
  'sector-4': 'Industrial y Manufacturero',
  'sector-5': 'Agropecuario y Forestal',
  'sector-6': 'Servicios y Comercio'
};

export const SECTOR_METADATA: Record<
  string,
  { name: string; icon: React.ReactNode }
> = {
  'sector-1': {
    name: sectorLabels['sector-1'],
    icon: <Lightbulb className='h-10 w-10 mb-2 text-amber-500' />
  },
  'sector-2': {
    name: sectorLabels['sector-2'],
    icon: <Truck className='h-10 w-10 mb-2 text-blue-500' />
  },
  'sector-3': {
    name: sectorLabels['sector-3'],
    icon: <HardHat className='h-10 w-10 mb-2 text-orange-500' />
  },
  'sector-4': {
    name: sectorLabels['sector-4'],
    icon: <Factory className='h-10 w-10 mb-2 text-purple-500' />
  },
  'sector-5': {
    name: sectorLabels['sector-5'],
    icon: <Leaf className='h-10 w-10 mb-2 text-green-500' />
  },
  'sector-6': {
    name: sectorLabels['sector-6'],
    icon: <HandHeart className='h-10 w-10 mb-2 text-cyan-500' />
  }
};
