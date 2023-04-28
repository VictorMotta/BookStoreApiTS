import express, { json } from 'express';
import cors from 'cors';
import routes from '@/routes';
import { handleApplicationErrors } from '@/middlewares/errorMiddleware';
import 'dotenv/config';
import { loadEnvs } from '@/config/envs';

loadEnvs();

const app = express();

app.use(json());
app.use(cors());
app.use(routes);
app.use(handleApplicationErrors);

export default app;
