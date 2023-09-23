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

export const createSessions = (req: CreateSessionRequest, res: Response) => {
  const { body } = req;
  const validations = body.map((session) => validateBody(session));

  if (validations.some((validation) => !validation.success))
    return res
      .status(400)
      .json({ error: validations.find((session) => !session.success)?.error });

  const sessionsCreation = body.map((session) => new Session(session).save());

  Promise.all(sessionsCreation)
    .then(() => res.status(201).end())
    .catch((err) => res.status(500).json({ error: err.message }));
};
