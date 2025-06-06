import express, { Request, Response } from 'express';
import 'dotenv/config';

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.get('/', (req: Request, res: Response) => {
    res.send('DevDesk is running!')
})

app.listen(PORT, () => {
    console.log(`App is listening on port ${PORT}`);
})