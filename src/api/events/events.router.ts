import { Router } from 'express';
import { createEvent } from './events.controllers';

const eventsRouter = Router();

eventsRouter.post('/', createEvent);

export default eventsRouter;
