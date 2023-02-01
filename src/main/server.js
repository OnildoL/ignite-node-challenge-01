import http from "node:http";
import { application } from "./app.js";

const port = 3000;
const app = http.createServer(application);

app.listen(port);
