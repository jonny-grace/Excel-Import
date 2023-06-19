import express from "express";
import { dataController } from "../controllers/dataController";

export const dataRoutes = express.Router();

dataRoutes.post("/upload", dataController.upload);
dataRoutes.get("/", dataController.getAll);
dataRoutes.put("/:id", dataController.update);
dataRoutes.delete("/:id", dataController.delete);