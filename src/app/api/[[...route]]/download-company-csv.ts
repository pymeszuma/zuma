import { Hono } from 'hono';
import { postgresqlDb } from '@/lib/db/index';
import {
  companiesInfo,
  surveyResponseHeaders,
  surveyResponseItems,
  surveyQuestions
} from '@/lib/db/schema';
import { eq, and } from 'drizzle-orm';
import { z } from 'zod';
import { zValidator } from '@hono/zod-validator';

// Helper function to convert array of objects to CSV string
const convertToCSV = (data: any[]): string => {
  if (!data || data.length === 0) {
    return '';
  }
  const headers = Object.keys(data[0]);
  const csvRows = [
    headers.join(','), // header row
    ...data.map((row) =>
      headers
        .map((header) => {
          let cell =
            row[header] === null || row[header] === undefined
              ? ''
              : String(row[header]);
          // Escape double quotes and wrap in double quotes if cell contains comma, newline or double quote
          if (/[\",\n\r]/.test(cell)) {
            cell = '"' + cell.replace(/"/g, '""') + '"';
          }
          return cell;
        })
        .join(',')
    )
  ];
  return csvRows.join('\r\n');
};

const app = new Hono().get(
  '/:companyId',
  zValidator(
    'param',
    z.object({
      companyId: z
        .string()
        .refine((val) => !isNaN(parseInt(val)), {
          message: 'Company ID must be a number'
        })
    })
  ),
  async (c) => {
    const { companyId } = c.req.valid('param');
    const companyIdNum = parseInt(companyId);

    try {
      // 1. Fetch company details
      const [companyDetails] = await postgresqlDb
        .select()
        .from(companiesInfo)
        .where(eq(companiesInfo.id, companyIdNum));

      if (!companyDetails) {
        return c.json({ error: 'Company not found' }, 404);
      }

      // 2. Fetch survey response headers for the company
      const responseHeaders = await postgresqlDb
        .select({
          headerId: surveyResponseHeaders.id,
          surveyType: surveyResponseHeaders.surveyType,
          submittedAt: surveyResponseHeaders.submittedAt,
          sectorId: surveyResponseHeaders.sectorId
        })
        .from(surveyResponseHeaders)
        .where(
          and(
            eq(surveyResponseHeaders.companyId, companyIdNum),
            eq(surveyResponseHeaders.status, 'submitted')
          )
        );

      const csvData: any[] = [];

      // Add company details as the first part of the CSV data (flattened)
      const companyRow: any = { ...companyDetails };
      // Prefix company fields to avoid collision with survey fields, or ensure distinct names
      for (const key in companyRow) {
        companyRow[`company_${key}`] = companyRow[key];
        delete companyRow[key];
      }

      if (responseHeaders.length === 0) {
        // If no surveys, just add company data
        csvData.push(companyRow);
      } else {
        // 3. For each response header, fetch items and question texts
        for (const header of responseHeaders) {
          const itemsWithQuestions = await postgresqlDb
            .select({
              questionId: surveyQuestions.id,
              questionText: surveyQuestions.question,
              questionSector: surveyQuestions.sector,
              questionType: surveyQuestions.type, // This is question type (adapt/mitig), not surveyType from header
              answerValue: surveyResponseItems.value,
              answerNotes: surveyResponseItems.notes
            })
            .from(surveyResponseItems)
            .innerJoin(
              surveyQuestions,
              eq(surveyResponseItems.questionId, surveyQuestions.id)
            )
            .where(eq(surveyResponseItems.headerId, header.headerId));

          if (itemsWithQuestions.length === 0 && csvData.length === 0) {
            // If this is the first header and it has no items, still add company row once
            csvData.push({
              ...companyRow, // Spread company details
              survey_id: header.headerId,
              survey_type: header.surveyType,
              survey_submitted_at: header.submittedAt
                ? new Date(header.submittedAt).toISOString()
                : 'N/A',
              survey_sector_id: header.sectorId,
              question_id: 'N/A',
              question_text: 'N/A',
              question_sector: 'N/A',
              question_q_type: 'N/A',
              answer_value: 'N/A',
              answer_notes: 'N/A'
            });
          } else {
            itemsWithQuestions.forEach((item) => {
              csvData.push({
                ...companyRow, // Spread company details for each question row
                survey_id: header.headerId,
                survey_type: header.surveyType,
                survey_submitted_at: header.submittedAt
                  ? new Date(header.submittedAt).toISOString()
                  : 'N/A',
                survey_sector_id: header.sectorId,
                question_id: item.questionId,
                question_text: item.questionText,
                question_sector: item.questionSector,
                question_q_type: item.questionType,
                answer_value: item.answerValue,
                answer_notes: item.answerNotes
              });
            });
          }
        }
      }

      if (csvData.length === 0) {
        // Fallback if company exists but has no surveys and somehow wasn't added
        csvData.push(companyRow);
      }

      const csvString = convertToCSV(csvData);
      const fileName = `company_${companyId}_data.csv`;

      return new Response(csvString, {
        headers: {
          'Content-Type': 'text/csv',
          'Content-Disposition': `attachment; filename="${fileName}"`
        }
      });
    } catch (error) {
      console.error(`Error fetching data for company ${companyId}:`, error);
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error';
      return c.json(
        { error: 'Failed to generate CSV', details: errorMessage },
        500
      );
    }
  }
);

export default app;
