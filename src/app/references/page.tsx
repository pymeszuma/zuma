import type React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Globe,
  BookOpen,
  Building,
  Home,
  Factory,
  Droplet,
  Cpu,
  Leaf,
  FileText,
  BarChart,
  Zap,
  FileCheck
} from 'lucide-react';
import { ContentLayout } from '@/components/panel/content-layout';

export default function ReferencesPage() {
  // Define all references with their properties
  const references = [
    {
      number: 1,
      title: 'Panel Intergubernamental sobre Cambio Climático (IPCC)',
      description:
        'Organismo internacional que evalúa la ciencia relacionada con el cambio climático',
      link: 'https://archive.ipcc.ch/home_languages_main_spanish.shtml',
      icon: <Globe className='h-5 w-5 text-emerald-500' />,
      color: 'emerald'
    },
    {
      number: 2,
      title: 'Objetivos de Desarrollo Sostenible (ODS)',
      description:
        'Metas globales para erradicar la pobreza, proteger el planeta y asegurar la prosperidad',
      link: 'https://www.un.org/sustainabledevelopment/es/sustainable-development-goals/',
      icon: <BookOpen className='h-5 w-5 text-blue-500' />,
      color: 'blue'
    },
    {
      number: 3,
      title: 'Estrategia Colombiana de Desarrollo Bajo en Carbono',
      description:
        'Programa de planeación del desarrollo a corto, mediano y largo plazo',
      link: 'https://archivo.minambiente.gov.co/index.php/estrategia-colombiana-de-desarrollo-bajo-en-carbono',
      icon: <Building className='h-5 w-5 text-violet-500' />,
      color: 'violet'
    },
    {
      number: 4,
      title: 'Plan Nacional de Adaptación al Cambio Climático',
      description:
        'Instrumento para reducir la vulnerabilidad del país e incrementar su capacidad de respuesta',
      link: 'https://www.minambiente.gov.co/cambio-climatico-y-gestion-del-riesgo/plan-nacional-de-adaptacion-al-cambio-climatico/',
      icon: <Droplet className='h-5 w-5 text-cyan-500' />,
      color: 'cyan'
    },
    {
      number: 5,
      title:
        'Plan Integral de Gestión del Cambio Climático Sector Minero-Energético',
      description:
        'Estrategias de mitigación y adaptación para el sector minero-energético',
      link: 'https://www.minenergia.gov.co/documents/6393/PIGCCme_2050_vf.pdf',
      icon: <Cpu className='h-5 w-5 text-amber-500' />,
      color: 'amber'
    },
    {
      number: 6,
      title:
        'Plan Integral de Gestión del Cambio Climático Sector Vivienda, Ciudad y Territorio',
      description:
        'Estrategias territoriales para la gestión del cambio climático',
      link: 'https://www.minambiente.gov.co/cambio-climatico-y-gestion-del-riesgo/planes-integrales-de-gestion-del-cambio-climatico-territorial/',
      icon: <Home className='h-5 w-5 text-orange-500' />,
      color: 'orange'
    },
    {
      number: 7,
      title:
        'Plan Integral de Gestión del Cambio Climático Sector Comercio, Industria y Turismo',
      description:
        'Estrategias para la mitigación y adaptación en el sector comercial e industrial',
      link: 'https://www.mincit.gov.co/normatividad/proyectos-de-normatividad/proyectos-de-resolucion-2021/24-05-2021-pigccs-2021-05-02.aspx',
      icon: <Factory className='h-5 w-5 text-rose-500' />,
      color: 'rose'
    },
    {
      number: 8,
      title: 'Plan Integral de Gestión del Cambio Climático Sector Agricultura',
      description:
        'Estrategias para la adaptación y mitigación en el sector agrícola',
      link: 'https://accionclimatica.minambiente.gov.co/download/ministerio-de-agricultura-resolucion-000355-de-2021/',
      icon: <Leaf className='h-5 w-5 text-green-500' />,
      color: 'green'
    },
    {
      number: 9,
      title: 'GRI (Global Reporting Initiative)',
      description:
        'Estándares internacionales para la elaboración de informes de sostenibilidad',
      link: null,
      icon: <FileText className='h-5 w-5 text-teal-500' />,
      color: 'teal'
    },
    {
      number: 10,
      title: 'ISO 14064',
      description: 'Contabilidad y Verificación de Gases de Efecto Invernadero',
      link: null,
      icon: <BarChart className='h-5 w-5 text-indigo-500' />,
      color: 'indigo'
    },
    {
      number: 11,
      title: 'ISO 50001',
      description: 'Sistemas de gestión de la energía',
      link: null,
      icon: <Zap className='h-5 w-5 text-yellow-500' />,
      color: 'yellow'
    },
    {
      number: 12,
      title: 'Protocolo GHG (Greenhouse Gas Protocol)',
      description:
        'Estándares para la medición y gestión de emisiones de gases de efecto invernadero',
      link: null,
      icon: <FileCheck className='h-5 w-5 text-lime-500' />,
      color: 'lime'
    }
  ];

  return (
    <ContentLayout title='References' className='px-8 py-2'>
      <div className='space-y-6'>
        <div className='flex flex-col items-center justify-center space-y-4'>
          <h1 className='text-4xl font-bold tracking-tight'>
            Referencias Bibliográficas
          </h1>
          <p className='text-muted-foreground max-w-2xl mx-auto text-center'>
            Recursos y documentos oficiales sobre cambio climático,
            sostenibilidad y gestión ambiental
          </p>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 m-8 pb-12'>
          {references.map((ref) => (
            <ReferenceCard
              key={ref.number}
              number={ref.number}
              title={ref.title}
              description={ref.description}
              link={ref.link}
              icon={ref.icon}
              color={ref.color}
            />
          ))}
        </div>
      </div>
    </ContentLayout>
  );
}

interface ReferenceCardProps {
  number: number;
  title: string;
  description: string;
  link: string | null;
  icon: React.ReactNode;
  color: string;
}

function ReferenceCard({
  number,
  title,
  description,
  link,
  icon,
  color
}: ReferenceCardProps) {
  const colorMap: Record<string, string> = {
    emerald:
      'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300',
    blue: 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300',
    violet:
      'bg-violet-100 text-violet-800 dark:bg-violet-950 dark:text-violet-300',
    cyan: 'bg-cyan-100 text-cyan-800 dark:bg-cyan-950 dark:text-cyan-300',
    amber: 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300',
    orange:
      'bg-orange-100 text-orange-800 dark:bg-orange-950 dark:text-orange-300',
    rose: 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300',
    green: 'bg-green-100 text-green-800 dark:bg-green-950 dark:text-green-300',
    teal: 'bg-teal-100 text-teal-800 dark:bg-teal-950 dark:text-teal-300',
    indigo:
      'bg-indigo-100 text-indigo-800 dark:bg-indigo-950 dark:text-indigo-300',
    yellow:
      'bg-yellow-100 text-yellow-800 dark:bg-yellow-950 dark:text-yellow-300',
    lime: 'bg-lime-100 text-lime-800 dark:bg-lime-950 dark:text-lime-300'
  };

  return (
    <Card className='overflow-hidden transition-all hover:shadow-md dark:hover:shadow-primary/10'>
      <CardHeader className='pb-2'>
        <div className='flex items-center justify-between'>
          <Badge variant='outline' className='text-xs font-medium'>
            {number}
          </Badge>
          <div className={`p-1.5 rounded-full ${colorMap[color]}`}>{icon}</div>
        </div>
        <CardTitle className='text-lg mt-2'>{title}</CardTitle>
      </CardHeader>
      <CardContent className='pb-4'>
        <CardDescription className='mb-3'>{description}</CardDescription>
      </CardContent>
      <CardFooter className='mt-auto'>
        {link && (
          <a
            href={link}
            target='_blank'
            rel='noopener noreferrer'
            className={`text-sm font-medium inline-flex items-center hover:underline text-${color}-600 dark:text-${color}-400`}
          >
            Ver documento
            <svg
              className='ml-1 h-4 w-4'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14'
              />
            </svg>
          </a>
        )}
      </CardFooter>
    </Card>
  );
}
