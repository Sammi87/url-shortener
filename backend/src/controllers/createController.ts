import { Request, Response } from "express";
import { DataModel } from "../models/urlModel";
import crypto from "crypto";

function generateShortUrl(url: string) {
  const hash = crypto.createHash("sha256").update(url).digest("base64");
  return `http://localhost:5000/${hash.slice(0, 7)}`; // Take the first 7 characters/digits
}

export const createController = async (req: Request, res: Response) => {
  try {
    const { longUrl } = req.body;

    const foundUrlRecord = await DataModel.findOne({ longUrl });

    if (foundUrlRecord) {
      return res.json({ shortUrl: foundUrlRecord.shortUrl });
    }

    const shortUrl = generateShortUrl(longUrl);

    const newData = new DataModel({ longUrl, shortUrl });
    await newData.save();

    res.json({ shortUrl });
  } catch (error) {
    console.error("Error creating short url data:", error);
    res.status(500).send("Something went wrong when creating the short url");
  }
};
