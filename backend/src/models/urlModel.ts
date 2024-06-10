import mongoose from "mongoose";

const Schema = mongoose.Schema;
const dataSchema = new Schema({
  longUrl: String,
  shortUrl: String,
});

export const DataModel = mongoose.model("Data", dataSchema);
