import 'dotenv/config';
import express from 'express';

const app = express();

app.get('/', (req, res) => {
  res.send('Hello World!')
});

const port = process.env.PORT || 3000;
const host_url = process.env.HOST_URL || 'localhost';

app.listen(port, () => {
    console.log(`Listening on http://${host_url}:${port}`)
});