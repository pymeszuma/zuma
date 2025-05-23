import 'server-only';
import { Hono } from 'hono';
import { handle } from 'hono/vercel';

import companiesInfo from './companies-info';
import surveyQuestions from './survey-questions';
import surveyResponseHeaders from './survey-response-headers';
import surveyResponseItems from './survey-response-items';
import dashboardStats from './dashboard-stats';
import downloadCompanyCsvRoute from './download-company-csv'; // Corrected import for default export

const app = new Hono().basePath('/api');

const _routes = app
  .route('/companies-info', companiesInfo)
  .route('/survey-questions', surveyQuestions)
  .route('/survey-response-headers', surveyResponseHeaders)
  .route('/survey-response-items', surveyResponseItems)
  .route('/dashboard-stats', dashboardStats)
  .route('/download-company-csv', downloadCompanyCsvRoute);

export const GET = handle(app);
export const POST = handle(app);
export const PATCH = handle(app);
export const DELETE = handle(app);

export type AppType = typeof _routes;
