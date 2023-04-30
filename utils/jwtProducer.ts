import { OrganizationModel } from "../models/OrganizationModel";
import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
dotenv.config();

export const orgToken = (org: OrganizationModel) => {
    return jwt.sign({
        sub: org.id,
        name: org.orgName,
    }, process.env.ORG_JWT_SECRET, {expiresIn: "15m"})
}