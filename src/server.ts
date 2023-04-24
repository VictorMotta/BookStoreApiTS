import express, { json } from 'express';
import cors from 'cors';
import routes from './routes/index';
import { handleApplicationErrors } from './middlewares/errorMiddleware';
import 'dotenv/config';

const app = express();

app.use(json());
app.use(cors());
app.use(routes);
app.use(handleApplicationErrors);

const port = process.env.PORT || 4000;

app.listen(port, () => console.log(`Server is running in port: ${port}`));
