import { Request, Response } from "express";
import { DataModel } from "../models/urlModel";

export const updateController = async (req: Request, res: Response) => {
  try {
    const { newLongUrl } = req.body;
    const hash = req.params.hash;
    const shortUrl = `http://localhost:5000/${hash}`;

    const updatedRecord = await DataModel.findOneAndUpdate(
      { shortUrl },
      { longUrl: newLongUrl },
      { new: true }
    );

    if (updatedRecord) {
      res.status(200).send("Successfully updated long url");
    }
  } catch (error) {
    console.error("Error creating short url data:", error);
    res.status(500).send("Something went wrong when creating the short url");
  }
};
