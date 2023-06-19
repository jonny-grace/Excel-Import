import mysql from "mysql";

interface DataItem {
  id: number;
  itemNo: string;
  description: string;
  rate: string;
  qty: string;
  amount: string;
}

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "file_uploader",
});

connection.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL database:", err);
    return;
  }
  console.log("Connected to MySQL database!");
});

export const dataModel = {
  upload: (data: DataItem[]) => {
    const sql = "INSERT INTO data (id, item_no, description, rate, qty, amount) VALUES ? " +
              "ON DUPLICATE KEY UPDATE description=VALUES(description), rate=VALUES(rate), " +
              "qty=VALUES(qty), amount=VALUES(amount)";
    const values = data.map(({ id, itemNo, description, rate, qty, amount }) =>
      [id, itemNo, description, rate, qty, amount]);

    return new Promise<void>((resolve, reject) => {
      connection.query(sql,[values], (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve();
        }
      });
    });
  },
  getAll: () => {
    const sql = "SELECT * FROM data";
    return new Promise<DataItem[]>((resolve, reject) => {
      connection.query(sql, (error, results: DataItem[]) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
  },
  update: (id: string, itemNo: string, description: string, rate: string, qty: string, amount: string) => {
    const sql = "UPDATE data SET item_no = ?, description = ?, rate = ?, qty = ?, amount = ? WHERE id = ?";
    return new Promise<void>((resolve, reject) => {
      connection.query(sql, [itemNo, description, rate, qty, amount, id], (error) => {
        if (error) {
          reject(error);
        } else {
          resolve();
        }
      });
    });
  },
  delete: (id: string) => {
    const sql = "DELETE FROM data WHERE id = ?";
    return new Promise<void>((resolve, reject) => {
      connection.query(sql, [id], (error) => {
        if (error) {
          reject(error);
        } else {
          resolve();
        }
      });
    });
  }
};