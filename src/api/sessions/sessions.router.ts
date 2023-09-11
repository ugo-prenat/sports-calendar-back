import { Router } from 'express';
import { createSession, getSessions } from './sessions.controllers';

const sessionsRouter = Router();

sessionsRouter.get('/', getSessions);
sessionsRouter.post('/', createSession);

export default sessionsRouter;
