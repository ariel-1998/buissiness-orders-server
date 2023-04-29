import { NextFunction, Request, Response } from "express";
import { ErrorModel } from "../models/errors/ErrorModel";

export function errorHandler(
    err: ErrorModel, req: Request, res: Response, next: NextFunction
) {
    res.status(err.code).json({message: err.message})
}