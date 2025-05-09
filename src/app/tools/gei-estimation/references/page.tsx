import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { BookOpen, Info, Calculator, FileText } from 'lucide-react';
import Link from 'next/link';
import { ContentLayout } from '@/components/panel/content-layout';

export default function ReferenciasPage() {
  return (
    <ContentLayout title='Estimation GEI References' className='px-8 py-2'>
      <div className='flex items-center justify-between mb-8'>
        <h1 className='text-3xl font-bold'>Referencias y Metodología</h1>
        <Link
          href='/tools/gei-estimation'
          className='px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-md text-sm font-medium transition-colors'
        >
          Volver a la calculadora
        </Link>
      </div>

      <p className='text-lg text-muted-foreground mb-8 max-w-3xl'>
        Esta calculadora de huella de carbono se basa en metodologías
        internacionalmente reconocidas como el Protocolo de Gases de Efecto
        Invernadero (GHG Protocol) y la norma ISO 14064-1.
      </p>

      <Tabs defaultValue='factores' className='w-full max-w-4xl mx-auto'>
        <TabsList className='grid w-full grid-cols-4 mb-8'>
          <TabsTrigger
            value='factores'
            className='flex items-center gap-2 cursor-pointer'
          >
            <Calculator className='h-4 w-4' />
            <span>Factores de Emisión</span>
          </TabsTrigger>
          <TabsTrigger
            value='metodologia'
            className='flex items-center gap-2 cursor-pointer'
          >
            <FileText className='h-4 w-4' />
            <span>Metodología</span>
          </TabsTrigger>
          <TabsTrigger
            value='glosario'
            className='flex items-center gap-2 cursor-pointer'
          >
            <BookOpen className='h-4 w-4' />
            <span>Glosario</span>
          </TabsTrigger>
          <TabsTrigger
            value='fuentes'
            className='flex items-center gap-2 cursor-pointer'
          >
            <Info className='h-4 w-4' />
            <span>Fuentes</span>
          </TabsTrigger>
        </TabsList>

        {/* Factores de Emisión */}
        <TabsContent value='factores'>
          <div className='grid gap-6'>
            <Card>
              <CardHeader>
                <CardTitle>Factores de Emisión - Alcance 1</CardTitle>
                <CardDescription>
                  Factores utilizados para el cálculo de emisiones directas de
                  GEI
                </CardDescription>
              </CardHeader>
              <CardContent>
                <h3 className='text-lg font-medium mb-4'>
                  Combustibles Fósiles
                </h3>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Combustible</TableHead>
                      <TableHead>CO₂ (kgCO₂/unidad)</TableHead>
                      <TableHead>CH₄ (kgCH₄/unidad)</TableHead>
                      <TableHead>N₂O (kgN₂O/unidad)</TableHead>
                      <TableHead>Unidad</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>Diesel</TableCell>
                      <TableCell>10.15</TableCell>
                      <TableCell>0.004</TableCell>
                      <TableCell>0.022</TableCell>
                      <TableCell>galón</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Gasolina</TableCell>
                      <TableCell>7.9</TableCell>
                      <TableCell>0.0096</TableCell>
                      <TableCell>0.097</TableCell>
                      <TableCell>galón</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Gas Natural</TableCell>
                      <TableCell>1.96</TableCell>
                      <TableCell>0.001</TableCell>
                      <TableCell>0.001</TableCell>
                      <TableCell>m³</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>

                <Separator className='my-6' />

                <h3 className='text-lg font-medium mb-4'>
                  Gases Refrigerantes
                </h3>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Gas Refrigerante</TableHead>
                      <TableHead>
                        Potencial de Calentamiento Global (PCG)
                      </TableHead>
                      <TableHead>Unidad</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>R-410A</TableCell>
                      <TableCell>2088</TableCell>
                      <TableCell>kgCO₂e/kg</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>R-134A</TableCell>
                      <TableCell>1300</TableCell>
                      <TableCell>kgCO₂e/kg</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>R-404A</TableCell>
                      <TableCell>3943</TableCell>
                      <TableCell>kgCO₂e/kg</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>R-507A</TableCell>
                      <TableCell>3985</TableCell>
                      <TableCell>kgCO₂e/kg</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>R-422D</TableCell>
                      <TableCell>2230</TableCell>
                      <TableCell>kgCO₂e/kg</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>R-417A</TableCell>
                      <TableCell>2127</TableCell>
                      <TableCell>kgCO₂e/kg</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>HCFC-22</TableCell>
                      <TableCell>1760</TableCell>
                      <TableCell>kgCO₂e/kg</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Factores de Emisión - Alcance 2</CardTitle>
                <CardDescription>
                  Factores utilizados para el cálculo de emisiones indirectas
                  por consumo de electricidad
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Fuente</TableHead>
                      <TableHead>Factor de Emisión</TableHead>
                      <TableHead>Unidad</TableHead>
                      <TableHead>Región/País</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>Red Eléctrica (SIN)</TableCell>
                      <TableCell>0.112</TableCell>
                      <TableCell>tonCO₂e/MWh</TableCell>
                      <TableCell>Colombia</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Factores de Emisión - Alcance 3</CardTitle>
                <CardDescription>
                  Factores utilizados para el cálculo de otras emisiones
                  indirectas
                </CardDescription>
              </CardHeader>
              <CardContent>
                <h3 className='text-lg font-medium mb-4'>Transporte</h3>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Tipo de Transporte</TableHead>
                      <TableHead>Factor de Emisión</TableHead>
                      <TableHead>Unidad</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>Automóvil</TableCell>
                      <TableCell>0.189</TableCell>
                      <TableCell>kgCO₂e/km</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Taxi</TableCell>
                      <TableCell>0.149</TableCell>
                      <TableCell>kgCO₂e/km</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Moto</TableCell>
                      <TableCell>0.025</TableCell>
                      <TableCell>kgCO₂e/km</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Bus</TableCell>
                      <TableCell>0.035</TableCell>
                      <TableCell>kgCO₂e/km</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Microbús</TableCell>
                      <TableCell>0.022</TableCell>
                      <TableCell>kgCO₂e/km</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Metroplús</TableCell>
                      <TableCell>0.011</TableCell>
                      <TableCell>kgCO₂e/km</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Van</TableCell>
                      <TableCell>0.209</TableCell>
                      <TableCell>kgCO₂e/km</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>

                <Separator className='my-6' />

                <h3 className='text-lg font-medium mb-4'>Residuos</h3>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Tipo de Disposición</TableHead>
                      <TableHead>Factor de Emisión</TableHead>
                      <TableHead>Unidad</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>Relleno Sanitario</TableCell>
                      <TableCell>616</TableCell>
                      <TableCell>kgCO₂e/ton</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Celda de Seguridad</TableCell>
                      <TableCell>198</TableCell>
                      <TableCell>kgCO₂e/ton</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Compostaje</TableCell>
                      <TableCell>10</TableCell>
                      <TableCell>kgCO₂e/ton</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Reciclaje</TableCell>
                      <TableCell>-1150</TableCell>
                      <TableCell>kgCO₂e/ton</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>

                <Separator className='my-6' />

                <h3 className='text-lg font-medium mb-4'>Viajes de Negocios</h3>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Tipo de Viaje</TableHead>
                      <TableHead>Factor de Emisión</TableHead>
                      <TableHead>Unidad</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>Aéreo (corto &lt;500km)</TableCell>
                      <TableCell>0.255</TableCell>
                      <TableCell>kgCO₂e/km</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Aéreo (largo &gt;500km)</TableCell>
                      <TableCell>0.150</TableCell>
                      <TableCell>kgCO₂e/km</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Tren</TableCell>
                      <TableCell>0.041</TableCell>
                      <TableCell>kgCO₂e/km</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Autobús</TableCell>
                      <TableCell>0.027</TableCell>
                      <TableCell>kgCO₂e/km</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Metodología */}
        <TabsContent value='metodologia'>
          <Card>
            <CardHeader>
              <CardTitle>Metodología de Cálculo</CardTitle>
              <CardDescription>
                Descripción de la metodología utilizada para el cálculo de la
                huella de carbono
              </CardDescription>
            </CardHeader>
            <CardContent className='space-y-6'>
              <div>
                <h3 className='text-lg font-medium mb-2'>
                  Alcance 1: Emisiones Directas
                </h3>
                <p className='text-muted-foreground mb-4'>
                  Las emisiones directas son aquellas que provienen de fuentes
                  que son propiedad o están controladas por la organización.
                </p>

                <h4 className='font-medium mb-2'>Combustión Fija</h4>
                <p className='text-muted-foreground mb-2'>
                  Para el cálculo de emisiones por combustión fija se utiliza la
                  siguiente fórmula:
                </p>
                <div className='bg-slate-100 p-4 rounded-md mb-4'>
                  <p className='font-mono'>
                    Emisiones CO₂ (kgCO₂) = Consumo de combustible (gal o m³) ×
                    Factor de emisión CO₂ (kgCO₂/gal o kgCO₂/m³)
                  </p>
                  <p className='font-mono mt-2'>
                    Emisiones CH₄ (kgCO₂e) = Consumo de combustible (gal o m³) ×
                    Factor de emisión CH₄ (kgCH₄/gal o kgCH₄/m³) × PCG CH₄
                  </p>
                  <p className='font-mono mt-2'>
                    Emisiones N₂O (kgCO₂e) = Consumo de combustible (gal o m³) ×
                    Factor de emisión N₂O (kgN₂O/gal o kgN₂O/m³) × PCG N₂O
                  </p>
                  <p className='font-mono mt-2'>
                    Emisiones totales (kgCO₂e) = Emisiones CO₂ + Emisiones CH₄ +
                    Emisiones N₂O
                  </p>
                  <p className='font-mono mt-2'>
                    Emisiones totales (tonCO₂e) = Emisiones totales (kgCO₂e) /
                    1000
                  </p>
                </div>
                <p className='text-sm text-muted-foreground'>
                  Donde PCG es el Potencial de Calentamiento Global: 29.8 para
                  CH₄ y 273 para N₂O (valores del IPCC AR6)
                </p>

                <h4 className='font-medium mb-2 mt-4'>Gases Refrigerantes</h4>
                <p className='text-muted-foreground mb-2'>
                  Para el cálculo de emisiones por fugas de gases refrigerantes
                  se utiliza la siguiente fórmula:
                </p>
                <div className='bg-slate-100 p-4 rounded-md mb-4'>
                  <p className='font-mono'>
                    Emisiones (kgCO₂e) = Consumo de refrigerante (kg) × PCG del
                    refrigerante (kgCO₂e/kg)
                  </p>
                  <p className='font-mono mt-2'>
                    Emisiones (tonCO₂e) = Emisiones (kgCO₂e) / 1000
                  </p>
                </div>
                <p className='text-sm text-muted-foreground'>
                  Donde PCG es el Potencial de Calentamiento Global específico
                  para cada gas refrigerante.
                </p>
              </div>

              <Separator />

              <div>
                <h3 className='text-lg font-medium mb-2'>
                  Alcance 2: Emisiones Indirectas por Electricidad
                </h3>
                <p className='text-muted-foreground mb-4'>
                  Las emisiones de Alcance 2 son aquellas asociadas a la
                  generación de electricidad adquirida y consumida por la
                  organización.
                </p>

                <p className='text-muted-foreground mb-2'>
                  Para el cálculo de emisiones por consumo de electricidad se
                  utiliza la siguiente fórmula:
                </p>
                <div className='bg-slate-100 p-4 rounded-md mb-4'>
                  <p className='font-mono'>
                    Emisiones (tonCO₂e) = Consumo de electricidad (MWh) × Factor
                    de emisión (tonCO₂e/MWh)
                  </p>
                </div>
                <p className='text-sm text-muted-foreground'>
                  El factor de emisión utilizado corresponde al del Sistema
                  Interconectado Nacional (SIN) de Colombia.
                </p>
              </div>

              <Separator />

              <div>
                <h3 className='text-lg font-medium mb-2'>
                  Alcance 3: Otras Emisiones Indirectas
                </h3>
                <p className='text-muted-foreground mb-4'>
                  Las emisiones de Alcance 3 son otras emisiones indirectas que
                  ocurren en la cadena de valor de la organización.
                </p>

                <h4 className='font-medium mb-2'>Transporte</h4>
                <p className='text-muted-foreground mb-2'>
                  Para el cálculo de emisiones por transporte se utiliza la
                  siguiente fórmula:
                </p>
                <div className='bg-slate-100 p-4 rounded-md mb-4'>
                  <p className='font-mono'>
                    Emisiones (kgCO₂e) = Distancia recorrida (km) × Factor de
                    emisión (kgCO₂e/km)
                  </p>
                  <p className='font-mono mt-2'>
                    Emisiones (tonCO₂e) = Emisiones (kgCO₂e) / 1000
                  </p>
                </div>

                <h4 className='font-medium mb-2 mt-4'>Residuos</h4>
                <p className='text-muted-foreground mb-2'>
                  Para el cálculo de emisiones por gestión de residuos se
                  utiliza la siguiente fórmula:
                </p>
                <div className='bg-slate-100 p-4 rounded-md mb-4'>
                  <p className='font-mono'>
                    Emisiones (kgCO₂e) = Cantidad de residuos (ton) × Factor de
                    emisión (kgCO₂e/ton)
                  </p>
                  <p className='font-mono mt-2'>
                    Emisiones (tonCO₂e) = Emisiones (kgCO₂e) / 1000
                  </p>
                </div>

                <h4 className='font-medium mb-2 mt-4'>Viajes de Negocios</h4>
                <p className='text-muted-foreground mb-2'>
                  Para el cálculo de emisiones por viajes de negocios se utiliza
                  la siguiente fórmula:
                </p>
                <div className='bg-slate-100 p-4 rounded-md mb-4'>
                  <p className='font-mono'>
                    Emisiones (kgCO₂e) = Distancia recorrida (km) × Factor de
                    emisión (kgCO₂e/km)
                  </p>
                  <p className='font-mono mt-2'>
                    Emisiones (tonCO₂e) = Emisiones (kgCO₂e) / 1000
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Glosario */}
        <TabsContent value='glosario'>
          <Card>
            <CardHeader>
              <CardTitle>Glosario de Términos</CardTitle>
              <CardDescription>
                Definiciones de términos utilizados en la calculadora
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className='grid gap-4'>
                <div className='border-b pb-3'>
                  <h3 className='font-medium'>
                    GEI (Gases de Efecto Invernadero)
                  </h3>
                  <p className='text-muted-foreground'>
                    Componentes gaseosos de la atmósfera que absorben y emiten
                    radiación infrarroja, causando el efecto invernadero. Los
                    principales GEI son: dióxido de carbono (CO₂), metano (CH₄),
                    óxido nitroso (N₂O), hidrofluorocarbonos (HFC),
                    perfluorocarbonos (PFC) y hexafluoruro de azufre (SF₆).
                  </p>
                </div>

                <div className='border-b pb-3'>
                  <h3 className='font-medium'>
                    CO₂e (Dióxido de Carbono Equivalente)
                  </h3>
                  <p className='text-muted-foreground'>
                    Unidad de medida que expresa el potencial de calentamiento
                    global de todos los GEI en términos de CO₂. Se calcula
                    multiplicando la cantidad de cada gas por su PCG.
                  </p>
                </div>

                <div className='border-b pb-3'>
                  <h3 className='font-medium'>
                    PCG (Potencial de Calentamiento Global)
                  </h3>
                  <p className='text-muted-foreground'>
                    Medida relativa de cuánto calor puede atrapar un determinado
                    gas de efecto invernadero en la atmósfera en comparación con
                    el CO₂, cuyo PCG es 1 por definición.
                  </p>
                </div>

                <div className='border-b pb-3'>
                  <h3 className='font-medium'>Alcance 1</h3>
                  <p className='text-muted-foreground'>
                    Emisiones directas de GEI provenientes de fuentes que son
                    propiedad o están controladas por la organización, como la
                    combustión en calderas, hornos, vehículos, etc., y las
                    emisiones fugitivas de equipos o instalaciones.
                  </p>
                </div>

                <div className='border-b pb-3'>
                  <h3 className='font-medium'>Alcance 2</h3>
                  <p className='text-muted-foreground'>
                    Emisiones indirectas de GEI asociadas a la generación de
                    electricidad adquirida y consumida por la organización.
                  </p>
                </div>

                <div className='border-b pb-3'>
                  <h3 className='font-medium'>Alcance 3</h3>
                  <p className='text-muted-foreground'>
                    Otras emisiones indirectas de GEI que ocurren como
                    consecuencia de las actividades de la organización, pero que
                    se originan en fuentes que no son propiedad ni están
                    controladas por la organización, como el transporte de
                    materiales, productos y residuos, viajes de negocios, etc.
                  </p>
                </div>

                <div className='border-b pb-3'>
                  <h3 className='font-medium'>Combustión Fija</h3>
                  <p className='text-muted-foreground'>
                    Quema de combustibles en equipos estacionarios como
                    calderas, hornos, turbinas, etc.
                  </p>
                </div>

                <div className='border-b pb-3'>
                  <h3 className='font-medium'>Gases Refrigerantes</h3>
                  <p className='text-muted-foreground'>
                    Sustancias utilizadas en sistemas de refrigeración y aire
                    acondicionado que pueden tener un alto potencial de
                    calentamiento global.
                  </p>
                </div>

                <div className='border-b pb-3'>
                  <h3 className='font-medium'>Factor de Emisión</h3>
                  <p className='text-muted-foreground'>
                    Valor que representa la cantidad de GEI emitidos por unidad
                    de actividad. Por ejemplo, kgCO₂e por galón de combustible,
                    por kWh de electricidad, etc.
                  </p>
                </div>

                <div>
                  <h3 className='font-medium'>Huella de Carbono</h3>
                  <p className='text-muted-foreground'>
                    Medida del total de emisiones de GEI causadas directa o
                    indirectamente por una persona, organización, evento o
                    producto, expresada en toneladas de CO₂e.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Fuentes */}
        <TabsContent value='fuentes'>
          <Card>
            <CardHeader>
              <CardTitle>Fuentes y Referencias</CardTitle>
              <CardDescription>
                Documentos y fuentes utilizadas para la elaboración de la
                calculadora
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className='space-y-4'>
                <div className='border-b pb-3'>
                  <h3 className='font-medium'>Estándares y Protocolos</h3>
                  <ul className='list-disc pl-6 mt-2 space-y-2 text-muted-foreground'>
                    <li>
                      <strong>GHG Protocol Corporate Standard</strong> - World
                      Resources Institute (WRI) y World Business Council for
                      Sustainable Development (WBCSD)
                    </li>
                    <li>
                      <strong>ISO 14064-1:2018</strong> - Gases de efecto
                      invernadero — Parte 1: Especificación con orientación, a
                      nivel de las organizaciones, para la cuantificación y el
                      informe de las emisiones y remociones de gases de efecto
                      invernadero
                    </li>
                    <li>
                      <strong>IPCC Sixth Assessment Report (AR6)</strong> -
                      Intergovernmental Panel on Climate Change, 2021
                    </li>
                  </ul>
                </div>

                <div className='border-b pb-3'>
                  <h3 className='font-medium'>Factores de Emisión</h3>
                  <ul className='list-disc pl-6 mt-2 space-y-2 text-muted-foreground'>
                    <li>
                      <strong>
                        FECOC (Factores de Emisión de los Combustibles
                        Colombianos)
                      </strong>{' '}
                      - Unidad de Planeación Minero Energética (UPME), Colombia
                    </li>
                    <li>
                      <strong>
                        Factor de emisión de la red eléctrica colombiana
                      </strong>{' '}
                      - XM S.A. E.S.P., Operador del Sistema Interconectado
                      Nacional (SIN) y Administrador del Mercado de Energía
                      Mayorista de Colombia
                    </li>
                    <li>
                      <strong>
                        Emission Factors for Greenhouse Gas Inventories
                      </strong>{' '}
                      - U.S. Environmental Protection Agency (EPA)
                    </li>
                    <li>
                      <strong>
                        2019 Refinement to the 2006 IPCC Guidelines for National
                        Greenhouse Gas Inventories
                      </strong>{' '}
                      - Intergovernmental Panel on Climate Change
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className='font-medium'>Otras Referencias</h3>
                  <ul className='list-disc pl-6 mt-2 space-y-2 text-muted-foreground'>
                    <li>
                      <strong>DEFRA Conversion Factors</strong> - Department for
                      Environment, Food and Rural Affairs, Reino Unido
                    </li>
                    <li>
                      <strong>
                        Guía para el cálculo y gestión de la huella de carbono
                        corporativa
                      </strong>{' '}
                      - Ministerio de Ambiente y Desarrollo Sostenible, Colombia
                    </li>
                    <li>
                      <strong>
                        Corporate Value Chain (Scope 3) Accounting and Reporting
                        Standard
                      </strong>{' '}
                      - GHG Protocol
                    </li>
                    <li>
                      <strong>
                        Technical Guidance for Calculating Scope 3 Emissions
                      </strong>{' '}
                      - GHG Protocol
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </ContentLayout>
  );
}
