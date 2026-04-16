import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import mainRouter from './src/routers/index.js'

const app = express();

app.use(express.json());

app.use(cors());

app.use(mainRouter);

const port = process.env.PORT || 3000;
const host_url = process.env.HOST_URL || 'localhost';

app.listen(port, () => {
    console.log(`Listening on http://${host_url}:${port}`)
});