import dotenv from 'dotenv';
import morgan from 'morgan';
import cors from 'cors';
import { MORGGAN_FORMAT } from './constants';
import express, { Application } from 'express';
import sessionsRouter from './api/sessions/sessions.router';
import eventsRouter from './api/events/events.router';

dotenv.config();

const app: Application = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use(morgan(MORGGAN_FORMAT));

app.use('/sessions', sessionsRouter);
app.use('/events', eventsRouter);

app.use((_, res) => res.status(404).json({ error: 'route not found' }));

app.listen(port, () => console.log(`🏎️  server running on port ${port}`));
