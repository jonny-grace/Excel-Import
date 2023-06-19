import React from "react";
import { Table, Button } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import "../DataTable.css";

export interface Item {
  id: number;
  itemNo: string;
  description: string;
  rate: string;
  qty: string;
  amount: string;
}

interface Props {
  data: Item[];
  handleDelete: (index: number) => Promise<void>;
  handleEdit: () => Promise<void>;
  setEditItem: React.Dispatch<React.SetStateAction<Item>>;
  setEditModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  setNewItemNo: React.Dispatch<React.SetStateAction<string>>;
  setNewDescription: React.Dispatch<React.SetStateAction<string>>;
  setNewRate: React.Dispatch<React.SetStateAction<string>>;
  setNewQty: React.Dispatch<React.SetStateAction<string>>;
  setNewAmount: React.Dispatch<React.SetStateAction<string>>;
}

function DataTable({
  data,
  handleDelete,
  handleEdit,
  setEditItem,
  setEditModalVisible,
  setNewItemNo,
  setNewDescription,
  setNewRate,
  setNewQty,
  setNewAmount,
}: Props) {
  const columns = [
    {
      title: "Item No",
      dataIndex: "Item_No",
      key: "Item_No",
      className: "custom-column",
    },
    {
      title: "Description",
      dataIndex: "Description",
      key: "Description",
      className: "custom-column",
    },
    {
      title: "Rate",
      dataIndex: "Rate",
      key: "Rate",
      className: "custom-column",
    },
    {
      title: "Qty",
      dataIndex: "Qty",
      key: "Qty",
      className: "custom-column",
    },
    {
      title: "Amount",
      dataIndex: "Amount",
      key: "Amount",
      className: "custom-column",
    },
    {
      title: "",
      key: "action",
      render: (text: any, record: Item, index: number) => (
        <div>
          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={() => {
              setEditItem(record);
              setEditModalVisible(true);
              setNewItemNo(record.itemNo);
              setNewDescription(record.description);
              setNewRate(record.rate);
              setNewQty(record.qty);
              setNewAmount(record.amount);
            }}
          >
            Edit
          </Button>
          <Button
            type="ghost"
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(index)}
          >
            Delete
          </Button>
        </div>
      ),
    },
  ];

  return <Table columns={columns} dataSource={data} />;
}

export default DataTable;
