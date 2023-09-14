import { Response } from 'express';
import {
  getSessionsOfTheDay,
  makeOverlapedSessions,
  searchSessionsQuery,
  validateBody
} from './sessions.utils';
import { CreateSessionRequest, GetSessionsRequest } from './sessions.models';
import { ISessionQuery, Session } from '../../db/db.models';
import { eachDayOfInterval } from 'date-fns';

export const getSessions = (req: GetSessionsRequest, res: Response) => {
  const { error, range, championships } = searchSessionsQuery(req.query);
  if (error || !range || !championships) return res.status(400).json({ error });

  const days = eachDayOfInterval({
    start: new Date(range.start),
    end: new Date(range.end)
  });

  const sessions: ISessionQuery[] = days.map((date) =>
    getSessionsOfTheDay(date, championships)
  );

  Promise.all(sessions)
    .then((sessions) =>
      res.status(200).json(
        days.map((date, i) => ({
          date,
          overlapedSessions: makeOverlapedSessions(sessions[i])
        }))
      )
    )
    .catch((err) => res.status(500).json({ error: err.message }));
};

export const createSession = (req: CreateSessionRequest, res: Response) => {
  const { body } = req;
  const validation = validateBody(body);

  if (!validation.success)
    return res.status(400).json({ error: validation.error });

  new Session(body)
    .save()
    .then((session) => res.status(201).json(session))
    .catch((err) => res.status(500).json({ error: err.message }));
};
