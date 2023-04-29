import { Router } from "express";
import { orgSchema } from "../models/OrganizationModel";
import { createOrg, getOrg, updateOrg } from "../logic/orgLogic";
import fs, { promises as fsPromises, promises } from "fs";
import path from "path";
import { ZodErrorModel } from "../models/errors/ZodErrorModel";
import { UploadedFile } from "express-fileupload";
import { ServerErrorModel } from "../models/errors/ServerErrorModel";

export const orgRouter = Router();


orgRouter.route("/")
    // .get(async (req, res) => {
    //     const orgReq = req.body;
    //     const org = await getOrg(orgReq);
    //     if (!org) return res.status(404).json({ message: "Username or passwword are incorrect" });

    //     res.status(200).json(org);
    // })

    .post(async (req, res, next) => {
        const rawOrg = req.body;
        const files = req.files;

        try {
            orgSchema.parse(rawOrg);
        } catch (error) {
            return res.status(400).json(new ZodErrorModel(error));
        }

        try {
            let org = await createOrg(rawOrg);

            if (files) {
                const orgLogo = files.orgLogo as UploadedFile;
                const storagePath = path.join(
                    __dirname, "..", "assets", "orgAssets", org.orgLogo);

                orgLogo.mv(storagePath, () => {
                    return next(new ServerErrorModel());
                });
            }

            res.status(201).json(org);
        } catch (error) {
            return res.status(409).json({ message: "Organization already exists" });
        }
    })
    //go throgh it again
    .put(async (req, res, next) => {
        const org = req.body;
        const files = req.files;

        try {
            orgSchema.parse(org);
        } catch (error) {
            return res.status(400).json(new ZodErrorModel(error));
        }

        if (files) {
            const orgLogo = files.orgLogo as UploadedFile;
            const storagePath = path.join(
                __dirname, "..", "assets", "orgAssets", org.orgLogo);

            if (fs.existsSync(storagePath)) await fsPromises.rm(storagePath);

            orgLogo.mv(storagePath, () => {
                return next(new ServerErrorModel());
            });
        }

        try {
            await updateOrg(org)
        } catch (error) {
            //if name already exist
            return res.status(409).json({ message: "Organization already exists" });
        }

        res.sendStatus(200);
    })

    