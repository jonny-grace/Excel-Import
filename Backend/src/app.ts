import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { dataRoutes } from "./routes/dataRoutes";

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const PORT = 5000;

app.use("/api/data", dataRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});