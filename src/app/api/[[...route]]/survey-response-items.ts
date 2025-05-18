import 'server-only';
import { Hono } from 'hono';
import { eq } from 'drizzle-orm';
import { zValidator } from '@hono/zod-validator';
import { postgresqlDb } from '@/lib/db/index';
import {
  surveyResponseItemsSelectSchema,
  surveyResponseItems
} from '@/lib/db/schema';

const app = new Hono()

  // GET all survey response items
  .get('/', async (c) => {
    const data = await postgresqlDb.select().from(surveyResponseItems);
    return c.json({ data });
  })

  // GET survey response item by ID
  .get(
    '/:id',
    zValidator('param', surveyResponseItemsSelectSchema.pick({ id: true })),
    async (c) => {
      const { id } = c.req.valid('param');
      if (!id) {
        return c.json({ error: 'Invalid ID' }, 400);
      }
      const [data] = await postgresqlDb
        .select()
        .from(surveyResponseItems)
        .where(eq(surveyResponseItems.id, id));

      if (!data) {
        return c.json({ error: 'Survey response item not found' }, 404);
      }

      return c.json({ data });
    }
  )

  // POST create survey response item
  .post(
    '/',
    zValidator(
      'json',
      surveyResponseItemsSelectSchema.omit({
        id: true,
        createdAt: true,
        updatedAt: true
      }),
      (result, c) => {
        if (!result.success) {
          console.error('Invalid survey response item data:', result.error);
          return c.json({ error: 'Invalid survey response item data' }, 400);
        }
      }
    ),
    async (c) => {
      const values = c.req.valid('json');

      const [data] = await postgresqlDb
        .insert(surveyResponseItems)
        .values({
          ...values
        })
        .returning();

      return c.json({ data });
    }
  )

  // BULK create survey response items
  .post(
    '/bulk',
    zValidator(
      'json',
      surveyResponseItemsSelectSchema.omit({
        id: true,
        createdAt: true,
        updatedAt: true
      }),
      (result, c) => {
        if (!result.success) {
          console.error('Invalid survey response item data:', result.error);
          return c.json({ error: 'Invalid survey response item data' }, 400);
        }
      }
    ),
    async (c) => {
      const values = c.req.valid('json');

      const [data] = await postgresqlDb
        .insert(surveyResponseItems)
        .values({
          ...values
        })
        .returning();

      return c.json({ data });
    }
  )

  // PATCH update survey response item by ID
  .patch(
    '/:id',
    zValidator('param', surveyResponseItemsSelectSchema.pick({ id: true })),
    zValidator(
      'json',
      surveyResponseItemsSelectSchema.omit({
        id: true,
        createdAt: true,
        updatedAt: true
      }),
      (result, c) => {
        if (!result.success) {
          return c.json({ error: 'Invalid survey response item data' }, 400);
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
        .update(surveyResponseItems)
        .set(values)
        .where(eq(surveyResponseItems.id, id))
        .returning();

      if (!data) {
        return c.json({ error: 'Survey response item not found' }, 404);
      }

      return c.json({ data });
    }
  )

  // DELETE survey response item by ID
  .delete(
    '/:id',
    zValidator('param', surveyResponseItemsSelectSchema.pick({ id: true })),
    async (c) => {
      const { id } = c.req.valid('param');
      if (!id) {
        return c.json({ error: 'Invalid ID' }, 400);
      }
      const [data] = await postgresqlDb
        .delete(surveyResponseItems)
        .where(eq(surveyResponseItems.id, id))
        .returning();

      if (!data) {
        return c.json({ error: 'Survey response item not found' }, 404);
      }

      return c.json({ data });
    }
  );

export default app;
