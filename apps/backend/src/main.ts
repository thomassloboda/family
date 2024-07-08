import express from 'express';
import * as path from 'path';
import cors from 'cors';
import { json, urlencoded } from 'body-parser';
import cookieParser from 'cookie-parser';
import { registerAuthRoutes } from './controllers/auth.controller';
import { registerAdminRoutes } from './controllers/admin.controller';

const app = express();
app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.get('/api', (req, res) => {
  res.send({ message: 'Welcome to backend!' });
});

registerAuthRoutes(app);
registerAdminRoutes(app);

const port = Number(process.env.BACKEND_PORT || 3333);
const host = process.env.BACKEND_HOST || 'localhost';
const server = app.listen(port, host, () => {
  console.log(`Listening at http://${host}:${port}`);
});
server.on('error', console.error);
