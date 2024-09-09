/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { Link } from "react-router-dom";
import * as XLSX from "xlsx";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import ImageWithBasePath from "../../core/img/imagewithbasebath";
const Export2Excel = ({ tableData }) => {
  const handleExcelExport = () => {
    // Create a new workbook
    const wb = XLSX.utils.book_new();

    // Get the keys (column names) from the first object in tableData
    const firstObject = tableData[0];
    const columnKeys = Object.keys(firstObject);

    // Convert columns and tableData to worksheet
    const ws = XLSX.utils.json_to_sheet(tableData, { header: columnKeys });

    // Adjust column widths
    const columnWidths = columnKeys.map((key) => ({
      wch: Math.max(20, ...tableData.map((row) => String(row[key]).length)), // Minimum width 20 characters
    }));
    ws["!cols"] = columnWidths;

    // Add the worksheet to the workbook
    XLSX.utils.book_append_sheet(wb, ws, "Sheet 1");

    // Save the workbook as an Excel file
    XLSX.writeFile(wb, "your_excel_file.xlsx");
  };
  const renderExcelTooltip = (props) => (
    <Tooltip id="excel-tooltip" {...props}>
      Excel
    </Tooltip>
  );
  return (
    <div className="search-path">
      <ul className="table-top-head">
        <li>
          <OverlayTrigger placement="top" overlay={renderExcelTooltip}>
            <Link
              data-bs-toggle="tooltip"
              data-bs-placement="top"
              onClick={handleExcelExport}
            >
              <ImageWithBasePath src="assets/img/icons/excel.svg" alt="img" />
            </Link>
          </OverlayTrigger>
        </li>
      </ul>
    </div>
  );
};

export default Export2Excel;
