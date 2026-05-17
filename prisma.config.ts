// 📄 prisma.config.ts
import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

import { defineConfig, env } from 'prisma/config';

export default defineConfig({
  schema: 'prisma/schema', 
  
  datasource: {
    url: env('DATABASE_URL'),
  },
  
  migrations: {
    path: 'prisma/migrations',
    seed: 'tsx prisma/seed.ts',
  },
});