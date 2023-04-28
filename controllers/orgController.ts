import { Router } from "express";
import { OrganizationModel, orgSchema } from "../models/OrganizationModel";
import { createOrg, getOrg } from "../logic/orgLogic";
import fs from "fs/promises";
import path from "path";
import { ZodErrorModel } from "../models/errors/ZodErrorModel";

export const orgRouter = Router();

orgRouter.route("/")
    .get(async (req, res) => {
        const orgReq = req.body;
        const org = await getOrg(orgReq);
        if (!org) return res.status(404).json({message: "Username or passwword are incorrect"});

        res.status(200).json(org);
    })

    .post(async (req, res) => {
        const rawOrg = req.body;

        try {
            orgSchema.parse(rawOrg);
        } catch (error) {
            return res.status(400).json(new ZodErrorModel(error));
        }

        try {
            const org = await createOrg(rawOrg);
            res.status(201).json(org);
        } catch (error) {
            return res.status(409).json({message: "Organization already exists"});
        }
    })

    