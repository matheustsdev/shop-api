import http from "http";
import express from "express";
import { router } from "./routes";
import * as bcrypt from "bcrypt";

const app = express();

const port = 3000;

const server = http.createServer(app);

app.use(express.json());

app.use(router);

server.listen(port, () => {
  console.log(`🚀 [server]: Running app on port ${port}.`);
});
