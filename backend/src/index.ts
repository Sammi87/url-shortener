import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

import { connectToDB } from "./config/database";
import { createController } from "./controllers/createController";
import { updateController } from "./controllers/updateController";
import { listController } from "./controllers/listController";
import { redirectController } from "./controllers/redirectController";

const app = express();
const PORT = process.env.PORT || 5000;

connectToDB();

const corsOptions = {
  origin: "http://localhost:9000",
};

app.use(cors(corsOptions));
app.use(bodyParser.json());

app.post("/api/create", createController);
app.patch("/api/update/:hash", updateController);
app.get("/:hash", redirectController);
app.get("/api/list", listController);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
