import { Response } from 'express';
import { CreateEventRequest } from './events.models';
import { validateBody } from './events.utils';
import { Event } from '../../db/db.models';

export const createEvent = (req: CreateEventRequest, res: Response) => {
  const { body } = req;
  const validation = validateBody(body);

  if (!validation.success)
    return res.status(400).json({ error: validation.error });

  new Event(body)
    .save()
    .then((event) => res.status(201).json(event))
    .catch((err) => res.status(500).json({ error: err.message }));
};
