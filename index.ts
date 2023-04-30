import express, { json } from "express";
import fileupload from "express-fileupload"
import * as dotenv from "dotenv";
import { orgRouter } from "./controllers/orgController";
import crypto from "crypto"
dotenv.config();
const PORT = process.env.PORT;
const app = express();

app.use(json());
app.use(fileupload())

app.use("/api/organizations", orgRouter);

app.listen(PORT, () => console.log(`listenning on port ${PORT}`))

