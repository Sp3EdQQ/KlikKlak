import { ZodObject, ZodRawShape } from 'zod';

export function configValidator<T extends ZodRawShape>(schema: ZodObject<T>) {
  return function validateConfig(
    values: Record<string, unknown>,
  ): ZodObject<T>['_output'] {
    const result = schema.safeParse(values);

    if (result.success) {
      return result.data;
    } else {
      console.error('Configuration errors:', result.error.format());
      throw new Error('Invalid configuration');
    }
  };
}
