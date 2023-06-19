import React, { useState } from "react";
import { Modal, Input } from "antd";
import { Item } from "./ExcelImport";

interface Props {
  visible: boolean;
  handleEdit: (newValues: Item) => void;
  handleCancel: () => void;
  item: Item;
}

function EditModal({ visible, handleEdit, handleCancel, item }: Props) {
  const [newValues, setNewValues] = useState<Item>({
    id: item.id,
    itemNo: item.itemNo,
    description: item.description,
    rate: item.rate,
    qty: item.qty,
    amount: item.amount,
  });

  const handleOk = () => {
    handleEdit(newValues);
  };

  const handleChange = (key: keyof Item, value: string) => {
    setNewValues({ ...newValues, [key]: value });
  };

  return (
    <Modal
      title="Edit Item"
      visible={visible}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <Input
        placeholder="Item No"
        value={newValues.itemNo}
        onChange={(e) => handleChange("itemNo", e.target.value)}
        style={{ marginBottom: "10px" }}
      />
      <Input
        placeholder="Description"
        value={newValues.description}
        onChange={(e) => handleChange("description", e.target.value)}
        style={{ marginBottom: "10px" }}
      />
      <Input
        placeholder="Rate"
        value={newValues.rate}
        onChange={(e) => handleChange("rate", e.target.value)}
        style={{ marginBottom: "10px" }}
      />
      <Input
        placeholder="Qty"
        value={newValues.qty}
        onChange={(e) => handleChange("qty", e.target.value)}
        style={{ marginBottom: "10px" }}
      />
      <Input
        placeholder="Amount"
        value={newValues.amount}
        onChange={(e) => handleChange("amount", e.target.value)}
      />
    </Modal>
  );
}

export default EditModal;
