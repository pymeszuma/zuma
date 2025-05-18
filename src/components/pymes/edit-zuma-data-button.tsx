'use client';

import { Building2, User } from 'lucide-react';
import { useZuma } from '@/providers/zuma-context';
import { useSidebar } from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export function EditZumaDataButton() {
  const { openDialog, formData, reloadFormData } = useZuma();
  const { state: sidebarState } = useSidebar();

  if (!formData?.nombreEmpresa) {
    return null;
  }

  const handleEditClick = () => {
    // Ensure we have the latest data before opening the dialog
    reloadFormData();
    openDialog();
  };

  return (
    <div className='px-2'>
      <Button
        onClick={handleEditClick}
        className='w-full justify-start text-sm font-normal cursor-pointer'
        variant='outline'
      >
        <User className='h-4 w-4 text-yellow-500' />
        <span
          className={cn(
            'flex-1 text-left truncate font-medium',
            sidebarState === 'collapsed' && 'sr-only'
          )}
        >
          {formData.nombreEmpresa.length > 10
            ? `${formData.nombreEmpresa.slice(0, 10)}...`
            : formData.nombreEmpresa}
        </span>
        {sidebarState === 'expanded' && (
          <Building2 className='h-3.5 w-3.5 text-muted-foreground' />
        )}
      </Button>
    </div>
  );
}
