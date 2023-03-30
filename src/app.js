import express from 'express';
import morgan from 'morgan';
import userRoutes from './routes/user.routes.js';
import itemRoutes from './routes/item.routes.js';
import './config.js';

const app = express();

app.use(express.json());
app.use(morgan('dev'));
app.use(userRoutes);
app.use(itemRoutes);

app.set('port', process.env.PORT);

export default app;
