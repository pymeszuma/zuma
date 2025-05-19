import 'server-only';
import { Hono } from 'hono';
import { count } from 'drizzle-orm';
import { postgresqlDb } from '@/lib/db/index';
import { companiesInfo, surveyResponseHeaders } from '@/lib/db/schema';

const app = new Hono()
  // GET dashboard statistics
  .get('/', async (c) => {
    try {
      // Get total companies count
      const [companiesCount] = await postgresqlDb
        .select({ value: count() })
        .from(companiesInfo);

      // Get all company data for registrations trend
      const companies = await postgresqlDb
        .select({
          id: companiesInfo.id,
          createdAt: companiesInfo.createdAt,
          sectorEconomico: companiesInfo.sectorEconomico
        })
        .from(companiesInfo);

      // Get all survey responses in a single query
      const surveyResponses = await postgresqlDb
        .select({
          id: surveyResponseHeaders.id,
          status: surveyResponseHeaders.status,
          surveyType: surveyResponseHeaders.surveyType,
          submittedAt: surveyResponseHeaders.submittedAt
        })
        .from(surveyResponseHeaders);

      // Process survey data in TypeScript
      const submittedSurveysCount = surveyResponses.filter(
        (survey) => survey.status === 'submitted'
      ).length;

      const adaptationSurveysCount = surveyResponses.filter(
        (survey) => survey.surveyType === 'adaptacion'
      ).length;

      const mitigationSurveysCount = surveyResponses.filter(
        (survey) => survey.surveyType === 'mitigacion'
      ).length;

      // Group submitted surveys by month for the chart
      const submittedSurveysByMonth = surveyResponses
        .filter((survey) => survey.status === 'submitted' && survey.submittedAt)
        .reduce(
          (acc, survey) => {
            const submittedAt = new Date(String(survey.submittedAt));
            const monthKey = `${submittedAt.getFullYear()}-${submittedAt.getMonth() + 1}`;

            if (!acc[monthKey]) {
              acc[monthKey] = {
                month: submittedAt,
                count: 0
              };
            }

            acc[monthKey].count++;
            return acc;
          },
          {} as Record<string, { month: Date; count: number }>
        );

      // Convert to array and sort by date
      const monthlySurveyData = Object.values(submittedSurveysByMonth).sort(
        (a, b) => a.month.getTime() - b.month.getTime()
      );

      // Group companies by month of registration
      const registrationsByMonth = companies
        .filter((company) => company.createdAt)
        .reduce(
          (acc, company) => {
            const createdAt = new Date(String(company.createdAt));
            const monthKey = `${createdAt.getFullYear()}-${createdAt.getMonth() + 1}`;

            if (!acc[monthKey]) {
              acc[monthKey] = {
                month: createdAt,
                count: 0
              };
            }

            acc[monthKey].count++;
            return acc;
          },
          {} as Record<string, { month: Date; count: number }>
        );

      // Convert to array and sort by date
      const monthlyRegistrations = Object.values(registrationsByMonth).sort(
        (a, b) => a.month.getTime() - b.month.getTime()
      );

      // Calculate sector distribution
      const sectorCounts = companies.reduce(
        (acc, company) => {
          const sector = company.sectorEconomico || 'No especificado';
          if (!acc[sector]) {
            acc[sector] = 0;
          }
          acc[sector]++;
          return acc;
        },
        {} as Record<string, number>
      );

      const sectorDistribution = Object.entries(sectorCounts)
        .filter(([sector]) => sector !== 'No especificado')
        .map(([sector, count]) => ({
          sector,
          count
        }));

      // Format monthly data with month names
      const formattedMonthlyData = monthlySurveyData.map((item) => {
        const monthNames = [
          'Enero',
          'Febrero',
          'Marzo',
          'Abril',
          'Mayo',
          'Junio',
          'Julio',
          'Agosto',
          'Septiembre',
          'Octubre',
          'Noviembre',
          'Diciembre'
        ];
        return {
          month: `${monthNames[item.month.getMonth()]}`,
          count: item.count
        };
      });

      // Format registration trends data
      const formattedRegistrationTrends = monthlyRegistrations.map((item) => {
        const monthNames = [
          'Enero',
          'Febrero',
          'Marzo',
          'Abril',
          'Mayo',
          'Junio',
          'Julio',
          'Agosto',
          'Septiembre',
          'Octubre',
          'Noviembre',
          'Diciembre'
        ];
        return {
          month: `${monthNames[item.month.getMonth()]}`,
          count: item.count
        };
      });

      // Return all statistics
      return c.json({
        data: {
          companiesCount: companiesCount.value,
          submittedSurveysCount,
          adaptationSurveysCount,
          mitigationSurveysCount,
          sectorDistribution,
          monthlySurveyData: formattedMonthlyData,
          registrationTrends: formattedRegistrationTrends
        }
      });
    } catch (error) {
      console.error('Error fetching dashboard statistics:', error);
      return c.json({ error: 'Error fetching dashboard statistics' }, 500);
    }
  });

export default app;
