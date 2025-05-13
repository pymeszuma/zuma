'use client';

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode
} from 'react';

type ZumaContextType = {
  showDialog: boolean;
  setShowDialog: (show: boolean) => void;
  formData: ZumaFormData | null;
  setFormData: (data: ZumaFormData) => void;
  saveFormData: () => void;
  reloadFormData: () => ZumaFormData | null;
  openDialog: () => void;
  isOnboarded: boolean;
  setIsOnboarded: (onboarded: boolean) => void;
};

export type ZumaFormData = {
  nombreEmpresa: string;
  nit?: string;
  sectorEconomico?: string;
  subsector?: string;
  cantidadEmpleados?: string;
  departamento?: string;
  familiarizadoMetas?: string;
  conoceMetasPymes?: string;
  recibidoFormacion?: string;
  familiarizadoODS?: string;
  calculadoHuella12?: string;
  calculadoHuella3?: string;
  identificadoAsuntos?: string;
  analizadoDoble?: string;
  capacitadoColaboradores?: string;
};

const ZumaContext = createContext<ZumaContextType | undefined>(undefined);

export function ZumaProvider({ children }: { children: ReactNode }) {
  const [showDialog, setShowDialog] = useState(false);
  const [formData, setFormData] = useState<ZumaFormData | null>(null);
  const [isOnboarded, setIsOnboarded] = useState(true); // Default to true until we check storage

  useEffect(() => {
    // Check if running in browser
    if (typeof window !== 'undefined') {
      const savedData = localStorage.getItem('ZUMA_PYMES');
      const onboardingComplete = localStorage.getItem(
        'ZUMA_ONBOARDING_COMPLETE'
      );

      if (!savedData || !onboardingComplete) {
        setIsOnboarded(false);
        setShowDialog(true);
      } else {
        setIsOnboarded(true);
        try {
          setFormData(JSON.parse(savedData));
        } catch (e) {
          console.error('Error parsing ZUMA_PYMES data:', e);
          setIsOnboarded(false);
          setShowDialog(true);
        }
      }
    }
  }, []);

  const saveFormData = () => {
    if (formData && formData.nombreEmpresa) {
      localStorage.setItem('ZUMA_PYMES', JSON.stringify(formData));

      // If this is the first time completing onboarding
      if (!isOnboarded) {
        localStorage.setItem('ZUMA_NEWLY_ONBOARDED', 'true');
      }

      localStorage.setItem('ZUMA_ONBOARDING_COMPLETE', 'true');
      setIsOnboarded(true);
      setShowDialog(false);
    }
  };

  const reloadFormData = () => {
    // Load data directly from localStorage
    if (typeof window !== 'undefined') {
      const savedData = localStorage.getItem('ZUMA_PYMES');
      if (savedData) {
        try {
          const parsedData = JSON.parse(savedData);
          setFormData(parsedData);
          return parsedData;
        } catch (e) {
          console.error('Error parsing ZUMA_PYMES data:', e);
        }
      }
    }
    return null;
  };

  const openDialog = () => {
    // Reload the latest data before opening the dialog
    reloadFormData();
    setShowDialog(true);
  };

  return (
    <ZumaContext.Provider
      value={{
        showDialog,
        setShowDialog,
        formData,
        setFormData,
        saveFormData,
        reloadFormData,
        openDialog,
        isOnboarded,
        setIsOnboarded
      }}
    >
      {children}
    </ZumaContext.Provider>
  );
}

export function useZuma() {
  const context = useContext(ZumaContext);
  if (context === undefined) {
    throw new Error('useZuma must be used within a ZumaProvider');
  }
  return context;
}
