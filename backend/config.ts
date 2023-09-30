import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.port || process.env.PORT;
const HOST = process.env.HOST;
const PROTOCOL = process.env.PROTOCOL;

export { PORT, HOST, PROTOCOL };
