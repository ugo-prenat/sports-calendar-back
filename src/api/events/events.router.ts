import { Router } from 'express';
import { createEvent, getEvents } from './events.controllers';

const eventsRouter = Router();

eventsRouter.get('/', getEvents);
eventsRouter.post('/', createEvent);

export default eventsRouter;
