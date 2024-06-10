import mongoose from "mongoose";

export const connectToDB = () => {
  try {
    // Connect to MongoDB
    mongoose.connect("mongodb://localhost:27017/mydatabase");
    console.log("Successfully connected to database");

    const db = mongoose.connection;
    db.on("error", console.error.bind(console, "MongoDB connection error:"));
  } catch (error) {
    console.log("Failed to connect to database", error);
    process.exit(1);
  }
};
