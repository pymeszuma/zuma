"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import {
  Download,
  ClipboardCopy,
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  Save,
  BarChart4,
  HelpCircle,
  Sun,
  Moon,
  Info,
} from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Switch } from "@/components/ui/switch"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { toast } from "sonner"

type Question = {
  id: string
  text: string
  category: string
  help?: string
}

type SurveyProps = {
  onComplete: () => void
}

export function EnergySurvey({ onComplete }: SurveyProps) {
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [showResults, setShowResults] = useState(false)
  const [currentPage, setCurrentPage] = useState(0)
  const [darkMode, setDarkMode] = useState(false)
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const [savedProgress, setSavedProgress] = useState<boolean>(false)
  const questionsPerPage = 5

  // Efecto para cargar respuestas guardadas
  useEffect(() => {
    const savedAnswers = localStorage.getItem("energy-survey-answers")
    if (savedAnswers) {
      setAnswers(JSON.parse(savedAnswers))
      setSavedProgress(true)
    }
  }, [])

  // Efecto para cambiar el tema
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [darkMode])

  // Categorías para agrupar las preguntas
  const categories = {
    gestion: "Gestión Energética",
    inclusion: "Diversidad e Inclusión",
    emisiones: "Emisiones y Cambio Climático",
    renovables: "Energías Renovables",
    demanda: "Gestión de Demanda",
  }

  // Colores para las categorías
  const categoryColors: Record<string, { bg: string; text: string; border: string }> = {
    gestion: {
      bg: "bg-blue-50 dark:bg-blue-900/20",
      text: "text-blue-700 dark:text-blue-300",
      border: "border-blue-200 dark:border-blue-800",
    },
    inclusion: {
      bg: "bg-purple-50 dark:bg-purple-900/20",
      text: "text-purple-700 dark:text-purple-300",
      border: "border-purple-200 dark:border-purple-800",
    },
    emisiones: {
      bg: "bg-green-50 dark:bg-green-900/20",
      text: "text-green-700 dark:text-green-300",
      border: "border-green-200 dark:border-green-800",
    },
    renovables: {
      bg: "bg-amber-50 dark:bg-amber-900/20",
      text: "text-amber-700 dark:text-amber-300",
      border: "border-amber-200 dark:border-amber-800",
    },
    demanda: {
      bg: "bg-cyan-50 dark:bg-cyan-900/20",
      text: "text-cyan-700 dark:text-cyan-300",
      border: "border-cyan-200 dark:border-cyan-800",
    },
  }

  const questions: Question[] = [
    {
      id: "q1",
      text: "¿La empresa tiene programas de capacitación en gestión energética para su personal?",
      category: "gestion",
      help: "Los programas de capacitación pueden incluir talleres, cursos o certificaciones en gestión energética.",
    },
    {
      id: "q2",
      text: "¿La empresa tiene políticas que promuevan la diversidad, equidad e inclusión (DEI) en sus proyectos de eficiencia energética?",
      category: "inclusion",
      help: "Estas políticas pueden incluir cuotas de género, programas de mentoría o iniciativas de contratación inclusiva.",
    },
    {
      id: "q3",
      text: "¿La empresa promueve la implementación de medidas para garantizar entornos laborales seguros y equitativos en sus proyectos energéticos?",
      category: "inclusion",
      help: "Estas medidas pueden incluir protocolos de seguridad, políticas contra el acoso o programas de bienestar.",
    },
    {
      id: "q4",
      text: "¿La empresa ha implementado un sistema de gestión energética como el ISO 50001 en sus instalaciones?",
      category: "gestion",
      help: "ISO 50001 es un estándar internacional que especifica los requisitos para establecer, implementar, mantener y mejorar un sistema de gestión de energía.",
    },
    {
      id: "q5",
      text: "¿La empresa ha adoptado estándares de eficiencia energética en su infraestructura siguiendo normas como ISO 50001 o el protocolo IPMVP?",
      category: "gestion",
      help: "El Protocolo Internacional de Medida y Verificación del Rendimiento (IPMVP) proporciona un marco para medir y verificar el ahorro de energía.",
    },
    {
      id: "q6",
      text: "¿La empresa ha implementado redes inteligentes para mejorar la distribución de energía de manera eficiente?",
      category: "gestion",
      help: "Las redes inteligentes utilizan tecnología digital para monitorear y gestionar el transporte de electricidad desde todas las fuentes de generación.",
    },
    {
      id: "q7",
      text: "¿La empresa utiliza tecnologías de captura y almacenamiento de carbono (CCS) para reducir sus emisiones en áreas de alta demanda energética?",
      category: "emisiones",
      help: "La tecnología CCS captura el CO2 producido por el uso de combustibles fósiles, evitando que entre en la atmósfera.",
    },
    {
      id: "q8",
      text: "¿La empresa está utilizando inteligencia artificial y big data para optimizar la eficiencia energética de sus plantas de generación?",
      category: "gestion",
      help: "La IA y el big data pueden analizar patrones de consumo y producción para optimizar la operación de las plantas.",
    },
    {
      id: "q9",
      text: "¿La empresa ha implementado metodologías de Análisis de Ciclo de Vida (ACV) para medir la eficiencia energética en sus procesos?",
      category: "gestion",
      help: "El ACV evalúa los impactos ambientales asociados con todas las etapas de la vida de un producto o servicio.",
    },
    {
      id: "q10",
      text: "¿La empresa ha adoptado modelos de financiamiento verde para implementar proyectos de eficiencia energética?",
      category: "gestion",
      help: "El financiamiento verde incluye bonos verdes, préstamos sostenibles o fondos específicos para proyectos ambientales.",
    },
    {
      id: "q11",
      text: "¿La empresa tiene programas de formación para operadores y técnicos en eficiencia energética?",
      category: "gestion",
      help: "Estos programas pueden incluir capacitación técnica específica para el personal que opera equipos de alta demanda energética.",
    },
    {
      id: "q12",
      text: "¿La empresa implementa acciones para reducir las emisiones fugitivas?",
      category: "emisiones",
      help: "Las emisiones fugitivas son liberaciones no intencionales de gases de efecto invernadero durante procesos industriales.",
    },
    {
      id: "q13",
      text: "¿La empresa promueve la inclusión de mujeres en la gestión ambiental?",
      category: "inclusion",
      help: "Esto puede incluir programas específicos para aumentar la participación femenina en roles de gestión ambiental.",
    },
    {
      id: "q14",
      text: "¿La empresa promueve políticas que favorezcan la participación de mujeres en la transición energética?",
      category: "inclusion",
      help: "Estas políticas pueden incluir programas de capacitación, mentoría o cuotas para aumentar la participación femenina.",
    },
    {
      id: "q15",
      text: "¿La empresa gestiona eficientemente las emisiones fugitivas en sus instalaciones?",
      category: "emisiones",
      help: "La gestión eficiente incluye monitoreo regular, mantenimiento preventivo y tecnologías de detección temprana.",
    },
    {
      id: "q16",
      text: "¿La empresa está implementando fuentes de energía renovable para reducir las emisiones fugitivas?",
      category: "renovables",
      help: "Las energías renovables como solar, eólica o hidroeléctrica pueden reemplazar procesos que generan emisiones fugitivas.",
    },
    {
      id: "q17",
      text: "¿La empresa mejora la eficiencia energética para mitigar emisiones fugitivas?",
      category: "emisiones",
      help: "La mejora de la eficiencia energética reduce la necesidad de combustibles fósiles y, por tanto, las emisiones asociadas.",
    },
    {
      id: "q18",
      text: "¿La empresa implementa medidas para adaptarse al cambio climático y reducir las emisiones fugitivas?",
      category: "emisiones",
      help: "Estas medidas pueden incluir infraestructura resistente al clima o planes de contingencia para eventos climáticos extremos.",
    },
    {
      id: "q19",
      text: "¿La empresa promueve la utilización de prácticas de mitigación basadas en la naturaleza para reducir emisiones fugitivas?",
      category: "emisiones",
      help: "Las soluciones basadas en la naturaleza incluyen reforestación, restauración de ecosistemas o agricultura regenerativa.",
    },
    {
      id: "q20",
      text: "¿La empresa colabora con otras instituciones para enfrentar el cambio climático?",
      category: "emisiones",
      help: "La colaboración puede incluir alianzas con universidades, ONGs, gobiernos u otras empresas del sector.",
    },
    {
      id: "q21",
      text: "¿La empresa fomenta el financiamiento verde para sus proyectos de mitigación?",
      category: "emisiones",
      help: "El financiamiento verde puede incluir bonos verdes, créditos de carbono o fondos específicos para proyectos de mitigación.",
    },
    {
      id: "q22",
      text: "¿La empresa apoya alianzas para implementar soluciones innovadoras para reducir las emisiones fugitivas?",
      category: "emisiones",
      help: "Estas alianzas pueden incluir colaboraciones con startups tecnológicas o centros de investigación.",
    },
    {
      id: "q23",
      text: "¿La empresa implementa medidas de gestión de la demanda energética en sus procesos de generación y distribución?",
      category: "demanda",
      help: "La gestión de la demanda incluye estrategias para optimizar el consumo de energía en diferentes momentos del día.",
    },
    {
      id: "q24",
      text: "¿La empresa promueve la inclusión de mujeres en el desarrollo de proyectos de gestión de la demanda energética?",
      category: "inclusion",
      help: "Esto puede incluir programas específicos para aumentar la participación femenina en roles técnicos y de gestión.",
    },
    {
      id: "q25",
      text: "¿La empresa promueve la inclusión de mujeres en el desarrollo de proyectos de gestión de la demanda energética?",
      category: "inclusion",
      help: "Esto puede incluir programas específicos para aumentar la participación femenina en roles técnicos y de gestión.",
    },
    {
      id: "q26",
      text: "¿La empresa realiza esfuerzos para reducir el consumo de energía mediante la gestión eficiente de la demanda en las plantas de generación?",
      category: "demanda",
      help: "Estos esfuerzos pueden incluir sistemas automatizados, monitoreo en tiempo real o programación optimizada.",
    },
    {
      id: "q27",
      text: "¿La empresa utiliza fuentes de energía renovable para optimizar la gestión de la demanda energética en sus plantas y redes de distribución?",
      category: "renovables",
      help: "Las energías renovables pueden complementar la demanda en horas pico o servir como respaldo en sistemas híbridos.",
    },
    {
      id: "q28",
      text: "¿La empresa utiliza tecnologías avanzadas para monitorear y gestionar la demanda energética en tiempo real en sus procesos de generación y distribución?",
      category: "demanda",
      help: "Estas tecnologías pueden incluir sensores IoT, sistemas SCADA o plataformas de análisis en tiempo real.",
    },
    {
      id: "q29",
      text: "¿La empresa aplica prácticas de reducción de la huella de carbono a través de la gestión eficiente de la demanda energética en sus plantas?",
      category: "demanda",
      help: "Estas prácticas pueden incluir optimización de procesos, recuperación de calor residual o cogeneración.",
    },
    {
      id: "q30",
      text: "¿La empresa está integrando medidas de adaptación al cambio climático en su estrategia de gestión de la demanda energética?",
      category: "demanda",
      help: "Estas medidas pueden incluir previsiones climáticas en la planificación energética o sistemas resilientes.",
    },
    {
      id: "q31",
      text: "¿La empresa participa en iniciativas de colaboración sectorial para mejorar la gestión colectiva de la demanda energética?",
      category: "demanda",
      help: "Estas iniciativas pueden incluir programas de respuesta a la demanda o mercados de capacidad.",
    },
    {
      id: "q32",
      text: "¿La empresa está comprometida con el financiamiento verde para implementar medidas de gestión eficiente de la demanda energética?",
      category: "demanda",
      help: "Este compromiso puede manifestarse en presupuestos dedicados o búsqueda activa de financiamiento sostenible.",
    },
    {
      id: "q33",
      text: "¿La empresa está estableciendo alianzas para desarrollar e implementar tecnologías innovadoras en la gestión de la demanda energética?",
      category: "demanda",
      help: "Estas alianzas pueden incluir colaboraciones con universidades, centros de investigación o startups tecnológicas.",
    },
    {
      id: "q34",
      text: "¿La empresa implementa medidas para reducir la huella de carbono en la generación de electricidad?",
      category: "emisiones",
      help: "Estas medidas pueden incluir cambio a combustibles más limpios, captura de carbono o eficiencia mejorada.",
    },
    {
      id: "q35",
      text: "¿La empresa fomenta la igualdad de género en los proyectos de energía renovable?",
      category: "inclusion",
      help: "Este fomento puede incluir políticas de contratación equitativa, programas de desarrollo profesional o liderazgo femenino.",
    },
    {
      id: "q36",
      text: "¿La empresa asegura la participación de mujeres en los roles técnicos de las plantas generadoras de energía?",
      category: "inclusion",
      help: "Esto puede incluir programas de capacitación específicos, mentoría o políticas de contratación inclusivas.",
    },
    {
      id: "q37",
      text: "¿La empresa utiliza energías renovables en su proceso de generación de electricidad?",
      category: "renovables",
      help: "Estas pueden incluir energía solar, eólica, hidroeléctrica, geotérmica o biomasa.",
    },
    {
      id: "q38",
      text: "¿La empresa está implementando proyectos de eficiencia energética en su planta de generación?",
      category: "gestion",
      help: "Estos proyectos pueden incluir actualización de equipos, optimización de procesos o sistemas de gestión energética.",
    },
    {
      id: "q39",
      text: "¿La empresa está utilizando tecnologías innovadoras para mejorar la generación de electricidad de manera eficiente?",
      category: "gestion",
      help: "Estas tecnologías pueden incluir turbinas avanzadas, sistemas de almacenamiento o redes inteligentes.",
    },
    {
      id: "q40",
      text: "¿La empresa tiene un plan de adaptación para mitigar los impactos del cambio climático en sus operaciones?",
      category: "emisiones",
      help: "Este plan puede incluir evaluaciones de riesgo climático, infraestructura resiliente o planes de contingencia.",
    },
    {
      id: "q41",
      text: "¿La empresa está comprometida con la transición energética hacia fuentes renovables en su generación de electricidad?",
      category: "renovables",
      help: "Este compromiso puede manifestarse en metas públicas, inversiones o planes de descarbonización.",
    },
    {
      id: "q42",
      text: "¿La empresa colabora con otras empresas o actores en la promoción de energías limpias y sostenibles?",
      category: "renovables",
      help: "Esta colaboración puede incluir participación en asociaciones industriales, proyectos conjuntos o iniciativas sectoriales.",
    },
    {
      id: "q43",
      text: "¿La empresa utiliza financiamiento verde para proyectos de energía renovable y eficiencia energética?",
      category: "renovables",
      help: "Este financiamiento puede incluir bonos verdes, préstamos sostenibles o fondos específicos para proyectos renovables.",
    },
  ]

  // Agrupar preguntas por categoría
  const questionsByCategory: Record<string, Question[]> = {}
  Object.keys(categories).forEach((category) => {
    questionsByCategory[category] = questions.filter((q) => q.category === category)
  })

  // Filtrar preguntas por categoría activa o mostrar todas
  const filteredQuestions = activeCategory ? questions.filter((q) => q.category === activeCategory) : questions

  const totalPages = Math.ceil(filteredQuestions.length / questionsPerPage)
  const startIndex = currentPage * questionsPerPage
  const endIndex = Math.min(startIndex + questionsPerPage, filteredQuestions.length)
  const currentQuestions = filteredQuestions.slice(startIndex, endIndex)

  const handleAnswerChange = (questionId: string, value: string) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }))
  }

  const handleSubmit = () => {
    setShowResults(true)
    onComplete()
  }

  const handleNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1)
      window.scrollTo(0, 0)
    }
  }

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1)
      window.scrollTo(0, 0)
    }
  }

  const isPageComplete = () => {
    return currentQuestions.every((question) => answers[question.id])
  }

  const isAllComplete = () => {
    return questions.every((question) => answers[question.id])
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(JSON.stringify(answers, null, 2))
    toast('Copiado al portapapeles', {
      description: "Los datos de la encuesta han sido copiados al portapapeles."
    })
  }

  const downloadJson = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(answers, null, 2))
    const downloadAnchorNode = document.createElement("a")
    downloadAnchorNode.setAttribute("href", dataStr)
    downloadAnchorNode.setAttribute("download", "survey_results.json")
    document.body.appendChild(downloadAnchorNode)
    downloadAnchorNode.click()
    downloadAnchorNode.remove()
    toast("Descarga iniciada", {
      description: "Los datos de la encuesta se están descargando.",
    })
  }

  const saveProgress = () => {
    localStorage.setItem("energy-survey-answers", JSON.stringify(answers))
    setSavedProgress(true)
    toast("Progreso guardado", {
      description: "Tu progreso ha sido guardado y podrás continuar más tarde.",
    })
  }

  const clearProgress = () => {
    localStorage.removeItem("energy-survey-answers")
    setAnswers({})
    setSavedProgress(false)
    setCurrentPage(0)
    toast("Progreso eliminado", {
      description: "Se ha eliminado todo el progreso guardado.",
    })
  }

  // Calcular el progreso general
  const progressPercentage = Math.round((Object.keys(answers).length / questions.length) * 100)

  // Contar respuestas por categoría
  const getResultsByCategory = () => {
    const results: Record<string, { si: number; no: number; parcial: number; na: number; total: number }> = {}

    // Inicializar categorías
    Object.keys(categories).forEach((category) => {
      results[category] = { si: 0, no: 0, parcial: 0, na: 0, total: 0 }
    })

    // Contar respuestas
    questions.forEach((question) => {
      const answer = answers[question.id]
      if (answer) {
        results[question.category][answer as 'si' | 'no' | 'parcial' | 'na']++
        results[question.category].total++
      }
    })

    return results
  }

  // Calcular progreso por categoría
  const getCategoryProgress = () => {
    const progress: Record<string, number> = {}

    Object.keys(categories).forEach((category) => {
      const categoryQuestions = questions.filter((q) => q.category === category)
      const answeredQuestions = categoryQuestions.filter((q) => answers[q.id])
      progress[category] = Math.round((answeredQuestions.length / categoryQuestions.length) * 100)
    })

    return progress
  }

  const categoryProgress = getCategoryProgress()

  return (
    <div className={`space-y-6 transition-colors duration-300 ${darkMode ? "dark" : ""}`}>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Encuesta de Gestión Energética</h2>
        <div className="flex items-center space-x-2">
          <Sun className="h-4 w-4" />
          <Switch checked={darkMode} onCheckedChange={setDarkMode} aria-label="Cambiar tema" />
          <Moon className="h-4 w-4" />
        </div>
      </div>

      {savedProgress && !showResults && (
        <Alert className="mb-4 bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
          <Info className="h-4 w-4" />
          <AlertTitle>Progreso guardado</AlertTitle>
          <AlertDescription>
            Tienes progreso guardado en esta encuesta. Puedes continuar desde donde lo dejaste o reiniciar.
            <div className="mt-2">
              <Button variant="outline" size="sm" onClick={clearProgress}>
                Reiniciar encuesta
              </Button>
            </div>
          </AlertDescription>
        </Alert>
      )}

      {!showResults ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="md:col-span-1">
              <Card className="sticky top-4">
                <CardHeader>
                  <CardTitle className="text-base">Categorías</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="space-y-1">
                    <Button
                      variant={activeCategory === null ? "default" : "ghost"}
                      className="w-full justify-start"
                      onClick={() => {
                        setActiveCategory(null)
                        setCurrentPage(0)
                      }}
                    >
                      Todas las preguntas
                      <Badge variant="outline" className="ml-auto">
                        {Object.keys(answers).length}/{questions.length}
                      </Badge>
                    </Button>
                    {Object.entries(categories).map(([key, name]) => (
                      <Button
                        key={key}
                        variant={activeCategory === key ? "default" : "ghost"}
                        className={`w-full justify-start ${activeCategory === key ? categoryColors[key].bg : ""}`}
                        onClick={() => {
                          setActiveCategory(key)
                          setCurrentPage(0)
                        }}
                      >
                        {name}
                        <div className="ml-auto flex items-center space-x-2">
                          <Progress value={categoryProgress[key]} className="w-12 h-2" />
                          <span className="text-xs">{categoryProgress[key]}%</span>
                        </div>
                      </Button>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col space-y-2 pt-0">
                  <Separator className="my-2" />
                  <Button variant="outline" className="w-full" onClick={saveProgress}>
                    <Save className="h-4 w-4 mr-2" />
                    Guardar progreso
                  </Button>
                  <Sheet>
                    <SheetTrigger asChild>
                      <Button variant="outline" className="w-full">
                        <BarChart4 className="h-4 w-4 mr-2" />
                        Ver estadísticas
                      </Button>
                    </SheetTrigger>
                    <SheetContent>
                      <SheetHeader>
                        <SheetTitle>Estadísticas de la encuesta</SheetTitle>
                        <SheetDescription>Progreso actual por categoría</SheetDescription>
                      </SheetHeader>
                      <div className="py-4">
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span className="text-sm font-medium">Progreso general</span>
                              <span className="text-sm font-medium">{progressPercentage}%</span>
                            </div>
                            <Progress value={progressPercentage} className="h-2" />
                          </div>
                          <Separator />
                          {Object.entries(categories).map(([key, name]) => (
                            <div key={key} className="space-y-2">
                              <div className="flex justify-between">
                                <span className="text-sm font-medium">{name}</span>
                                <span className="text-sm font-medium">{categoryProgress[key]}%</span>
                              </div>
                              <Progress
                                value={categoryProgress[key]}
                                className={`h-2 ${key === "gestion" ? "bg-blue-100 dark:bg-blue-900" : ""} ${key === "inclusion" ? "bg-purple-100 dark:bg-purple-900" : ""} ${key === "emisiones" ? "bg-green-100 dark:bg-green-900" : ""} ${key === "renovables" ? "bg-amber-100 dark:bg-amber-900" : ""} ${key === "demanda" ? "bg-cyan-100 dark:bg-cyan-900" : ""}`}
                              />
                              <div className="grid grid-cols-4 gap-2 text-xs text-center">
                                <div className="bg-green-50 dark:bg-green-900/20 p-1 rounded">
                                  Sí: {questionsByCategory[key].filter((q) => answers[q.id] === "si").length}
                                </div>
                                <div className="bg-red-50 dark:bg-red-900/20 p-1 rounded">
                                  No: {questionsByCategory[key].filter((q) => answers[q.id] === "no").length}
                                </div>
                                <div className="bg-yellow-50 dark:bg-yellow-900/20 p-1 rounded">
                                  Parcial: {questionsByCategory[key].filter((q) => answers[q.id] === "parcial").length}
                                </div>
                                <div className="bg-gray-50 dark:bg-gray-900/20 p-1 rounded">
                                  N/A: {questionsByCategory[key].filter((q) => answers[q.id] === "na").length}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </SheetContent>
                  </Sheet>
                </CardFooter>
              </Card>
            </div>

            <div className="md:col-span-3 space-y-6">
              <Card className="mb-6">
                <CardContent className="pt-6">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Progreso de la encuesta</span>
                      <span className="text-sm font-medium">{progressPercentage}%</span>
                    </div>
                    <Progress value={progressPercentage} className="h-2" />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>
                        Preguntas respondidas: {Object.keys(answers).length} de {questions.length}
                      </span>
                      <span>
                        Página {currentPage + 1} de {totalPages}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {currentQuestions.map((question) => (
                <div
                  key={question.id}
                >
                  <Card
                    key={question.id}
                    className={`mb-4 overflow-hidden border-l-4 ${categoryColors[question.category].border}`}
                  >
                    <CardHeader className={`pb-3 ${categoryColors[question.category].bg}`}>
                      <div className="flex justify-between items-start">
                        <div>
                          <Badge
                            variant="outline"
                            className={`mb-2 ${categoryColors[question.category].text} ${categoryColors[question.category].border}`}
                          >
                            {categories[question.category as keyof typeof categories]}
                          </Badge>
                          <div className="flex items-start gap-2">
                            <CardTitle className="text-base font-medium">{question.text}</CardTitle>
                            {question.help && (
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger>
                                    <HelpCircle className="h-4 w-4 text-muted-foreground flex-shrink-0 mt-1" />
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p className="max-w-xs">{question.help}</p>
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                            )}
                          </div>
                        </div>
                        {answers[question.id] && <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0" />}
                      </div>
                    </CardHeader>
                    <CardContent className="pt-4">
                      <RadioGroup
                        value={answers[question.id] || ""}
                        onValueChange={(value) => handleAnswerChange(question.id, value)}
                        className="grid grid-cols-2 gap-2 md:grid-cols-4"
                      >
                        <Label
                          htmlFor={`${question.id}-si`}
                          className={`flex items-center justify-center p-3 rounded-md border-2 cursor-pointer transition-all ${
                            answers[question.id] === "si"
                              ? "border-green-500 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300"
                              : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
                          }`}
                        >
                          <RadioGroupItem value="si" id={`${question.id}-si`} className="sr-only" />
                          Sí
                        </Label>
                        <Label
                          htmlFor={`${question.id}-no`}
                          className={`flex items-center justify-center p-3 rounded-md border-2 cursor-pointer transition-all ${
                            answers[question.id] === "no"
                              ? "border-red-500 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300"
                              : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
                          }`}
                        >
                          <RadioGroupItem value="no" id={`${question.id}-no`} className="sr-only" />
                          No
                        </Label>
                        <Label
                          htmlFor={`${question.id}-parcial`}
                          className={`flex items-center justify-center p-3 rounded-md border-2 cursor-pointer transition-all ${
                            answers[question.id] === "parcial"
                              ? "border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-300"
                              : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
                          }`}
                        >
                          <RadioGroupItem value="parcial" id={`${question.id}-parcial`} className="sr-only" />
                          Parcialmente
                        </Label>
                        <Label
                          htmlFor={`${question.id}-na`}
                          className={`flex items-center justify-center p-3 rounded-md border-2 cursor-pointer transition-all ${
                            answers[question.id] === "na"
                              ? "border-gray-500 bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
                              : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
                          }`}
                        >
                          <RadioGroupItem value="na" id={`${question.id}-na`} className="sr-only" />
                          No Aplica
                        </Label>
                      </RadioGroup>
                    </CardContent>
                  </Card>
                </div>
              ))}

              <Card>
                <CardFooter className="flex justify-between py-4">
                  <Button variant="outline" onClick={handlePrevPage} disabled={currentPage === 0} className="gap-1">
                    <ChevronLeft className="h-4 w-4" /> Anterior
                  </Button>
                  {currentPage < totalPages - 1 ? (
                    <Button onClick={handleNextPage} disabled={!isPageComplete()} className="gap-1">
                      Siguiente <ChevronRight className="h-4 w-4" />
                    </Button>
                  ) : (
                    <Button
                      onClick={handleSubmit}
                      disabled={!isAllComplete()}
                      className="bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-800"
                    >
                      Finalizar Encuesta
                    </Button>
                  )}
                </CardFooter>
              </Card>
            </div>
          </div>
        </>
      ) : (
        <Card className="dark:bg-gray-900">
          <CardHeader>
            <CardTitle>Resultados de la Encuesta</CardTitle>
            <CardDescription>Resumen de las respuestas proporcionadas</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="space-y-2">
                <h3 className="text-lg font-medium">Progreso General</h3>
                <Progress value={100} className="h-2" />
                <p className="text-sm text-muted-foreground">
                  ¡Encuesta completada! {questions.length} de {questions.length} preguntas respondidas
                </p>
              </div>

              <Separator />

              <Tabs defaultValue="summary">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="summary">Resumen por Categoría</TabsTrigger>
                  <TabsTrigger value="json">Datos JSON</TabsTrigger>
                </TabsList>
                <TabsContent value="summary" className="space-y-4 pt-4">
                  <ScrollArea className="h-[500px] pr-4">
                    <Accordion type="single" collapsible className="w-full">
                      {Object.entries(getResultsByCategory()).map(([category, counts]) => (
                        <AccordionItem key={category} value={category}>
                          <AccordionTrigger className={`${categoryColors[category].text}`}>
                            <div className="flex items-center gap-2">
                              {categories[category as keyof typeof categories]}
                              <Progress
                                value={categoryProgress[category]}
                                className={`w-20 h-2 ml-2 ${category === "gestion" ? "bg-blue-100 dark:bg-blue-900" : ""} ${category === "inclusion" ? "bg-purple-100 dark:bg-purple-900" : ""} ${category === "emisiones" ? "bg-green-100 dark:bg-green-900" : ""} ${category === "renovables" ? "bg-amber-100 dark:bg-amber-900" : ""} ${category === "demanda" ? "bg-cyan-100 dark:bg-cyan-900" : ""}`}
                              />
                              <span className="text-xs">{categoryProgress[category]}%</span>
                            </div>
                          </AccordionTrigger>
                          <AccordionContent>
                            <div className="space-y-4">
                              <div className="grid grid-cols-4 gap-2 text-center">
                                <div className="bg-green-50 dark:bg-green-900/20 p-2 rounded-md">
                                  <div className="text-xl font-bold text-green-700 dark:text-green-300">
                                    {counts.si}
                                  </div>
                                  <div className="text-xs text-muted-foreground">Sí</div>
                                </div>
                                <div className="bg-red-50 dark:bg-red-900/20 p-2 rounded-md">
                                  <div className="text-xl font-bold text-red-700 dark:text-red-300">{counts.no}</div>
                                  <div className="text-xs text-muted-foreground">No</div>
                                </div>
                                <div className="bg-yellow-50 dark:bg-yellow-900/20 p-2 rounded-md">
                                  <div className="text-xl font-bold text-yellow-700 dark:text-yellow-300">
                                    {counts.parcial}
                                  </div>
                                  <div className="text-xs text-muted-foreground">Parcial</div>
                                </div>
                                <div className="bg-gray-50 dark:bg-gray-800 p-2 rounded-md">
                                  <div className="text-xl font-bold text-gray-700 dark:text-gray-300">{counts.na}</div>
                                  <div className="text-xs text-muted-foreground">N/A</div>
                                </div>
                              </div>

                              <div className="space-y-2">
                                <h4 className="text-sm font-medium">Preguntas en esta categoría:</h4>
                                {questionsByCategory[category].map((q) => (
                                  <div key={q.id} className="p-2 rounded-md bg-muted">
                                    <div className="flex justify-between">
                                      <div className="text-sm">{q.text}</div>
                                      <Badge
                                        variant="outline"
                                        className={`
                                          ${answers[q.id] === "si" ? "bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 border-green-200 dark:border-green-800" : ""}
                                          ${answers[q.id] === "no" ? "bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 border-red-200 dark:border-red-800" : ""}
                                          ${answers[q.id] === "parcial" ? "bg-yellow-50 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-300 border-yellow-200 dark:border-yellow-800" : ""}
                                          ${answers[q.id] === "na" ? "bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700" : ""}
                                        `}
                                      >
                                        {answers[q.id] === "si"
                                          ? "Sí"
                                          : answers[q.id] === "no"
                                            ? "No"
                                            : answers[q.id] === "parcial"
                                              ? "Parcialmente"
                                              : "No Aplica"}
                                      </Badge>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </ScrollArea>
                </TabsContent>
                <TabsContent value="json" className="space-y-4 pt-4">
                  <div className="flex justify-end gap-2 mb-2">
                    <Button variant="outline" size="sm" onClick={copyToClipboard}>
                      <ClipboardCopy className="h-4 w-4 mr-2" />
                      Copiar JSON
                    </Button>
                    <Button variant="outline" size="sm" onClick={downloadJson}>
                      <Download className="h-4 w-4 mr-2" />
                      Descargar JSON
                    </Button>
                  </div>
                  <Textarea
                    className="font-mono text-sm h-96 dark:bg-gray-800"
                    readOnly
                    value={JSON.stringify(answers, null, 2)}
                  />
                </TabsContent>
              </Tabs>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" onClick={() => setShowResults(false)} className="w-full">
              Volver a la Encuesta
            </Button>
          </CardFooter>
        </Card>
      )}
    </div>
  )
}
