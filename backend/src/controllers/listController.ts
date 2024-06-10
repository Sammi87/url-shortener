import { Request, Response } from "express";
import { DataModel } from "../models/urlModel";

export const listController = async (req: Request, res: Response) => {
  try {
    const allUrlRecords = await DataModel.find({});

    if (allUrlRecords) {
      res.json(allUrlRecords.reverse());
    }
  } catch (error) {
    console.error("Could not find list of short urls:", error);
    res.status(404).send("No short urls found");
  }
};
