'use client';

import { PieChart, Pie } from 'recharts';
import { useState, useMemo, JSX, useEffect } from 'react';
import { AlertCircle, CheckCircle2, Clock, HelpCircle } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from '@/components/ui/chart';
import { Label } from '@/components/ui/label';
import { Answer, Question } from '@/feature/sectors/types';
import { Recommendations } from './recommendations';

interface SurveyCardProps {
  questions: Question[];
  title?: string;
  description?: string;
  onSubmit?: (answers: Answer[], score: number) => void;
  questionsPerPage?: number;
  preloadedAnswers?: Answer[];
  preloadedScore?: number;
  hasSubmitted?: boolean;
  isLoading?: boolean;
}

export function SurveyCard({
  questions,
  title = 'Encuesta',
  description = 'Responde las siguientes preguntas',
  onSubmit,
  questionsPerPage = 5,
  preloadedAnswers = [],
  preloadedScore = 0,
  hasSubmitted = false,
  isLoading = false
}: SurveyCardProps) {
  const [answers, setAnswers] = useState<Answer[]>(preloadedAnswers);
  const [isSubmitted, setIsSubmitted] = useState(hasSubmitted);
  const [score, setScore] = useState(preloadedScore);
  const [currentPage, setCurrentPage] = useState(0);

  // Set isSubmitted to true when hasSubmitted changes to true
  useEffect(() => {
    if (hasSubmitted && preloadedAnswers.length > 0) {
      setIsSubmitted(true);
      setAnswers(preloadedAnswers);
      setScore(preloadedScore);
    }
  }, [hasSubmitted, preloadedAnswers, preloadedScore]);

  const totalPages = Math.ceil(questions.length / questionsPerPage);
  const progress = ((currentPage + 1) / totalPages) * 100;

  const currentQuestions = useMemo(() => {
    const start = currentPage * questionsPerPage;
    const end = start + questionsPerPage;
    return questions.slice(start, end);
  }, [currentPage, questions, questionsPerPage]);

  const handleAnswer = (
    questionId: number,
    question: string,
    value: string
  ) => {
    const newAnswers = [...answers];
    const existingAnswerIndex = newAnswers.findIndex(
      (answer) => answer.questionId === questionId
    );

    if (existingAnswerIndex !== -1) {
      newAnswers[existingAnswerIndex].value = value;
    } else {
      newAnswers.push({ questionId, question, value });
    }

    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    } else {
      calculateScore();
      setIsSubmitted(true);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const calculateScore = () => {
    let total = 0;
    answers.forEach((answer) => {
      if (answer.value === 'Si') total += 1;
      else if (answer.value === 'En proceso') total += 0.5;
    });
    setScore(total);
    onSubmit?.(answers, total);
  };

  const getAnswer = (questionId: number) =>
    answers.find((answer) => answer.questionId === questionId)?.value || '';

  const areCurrentQuestionsAnswered = () =>
    currentQuestions.every((q) =>
      answers.some((a) => a.questionId === q.id_actions)
    );

  const getNoAnsweredQuestions = () =>
    questions.filter((q) => {
      const a = answers.find((x) => x.questionId === q.id_actions);
      return a && a.value === 'No';
    });

  const getAnswerIcon = (value: string) => {
    const icons: Record<string, JSX.Element> = {
      Si: <CheckCircle2 className='h-5 w-5 text-green-500' />,
      No: <AlertCircle className='h-5 w-5 text-red-500' />,
      'No Aplica': <HelpCircle className='h-5 w-5 text-gray-500' />,
      'En proceso': <Clock className='h-5 w-5 text-amber-500' />
    };
    return icons[value] || null;
  };

  if (isSubmitted) {
    const noAnswered = getNoAnsweredQuestions();
    const maxWithoutNoAplica = answers.filter(
      (a) => a.value !== 'No Aplica'
    ).length;
    const scorePct = (score / maxWithoutNoAplica) * 100;

    const answerCounts = {
      Si: answers.filter((a) => a.value === 'Si').length,
      No: answers.filter((a) => a.value === 'No').length,
      'En proceso': answers.filter((a) => a.value === 'En proceso').length
      // No Aplica omitido del gráfico
    };

    const pieChartData = Object.entries(answerCounts)
      .map(([name, value]) => ({
        category: name,
        count: value,
        fill:
          name === 'Si'
            ? 'hsl(var(--chart-1))'
            : name === 'No'
              ? 'hsl(var(--chart-2))'
              : 'hsl(var(--chart-3))'
      }))
      .filter((entry) => entry.count > 0);

    const chartConfig = {
      count: { label: 'Respuestas' },
      Si: { label: 'Sí', color: 'hsl(var(--chart-1))' },
      No: { label: 'No', color: 'hsl(var(--chart-2))' },
      'En proceso': { label: 'En proceso', color: 'hsl(var(--chart-3))' }
    };

    return (
      <Card className='w-full'>
        <CardHeader>
          <CardTitle>Resultados</CardTitle>
        </CardHeader>
        <CardContent className='space-y-6'>
          {/* CHARTS */}
          <div className='grid gap-6 md:grid-cols-2'>
            {/* Container 1 */}
            <Card>
              <CardHeader>
                <CardTitle>Resumen de Respuestas</CardTitle>
                <CardDescription>
                  Distribución de respuestas por categoría
                </CardDescription>
              </CardHeader>
              <CardContent className='flex-1 pb-0'>
                <ChartContainer
                  config={chartConfig}
                  className='mx-auto aspect-square max-h-[200px]'
                >
                  <PieChart>
                    <ChartTooltip
                      cursor={false}
                      content={<ChartTooltipContent hideLabel />}
                    />
                    <Pie
                      data={pieChartData}
                      dataKey='count'
                      nameKey='category'
                      innerRadius={35}
                      strokeWidth={5}
                    />
                  </PieChart>
                </ChartContainer>
              </CardContent>
            </Card>

            {/* Container 2 */}
            <Card>
              <CardHeader>
                <CardTitle>Puntuación</CardTitle>
                <CardDescription>
                  Basado en las respuestas proporcionadas
                </CardDescription>
              </CardHeader>
              <CardContent className='flex flex-col items-center justify-center h-[200px]'>
                <div className='text-6xl font-bold mb-2'>
                  {scorePct.toFixed(1)}%
                </div>
                <div className='text-xl text-muted-foreground'>
                  de cumplimiento
                </div>
                <div className='w-full bg-gray-200 rounded-full h-4 mt-6'>
                  <div
                    className='bg-primary h-4 rounded-full'
                    style={{ width: `${scorePct.toFixed(1)}%` }}
                  ></div>
                </div>
              </CardContent>
            </Card>
          </div>
          {/* CHARTS */}

          {/* RECOMMENDATIONS */}
          <Recommendations noAnswered={noAnswered} isExportingPdf={true} />

          {/* RECOMMENDATIONS */}
        </CardContent>
        {/* <CardFooter>
          <Button
            onClick={() => {
              setIsSubmitted(false);
              setCurrentPage(0);
            }}
            disabled={isSubmitted}
          >
            Volver
          </Button>
        </CardFooter> */}
      </Card>
    );
  }

  if (isLoading) {
    return (
      <Card className='w-full'>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>Cargando respuestas anteriores...</CardDescription>
        </CardHeader>
        <CardContent className='flex justify-center items-center py-12'>
          <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-primary'></div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className='w-full'>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
        {hasSubmitted && (
          <div className='mt-2 p-2 bg-green-50 border border-green-200 rounded-md text-green-700'>
            Ya has completado esta encuesta anteriormente. Puedes revisar tus
            respuestas o modificarlas si lo deseas.
          </div>
        )}
        <div className='flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between mt-4'>
          <span className='text-sm text-muted-foreground'>
            Pregunta {currentPage * questionsPerPage + 1} de {questions.length}
          </span>

          <Progress value={progress} className='h-2 w-full sm:w-1/2' />

          <span className='text-sm text-muted-foreground text-right'>
            Página {currentPage + 1} de {totalPages}
          </span>
        </div>
      </CardHeader>
      <CardContent className='space-y-6'>
        {currentQuestions.map((q, idx) => (
          <div key={idx} className='border rounded-lg p-4 space-y-4'>
            <h3 className='text-lg font-medium'>{q.question}</h3>
            <RadioGroup
              value={getAnswer(q.id_actions)}
              onValueChange={(value) =>
                handleAnswer(q.id_actions, q.question, value)
              }
              className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2'
            >
              {['Si', 'No', 'No Aplica', 'En proceso'].map((opt) => (
                <Label
                  key={opt}
                  htmlFor={`${q.id_actions}-${opt}`}
                  className='flex items-center space-x-2 border rounded-md p-2 hover:bg-muted cursor-pointer w-full'
                >
                  <RadioGroupItem
                    value={opt}
                    id={`${q.id_actions}-${opt}`}
                    className='cursor-pointer'
                  />
                  {getAnswerIcon(opt)}
                  {opt}
                </Label>
              ))}
            </RadioGroup>
          </div>
        ))}
      </CardContent>
      <CardFooter className='flex justify-between'>
        <Button
          variant='outline'
          onClick={handlePrevious}
          disabled={currentPage === 0}
        >
          Anterior
        </Button>
        <Button
          onClick={handleNext}
          disabled={!areCurrentQuestionsAnswered()}
          className={
            !areCurrentQuestionsAnswered()
              ? 'cursor-not-allowed'
              : 'cursor-pointer'
          }
        >
          {currentPage === totalPages - 1 ? 'Finalizar' : 'Siguiente'}
        </Button>
      </CardFooter>
    </Card>
  );
}
