import { Hono } from 'hono';
import { postgresqlDb } from '@/lib/db/index'; // Corrected import for db
import {
  companiesInfo,
  surveyResponseHeaders
} from '@/lib/db/schema';
import { desc, eq } from 'drizzle-orm';

// Define a type for the company object returned by the query, matching schema definition
interface CompanyQueryResult {
  id: number; // Assuming id is serial, hence number
  nombreEmpresa: string;
  sectorEconomico: string | null;
  correoElectronico: string | null;
  createdAt: Date;
}

const app = new Hono().get('/', async (c) => {
  try {
    // Use property names as defined in schema.ts for the select object
    const allCompanies: CompanyQueryResult[] = await postgresqlDb
      .select({
        id: companiesInfo.id,
        nombreEmpresa: companiesInfo.nombreEmpresa,
        sectorEconomico: companiesInfo.sectorEconomico,
        correoElectronico: companiesInfo.correoElectronico,
        createdAt: companiesInfo.createdAt
      })
      .from(companiesInfo)
      .orderBy(desc(companiesInfo.createdAt));

    const allSurveyHeaders: Array<{
      surveyType: 'adaptacion' | 'mitigacion' | null;
      status: string | null;
    }> = await postgresqlDb
      .select({
        surveyType: surveyResponseHeaders.surveyType,
        status: surveyResponseHeaders.status
      })
      .from(surveyResponseHeaders)
      .where(eq(surveyResponseHeaders.status, 'submitted'));

    const companiesCount = allCompanies.length;
    const submittedSurveysCount = allSurveyHeaders.length;

    const adaptationSurveysCount = allSurveyHeaders.filter(
      (s) => s.surveyType === 'adaptacion'
    ).length;

    const mitigationSurveysCount = allSurveyHeaders.filter(
      (s) => s.surveyType === 'mitigacion'
    ).length;

    const sectorCounts: Record<string, number> = {};
    allCompanies.forEach((company: CompanyQueryResult) => {
      const sector = company.sectorEconomico || 'Sin especificar';
      sectorCounts[sector] = (sectorCounts[sector] || 0) + 1;
    });
    const sectorDistribution = Object.entries(sectorCounts)
      .map(([sector, countVal]) => ({
        sector,
        count: countVal
      }))
      .sort((a, b) => b.count - a.count);

    // Prepare companiesList for the frontend, ensuring id is string if needed by CompanyData type
    const companiesList = allCompanies.map((company: CompanyQueryResult) => ({
      id: company.id.toString(), // Convert id to string to match CompanyData type
      companyName: company.nombreEmpresa || 'N/A',
      sector: company.sectorEconomico || 'Sin especificar',
      userEmail: company.correoElectronico || 'N/A', // Use correoElectronico
      createdAt: company.createdAt ? company.createdAt.toISOString() : 'N/A'
    }));

    return c.json({
      companiesCount,
      submittedSurveysCount,
      adaptationSurveysCount,
      mitigationSurveysCount,
      sectorDistribution,
      companiesList
    });
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    const errorMessage =
      error instanceof Error ? error.message : 'Unknown error';
    return c.json(
      { error: 'Failed to fetch dashboard statistics', details: errorMessage },
      500
    );
  }
});

export default app;
