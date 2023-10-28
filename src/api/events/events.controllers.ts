import { Response } from 'express';
import { CreateEventRequest, GetEventsRequest } from './events.models';
import { validateBody } from './events.utils';
import { Event, Session } from '../../db/db.models';

export const getEvents = (req: GetEventsRequest, res: Response) => {
  const { sessions } = req.query;

  Event.find()
    .sort({ startTime: -1 })
    .then((events) => {
      if (!sessions) return res.status(200).json(events);

      const eventsWithSessions = events.map((event) =>
        Session.find({ eventId: event._id })
      );

      Promise.all(eventsWithSessions)
        .then((sessions) => {
          const eventsWithSessions = events.map((event, i) => ({
            _id: event._id,
            sport: event.sport,
            championship: event.championship,
            regionalized: event.regionalized,
            startTime: event.startTime,
            endTime: event.endTime,
            country: event.country,
            location: event.location,
            sessions: sessions[i]
          }));
          res.status(200).json(eventsWithSessions);
        })
        .catch((err) => res.status(500).json({ error: err.message }));
    })
    .catch((err) => res.status(500).json({ error: err.message }));
};

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
