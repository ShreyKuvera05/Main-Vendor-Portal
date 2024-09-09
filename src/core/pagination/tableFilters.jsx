/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import ImageWithBasePath from "../img/imagewithbasebath";
import { Link } from "react-router-dom";
import { Input } from "antd";
import * as XLSX from "xlsx";

const TableFilters = ({ columns, tableData, search, generatePDF }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const handleInputChange = (e) => {
    const { value } = e.target;
    setSearchQuery(value); // Update search query state
    search(value); // Trigger search with the updated query
  };
  const renderTooltip = (props) => (
    <Tooltip id="pdf-tooltip" {...props}>
      Pdf
    </Tooltip>
  );
  const renderExcelTooltip = (props) => (
    <Tooltip id="excel-tooltip" {...props}>
      Excel
    </Tooltip>
  );
  const renderPrinterTooltip = (props) => (
    <Tooltip id="printer-tooltip" {...props}>
      Printer
    </Tooltip>
  );
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

  return (
    <>
      <div className="table-top">
        <div className="search-setxxxx">
          <div className="search-inputxxx">
            <Input.Search
              placeholder="Search..."
              allowClear
              enterButton
              value={searchQuery}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="search-path">
          <ul className="table-top-head">
            <li>
              <OverlayTrigger placement="top" overlay={renderTooltip}>
                <Link onClick={generatePDF || ""}>
                  <ImageWithBasePath src="assets/img/icons/pdf.svg" alt="img" />
                </Link>
              </OverlayTrigger>
            </li>
            <li>
              <OverlayTrigger placement="top" overlay={renderExcelTooltip}>
                <Link
                  data-bs-toggle="tooltip"
                  data-bs-placement="top"
                  onClick={handleExcelExport}
                >
                  <ImageWithBasePath
                    src="assets/img/icons/excel.svg"
                    alt="img"
                  />
                </Link>
              </OverlayTrigger>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default TableFilters;
