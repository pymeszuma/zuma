'use client';

import { useState, useEffect, useMemo } from 'react';
import { useCreateCompaniesInfo } from '@/feature/companies-info/api/use-create-companies-info';
import { useEditCompaniesInfo } from '@/feature/companies-info/api/use-edit-companies-info';
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
import {
  useZuma,
  type ZumaFormData,
  STORAGE_KEYS
} from '@/providers/zuma-context';
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
const siNoOptions = ['si', 'no', 'parcialmente'];

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
    isOnboarded,
    reloadFormData
  } = useZuma();

  // Default form data with useMemo for optimization
  const defaultFormData = useMemo<ZumaFormData>(
    () => ({
      nombreEmpresa: '',
      nit: null,
      sectorEconomico: null,
      sectorEconomicoOtro: null,
      subsector: null,
      cantidadEmpleados: null,
      departamento: 'Bogotá D.C.',
      familiarizadoMetas: 'no',
      conoceMetasPymes: 'no',
      recibidoFormacion: 'no',
      familiarizadoODS:
        'No, no conocemos los ODS ni los aplicamos en la empresa.',
      calculadoHuella12: 'No, no se ha realizado el cálculo',
      calculadoHuella3: 'No, no se ha realizado el cálculo',
      identificadoAsuntos:
        'No, no hemos identificado los asuntos materiales ASG.',
      analizadoDoble: 'Estamos en proceso de análisis.',
      capacitadoColaboradores: 'No, no se ha realizado ninguna capacitación.',
      direccion: null,
      telefono: null,
      email: null,
      sitioWeb: null
    }),
    []
  );

  // --- Local state for dialog visibility and company data ---
  const [localFormData, setLocalFormData] = useState<ZumaFormData>(() => {
    if (formData) return formData;
    if (initialData) return { ...initialData };
    return defaultFormData;
  });

  const [_hasCompanyData, setHasCompanyData] = useState(false);
  const [errors, setErrors] = useState<{ nombreEmpresa?: string }>({});
  const [showOtherSectorInput, setShowOtherSectorInput] = useState(false);

  // API hooks
  const { mutate: createCompanyMutate } = useCreateCompaniesInfo();
  const { mutate: updateCompanyMutate } = useEditCompaniesInfo(
    localFormData?.id?.toString() || ''
  );

  // Set initial dialog visibility
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const data = localStorage.getItem(STORAGE_KEYS.COMPANY_DATA);
      const hasData = !!data;
      setHasCompanyData(hasData);

      // Auto-show dialog only when onboarding (no data) and not already showing
      if (!hasData && !showDialog) {
        setShowDialog(true);
      }
    }
  }, [showDialog, setShowDialog]);

  // Handle isOnboarded state based on localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const data = localStorage.getItem(STORAGE_KEYS.COMPANY_DATA);
      if (data) {
        // If we have data, make sure isOnboarded is set to true
        localStorage.setItem('ZUMA_ONBOARDING_COMPLETE', 'true');
      }
    }
  }, []);

  // Helper to safely get number values for display
  const getNumberValue = (value: number | null | undefined): string => {
    if (value === null || value === undefined) return '';
    return value.toString();
  };

  // Update localFormData when initialData or formData changes
  useEffect(() => {
    // Skip update if initialData or formData didn't change
    const shouldUpdate = initialData || formData;
    if (!shouldUpdate) return;

    if (initialData) {
      setLocalFormData({ ...defaultFormData, ...initialData });
      setShowOtherSectorInput(initialData.sectorEconomico === 'Otro');
    } else if (formData) {
      setLocalFormData({ ...defaultFormData, ...formData });
      setShowOtherSectorInput(formData.sectorEconomico === 'Otro');
    }
  }, [initialData, formData, defaultFormData]);

  const handleChange = (field: keyof ZumaFormData, value: string) => {
    // If changing sector and selecting/deselecting "Otro"
    if (field === 'sectorEconomico') {
      setShowOtherSectorInput(value === 'Otro');

      // If switching away from "Otro", clear the custom sector field if it exists
      if (value !== 'Otro' && localFormData.sectorEconomicoOtro) {
        setLocalFormData((prev) => ({
          ...prev,
          [field]: value,
          sectorEconomicoOtro: null
        }));
        return;
      }
    }

    setLocalFormData((prev) => ({ ...prev, [field]: value }));

    // Clear error if company name is filled
    if (field === 'nombreEmpresa' && value) {
      setErrors({});
    }
  };

  // Handle numeric inputs specifically
  const handleNumberInput = (field: keyof ZumaFormData, value: string) => {
    if (!value) {
      setLocalFormData((prev) => ({ ...prev, [field]: null }));
      return;
    }

    const numValue = parseInt(value, 10);
    // Prevent negative numbers or zero for cantidadEmpleados
    if (field === 'cantidadEmpleados' && numValue <= 0) {
      return; // Don't update state if value is <= 0
    }

    setLocalFormData((prev) => ({ ...prev, [field]: numValue }));
  };

  const handleSubmit = () => {
    if (!localFormData.nombreEmpresa) {
      setErrors({ nombreEmpresa: 'El nombre de la empresa es obligatorio' });
      return;
    }

    // Prepare the data for the API
    const companyData = {
      ...localFormData,
      cantidadEmpleados: localFormData.cantidadEmpleados || null
    };

    const handleSuccess = (response: any, isUpdate: boolean) => {
      // For create, update ID from response; for update, use sent data
      const updatedCompanyData = isUpdate
        ? { ...companyData }
        : { ...companyData, id: response?.data?.id };

      // Store company info in localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem(STORAGE_KEYS.HAS_COMPANY, 'true');
        const companyIdentifier =
          updatedCompanyData.id || updatedCompanyData.nombreEmpresa;
        if (companyIdentifier) {
          localStorage.setItem(
            STORAGE_KEYS.COMPANY_ID,
            String(companyIdentifier)
          );
        }
        localStorage.setItem(
          STORAGE_KEYS.COMPANY_DATA,
          JSON.stringify(updatedCompanyData)
        );
        localStorage.setItem('ZUMA_ONBOARDING_COMPLETE', 'true');

        // If this is a new onboarding, set the flag for welcome message
        if (!isUpdate && !isOnboarded) {
          localStorage.setItem('ZUMA_NEWLY_ONBOARDED', 'true');
        }

        // Update component state
        setHasCompanyData(true);
      }

      // Update context
      setFormData(updatedCompanyData);
      saveFormData();
      if (reloadFormData) reloadFormData();

      if (onSave) {
        onSave(updatedCompanyData);
      }
      setShowDialog(false);
    };

    const handleError = (error: Error) => {
      // Handle errors from API calls
      console.error('Error saving company data:', error);

      // Even if the API call fails, store data in localStorage as a backup
      // This ensures the user doesn't lose their form data
      if (typeof window !== 'undefined') {
        localStorage.setItem(STORAGE_KEYS.HAS_COMPANY, 'true');
        localStorage.setItem(
          STORAGE_KEYS.COMPANY_DATA,
          JSON.stringify(companyData)
        );
        localStorage.setItem('ZUMA_ONBOARDING_COMPLETE', 'true');
        setHasCompanyData(true);
      }

      // Update local state but keep dialog open for user to try again
      setFormData(companyData);
    };

    // If we have an ID, update; else, create
    if (companyData.id) {
      updateCompanyMutate(companyData, {
        onSuccess: (response) => handleSuccess(response, true),
        onError: handleError
      });
    } else {
      createCompanyMutate(companyData, {
        onSuccess: (response) => handleSuccess(response, false),
        onError: handleError
      });
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
    <>
      <Dialog open={showDialog} onOpenChange={handleOpenChange}>
        <DialogContent className='sm:max-w-[600px] md:max-w-[700px] max-h-[90vh] overflow-y-auto'>
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
                    <p className='text-red-500 text-sm'>
                      {errors.nombreEmpresa}
                    </p>
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
                    htmlFor='direccion'
                    className='font-medium text-blue-800'
                  >
                    Dirección
                  </Label>
                  <Input
                    id='direccion'
                    value={localFormData.direccion || ''}
                    onChange={(e) => handleChange('direccion', e.target.value)}
                  />
                </div>

                <div className='grid gap-2'>
                  <Label
                    htmlFor='telefono'
                    className='font-medium text-blue-800'
                  >
                    Teléfono
                  </Label>
                  <Input
                    id='telefono'
                    value={localFormData.telefono || ''}
                    onChange={(e) => handleChange('telefono', e.target.value)}
                  />
                </div>

                <div className='grid gap-2'>
                  <Label htmlFor='email' className='font-medium text-blue-800'>
                    Email
                  </Label>
                  <Input
                    id='email'
                    type='email'
                    value={localFormData.email || ''}
                    onChange={(e) => handleChange('email', e.target.value)}
                  />
                </div>

                <div className='grid gap-2'>
                  <Label
                    htmlFor='sitioWeb'
                    className='font-medium text-blue-800'
                  >
                    Sitio Web
                  </Label>
                  <Input
                    id='sitioWeb'
                    value={localFormData.sitioWeb || ''}
                    onChange={(e) => handleChange('sitioWeb', e.target.value)}
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
                    value={localFormData.sectorEconomico || ''}
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

                {showOtherSectorInput && (
                  <div className='grid gap-2'>
                    <Label
                      htmlFor='sectorEconomicoOtro'
                      className='font-medium text-blue-800'
                    >
                      Especifique el sector
                    </Label>
                    <Input
                      id='sectorEconomicoOtro'
                      value={localFormData.sectorEconomicoOtro || ''}
                      onChange={(e) =>
                        handleChange('sectorEconomicoOtro', e.target.value)
                      }
                    />
                  </div>
                )}

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
                    min='1'
                    value={getNumberValue(localFormData.cantidadEmpleados)}
                    onChange={(e) =>
                      handleNumberInput('cantidadEmpleados', e.target.value)
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
                    value={localFormData.departamento || ''}
                    onValueChange={(value) =>
                      handleChange('departamento', value)
                    }
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
                    ¿Está familiarizado con las metas de contribución nacional
                    de Colombia?
                  </Label>
                  <Select
                    value={localFormData.familiarizadoMetas || ''}
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
                    value={localFormData.conoceMetasPymes || ''}
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
                    value={localFormData.recibidoFormacion || ''}
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
                    ¿Está su empresa familiarizada con los Objetivos de
                    Desarrollo Sostenible (ODS) de las Naciones Unidas y los
                    aplica en sus prácticas empresariales?
                  </Label>
                  <Select
                    value={localFormData.familiarizadoODS || ''}
                    onValueChange={(value) =>
                      handleChange('familiarizadoODS', value)
                    }
                  >
                    <SelectTrigger className='w-full cursor-pointer'>
                      <SelectValue placeholder='Seleccione una opción' />
                    </SelectTrigger>
                    <SelectContent>
                      {[
                        'Sí, estamos familiarizados con los ODS y los aplicamos activamente en nuestras operaciones.',
                        'Sí, conocemos los ODS, pero aún no los hemos implementado de manera activa.',
                        'No, no conocemos los ODS ni los aplicamos en la empresa.'
                      ].map((option) => (
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
                    ¿La empresa ha calculado la huella de carbono (Alcance 1 y
                    2) para identificar sus principales fuentes de emisiones de
                    gases de efecto invernadero?
                  </Label>
                  <Select
                    value={localFormData.calculadoHuella12 || ''}
                    onValueChange={(value) =>
                      handleChange('calculadoHuella12', value)
                    }
                  >
                    <SelectTrigger className='w-full cursor-pointer'>
                      <SelectValue placeholder='Seleccione una opción' />
                    </SelectTrigger>
                    <SelectContent>
                      {[
                        'Sí, se ha realizado el cálculo para ambos alcances.',
                        'No, no se ha realizado el cálculo',
                        'En los próximos 2 años, tenemos planeado calcular la huella de carbono (alcance 1 y 2)'
                      ].map((option) => (
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
                    ¿La empresa ha calculado la huella de carbono (Alcance 3)
                    para identificar sus principales fuentes de emisiones de
                    gases de efecto invernadero?
                  </Label>
                  <Select
                    value={localFormData.calculadoHuella3 || ''}
                    onValueChange={(value) =>
                      handleChange('calculadoHuella3', value)
                    }
                  >
                    <SelectTrigger className='w-full cursor-pointer'>
                      <SelectValue placeholder='Seleccione una opción' />
                    </SelectTrigger>
                    <SelectContent>
                      {[
                        'Sí, se ha realizado el cálculo para el Alcance 3.',
                        'No, no se ha realizado el cálculo',
                        'En los próximos 2 años, tenemos planeado calcular la huella de carbono para el Alcance 3.'
                      ].map((option) => (
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
                    value={localFormData.identificadoAsuntos || ''}
                    onValueChange={(value) =>
                      handleChange('identificadoAsuntos', value)
                    }
                  >
                    <SelectTrigger className='w-full cursor-pointer'>
                      <SelectValue placeholder='Seleccione una opción' />
                    </SelectTrigger>
                    <SelectContent>
                      {[
                        'Sí, hemos identificado los asuntos materiales ASG relevantes.',
                        'Estamos en proceso de identificación.',
                        'No, no hemos identificado los asuntos materiales ASG.',
                        'En los próximos 2 años, tenemos planeado identificar y priorizar los asuntos materiales ASG.'
                      ].map((option) => (
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
                    cómo los factores ambientales, sociales y de gobernanza
                    (ASG) impactan tanto en su desempeño financiero como en el
                    entorno?
                  </Label>
                  <Select
                    value={localFormData.analizadoDoble || ''}
                    onValueChange={(value) =>
                      handleChange('analizadoDoble', value)
                    }
                  >
                    <SelectTrigger className='w-full cursor-pointer'>
                      <SelectValue placeholder='Seleccione una opción' />
                    </SelectTrigger>
                    <SelectContent>
                      {[
                        'Sí, hemos realizado un análisis de doble materialidad.',
                        'Estamos en proceso de análisis.',
                        'No, no hemos realizado un análisis de doble materialidad.',
                        'En los próximos 2 años, tenemos planeado realizar un análisis de doble materialidad.'
                      ].map((option) => (
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
                    value={localFormData.capacitadoColaboradores || ''}
                    onValueChange={(value) =>
                      handleChange('capacitadoColaboradores', value)
                    }
                  >
                    <SelectTrigger className='w-full cursor-pointer'>
                      <SelectValue placeholder='Seleccione una opción' />
                    </SelectTrigger>
                    <SelectContent>
                      {[
                        'Sí, se han realizado capacitaciones formales.',
                        'No, no se ha realizado ninguna capacitación.',
                        'En los próximos 2 años, tenemos planeado ejuecutar un programa de capcitaciones sobre cambio climático y sostenibilidad.'
                      ].map((option) => (
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
    </>
  );
}
