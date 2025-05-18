import 'server-only';
import { Hono } from 'hono';
import { handle } from 'hono/vercel';

import companiesInfo from './companies-info';
import surveyQuestions from './survey-questions';
import surveyResponseHeaders from './survey-response-headers';
import surveyResponseItems from './survey-response-items';

const app = new Hono().basePath('/api');

const _routes = app
  .route('/companies-info', companiesInfo)
  .route('/survey-questions', surveyQuestions)
  .route('/survey-response-headers', surveyResponseHeaders)
  .route('/survey-response-items', surveyResponseItems);

export const GET = handle(app);
export const POST = handle(app);
export const PATCH = handle(app);
export const DELETE = handle(app);

export type AppType = typeof _routes;
