import { Router } from 'express';

const sessionsRouter = Router();

sessionsRouter.get('/', (req, res) => {
  console.log(req.query);

  res.status(200).json('sessions');
});

export default sessionsRouter;
