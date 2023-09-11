import { z } from 'zod';
import { DEFAULT_NODE_ENV, DEFAULT_PORT } from '../constants';

const envVariablesSchema = z.object({
  PORT: z.string().default(DEFAULT_PORT),
  NODE_ENV: z.string().default(DEFAULT_NODE_ENV),
  MONGO_URI: z.string(),
  JWT_SECRET: z.string()
});

envVariablesSchema.parse(process.env);

declare global {
  namespace NodeJS {
    interface ProcessEnv extends z.infer<typeof envVariablesSchema> {}
  }
}
