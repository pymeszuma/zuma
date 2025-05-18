import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';
import * as schema from './schema';

export const sql = neon(process.env.DATABASE_POSTGRES_URL!);
export const postgresqlDb = drizzle(sql, { schema });
