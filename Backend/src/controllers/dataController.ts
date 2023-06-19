import { Request, Response } from "express";
import { dataModel } from "../models/dataModel";

export const dataController = {
  upload: (req: Request, res: Response) => {
    const data = req.body;
    console.log(data);
    dataModel.upload(data)
      .then(() => {
        console.log("Data inserted into MySQL database");
        res.send({ message: "Data received and saved successfully!" });
      })
      .catch((error) => {
        console.error("Error inserting data into MySQL database:", error);
        res.status(500).send({ error: "An error occurred while saving the data." });
      });
  },
  getAll: (req: Request, res: Response) => {
    dataModel.getAll()
      .then((data) => {
        console.log("Data fetched from MySQL database:", data);
        res.send(data);
      })
      .catch((error) => {
        console.error("Error fetching data from MySQL database:", error);
        res.status(500).send({ error: "An error occurred while fetching the data." });
      });
  },
  update: (req: Request, res: Response) => {
    const id = req.params.id;
    const { itemNo, description, rate, qty, amount } = req.body;
    dataModel.update(id, itemNo, description, rate, qty, amount)
      .then(() => {
        console.log(`Data with id ${id} updated in MySQL database`);
        return dataModel.getAll();
      })
      .then((data) => {
        res.send(data);
        // res.send({ message: `Data with id ${id} updated successfully!` });
      })
      .catch((error) => {
        console.error("Error updating data in MySQL database:", error);
        res.status(500).send({ error: "An error occurred while updating the data." });
      });
  },
  delete: (req: Request, res: Response) => {
    const id = req.params.id;
    dataModel.delete(id)
      .then(() => {
        console.log(`Data with id ${id} deleted from MySQL database`);
        res.send({ message: `Data with id ${id} deleted successfully!` });
      })
      .catch((error) => {
        console.error("Error deleting data from MySQL database:", error);
        res.status(500).send({ error: "An error occurred while deleting the data." });
      });
  }
};