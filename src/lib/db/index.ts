import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';
import * as schema from './schema/index';

import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' })

const isBuild = process.env.NEXT_PHASE === 'phase-production-build';
const isProdRuntime = process.env.NODE_ENV === 'production' && !isBuild;
const connectionString = process.env.DATABASE_URL ?? process.env.NEON_DATABASE_URL;

// In production runtime we require a real connection; in dev/preview we fall back to a stub to avoid crashes.
const effectiveConnection =
  connectionString ??
  (isProdRuntime ? (() => { throw new Error("DATABASE_URL is not set. Define it in your environment or .env.local."); })() : 'postgres://stub:stub@localhost:5432/stub');

const sql = neon(effectiveConnection);
export const db = drizzle(sql, { schema });
