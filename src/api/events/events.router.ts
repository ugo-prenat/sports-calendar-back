import { Router } from 'express';

const eventsRouter = Router();

eventsRouter.get('/', (req, res) => {
  console.log(req.query);

  res.status(200).json('events');
});

export default eventsRouter;
