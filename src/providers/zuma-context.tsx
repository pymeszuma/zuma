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
  hasCompany: boolean;
  companyId: string | null;
  loadCompanyFromStorage: () => void;
};

type ZumaFormData = {
  id?: string;
  nombreEmpresa: string;
  nit?: string | null;
  sectorEconomico?: string | null;
  sectorEconomicoOtro?: string | null;
  subsector?: string | null;
  cantidadEmpleados?: number | null;
  departamento?: string | null;
  familiarizadoMetas?: 'si' | 'no' | 'parcialmente' | null;
  conoceMetasPymes?: 'si' | 'no' | 'parcialmente' | null;
  recibidoFormacion?: 'si' | 'no' | 'parcialmente' | null;
  familiarizadoODS?: string | null;
  calculadoHuella12?: string | null;
  calculadoHuella3?: string | null;
  identificadoAsuntos?: string | null;
  analizadoDoble?: string | null;
  capacitadoColaboradores?: string | null;
  direccion?: string | null;
  telefono?: string | null;
  email?: string | null;
  sitioWeb?: string | null;
};

export type { ZumaFormData };

const ZumaContext = createContext<ZumaContextType | undefined>(undefined);

export const STORAGE_KEYS = {
  HAS_COMPANY: 'ZUMA_PYMES',
  COMPANY_ID: 'ZUMA_COMPANY_ID',
  COMPANY_DATA: 'ZUMA_COMPANY_DATA'
} as const;

export function ZumaProvider({ children }: { children: ReactNode }) {
  const [showDialog, setShowDialog] = useState(false);
  const [formData, setFormData] = useState<ZumaFormData | null>(null);
  const [hasCompany, setHasCompany] = useState(false);
  const [companyId, setCompanyId] = useState<string | null>(null);
  const [isOnboarded, setIsOnboarded] = useState(true);

  // Load company data from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedCompany = localStorage.getItem(STORAGE_KEYS.COMPANY_DATA);
      const hasCompanyFlag =
        localStorage.getItem(STORAGE_KEYS.HAS_COMPANY) === 'true';
      const savedCompanyId = localStorage.getItem(STORAGE_KEYS.COMPANY_ID);

      setHasCompany(hasCompanyFlag);
      setCompanyId(savedCompanyId);

      // If we have company data, set isOnboarded to true
      if (savedCompany) {
        setIsOnboarded(true);
        try {
          const parsedData = JSON.parse(savedCompany);
          setFormData(parsedData);
        } catch (error) {
          console.error('Error parsing saved company data:', error);
        }
      }
    }
  }, []);

  // Reload form data from local storage
  const reloadFormData = () => {
    if (typeof window !== 'undefined') {
      // Try to load from new storage first
      const savedCompany = localStorage.getItem(STORAGE_KEYS.COMPANY_DATA);
      if (savedCompany) {
        try {
          const parsedData = JSON.parse(savedCompany);
          setFormData(parsedData);
          setHasCompany(true);
          setIsOnboarded(true);
          if (parsedData.id || parsedData.nombreEmpresa) {
            setCompanyId(String(parsedData.id || parsedData.nombreEmpresa));
          }
          return parsedData;
        } catch (e) {
          console.error('Error parsing company data:', e);
        }
      }
      // Fallback to old storage for backward compatibility
      const savedData = localStorage.getItem('ZUMA_PYMES');
      if (savedData) {
        try {
          const parsedData = JSON.parse(savedData);
          setFormData(parsedData);
          setIsOnboarded(true);
          setHasCompany(true);
          return parsedData;
        } catch (e) {
          console.error('Error parsing ZUMA_PYMES data:', e);
        }
      }
    }
    return null;
  };

  // Update localStorage when formData changes
  useEffect(() => {
    if (typeof window !== 'undefined' && formData) {
      localStorage.setItem(STORAGE_KEYS.COMPANY_DATA, JSON.stringify(formData));
      if (formData.nombreEmpresa) {
        localStorage.setItem(STORAGE_KEYS.HAS_COMPANY, 'true');
        setHasCompany(true);
      }
    }
  }, [formData]);

  // Save form data to local storage and context
  const saveFormData = () => {
    if (formData && typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEYS.COMPANY_DATA, JSON.stringify(formData));
      localStorage.setItem(STORAGE_KEYS.HAS_COMPANY, 'true');
      if (formData.id || formData.nombreEmpresa) {
        localStorage.setItem(
          STORAGE_KEYS.COMPANY_ID,
          String(formData.id || formData.nombreEmpresa)
        );
      }
      // For backward compatibility
      localStorage.setItem('ZUMA_PYMES', JSON.stringify(formData));
      localStorage.setItem('ZUMA_ONBOARDING_COMPLETE', 'true');
      setIsOnboarded(true);
      setHasCompany(true);
    }
  };

  // For backward compatibility
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedData = localStorage.getItem('ZUMA_PYMES');
      const onboardingComplete = localStorage.getItem(
        'ZUMA_ONBOARDING_COMPLETE'
      );

      if (!savedData || !onboardingComplete) {
        setIsOnboarded(false);
      } else {
        try {
          const parsedData = JSON.parse(savedData);
          setFormData(parsedData);
          setIsOnboarded(true);
        } catch (e) {
          console.error('Error parsing saved data:', e);
          setIsOnboarded(false);
        }
      }
    }
  }, []);

  const openDialog = () => {
    // Ensure we have the latest data before opening the dialog
    reloadFormData();
    setShowDialog(true);
  };

  const loadCompanyFromStorage = () => {
    if (typeof window === 'undefined') return null;

    // Check if company exists in localStorage
    const hasCompany =
      localStorage.getItem(STORAGE_KEYS.HAS_COMPANY) === 'true';
    const companyId = localStorage.getItem(STORAGE_KEYS.COMPANY_ID);
    const companyData = localStorage.getItem(STORAGE_KEYS.COMPANY_DATA);

    setHasCompany(hasCompany);
    setCompanyId(companyId);

    if (companyData) {
      try {
        const parsedData = JSON.parse(companyData);
        setFormData(parsedData);
        setIsOnboarded(true);
        return parsedData;
      } catch (error) {
        console.error('Error parsing company data from localStorage:', error);
      }
    }
    return null;
  };

  useEffect(() => {
    loadCompanyFromStorage();
  }, []);

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
        setIsOnboarded,
        hasCompany,
        companyId,
        loadCompanyFromStorage
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
