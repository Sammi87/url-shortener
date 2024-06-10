import { Request, Response } from "express";
import { DataModel } from "../models/urlModel";

export const redirectController = async (req: Request, res: Response) => {
  const hash = req.params.hash;
  const shortUrl = `http://localhost:5000/${hash}`;

  try {
    const foundUrlRecord = await DataModel.findOne({ shortUrl });

    if (foundUrlRecord?.longUrl) {
      res.redirect(foundUrlRecord?.longUrl);
    }
  } catch (error) {
    console.error("Could not find long url for hash", error);
    res.status(404).send("No url found");
  }
};
