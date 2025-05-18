import 'server-only';
import { Hono } from 'hono';
import { eq } from 'drizzle-orm';
import { zValidator } from '@hono/zod-validator';
import { postgresqlDb } from '@/lib/db/index';
import { surveyQuestionsSelectSchema, surveyQuestions } from '@/lib/db/schema';
import { z } from 'zod';

const app = new Hono()

  // GET all survey questions with optional question filter
  .get(
    '/',
    zValidator('query', z.object({ question: z.string().optional() })),
    async (c) => {
      const { question } = c.req.valid('query');

      let data;
      if (question) {
        data = await postgresqlDb
          .select()
          .from(surveyQuestions)
          .where(eq(surveyQuestions.question, question));
      } else {
        data = await postgresqlDb.select().from(surveyQuestions);
      }

      return c.json({ data });
    }
  )

  // GET survey question by ID
  .get(
    '/:id',
    zValidator('param', surveyQuestionsSelectSchema.pick({ id: true })),
    async (c) => {
      const { id } = c.req.valid('param');
      if (!id) {
        return c.json({ error: 'Invalid ID' }, 400);
      }
      const [data] = await postgresqlDb
        .select()
        .from(surveyQuestions)
        .where(eq(surveyQuestions.id, id));

      if (!data) {
        return c.json({ error: 'Survey question not found' }, 404);
      }

      return c.json({ data });
    }
  )

  // POST create survey question
  .post(
    '/',
    zValidator(
      'json',
      surveyQuestionsSelectSchema.omit({
        id: true,
        createdAt: true,
        updatedAt: true
      }),
      (result, c) => {
        if (!result.success) {
          console.error('Invalid survey question data:', result.error);
          return c.json({ error: 'Invalid survey question data' }, 400);
        }
      }
    ),
    async (c) => {
      const values = c.req.valid('json');

      const [data] = await postgresqlDb
        .insert(surveyQuestions)
        .values({
          ...values
        })
        .returning();

      return c.json({ data });
    }
  )

  // PATCH update survey question by ID
  .patch(
    '/:id',
    zValidator('param', surveyQuestionsSelectSchema.pick({ id: true })),
    zValidator(
      'json',
      surveyQuestionsSelectSchema.omit({
        id: true,
        createdAt: true,
        updatedAt: true
      }),
      (result, c) => {
        if (!result.success) {
          return c.json({ error: 'Invalid survey question data' }, 400);
        }
      }
    ),
    async (c) => {
      const { id } = c.req.valid('param');
      const values = c.req.valid('json');
      if (!id) {
        return c.json({ error: 'Invalid ID' }, 400);
      }
      const [data] = await postgresqlDb
        .update(surveyQuestions)
        .set(values)
        .where(eq(surveyQuestions.id, id))
        .returning();

      if (!data) {
        return c.json({ error: 'Survey question not found' }, 404);
      }

      return c.json({ data });
    }
  )

  // DELETE survey question by ID
  .delete(
    '/:id',
    zValidator('param', surveyQuestionsSelectSchema.pick({ id: true })),
    async (c) => {
      const { id } = c.req.valid('param');
      if (!id) {
        return c.json({ error: 'Invalid ID' }, 400);
      }
      const [data] = await postgresqlDb
        .delete(surveyQuestions)
        .where(eq(surveyQuestions.id, id))
        .returning();

      if (!data) {
        return c.json({ error: 'Survey question not found' }, 404);
      }

      return c.json({ data });
    }
  );

export default app;
