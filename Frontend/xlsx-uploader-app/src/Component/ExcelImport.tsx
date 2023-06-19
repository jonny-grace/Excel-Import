import React, { useState } from "react";
import { Table, message, Modal, Input } from "antd";
import DataTable from "./TableData";
import * as XLSX from "xlsx";
import axios from "axios";
import FileUploader from "./FileUploader";

const { Column } = Table;

export interface Item {
  id: number;
  itemNo: string;
  description: string;
  rate: string;
  qty: string;
  amount: string;
}

function ExcelImport() {
  const [data, setData] = useState<Item[]>([]);
  // const [tempData, setTempData] = useState<Item[]>([]);
  const [editModalVisible, setEditModalVisible] = useState<boolean>(false);
  const [editItem, setEditItem] = useState<Item>({
    id: 0,
    itemNo: "",
    description: "",
    rate: "",
    qty: "",
    amount: "",
  });
  const [newItemNo, setNewItemNo] = useState<string>("");
  const [newDescription, setNewDescription] = useState<string>("");
  const [newRate, setNewRate] = useState<string>("");
  const [newQty, setNewQty] = useState<string>("");
  const [newAmount, setNewAmount] = useState<string>("");

  const populateData = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/data", {
        method: "GET",
      });

      const result = await response.json();

      setData(result);
    } catch (error) {
      console.error(error);
    }
  };
  const handleUpload = async (uploadedData: Item[]) => {
    try {
      const response = await fetch("http://localhost:5000/api/data/upload", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(uploadedData),
      });

      // const result = await response.json();
      message.success(`Data Uploaded successfully!`);

      populateData();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (index: number) => {
    const item = data[index];
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/data/${item.id}`
      );
      // const newData = data.filter((item) => item.id !== index + 1);
      // setData(newData);
      setData((prevData) => prevData.filter((d) => d.id !== item.id));

      message.success(`Data with id ${item.id} deleted successfully!`);
    } catch (error) {
      console.error(error);
      message.error("An error occurred while deleting the data.");
    }
  };

  const handleEdit = async () => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/data/${editItem.id}`,
        {
          itemNo: newItemNo,
          description: newDescription,
          rate: newRate,
          qty: newQty,
          amount: newAmount,
        }
      );
      const updatedData = response.data;

      setData(updatedData);
      setEditModalVisible(false);
      message.success(`Data with id ${editItem.id} updated successfully!`);
    } catch (error) {
      console.error(error);
      message.error("An error occurred while updating the data.");
    }
  };

  return (
    <div>
      <FileUploader onUpload={handleUpload} />

      <DataTable
        data={data}
        handleDelete={handleDelete}
        handleEdit={handleEdit}
        setEditItem={setEditItem}
        setEditModalVisible={setEditModalVisible}
        setNewItemNo={setNewItemNo}
        setNewDescription={setNewDescription}
        setNewRate={setNewRate}
        setNewQty={setNewQty}
        setNewAmount={setNewAmount}
      />
      <Modal
        title="Edit Item"
        visible={editModalVisible}
        onOk={handleEdit}
        onCancel={() => setEditModalVisible(false)}
      >
        <Input
          placeholder="Item No"
          value={newItemNo}
          onChange={(e) => setNewItemNo(e.target.value)}
          style={{ marginBottom: "10px" }}
        />
        <Input
          placeholder="Description"
          value={newDescription}
          onChange={(e) => setNewDescription(e.target.value)}
          style={{ marginBottom: "10px" }}
        />
        <Input
          placeholder="Rate"
          value={newRate}
          onChange={(e) => setNewRate(e.target.value)}
          style={{ marginBottom: "10px" }}
        />
        <Input
          placeholder="Qty"
          value={newQty}
          onChange={(e) => setNewQty(e.target.value)}
          style={{ marginBottom: "10px" }}
        />
        <Input
          placeholder="Amount"
          value={newAmount}
          onChange={(e) => setNewAmount(e.target.value)}
        />
      </Modal>
    </div>
  );
}

export default ExcelImport;
