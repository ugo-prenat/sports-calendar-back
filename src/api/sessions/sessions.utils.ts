import { isBefore } from 'date-fns';
import { cleanArray, isEmpty, isValidDate } from '../../utils';
import { IGetSessionsQuery, sessionSchema } from './sessions.models';
import { CHAMPIONSHIPS } from '../../constants';
import { ChampionshipId, ISession } from '../../models/sports.models';

export const searchSessionsQuery = (query: IGetSessionsQuery) => {
  const { range, championships: rawChampionships } = query;

  if (isEmpty(query))
    return { error: 'required queries : range, championships' };
  if (!rawChampionships) return { error: 'required query : championships' };
  if (!range) return { error: 'required query : range' };

  const [start, end] = range.split(',');

  if (!start || !end) return { error: '2 dates required' };
  if (!isValidDate(start) || !isValidDate(end))
    return { error: 'invalid dates' };
  if (isBefore(new Date(end), new Date(start)))
    return { error: 'start date must be before end date' };

  const championships = cleanArray(rawChampionships.split(','));

  if (championships.length === 0) return { error: 'no championships found' };
  if (championships.some((championship) => !isChampionshipValid(championship)))
    return getInvalidChampionships(championships);

  return {
    range: { start, end },
    championships: championships as ChampionshipId[]
  };
};

export const isChampionshipValid = (championship: string): boolean =>
  CHAMPIONSHIPS.includes(championship as any);

export const getInvalidChampionships = (championships: string[]) => {
  const invalidChampionships = championships.filter(
    (championship) => !isChampionshipValid(championship)
  );
  return {
    error: `invalid championship${
      invalidChampionships.length < 2 ? '' : 's'
    } : ${invalidChampionships.join(', ')}`
  };
};

export const validateBody = (
  body: ISession
): {
  success: boolean;
  error: any;
} => {
  const schemaValidation = sessionSchema.safeParse(body);

  if (!schemaValidation.success) return schemaValidation;
  if (!isValidDate(body.startTime))
    return { success: false, error: 'invalid startTime' };
  if (!isValidDate(body.endTime))
    return { success: false, error: 'invalid endTime' };
  if (isBefore(new Date(body.endTime), new Date(body.startTime)))
    return {
      success: false,
      error: 'startTime must be before endTime'
    };

  return { success: true, error: null };
};
