import { registerAs } from '@nestjs/config';
import { configValidator } from '../utils/configvalidator';
import { z } from 'zod';

const schema = z.object({
  url: z.string(),
});

type DatabaseConfig = z.infer<typeof schema>;

const validateDatabaseConfig = configValidator(schema);

export default registerAs('database', (): DatabaseConfig => {
  const values = {
    url: process.env.DATABASE_URL,
  };

  return validateDatabaseConfig(values);
});
