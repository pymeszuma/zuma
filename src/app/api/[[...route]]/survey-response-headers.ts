import 'server-only';
import { Hono } from 'hono';
import { and, eq } from 'drizzle-orm';
import { zValidator } from '@hono/zod-validator';
import { postgresqlDb } from '@/lib/db/index';
import {
  surveyResponseHeadersSelectSchema,
  surveyResponseHeaders
} from '@/lib/db/schema';

const app = new Hono()

  // GET all survey response headers with optional filtering
  .get('/', async (c) => {
    const { companyId, sectorId, surveyType } = c.req.query();

    // Build the query with filters
    const queryBuilder = postgresqlDb.select();

    // Prepare conditions for filtering
    const conditions = [];

    if (companyId) {
      const companyIdNum = parseInt(companyId);
      if (!isNaN(companyIdNum)) {
        conditions.push(eq(surveyResponseHeaders.companyId, companyIdNum));
      }
    }

    if (sectorId) {
      const sectorIdNum = parseInt(sectorId);
      if (!isNaN(sectorIdNum)) {
        conditions.push(eq(surveyResponseHeaders.sectorId, sectorIdNum));
      }
    }

    if (surveyType && ['adaptacion', 'mitigacion'].includes(surveyType)) {
      conditions.push(
        eq(
          surveyResponseHeaders.surveyType,
          surveyType as 'adaptacion' | 'mitigacion'
        )
      );
    }

    // Execute the query with all conditions
    let data;
    if (conditions.length > 0) {
      data = await queryBuilder
        .from(surveyResponseHeaders)
        .where(and(...conditions))
        .orderBy(surveyResponseHeaders.createdAt);
    } else {
      data = await queryBuilder
        .from(surveyResponseHeaders)
        .orderBy(surveyResponseHeaders.createdAt);
    }
    return c.json({ data });
  })

  // GET survey response header by ID
  .get(
    '/:id',
    zValidator('param', surveyResponseHeadersSelectSchema.pick({ id: true })),
    async (c) => {
      const { id } = c.req.valid('param');
      if (!id) {
        return c.json({ error: 'Invalid ID' }, 400);
      }
      const [data] = await postgresqlDb
        .select()
        .from(surveyResponseHeaders)
        .where(eq(surveyResponseHeaders.id, id));

      if (!data) {
        return c.json({ error: 'Survey response header not found' }, 404);
      }

      return c.json({ data });
    }
  )

  // POST create survey response header
  .post(
    '/',
    zValidator(
      'json',
      surveyResponseHeadersSelectSchema.omit({
        id: true,
        createdAt: true,
        updatedAt: true
      }),
      (result, c) => {
        if (!result.success) {
          console.error('Invalid survey response header data:', result.error);
          return c.json({ error: 'Invalid survey response header data' }, 400);
        }
      }
    ),
    async (c) => {
      const values = c.req.valid('json');

      const [data] = await postgresqlDb
        .insert(surveyResponseHeaders)
        .values({
          ...values
        })
        .returning();

      return c.json({ data });
    }
  )

  // PATCH update survey response header by ID
  .patch(
    '/:id',
    zValidator('param', surveyResponseHeadersSelectSchema.pick({ id: true })),
    zValidator(
      'json',
      surveyResponseHeadersSelectSchema.omit({
        id: true,
        createdAt: true,
        updatedAt: true
      }),
      (result, c) => {
        if (!result.success) {
          return c.json({ error: 'Invalid survey response header data' }, 400);
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
        .update(surveyResponseHeaders)
        .set(values)
        .where(eq(surveyResponseHeaders.id, id))
        .returning();

      if (!data) {
        return c.json({ error: 'Survey response header not found' }, 404);
      }

      return c.json({ data });
    }
  )

  // DELETE survey response header by ID
  .delete(
    '/:id',
    zValidator('param', surveyResponseHeadersSelectSchema.pick({ id: true })),
    async (c) => {
      const { id } = c.req.valid('param');
      if (!id) {
        return c.json({ error: 'Invalid ID' }, 400);
      }
      const [data] = await postgresqlDb
        .delete(surveyResponseHeaders)
        .where(eq(surveyResponseHeaders.id, id))
        .returning();

      if (!data) {
        return c.json({ error: 'Survey response header not found' }, 404);
      }

      return c.json({ data });
    }
  );

export default app;
