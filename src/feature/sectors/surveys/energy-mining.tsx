"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import { Download, ClipboardCopy, CheckCircle2 } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

type Question = {
  id: string
  text: string
  category: string
}

type SurveyProps = {
  onComplete: () => void
}

export function EnergySurvey({ onComplete }: SurveyProps) {
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [showResults, setShowResults] = useState(false)
  const [currentPage, setCurrentPage] = useState(0)
  const questionsPerPage = 10

  const categories = {
    "gestion-energetica": "Gestión Energética",
    inclusion: "Diversidad e Inclusión",
    emisiones: "Emisiones y Cambio Climático",
    demanda: "Gestión de Demanda Energética",
    renovables: "Energías Renovables",
  }

  const questions: Question[] = [
    {
      id: "q1",
      text: "¿La empresa tiene programas de capacitación en gestión energética para su personal?",
      category: "gestion-energetica",
    },
    {
      id: "q2",
      text: "¿La empresa tiene políticas que promuevan la diversidad, equidad e inclusión (DEI) en sus proyectos de eficiencia energética?",
      category: "inclusion",
    },
    {
      id: "q3",
      text: "¿La empresa promueve la implementación de medidas para garantizar entornos laborales seguros y equitativos en sus proyectos energéticos?",
      category: "inclusion",
    },
    {
      id: "q4",
      text: "¿La empresa ha implementado un sistema de gestión energética como el ISO 50001 en sus instalaciones?",
      category: "gestion-energetica",
    },
    {
      id: "q5",
      text: "¿La empresa ha adoptado estándares de eficiencia energética en su infraestructura siguiendo normas como ISO 50001 o el protocolo IPMVP?",
      category: "gestion-energetica",
    },
    {
      id: "q6",
      text: "¿La empresa ha implementado redes inteligentes para mejorar la distribución de energía de manera eficiente?",
      category: "gestion-energetica",
    },
    {
      id: "q7",
      text: "¿La empresa utiliza tecnologías de captura y almacenamiento de carbono (CCS) para reducir sus emisiones en áreas de alta demanda energética?",
      category: "emisiones",
    },
    {
      id: "q8",
      text: "¿La empresa está utilizando inteligencia artificial y big data para optimizar la eficiencia energética de sus plantas de generación?",
      category: "gestion-energetica",
    },
    {
      id: "q9",
      text: "¿La empresa ha implementado metodologías de Análisis de Ciclo de Vida (ACV) para medir la eficiencia energética en sus procesos?",
      category: "gestion-energetica",
    },
    {
      id: "q10",
      text: "¿La empresa ha adoptado modelos de financiamiento verde para implementar proyectos de eficiencia energética?",
      category: "gestion-energetica",
    },
    {
      id: "q11",
      text: "¿La empresa tiene programas de formación para operadores y técnicos en eficiencia energética?",
      category: "gestion-energetica",
    },
    {
      id: "q12",
      text: "¿La empresa implementa acciones para reducir las emisiones fugitivas?",
      category: "emisiones",
    },
    {
      id: "q13",
      text: "¿La empresa promueve la inclusión de mujeres en la gestión ambiental?",
      category: "inclusion",
    },
    {
      id: "q14",
      text: "¿La empresa promueve políticas que favorezcan la participación de mujeres en la transición energética?",
      category: "inclusion",
    },
    {
      id: "q15",
      text: "¿La empresa gestiona eficientemente las emisiones fugitivas en sus instalaciones?",
      category: "emisiones",
    },
    {
      id: "q16",
      text: "¿La empresa está implementando fuentes de energía renovable para reducir las emisiones fugitivas?",
      category: "renovables",
    },
    {
      id: "q17",
      text: "¿La empresa mejora la eficiencia energética para mitigar emisiones fugitivas?",
      category: "emisiones",
    },
    {
      id: "q18",
      text: "¿La empresa implementa medidas para adaptarse al cambio climático y reducir las emisiones fugitivas?",
      category: "emisiones",
    },
    {
      id: "q19",
      text: "¿La empresa promueve la utilización de prácticas de mitigación basadas en la naturaleza para reducir emisiones fugitivas?",
      category: "emisiones",
    },
    {
      id: "q20",
      text: "¿La empresa colabora con otras instituciones para enfrentar el cambio climático?",
      category: "emisiones",
    },
    {
      id: "q21",
      text: "¿La empresa fomenta el financiamiento verde para sus proyectos de mitigación?",
      category: "emisiones",
    },
    {
      id: "q22",
      text: "¿La empresa apoya alianzas para implementar soluciones innovadoras para reducir las emisiones fugitivas?",
      category: "emisiones",
    },
    {
      id: "q23",
      text: "¿La empresa implementa medidas de gestión de la demanda energética en sus procesos de generación y distribución?",
      category: "demanda",
    },
    {
      id: "q24",
      text: "¿La empresa promueve la inclusión de mujeres en el desarrollo de proyectos de gestión de la demanda energética?",
      category: "inclusion",
    },
    {
      id: "q25",
      text: "¿La empresa promueve la inclusión de mujeres en el desarrollo de proyectos de gestión de la demanda energética?",
      category: "inclusion",
    },
    {
      id: "q26",
      text: "¿La empresa realiza esfuerzos para reducir el consumo de energía mediante la gestión eficiente de la demanda en las plantas de generación?",
      category: "demanda",
    },
    {
      id: "q27",
      text: "¿La empresa utiliza fuentes de energía renovable para optimizar la gestión de la demanda energética en sus plantas y redes de distribución?",
      category: "renovables",
    },
    {
      id: "q28",
      text: "¿La empresa utiliza tecnologías avanzadas para monitorear y gestionar la demanda energética en tiempo real en sus procesos de generación y distribución?",
      category: "demanda",
    },
    {
      id: "q29",
      text: "¿La empresa aplica prácticas de reducción de la huella de carbono a través de la gestión eficiente de la demanda energética en sus plantas?",
      category: "demanda",
    },
    {
      id: "q30",
      text: "¿La empresa está integrando medidas de adaptación al cambio climático en su estrategia de gestión de la demanda energética?",
      category: "demanda",
    },
    {
      id: "q31",
      text: "¿La empresa participa en iniciativas de colaboración sectorial para mejorar la gestión colectiva de la demanda energética?",
      category: "demanda",
    },
    {
      id: "q32",
      text: "¿La empresa está comprometida con el financiamiento verde para implementar medidas de gestión eficiente de la demanda energética?",
      category: "demanda",
    },
    {
      id: "q33",
      text: "¿La empresa está estableciendo alianzas para desarrollar e implementar tecnologías innovadoras en la gestión de la demanda energética?",
      category: "demanda",
    },
    {
      id: "q34",
      text: "¿La empresa implementa medidas para reducir la huella de carbono en la generación de electricidad?",
      category: "emisiones",
    },
    {
      id: "q35",
      text: "¿La empresa fomenta la igualdad de género en los proyectos de energía renovable?",
      category: "inclusion",
    },
    {
      id: "q36",
      text: "¿La empresa asegura la participación de mujeres en los roles técnicos de las plantas generadoras de energía?",
      category: "inclusion",
    },
    {
      id: "q37",
      text: "¿La empresa utiliza energías renovables en su proceso de generación de electricidad?",
      category: "renovables",
    },
    {
      id: "q38",
      text: "¿La empresa está implementando proyectos de eficiencia energética en su planta de generación?",
      category: "gestion-energetica",
    },
    {
      id: "q39",
      text: "¿La empresa está utilizando tecnologías innovadoras para mejorar la generación de electricidad de manera eficiente?",
      category: "gestion-energetica",
    },
    {
      id: "q40",
      text: "¿La empresa tiene un plan de adaptación para mitigar los impactos del cambio climático en sus operaciones?",
      category: "emisiones",
    },
    {
      id: "q41",
      text: "¿La empresa está comprometida con la transición energética hacia fuentes renovables en su generación de electricidad?",
      category: "renovables",
    },
    {
      id: "q42",
      text: "¿La empresa colabora con otras empresas o actores en la promoción de energías limpias y sostenibles?",
      category: "renovables",
    },
    {
      id: "q43",
      text: "¿La empresa utiliza financiamiento verde para proyectos de energía renovable y eficiencia energética?",
      category: "renovables",
    },
  ]

  const totalPages = Math.ceil(questions.length / questionsPerPage)
  const startIndex = currentPage * questionsPerPage
  const endIndex = Math.min(startIndex + questionsPerPage, questions.length)
  const currentQuestions = questions.slice(startIndex, endIndex)

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
  }

  const downloadJson = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(answers, null, 2))
    const downloadAnchorNode = document.createElement("a")
    downloadAnchorNode.setAttribute("href", dataStr)
    downloadAnchorNode.setAttribute("download", "survey_results.json")
    document.body.appendChild(downloadAnchorNode)
    downloadAnchorNode.click()
    downloadAnchorNode.remove()
  }

  // Calculate progress percentage
  const progressPercentage = Math.round((Object.keys(answers).length / questions.length) * 100)

  // Count answers by category and response
  const getResultsByCategory = () => {
    const results: Record<string, { si: number; no: number; parcial: number; na: number; total: number }> = {}

    // Initialize categories
    Object.keys(categories).forEach((category) => {
      results[category] = { si: 0, no: 0, parcial: 0, na: 0, total: 0 }
    })

    // Count responses
    questions.forEach((question) => {
      const answer = answers[question.id]
      if (answer) {
        results[question.category][answer as 'si' | 'no' | 'parcial' | 'na']++
        results[question.category].total++
      }
    })

    return results
  }

  return (
    <div className="space-y-6">
      {!showResults ? (
        <>
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
            <Card key={question.id} className="mb-4 overflow-hidden">
              <CardHeader className="pb-3 bg-muted/50">
                <div className="flex justify-between items-start">
                  <div>
                    <Badge variant="outline" className="mb-2">
                      {categories[question.category as keyof typeof categories]}
                    </Badge>
                    <CardTitle className="text-base font-medium">{question.text}</CardTitle>
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
                        ? "border-green-500 bg-green-50 text-green-700"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <RadioGroupItem value="si" id={`${question.id}-si`} className="sr-only" />
                    Sí
                  </Label>
                  <Label
                    htmlFor={`${question.id}-no`}
                    className={`flex items-center justify-center p-3 rounded-md border-2 cursor-pointer transition-all ${
                      answers[question.id] === "no"
                        ? "border-red-500 bg-red-50 text-red-700"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <RadioGroupItem value="no" id={`${question.id}-no`} className="sr-only" />
                    No
                  </Label>
                  <Label
                    htmlFor={`${question.id}-parcial`}
                    className={`flex items-center justify-center p-3 rounded-md border-2 cursor-pointer transition-all ${
                      answers[question.id] === "parcial"
                        ? "border-yellow-500 bg-yellow-50 text-yellow-700"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <RadioGroupItem value="parcial" id={`${question.id}-parcial`} className="sr-only" />
                    Parcialmente
                  </Label>
                  <Label
                    htmlFor={`${question.id}-na`}
                    className={`flex items-center justify-center p-3 rounded-md border-2 cursor-pointer transition-all ${
                      answers[question.id] === "na"
                        ? "border-gray-500 bg-gray-50 text-gray-700"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <RadioGroupItem value="na" id={`${question.id}-na`} className="sr-only" />
                    No Aplica
                  </Label>
                </RadioGroup>
              </CardContent>
            </Card>
          ))}

          <Card>
            <CardFooter className="flex justify-between py-4">
              <Button variant="outline" onClick={handlePrevPage} disabled={currentPage === 0}>
                Anterior
              </Button>
              {currentPage < totalPages - 1 ? (
                <Button
                  onClick={handleNextPage}
                  disabled={!isPageComplete()}
                  className="bg-green-600 hover:bg-green-700"
                >
                  Siguiente
                </Button>
              ) : (
                <Button onClick={handleSubmit} disabled={!isAllComplete()} className="bg-green-600 hover:bg-green-700">
                  Finalizar Encuesta
                </Button>
              )}
            </CardFooter>
          </Card>
        </>
      ) : (
        <div className="space-y-6">
          <Card>
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
                    {Object.entries(getResultsByCategory()).map(([category, counts]) => (
                      <Card key={category}>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-base">{categories[category as keyof typeof categories]}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="grid grid-cols-4 gap-2 text-center">
                            <div className="bg-green-50 p-2 rounded-md">
                              <div className="text-xl font-bold text-green-700">{counts.si}</div>
                              <div className="text-xs text-muted-foreground">Sí</div>
                            </div>
                            <div className="bg-red-50 p-2 rounded-md">
                              <div className="text-xl font-bold text-red-700">{counts.no}</div>
                              <div className="text-xs text-muted-foreground">No</div>
                            </div>
                            <div className="bg-yellow-50 p-2 rounded-md">
                              <div className="text-xl font-bold text-yellow-700">{counts.parcial}</div>
                              <div className="text-xs text-muted-foreground">Parcial</div>
                            </div>
                            <div className="bg-gray-50 p-2 rounded-md">
                              <div className="text-xl font-bold text-gray-700">{counts.na}</div>
                              <div className="text-xs text-muted-foreground">N/A</div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
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
                    <Textarea className="font-mono text-sm h-96" readOnly value={JSON.stringify(answers, null, 2)} />
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
        </div>
      )}
    </div>
  )
}
