import { Response } from 'express';
import { searchSessionsQuery, validateBody } from './sessions.utils';
import { CreateSessionRequest, GetSessionsRequest } from './sessions.models';

export const getSessions = (req: GetSessionsRequest, res: Response) => {
  const { error, range, championships } = searchSessionsQuery(req.query);
  if (error || !range || !championships) return res.status(400).json({ error });

  res.status(200).json({ range, championships });
};

export const createSession = (req: CreateSessionRequest, res: Response) => {
  const { body } = req;
  const validation = validateBody(body);

  if (!validation.success)
    return res.status(400).json({ error: validation.error });

  // --------------------
  // create session in db
  // --------------------

  res.status(201).json({ msg: "that's a valid session" });
};
