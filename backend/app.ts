import express from 'express';
import cors from 'cors';
import { HOST, PORT, PROTOCOL } from './config';
import { router } from './routes';

const app = express();

app.use(cors());
app.use('/static', express.static('public'));
app.use(express.json());

app.use('/', router);

app.listen(PORT, () => {
  console.log(`Server was started on ${PROTOCOL}://${HOST}:${PORT}`);
});
