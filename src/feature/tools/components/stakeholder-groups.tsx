import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import {
  Users,
  UserCircle,
  Building2,
  ShoppingCart,
  Truck,
  HomeIcon,
  BarChart3,
  ArrowRight
} from 'lucide-react';

export default function StakeholderGroups() {
  return (
    <Card>
      <CardHeader className='rounded-t-lg'>
        <CardTitle className='text-2xl'>Grupos de Interés</CardTitle>
        <CardDescription>
          Identificación y comprensión de los diferentes grupos de interés para
          una evaluación de materialidad efectiva
        </CardDescription>
      </CardHeader>
      <CardContent className='p-6 space-y-8'>
        {/* Introduction */}
        <div className='bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-md dark:bg-blue-900 dark:border-blue-400'>
          <h3 className='font-semibold text-blue-800 mb-2 dark:text-blue-200'>
            ¿Por qué son importantes los grupos de interés?
          </h3>
          <p className='text-gray-600 dark:text-gray-300'>
            La identificación y comprensión de los grupos de interés es
            fundamental para una evaluación de materialidad efectiva. Permite a
            las organizaciones priorizar temas ESG basados no solo en su
            importancia para el negocio, sino también en su relevancia para
            aquellos que se ven afectados por las operaciones de la empresa o
            que pueden influir en su éxito.
          </p>
        </div>

        {/* Internal Stakeholders */}
        <div>
          <div className='flex items-center gap-2 mb-6'>
            <div className='bg-purple-100 p-2 rounded-full dark:bg-purple-900'>
              <Building2 className='h-6 w-6 text-purple-600 dark:text-purple-400' />
            </div>
            <h3 className='text-xl font-bold text-purple-800 dark:text-purple-300'>
              Grupos de Interés Internos
            </h3>
          </div>

          <div className='grid gap-6 md:grid-cols-2'>
            <Card className='overflow-hidden border-none shadow-sm hover:shadow-md transition-shadow'>
              <div className='bg-purple-600 h-2 dark:bg-purple-400'></div>
              <CardContent className='p-6'>
                <div className='flex items-start gap-4'>
                  <div className='bg-purple-100 p-3 rounded-full mt-1 dark:bg-purple-900'>
                    <UserCircle className='h-8 w-8 text-purple-600 dark:text-purple-400' />
                  </div>
                  <div>
                    <h4 className='font-semibold text-lg mb-2 text-purple-800 dark:text-purple-300'>
                      Accionistas / Junta Directiva
                    </h4>
                    <p className='text-gray-600 dark:text-gray-300'>
                      Propietarios de la empresa y miembros del órgano de
                      gobierno que toman decisiones estratégicas.
                    </p>
                    <ul className='mt-3 space-y-1'>
                      <li className='flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300'>
                        <ArrowRight className='h-3 w-3 text-purple-500 dark:text-purple-300' />
                        <span>Rendimiento financiero</span>
                      </li>
                      <li className='flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300'>
                        <ArrowRight className='h-3 w-3 text-purple-500 dark:text-purple-300' />
                        <span>Gestión de riesgos</span>
                      </li>
                      <li className='flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300'>
                        <ArrowRight className='h-3 w-3 text-purple-500 dark:text-purple-300' />
                        <span>Creación de valor a largo plazo</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className='overflow-hidden border-none shadow-sm hover:shadow-md transition-shadow'>
              <div className='bg-purple-600 h-2 dark:bg-purple-400'></div>
              <CardContent className='p-6'>
                <div className='flex items-start gap-4'>
                  <div className='bg-purple-100 p-3 rounded-full mt-1 dark:bg-purple-900'>
                    <Users className='h-8 w-8 text-purple-600 dark:text-purple-400' />
                  </div>
                  <div>
                    <h4 className='font-semibold text-lg mb-2 text-purple-800 dark:text-purple-300'>
                      Colaboradores
                    </h4>
                    <p className='text-gray-600 dark:text-gray-300'>
                      Empleados y trabajadores de la organización que
                      contribuyen al funcionamiento y éxito de la empresa.
                    </p>
                    <ul className='mt-3 space-y-1'>
                      <li className='flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300'>
                        <ArrowRight className='h-3 w-3 text-purple-500 dark:text-purple-300' />
                        <span>Condiciones laborales justas</span>
                      </li>
                      <li className='flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300'>
                        <ArrowRight className='h-3 w-3 text-purple-500 dark:text-purple-300' />
                        <span>Desarrollo profesional</span>
                      </li>
                      <li className='flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300'>
                        <ArrowRight className='h-3 w-3 text-purple-500 dark:text-purple-300' />
                        <span>Ambiente de trabajo saludable</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* External Stakeholders */}
        <div>
          <div className='flex items-center gap-2 mb-6'>
            <div className='bg-teal-100 p-2 rounded-full dark:bg-teal-900'>
              <Users className='h-6 w-6 text-teal-600 dark:text-teal-400' />
            </div>
            <h3 className='text-xl font-bold text-teal-800 dark:text-teal-300'>
              Grupos de Interés Externos
            </h3>
          </div>

          <div className='grid gap-6 md:grid-cols-2'>
            <Card className='overflow-hidden border-none shadow-sm hover:shadow-md transition-shadow'>
              <div className='bg-teal-600 h-2 dark:bg-teal-400'></div>
              <CardContent className='p-6'>
                <div className='flex items-start gap-4'>
                  <div className='bg-teal-100 p-3 rounded-full mt-1 dark:bg-teal-900'>
                    <ShoppingCart className='h-8 w-8 text-teal-600 dark:text-teal-400' />
                  </div>
                  <div>
                    <h4 className='font-semibold text-lg mb-2 text-teal-800 dark:text-teal-300'>
                      Clientes
                    </h4>
                    <p className='text-gray-600 dark:text-gray-300'>
                      Compradores de productos o servicios que son la razón de
                      ser del negocio.
                    </p>
                    <ul className='mt-3 space-y-1'>
                      <li className='flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300'>
                        <ArrowRight className='h-3 w-3 text-teal-500 dark:text-teal-300' />
                        <span>Calidad y precio justo</span>
                      </li>
                      <li className='flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300'>
                        <ArrowRight className='h-3 w-3 text-teal-500 dark:text-teal-300' />
                        <span>Transparencia</span>
                      </li>
                      <li className='flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300'>
                        <ArrowRight className='h-3 w-3 text-teal-500 dark:text-teal-300' />
                        <span>Prácticas empresariales responsables</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className='overflow-hidden border-none shadow-sm hover:shadow-md transition-shadow'>
              <div className='bg-teal-600 h-2 dark:bg-teal-400'></div>
              <CardContent className='p-6'>
                <div className='flex items-start gap-4'>
                  <div className='bg-teal-100 p-3 rounded-full mt-1 dark:bg-teal-900'>
                    <Truck className='h-8 w-8 text-teal-600 dark:text-teal-400' />
                  </div>
                  <div>
                    <h4 className='font-semibold text-lg mb-2 text-teal-800 dark:text-teal-300'>
                      Proveedores
                    </h4>
                    <p className='text-gray-600 dark:text-gray-300'>
                      Empresas o individuos que suministran bienes o servicios
                      necesarios para la operación.
                    </p>
                    <ul className='mt-3 space-y-1'>
                      <li className='flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300'>
                        <ArrowRight className='h-3 w-3 text-teal-500 dark:text-teal-300' />
                        <span>Relaciones comerciales justas</span>
                      </li>
                      <li className='flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300'>
                        <ArrowRight className='h-3 w-3 text-teal-500 dark:text-teal-300' />
                        <span>Pagos puntuales</span>
                      </li>
                      <li className='flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300'>
                        <ArrowRight className='h-3 w-3 text-teal-500 dark:text-teal-300' />
                        <span>Colaboración a largo plazo</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className='overflow-hidden border-none shadow-sm hover:shadow-md transition-shadow'>
              <div className='bg-teal-600 h-2 dark:bg-teal-400'></div>
              <CardContent className='p-6'>
                <div className='flex items-start gap-4'>
                  <div className='bg-teal-100 p-3 rounded-full mt-1 dark:bg-teal-900'>
                    <HomeIcon className='h-8 w-8 text-teal-600 dark:text-teal-400' />
                  </div>
                  <div>
                    <h4 className='font-semibold text-lg mb-2 text-teal-800 dark:text-teal-300'>
                      Comunidades
                    </h4>
                    <p className='text-gray-600 dark:text-gray-300'>
                      Poblaciones locales donde opera la empresa que se ven
                      afectadas por sus actividades.
                    </p>
                    <ul className='mt-3 space-y-1'>
                      <li className='flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300'>
                        <ArrowRight className='h-3 w-3 text-teal-500 dark:text-teal-300' />
                        <span>Impactos ambientales</span>
                      </li>
                      <li className='flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300'>
                        <ArrowRight className='h-3 w-3 text-teal-500 dark:text-teal-300' />
                        <span>Oportunidades de empleo</span>
                      </li>
                      <li className='flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300'>
                        <ArrowRight className='h-3 w-3 text-teal-500 dark:text-teal-300' />
                        <span>Desarrollo comunitario</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className='overflow-hidden border-none shadow-sm hover:shadow-md transition-shadow'>
              <div className='bg-teal-600 h-2 dark:bg-teal-400'></div>
              <CardContent className='p-6'>
                <div className='flex items-start gap-4'>
                  <div className='bg-teal-100 p-3 rounded-full mt-1 dark:bg-teal-900'>
                    <BarChart3 className='h-8 w-8 text-teal-600 dark:text-teal-400' />
                  </div>
                  <div>
                    <h4 className='font-semibold text-lg mb-2 text-teal-800 dark:text-teal-300'>
                      Inversionistas y Mercados Financieros
                    </h4>
                    <p className='text-gray-600 dark:text-gray-300'>
                      Entidades que proporcionan capital o financiamiento para
                      las operaciones y crecimiento.
                    </p>
                    <ul className='mt-3 space-y-1'>
                      <li className='flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300'>
                        <ArrowRight className='h-3 w-3 text-teal-500 dark:text-teal-300' />
                        <span>Transparencia financiera</span>
                      </li>
                      <li className='flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300'>
                        <ArrowRight className='h-3 w-3 text-teal-500 dark:text-teal-300' />
                        <span>Gestión de riesgos ESG</span>
                      </li>
                      <li className='flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300'>
                        <ArrowRight className='h-3 w-3 text-teal-500 dark:text-teal-300' />
                        <span>Retorno de inversión sostenible</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Conclusion */}
        <div className='bg-gradient-to-r from-slate-50 to-slate-100 p-6 rounded-lg border border-slate-200 mt-8 dark:from-gray-700 dark:to-gray-800 dark:border-gray-600'>
          <h3 className='font-bold text-lg mb-3 text-slate-800 dark:text-gray-100'>
            Consideraciones para la Evaluación de Materialidad
          </h3>
          <p className='text-slate-700 mb-4 dark:text-gray-300'>
            Al evaluar la importancia de cada tema para los grupos de interés,
            considere:
          </p>
          <ul className='space-y-2'>
            <li className='flex items-start gap-2'>
              <div className='bg-slate-200 p-1 rounded-full mt-0.5 dark:bg-gray-600'>
                <ArrowRight className='h-4 w-4 text-slate-700 dark:text-gray-300' />
              </div>
              <span className='text-slate-700 dark:text-gray-300'>
                La diversidad de perspectivas entre diferentes grupos de interés
              </span>
            </li>
            <li className='flex items-start gap-2'>
              <div className='bg-slate-200 p-1 rounded-full mt-0.5 dark:bg-gray-600'>
                <ArrowRight className='h-4 w-4 text-slate-700 dark:text-gray-300' />
              </div>
              <span className='text-slate-700 dark:text-gray-300'>
                El nivel de influencia e impacto de cada grupo en su
                organización
              </span>
            </li>
            <li className='flex items-start gap-2'>
              <div className='bg-slate-200 p-1 rounded-full mt-0.5 dark:bg-gray-600'>
                <ArrowRight className='h-4 w-4 text-slate-700 dark:text-gray-300' />
              </div>
              <span className='text-slate-700 dark:text-gray-300'>
                Las tendencias emergentes y expectativas cambiantes de los
                grupos de interés
              </span>
            </li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
