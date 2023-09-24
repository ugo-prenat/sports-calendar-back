import { z } from 'zod';
import { IEvent } from '../../models/sports.models';
import { CHAMPIONSHIPS, SPORTS_TYPES } from '../../constants';
import { Request } from 'express';

export interface IGetEventQuery {
  sessions?: boolean;
}

export type GetEventsRequest = Request<{}, {}, {}, IGetEventQuery>;
export type CreateEventRequest = Request<{}, {}, IEvent>;

export const eventSchema: z.ZodType<Omit<IEvent, 'eventId' | 'id'>> = z.object({
  sport: z.enum(SPORTS_TYPES),
  championship: z.enum(CHAMPIONSHIPS),
  startTime: z.string(),
  endTime: z.string(),
  regionalized: z.object({
    en: z.object({
      name: z.string(),
      shortName: z.string().optional()
    }),
    fr: z
      .object({
        name: z.string(),
        shortName: z.string().optional()
      })
      .optional()
  }),
  country: z.object({
    code: z.string(),
    flag: z.string()
  }),
  location: z.object({
    regionalized: z.object({
      en: z.object({
        name: z.string(),
        shortName: z.string().optional()
      }),
      fr: z
        .object({
          name: z.string(),
          shortName: z.string().optional()
        })
        .optional()
    }),
    coordinates: z
      .object({
        lat: z.number(),
        lng: z.number()
      })
      .optional(),
    track: z.string().optional()
  })
});
