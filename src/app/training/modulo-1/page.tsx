import { ContentLayout } from '@/components/panel/content-layout';

export default function IntroductionTrainingPage() {
  const pdfPath = '/training_materials/modulo-1.pdf';

  return (
    <ContentLayout
      title='Introducción a la Huella de Carbono'
      className='px-8 py-2'
    >
      <div className='container mx-auto py-6'>
        <div
          style={{ width: '100%', height: '75vh', border: '1px solid #ccc' }}
        >
          <iframe
            src={pdfPath}
            width='100%'
            height='100%'
            title='Material de Capacitación: Fundamentos de Sostenibilidad Empresarial'
            style={{ border: 'none' }}
            allowFullScreen
          />
        </div>
        {/* También puedes agregar un enlace de descarga directa si lo consideras útil */}
        <div className='mt-4 text-center'>
          <a href={pdfPath} download className='text-blue-600 hover:underline'>
            Descargar PDF
          </a>
        </div>
      </div>
    </ContentLayout>
  );
}
