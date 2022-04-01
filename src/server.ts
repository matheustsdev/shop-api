import http from "http";
import express from "express";
import { router } from "./routes";
import cors from "cors";

const app = express();

const port = 8080;

app.use(cors());

const server = http.createServer(app);

app.use(express.json());

app.use(router);

server.listen(port, () => {
  console.log(`🚀 [server]: Running app on port ${port}.`);
});
