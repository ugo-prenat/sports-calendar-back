import { IEvent } from '../../models/sports.models';
import { eventSchema } from './events.models';

export const validateBody = (
  body: IEvent
): {
  success: boolean;
  error: any;
} => {
  const schemaValidation = eventSchema.safeParse(body);

  if (!schemaValidation.success) return schemaValidation;

  return { success: true, error: null };
};
