import express, { json } from "express";
import * as dotenv from "dotenv";
import { orgRouter } from "./controllers/orgController";

dotenv.config();
const PORT = process.env.PORT
const app = express();

app.use(json());

app.use("/api/organizations", orgRouter);

app.listen(PORT, () => console.log(`listenning on port ${PORT}`))
