import dotenv from 'dotenv';
dotenv.config();
import express, { json } from 'express';
import cors from 'cors';
import { PORT } from '@configs/constants/env';
import { v1Router } from '@routes/v1';
import '@services/orm/prisma';

const app = express();

app.use(cors());
app.use(json());
app.use('/api/v1', v1Router);

app.listen(PORT, () => {
    console.log(`App listening on PORT ${PORT}`);
});
