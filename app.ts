import express from 'express';
import { errors } from 'celebrate'; 
import userRouter from './src/routes/usersRoutes';
import 'dotenv/config';

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/users', userRouter);

app.use(errors());

app.listen(PORT, () => {
    console.log(`App is listening on port ${PORT}`);
})