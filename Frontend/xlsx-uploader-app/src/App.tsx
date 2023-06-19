import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import ExcelImport from './Component/ExcelImport';

interface Item {
  itemNo: string;
  description: string;
  rate: number;
  qty: number;
  amount: number;
}

function App() {

  return (
    <ExcelImport />
  )

  }
export default App;