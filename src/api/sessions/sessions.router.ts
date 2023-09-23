import { Router } from 'express';
import { createSessions, getSessions } from './sessions.controllers';

const sessionsRouter = Router();

sessionsRouter.get('/', getSessions);
sessionsRouter.post('/', createSessions);

export default sessionsRouter;
