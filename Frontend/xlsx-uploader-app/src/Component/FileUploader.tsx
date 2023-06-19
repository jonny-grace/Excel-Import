import React, { useState } from "react";
import { Button, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import * as XLSX from "xlsx";

interface FileUploaderProps {
  onUpload: (data: any) => void;
}

function FileUploader({ onUpload }: FileUploaderProps) {
  const [tempData, setTempData] = useState<any[]>([]);

  const handleFileUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const target = e.target as FileReader;
      const workbook = XLSX.read(target.result as string, { type: "binary" });
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const rows = XLSX.utils.sheet_to_json(worksheet, {
        header: 1,
      }) as string[][];

      const headers = rows[1];
      const data: any[] = [];
      for (let i = 2; i < rows.length; i++) {
        const row: any = {
          id: i - 1,
          itemNo: "",
          description: "",
          rate: "",
          qty: "",
          amount: "",
        };
        for (let j = 0; j < headers.length; j++) {
          switch (headers[j]) {
            case "Item No ":
              if (typeof rows[i][j] !== "undefined") {
                row.itemNo = rows[i][j];
              } else {
                row.itemNo = "";
              }
              break;
            case "Description":
              if (typeof rows[i][j] !== "undefined") {
                row.description = rows[i][j];
              } else {
                row.description = "";
              }
              break;
            case "Rate ":
              if (typeof rows[i][j] !== "undefined") {
                row.rate = rows[i][j];
              } else {
                row.rate = "";
              }
              break;
            case "Qty ":
              if (typeof rows[i][j] !== "undefined") {
                row.qty = rows[i][j];
              } else {
                row.qty = "";
              }
              break;
            case "Amount ":
              if (typeof rows[i][j] !== "undefined") {
                row.amount = rows[i][j];
              } else {
                row.amount = "";
              }
              break;
            default:
              break;
          }
        }
        data.push({ ...row, id: data.length + 1 });
      }

      setTempData(data);
    };
    reader.readAsBinaryString(file);
  };

  const handleUpload = () => {
    onUpload(tempData);
  };

  return (
    <div>
      <input
        type="file"
        onChange={(e) => {
          const file = e.target.files && e.target.files[0];
          if (file) {
            handleFileUpload(file);
          }
        }}
        accept=".xlsx, .xls, .csv"
        style={{ marginBottom: "20px" }}
      />
      <Button
        type="primary"
        icon={<UploadOutlined />}
        disabled={!tempData.length}
        onClick={handleUpload}
        style={{ marginBottom: "20px", marginLeft: "20px" }}
      >
        Upload
      </Button>
    </div>
  );
}

export default FileUploader;
