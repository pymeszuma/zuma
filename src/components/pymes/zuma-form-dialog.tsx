'use client';

import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { useZuma, type ZumaFormData } from '@/components/theme/zuma-context';
import { ZumaLogo } from '@/components/common/zuma-logo';

const sectorOptions = [
  'Agricultura',
  'Comercio',
  'Construcción',
  'Industria',
  'Servicios',
  'Transporte',
  'Otro'
];
const departamentos = [
  'Amazonas',
  'Antioquia',
  'Arauca',
  'Atlántico',
  'Bolívar',
  'Boyacá',
  'Caldas',
  'Caquetá',
  'Casanare',
  'Cauca',
  'Cesar',
  'Chocó',
  'Córdoba',
  'Cundinamarca',
  'Guainía',
  'Guaviare',
  'Huila',
  'La Guajira',
  'Magdalena',
  'Meta',
  'Nariño',
  'Norte de Santander',
  'Putumayo',
  'Quindío',
  'Risaralda',
  'San Andrés y Providencia',
  'Santander',
  'Sucre',
  'Tolima',
  'Valle del Cauca',
  'Vaupés',
  'Vichada',
  'Bogotá D.C.'
];
const siNoOptions = ['Sí', 'No', 'No sabe/No responde'];

type ZumaFormDialogProps = {
  initialData?: ZumaFormData;
  onSave?: (data: ZumaFormData) => void;
};

export function ZumaFormDialog({
  initialData,
  onSave
}: ZumaFormDialogProps = {}) {
  const {
    showDialog,
    setShowDialog,
    formData,
    setFormData,
    saveFormData,
    isOnboarded
  } = useZuma();

  const defaultFormData: ZumaFormData = {
    nombreEmpresa: '',
    nit: '',
    sectorEconomico: '',
    subsector: '',
    cantidadEmpleados: '',
    departamento: '',
    familiarizadoMetas: 'No sabe/No responde',
    conoceMetasPymes: 'No sabe/No responde',
    recibidoFormacion: 'No sabe/No responde',
    familiarizadoODS: 'No sabe/No responde',
    calculadoHuella12: 'No sabe/No responde',
    calculadoHuella3: 'No sabe/No responde',
    identificadoAsuntos: 'No sabe/No responde',
    analizadoDoble: 'No sabe/No responde',
    capacitadoColaboradores: 'No sabe/No responde'
  };

  const [localFormData, setLocalFormData] =
    useState<ZumaFormData>(defaultFormData);
  const [errors, setErrors] = useState<{ nombreEmpresa?: string }>({});

  // Update localFormData when initialData or formData changes
  useEffect(() => {
    if (initialData) {
      setLocalFormData({ ...defaultFormData, ...initialData });
    } else if (formData) {
      setLocalFormData({ ...defaultFormData, ...formData });
    }
  }, [initialData, formData]);

  const handleChange = (field: keyof ZumaFormData, value: string) => {
    setLocalFormData((prev) => ({ ...prev, [field]: value }));

    // Clear error if company name is filled
    if (field === 'nombreEmpresa' && value) {
      setErrors({});
    }
  };

  const handleSubmit = () => {
    if (!localFormData.nombreEmpresa) {
      setErrors({ nombreEmpresa: 'El nombre de la empresa es obligatorio' });
      return;
    }

    // Update the context data
    setFormData(localFormData);
    saveFormData();

    // If an onSave callback was provided, call it with the local data
    if (onSave) {
      onSave(localFormData);
    }
  };

  // Prevent dialog from closing if company name is not provided
  const handleOpenChange = (open: boolean) => {
    if (open === false) {
      // If it's part of onboarding and company name is not provided, don't allow closing
      if (!isOnboarded && !localFormData.nombreEmpresa) {
        return; // Don't allow closing during onboarding
      }
      // If it's not onboarding, we can close freely
      setShowDialog(open);
    } else {
      setShowDialog(open);
    }
  };

  return (
    <Dialog open={showDialog} onOpenChange={handleOpenChange}>
      <DialogContent className='max-w-4xl max-h-[90vh] overflow-y-auto'>
        <DialogHeader>
          <div className='flex justify-between items-center'>
            <div>
              <DialogTitle className='text-xl font-bold'>
                {!isOnboarded ? 'Bienvenido a ZUMA' : 'Información general'}
              </DialogTitle>
              {!isOnboarded && (
                <p className='text-sm text-muted-foreground mt-2 mr-5'>
                  Para personalizar su experiencia, necesitamos algunos datos
                  básicos de su empresa.
                </p>
              )}
            </div>
            <ZumaLogo className='text-3xl' />
          </div>
        </DialogHeader>

        <div className='grid gap-6 py-4'>
          {/* General Information Section */}
          <div className='border rounded-md overflow-hidden'>
            <div
              className={`p-3 font-semibold ${!isOnboarded ? 'bg-blue-200' : 'bg-blue-100'}`}
            >
              Información general{' '}
              {!isOnboarded && <span className='text-red-500'>*</span>}
            </div>

            <div className='grid gap-4 p-4'>
              <div className='grid gap-2'>
                <Label
                  htmlFor='nombreEmpresa'
                  className={`font-medium ${!isOnboarded ? 'text-blue-900 text-lg' : 'text-blue-800'}`}
                >
                  Nombre de la empresa <span className='text-red-500'>*</span>
                </Label>
                {!isOnboarded && (
                  <p className='text-sm text-muted-foreground mb-1'>
                    Este campo es obligatorio para continuar con el uso de la
                    plataforma.
                  </p>
                )}
                <Input
                  id='nombreEmpresa'
                  value={localFormData.nombreEmpresa || ''}
                  onChange={(e) =>
                    handleChange('nombreEmpresa', e.target.value)
                  }
                  className={errors.nombreEmpresa ? 'border-red-500' : ''}
                />
                {errors.nombreEmpresa && (
                  <p className='text-red-500 text-sm'>{errors.nombreEmpresa}</p>
                )}
              </div>

              <div className='grid gap-2'>
                <Label htmlFor='nit' className='font-medium text-blue-800'>
                  NIT
                </Label>
                <Input
                  id='nit'
                  value={localFormData.nit || ''}
                  onChange={(e) => handleChange('nit', e.target.value)}
                />
              </div>

              <div className='grid gap-2'>
                <Label
                  htmlFor='sectorEconomico'
                  className='font-medium text-blue-800'
                >
                  Sector económico
                </Label>
                <Select
                  value={localFormData.sectorEconomico}
                  onValueChange={(value) =>
                    handleChange('sectorEconomico', value)
                  }
                >
                  <SelectTrigger className='w-full cursor-pointer'>
                    <SelectValue placeholder='Seleccione un sector' />
                  </SelectTrigger>
                  <SelectContent>
                    {sectorOptions.map((sector) => (
                      <SelectItem key={sector} value={sector}>
                        {sector}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className='grid gap-2'>
                <Label
                  htmlFor='subsector'
                  className='font-medium text-blue-800'
                >
                  Subsector
                </Label>
                <Input
                  id='subsector'
                  value={localFormData.subsector || ''}
                  onChange={(e) => handleChange('subsector', e.target.value)}
                />
              </div>

              <div className='grid gap-2'>
                <Label
                  htmlFor='cantidadEmpleados'
                  className='font-medium text-blue-800'
                >
                  ¿Cuántos empleados tiene su empresa?
                </Label>
                <Input
                  id='cantidadEmpleados'
                  type='number'
                  value={localFormData.cantidadEmpleados || ''}
                  onChange={(e) =>
                    handleChange('cantidadEmpleados', e.target.value)
                  }
                />
              </div>

              <div className='grid gap-2'>
                <Label
                  htmlFor='departamento'
                  className='font-medium text-blue-800'
                >
                  ¿En qué departamento de Colombia se ubica su empresa?
                </Label>
                <Select
                  value={localFormData.departamento}
                  onValueChange={(value) => handleChange('departamento', value)}
                >
                  <SelectTrigger className='w-full cursor-pointer'>
                    <SelectValue placeholder='Seleccione un departamento' />
                  </SelectTrigger>
                  <SelectContent>
                    {departamentos.map((depto) => (
                      <SelectItem key={depto} value={depto}>
                        {depto}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* NDC Knowledge Section */}
          <div className='border rounded-md overflow-hidden'>
            <div className='bg-purple-100 p-3 font-semibold'>
              Conocimiento de las Metas de Contribución Nacional (NDC)
            </div>

            <div className='grid gap-4 p-4'>
              <div className='grid gap-2'>
                <Label
                  htmlFor='familiarizadoMetas'
                  className='font-medium text-purple-800'
                >
                  ¿Está familiarizado con las metas de contribución nacional de
                  Colombia?
                </Label>
                <Select
                  value={localFormData.familiarizadoMetas}
                  onValueChange={(value) =>
                    handleChange('familiarizadoMetas', value)
                  }
                >
                  <SelectTrigger className='w-full cursor-pointer'>
                    <SelectValue placeholder='Seleccione una opción' />
                  </SelectTrigger>
                  <SelectContent>
                    {siNoOptions.map((option) => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className='grid gap-2'>
                <Label
                  htmlFor='conoceMetasPymes'
                  className='font-medium text-purple-800'
                >
                  ¿Conoce las metas específicas que Colombia ha planteado para
                  las PYMES en relación con la reducción de emisiones de gases
                  de efecto invernadero (GEI)?
                </Label>
                <Select
                  value={localFormData.conoceMetasPymes}
                  onValueChange={(value) =>
                    handleChange('conoceMetasPymes', value)
                  }
                >
                  <SelectTrigger className='w-full cursor-pointer'>
                    <SelectValue placeholder='Seleccione una opción' />
                  </SelectTrigger>
                  <SelectContent>
                    {siNoOptions.map((option) => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className='grid gap-2'>
                <Label
                  htmlFor='recibidoFormacion'
                  className='font-medium text-purple-800'
                >
                  ¿La empresa ha recibido información o formación sobre cómo
                  contribuir a las metas de NDC?
                </Label>
                <Select
                  value={localFormData.recibidoFormacion}
                  onValueChange={(value) =>
                    handleChange('recibidoFormacion', value)
                  }
                >
                  <SelectTrigger className='w-full cursor-pointer'>
                    <SelectValue placeholder='Seleccione una opción' />
                  </SelectTrigger>
                  <SelectContent>
                    {siNoOptions.map((option) => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className='grid gap-2'>
                <Label
                  htmlFor='familiarizadoODS'
                  className='font-medium text-purple-800'
                >
                  ¿Está su empresa familiarizada con los Objetivos de Desarrollo
                  Sostenible (ODS) de las Naciones Unidas y los aplica en sus
                  prácticas empresariales?
                </Label>
                <Select
                  value={localFormData.familiarizadoODS}
                  onValueChange={(value) =>
                    handleChange('familiarizadoODS', value)
                  }
                >
                  <SelectTrigger className='w-full cursor-pointer'>
                    <SelectValue placeholder='Seleccione una opción' />
                  </SelectTrigger>
                  <SelectContent>
                    {siNoOptions.map((option) => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Sustainability Actions Section */}
          <div className='border rounded-md overflow-hidden'>
            <div className='bg-pink-100 p-3 font-semibold'>
              Acciones integrales en sostenibilidad
            </div>

            <div className='grid gap-4 p-4'>
              <div className='grid gap-2'>
                <Label
                  htmlFor='calculadoHuella12'
                  className='font-medium text-pink-800'
                >
                  ¿La empresa ha calculado la huella de carbono (Alcance 1 y 2)
                  para identificar sus principales fuentes de emisiones de gases
                  de efecto invernadero?
                </Label>
                <Select
                  value={localFormData.calculadoHuella12}
                  onValueChange={(value) =>
                    handleChange('calculadoHuella12', value)
                  }
                >
                  <SelectTrigger className='w-full cursor-pointer'>
                    <SelectValue placeholder='Seleccione una opción' />
                  </SelectTrigger>
                  <SelectContent>
                    {siNoOptions.map((option) => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className='grid gap-2'>
                <Label
                  htmlFor='calculadoHuella3'
                  className='font-medium text-pink-800'
                >
                  ¿La empresa ha calculado la huella de carbono (Alcance 3) para
                  identificar sus principales fuentes de emisiones de gases de
                  efecto invernadero?
                </Label>
                <Select
                  value={localFormData.calculadoHuella3}
                  onValueChange={(value) =>
                    handleChange('calculadoHuella3', value)
                  }
                >
                  <SelectTrigger className='w-full cursor-pointer'>
                    <SelectValue placeholder='Seleccione una opción' />
                  </SelectTrigger>
                  <SelectContent>
                    {siNoOptions.map((option) => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className='grid gap-2'>
                <Label
                  htmlFor='identificadoAsuntos'
                  className='font-medium text-pink-800'
                >
                  ¿La empresa ha identificado sus asuntos materiales (de
                  impacto) ambientales, sociales y de gobernanza (ASG) que
                  tienen un impacto significativo en su desempeño y en la
                  sostenibilidad a largo plazo?
                </Label>
                <Select
                  value={localFormData.identificadoAsuntos}
                  onValueChange={(value) =>
                    handleChange('identificadoAsuntos', value)
                  }
                >
                  <SelectTrigger className='w-full cursor-pointer'>
                    <SelectValue placeholder='Seleccione una opción' />
                  </SelectTrigger>
                  <SelectContent>
                    {siNoOptions.map((option) => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className='grid gap-2'>
                <Label
                  htmlFor='analizadoDoble'
                  className='font-medium text-pink-800'
                >
                  ¿La empresa ha analizado la doble materialidad, considerando
                  cómo los factores ambientales, sociales y de gobernanza (ASG)
                  impactan tanto en su desempeño financiero como en el entorno?
                </Label>
                <Select
                  value={localFormData.analizadoDoble}
                  onValueChange={(value) =>
                    handleChange('analizadoDoble', value)
                  }
                >
                  <SelectTrigger className='w-full cursor-pointer'>
                    <SelectValue placeholder='Seleccione una opción' />
                  </SelectTrigger>
                  <SelectContent>
                    {siNoOptions.map((option) => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className='grid gap-2'>
                <Label
                  htmlFor='capacitadoColaboradores'
                  className='font-medium text-pink-800'
                >
                  ¿La empresa ha capacitado a sus colaboradores en temas
                  relacionados con el cambio climático y la sostenibilidad?
                </Label>
                <Select
                  value={localFormData.capacitadoColaboradores}
                  onValueChange={(value) =>
                    handleChange('capacitadoColaboradores', value)
                  }
                >
                  <SelectTrigger className='w-full cursor-pointer'>
                    <SelectValue placeholder='Seleccione una opción' />
                  </SelectTrigger>
                  <SelectContent>
                    {siNoOptions.map((option) => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>

        <div className='mt-4'>
          <Button onClick={handleSubmit} className='w-full cursor-pointer'>
            {!isOnboarded ? 'Comenzar con ZUMA' : 'Guardar información'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
