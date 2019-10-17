import bodyParser from 'body-parser';
import express from 'express';
import http from 'http';

import pushRouter from './pushRouter'

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(pushRouter);

const server = http.createServer(app);

const port = "8080";

server.listen(port);
