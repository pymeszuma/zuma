import 'server-only';
import { Hono } from 'hono';
import { eq } from 'drizzle-orm';
import { zValidator } from '@hono/zod-validator';
import { postgresqlDb } from '@/lib/db/index';
import { companiesInsertSchema, companiesInfo } from '@/lib/db/schema';
import { z } from 'zod';

const app = new Hono()

  // GET all companies info
  .get('/', async (c) => {
    const data = await postgresqlDb.select().from(companiesInfo);
    return c.json({ data });
  })

  // GET company info by ID
  .get(
    '/:id',
    zValidator('param', companiesInsertSchema.pick({ id: true })),
    async (c) => {
      const { id } = c.req.valid('param');
      if (!id) {
        return c.json({ error: 'Invalid ID' }, 400);
      }
      const [data] = await postgresqlDb
        .select()
        .from(companiesInfo)
        .where(eq(companiesInfo.id, id));

      if (!data) {
        return c.json({ error: 'Company info not found' }, 404);
      }

      return c.json({ data });
    }
  )

  // POST create company info
  .post(
    '/',
    zValidator(
      'json',
      companiesInsertSchema.omit({
        id: true,
        createdAt: true,
        deletedAt: true,
        updatedAt: true
      }),
      (result, c) => {
        if (!result.success) {
          console.error('Invalid company info data:', result.error);
          return c.json({ error: 'Invalid company info data' }, 400);
        }
      }
    ),
    async (c) => {
      const values = c.req.valid('json');

      const [data] = await postgresqlDb
        .insert(companiesInfo)
        .values({
          ...values
        })
        .returning();

      return c.json({ data });
    }
  )

  // PATCH update company info by ID
  .patch(
    '/:id',
    zValidator(
      'param',
      z.object({
        id: z.any()
      }),
      (result, c) => {
        if (!result.success) {
          return c.json({ error: 'Invalid id' }, 400);
        }
      }
    ),
    zValidator(
      'json',
      companiesInsertSchema.omit({
        id: true,
        createdAt: true,
        updatedAt: true,
        deletedAt: true
      }),
      (result, c) => {
        if (!result.success) {
          return c.json({ error: 'Invalid company info data' }, 400);
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
        .update(companiesInfo)
        .set(values)
        .where(eq(companiesInfo.id, id))
        .returning();

      if (!data) {
        return c.json({ error: 'Company info not found' }, 404);
      }

      return c.json({ data });
    }
  )

  // DELETE company info by ID
  .delete(
    '/:id',
    zValidator('param', companiesInsertSchema.pick({ id: true })),
    async (c) => {
      const { id } = c.req.valid('param');
      if (!id) {
        return c.json({ error: 'Invalid ID' }, 400);
      }
      const [data] = await postgresqlDb
        .delete(companiesInfo)
        .where(eq(companiesInfo.id, id))
        .returning();

      if (!data) {
        return c.json({ error: 'Company info not found' }, 404);
      }

      return c.json({ data });
    }
  );

export default app;
