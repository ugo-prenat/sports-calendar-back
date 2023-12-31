import { Request } from 'express';
import { ISession } from '../../models/sports.models';
import { z } from 'zod';
import { CHAMPIONSHIPS, SESSIONS, SPORTS_TYPES } from '../../constants';

export interface IGetSessionsQuery {
  range?: string;
  championships?: string;
}

export type GetSessionsRequest = Request<{}, {}, {}, IGetSessionsQuery>;
export type CreateSessionRequest = Request<{}, {}, ISession[]>;

export const sessionSchema: z.ZodType<Omit<ISession, 'id'>> = z.object({
  eventId: z.string(),
  sport: z.enum(SPORTS_TYPES),
  championship: z.enum(CHAMPIONSHIPS),
  type: z.enum(SESSIONS),
  startTime: z.string(),
  endTime: z.string()
});
