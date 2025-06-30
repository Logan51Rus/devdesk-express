import express from 'express';
import { errors } from 'celebrate'; 
import userRouter from './src/routes/userRoutes';
import tasksRouter from './src/routes/taskRoutes';
import { auth }  from './src/middlewares/auth/auth';
import 'dotenv/config';

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/users', userRouter);
app.use('/api/tasks', tasksRouter);

app.use((auth as express.RequestHandler));
app.use(errors());

app.listen(PORT, () => {
    console.log(`App is listening on port ${PORT}`);
})