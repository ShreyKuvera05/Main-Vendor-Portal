/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import Select from "react-select";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable"; 
import toast from "react-hot-toast";
import ReactLoader from "../../common/ReactLoader";
import { Pagination } from "antd";
import Export2Excel from "../../common/Resuable/Export2Excel";
import { Link } from "react-router-dom";
import ResGraph from "../../common/Resuable/ResGraph";
import { FcBarChart } from "react-icons/fc";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { FaFilePdf } from "react-icons/fa6";

import { FaFileExcel } from "react-icons/fa6";

import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';

const QtyMonthlyReport = () => {
  const { REACT_APP_PRO_COMP: comp, REACT_APP_PRO_FY: fy } = process.env;
  const url = localStorage.getItem("Url");
  const port = localStorage.getItem("Port");
  const userData = JSON.parse(sessionStorage.getItem("Data"));
  const [open, setOpen] = useState(false);
  const [prvData, setPrvData] = useState([])
  const [customerList, setCustomerList] = useState([]);
  const [selectedOption, setSelectedOption] = useState({
    value: null,
    label: "Select Customer",
  });

  const [data, setData] = useState([]);
  const [graphData, setGraphData] = useState([]);
  const renderExcelTooltip = (props) => (
    <Tooltip id="graph-tooltip" {...props}>
      Graph
    </Tooltip>
  );
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 15;

  const fetchCustomerList = async () => {
    setOpen(true);
    try {
      const response = await fetch(
        `${url}:${port}/api/values/GetAccMasterList?Comp=${comp}&FY=${fy}&Ucode=${userData[0].AccCode}`
      );

      const result = await response.json();
      setOpen(false);
      if (result.Status === 1) {
        setCustomerList(
          result.Data.map(({ AccCode, AccName }) => ({
            value: AccCode,
            label: AccName,
          }))
        );
      } else {
        toast.error("Failed in retrieving Data");
      }
    } catch (error) {
      setOpen(false);
      console.error(error);
    }
  };

  useEffect(() => {
    fetchCustomerList();
  }, []);

  const handleSelectChange = (option) => {
    setSelectedOption(option);
  };

  const fetchTableData = async () => {
    setOpen(true);
    try {

      const response = await fetch(
        `${url}:${port}/api/values/TargetQtyVsAchMonthly?Comp=${comp}&FY=${fy}&AccCode=${selectedOption.value}&EmpCode=${userData[0].AccCode}`
      );
      const result = await response.json();
      if (result.Status === 1) {
        setData(mapData(result.Data));
        setPrvData(result.Data)
        setGraphData(
          result.Data.map((ele) => ({
            value: ele.Code,
            label: ele.Name,
            yearlyPercentage: parseFloat(ele.YearAP).toFixed(2),
          }))
        );
        setOpen(false);
      } else {
        setOpen(false);-
        setData([]);
        toast.error("Failed in retrieving Data");
      }
    } catch (error) {
      setOpen(false);
      console.error(error);
    }
  };

  useEffect(() => {
    if (selectedOption.value !== null) {
      fetchTableData();
    }
  }, [selectedOption.value]);

  const mapData = (data) => {
    const monthMapping = {
      Year: "Year",
      Apr: "April",
      May: "May",
      Jun: "June",
      QT1: "Quarter1",
      Jul: "July",
      Aug: "August",
      Sep: "September",
      QT2: "Quarter2",
      Oct: "October",
      Nov: "November",
      Dec: "December",
      QT3: "Quarter3",
      Jan: "January",
      Feb: "February",
      Mar: "March",
      QT4: "Quarter4",
    };

    // Extract and log the month names to ensure they are correctly mapped
    const keys = [
      "PrvYearA",
      "YearB",
      "AprT",
      "MayA",
      "JuneT",
      "QT1",
      "JulyT",
      "AugB",
      "SepA",
      "QT2",
      "OctAP",
      "NovSo",
      "DecT",
      "QT3",
      "JanA",
      "FebAP",
      "MarSo",
      "QT4",
    ];

    const monthNames = keys.map((key) => {
      const abbrev = key.startsWith("YearB")
        ? key.substring(0, 4)
        : key.substring(0, 3);
      return monthMapping[abbrev] || '';
    });

    // const months = monthNames;
    const months = monthNames.filter(month => !!month);

    return data.flatMap(({ Code, Customer, Name, ...rest }) =>
      months.map((month, index) => {
        let transactionKey, aprsKey, appppKey, soKey, balKey;
        if (month === "June" || month === "July" || month === "Year") {
          transactionKey = month.slice(0, 4) + "T";
          aprsKey = month.slice(0, 4) + "A";  
          appppKey = month.slice(0, 4) + "AP ";
          soKey = month.slice(0, 4) + "So";
          balKey = month.slice(0, 4) + "B";
        } else if (month === "Quarter1") {
          transactionKey = month.slice(0, 1) + "T1";
          aprsKey = month.slice(0, 1) + "A1";
          appppKey = month.slice(0, 1) + "AP1";
          soKey = month.slice(0, 1) + "So1";
          balKey = month.slice(0, 1) + "B1";
        } else if (month === "Quarter2") {
          transactionKey = month.slice(0, 1) + "T2";
          aprsKey = month.slice(0, 1) + "A2";
          appppKey = month.slice(0, 1) + "AP2";
          soKey = month.slice(0, 1) + "So2";
          balKey = month.slice(0, 1) + "B2";
        } else if (month === "Quarter3") {
          transactionKey = month.slice(0, 1) + "T3";
          aprsKey = month.slice(0, 1) + "A3";
          appppKey = month.slice(0, 1) + "AP3";
          soKey = month.slice(0, 1) + "So3";
          balKey = month.slice(0, 1) + "B3";
        } else if (month === "Quarter4") {
          transactionKey = month.slice(0, 1) + "T4";
          aprsKey = month.slice(0, 1) + "A4";
          appppKey = month.slice(0, 1) + "AP5";
          soKey = month.slice(0, 1) + "So4";
          balKey = month.slice(0, 1) + "B4";
        } else {
          transactionKey = month.slice(0, 3) + "T";
          aprsKey = month.slice(0, 3) + "A";
          appppKey = month.slice(0, 3) + "AP";
          soKey = month.slice(0, 3) + "So";
          balKey = month.slice(0, 3) + "B";
        }
        return {
          key: Code,
          Customer,
          Name,
          Month: month,
          Transaction: rest[transactionKey] || '',
          Achievement: rest[aprsKey] || '',
          AchievementPercentage: rest[appppKey] || '',
          PendingSo: rest[soKey] || '',
          Balance: rest[balKey] || '',
        };
      })
    );
  };

  const uniqueEntries = [
    ...new Set(data.map(({ Customer, Name }) => `${Customer}|${Name}`)),
  ];
  const months = [...new Set(data.map(({ Month }) => Month))];

  const totalPages = Math.ceil(uniqueEntries.length / rowsPerPage);
  const displayedEntries = uniqueEntries.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

//---this  is fine-------------
  function generatePDF() {
    // const doc = new jsPDF('landscape', 'mm', 'a0');
    const customWidth = 1200; 
    const customHeight = 1500;
    const doc = new jsPDF('landscape', 'mm', [customWidth, customHeight]);

    // Define columns based on your table structure
    const columns = [
      { header: 'Name', dataKey: 'name' },
      { header: 'Prev Year Ach', dataKey: 'prevYearAch' },
      ...months.flatMap(month => [
        { header: `${month} Target`, dataKey: `${month.toLowerCase()}Target` },
        { header: `${month} Achievement`, dataKey: `${month.toLowerCase()}Achievement` },
        { header: `${month} Achievement %`, dataKey: `${month.toLowerCase()}AchievementPercent` },
        { header: `${month} Pending Order`, dataKey: `${month.toLowerCase()}PendingOrder` },
        { header: `${month} Balance`, dataKey: `${month.toLowerCase()}Balance` },
      ]),
      { header: 'Quarter1 Target', dataKey: 'quarter1Target' },
      { header: 'Quarter1 Achievement', dataKey: 'quarter1Achievement' },
      { header: 'Quarter1 Achievement %', dataKey: 'quarter1AchievementPercent' },
      { header: 'Quarter1 Pending Order', dataKey: 'quarter1PendingOrder' },
      { header: 'Quarter1 Balance', dataKey: 'quarter1Balance' },
      { header: 'Quarter2 Target', dataKey: 'quarter2Target' },
      { header: 'Quarter2 Achievement', dataKey: 'quarter2Achievement' },
      { header: 'Quarter2 Achievement %', dataKey: 'quarter2AchievementPercent' },
      { header: 'Quarter2 Pending Order', dataKey: 'quarter2PendingOrder' },
      { header: 'Quarter2 Balance', dataKey: 'quarter2Balance' },
      { header: 'Quarter3 Target', dataKey: 'quarter3Target' },
      { header: 'Quarter3 Achievement', dataKey: 'quarter3Achievement' },
      { header: 'Quarter3 Achievement %', dataKey: 'quarter3AchievementPercent' },
      { header: 'Quarter3 Pending Order', dataKey: 'quarter3PendingOrder' },
      { header: 'Quarter3 Balance', dataKey: 'quarter3Balance' },
      { header: 'Quarter4 Target', dataKey: 'quarter4Target' },
      { header: 'Quarter4 Achievement', dataKey: 'quarter4Achievement' },
      { header: 'Quarter4 Achievement %', dataKey: 'quarter4AchievementPercent' },
      { header: 'Quarter4 Pending Order', dataKey: 'quarter4PendingOrder' },
      { header: 'Quarter4 Balance', dataKey: 'quarter4Balance' },
    ];

    // Adjust data formatting to match the columns
    const formattedData = displayedEntries.map(entry => {
      const [customer, name] = entry.split('|');
      const prvYearAch = prvData.find(item => item.Name === name)?.PrvYearA || '';
      const row = { name, prevYearAch: prvYearAch };

      months.forEach(month => {
        const monthData = data.find(({ Customer, Name, Month }) =>
          Customer === customer && Name === name && Month === month
        ) || {};
        row[`${month.toLowerCase()}Target`] = monthData.Transaction || '';
        row[`${month.toLowerCase()}Achievement`] = monthData.Achievement || '';
        row[`${month.toLowerCase()}AchievementPercent`] = isNaN(parseFloat(monthData.AchievementPercentage)) ? '0.00%' : parseFloat(monthData.AchievementPercentage).toFixed(2) + '%';
        row[`${month.toLowerCase()}PendingOrder`] = monthData.PendingSo || '';
        row[`${month.toLowerCase()}Balance`] = monthData.Balance || '';
      });

      return row;
    });

    autoTable(doc, {
      columns: columns,
      body: formattedData,
      startY: 20,
      theme: 'grid',
      headStyles: {
        fillColor: "#0E103D",
        textColor: "#fff",
        fontSize: 5,
      },
      styles: {
        overflow: 'linebreak',
        cellWidth: 'auto',
        halign: 'center',
        valign: 'top', 
        fontSize: 5, 
        cellPadding: 1, 
      },
      columnStyles: {
        0: { cellWidth: 'auto' }, 
        1: { cellWidth: 'auto' }, 
        ...months.flatMap((month, index) => ({
          [2 + index * 5]: { cellWidth: 'auto' },
          [3 + index * 5]: { cellWidth: 'auto' },
          [4 + index * 5]: { cellWidth: 'auto' },
          [5 + index * 5]: { cellWidth: 'auto' },
          [6 + index * 5]: { cellWidth: 'auto' },
        })),
        ...Array.from({ length: 5 * 4 }, (_, index) => ({
          [2 + months.length * 5 + index]: { cellWidth: 'auto' },
        })),
      },
  
      margin: { top: 40, bottom: 40 }, 
      pageBreak: { auto: true }, 
    });

    doc.save('QuaterMonthlyReport.pdf');
}




//---excel fun written  by Thakur Vivek
const exportToExcel = async () => {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('Target_Amount_vs_Achievement');

  // Define styles
  const headerStyle = {
    font: { bold: true, color: { argb: "FFFFFFFF" } },
    fill: { type: 'pattern', pattern: 'solid', fgColor: { argb: "FF0000FF" } },
    alignment: { horizontal: 'center', vertical: 'middle' },
  };

  const prevYearStyle = {
    fill: { type: 'pattern', pattern: 'solid', fgColor: { argb: "FFFFFF00" } },
    alignment: { horizontal: 'center', vertical: 'middle' },
  };

  // Define the first header row (merged cells for each month)
  const firstHeaderRow = ["", "", ...months.flatMap(month => [month, "", "", "", ""])];
  worksheet.addRow(firstHeaderRow);

  // Define the second header row (sub-headers under each month)
  const secondHeaderRow = [
    "Name",
    "Prev Year Ach",
    ...months.flatMap(() => ["Target", "Achievement", "Achievement %", "Pending Order", "Balance"])
  ];
  worksheet.addRow(secondHeaderRow);

  // Add data rows
  displayedEntries.forEach((entry) => {
    const [customer, name] = entry.split("|");
    const rowData = [
      name,
      prvData.find((item) => item.Name === name)?.PrvYearA || ""
    ];

    months.forEach((month) => {
      const monthData =
        data.find(
          ({ Customer, Name, Month }) =>
            Customer === customer && Name === name && Month === month
        ) || {};
      rowData.push(
        monthData.Transaction || "",
        monthData.Achievement || "",
        monthData.AchievementPercentage ? `${parseFloat(monthData.AchievementPercentage).toFixed(2)}%` : "",
        monthData.PendingSo || "",
        monthData.Balance || ""
      );
    });

    worksheet.addRow(rowData);
  });

  // Apply styles and merge cells
  // First Header Row (merged cells for each month)
  worksheet.getRow(1).eachCell((cell, colNumber) => {
    if (colNumber > 2) {
      const monthIndex = Math.floor((colNumber - 3) / 5);
      if (colNumber === 3 + monthIndex * 5) {
        worksheet.mergeCells(1, colNumber, 1, colNumber + 4);
      }
      cell.style = headerStyle;
    }
  });

  // Second Header Row
  worksheet.getRow(2).eachCell((cell, colNumber) => {
    cell.style = headerStyle;
    if (colNumber === 2) {
      cell.style = prevYearStyle;
    }
  });

  // Apply styles to "Prev Year Ach" column cells
  worksheet.getColumn(2).eachCell((cell, rowNumber) => {
    if (rowNumber > 2) {
      cell.style = prevYearStyle;
    }
  });

  // Set column widths
  worksheet.columns = [
    { width: 20 }, // Name column width
    { width: 20 }, // Prev Year Ach column width
    ...months.flatMap(() => [
      { width: 15 }, // Target column width
      { width: 15 }, // Achievement column width
      { width: 15 }, // Achievement % column width
      { width: 15 }, // Pending Order column width
      { width: 15 }  // Balance column width
    ])
  ];

  // Export the workbook to Excel
  const buffer = await workbook.xlsx.writeBuffer();
  saveAs(new Blob([buffer]), 'Qty_Target Monthly.xlsx');
};
  
  return (
    <div>
      <ReactLoader open={open} />
      <div className="page-wrapper">
        <div className="content">
          <div className="page-header">
            <div className="add-item d-flex">
              <div className="page-title">
                <h4>Qunatity</h4>
                <h6>Quantity Target Monthly Report </h6>
              </div>

            </div>
          </div>
          <div className="card table-list-card">
            <div className="card-body p-2 mt-3">
              <div className="row">
                <div className="col-lg-6">
                  <div className="input-blocks" style={{ zIndex: "500" }}>
                    {/* <Box className="info-img" /> */}
                    <Select
                      className="select"
                      options={customerList}
                      placeholder="Select Customer"
                      onChange={handleSelectChange}
                      value={selectedOption || "Selected Customer"}
                    />
                  </div>
                </div>
                <div className="col-lg-3 ms-auto d-flex justify-content-between">
                  <div className={userData[0].ExcelExp == 1 ? "input-blocks" : 'd-none'}>
                 
                    <button onClick={exportToExcel} className="btn btn-sucess"><FaFileExcel style={{height:'25px', width:'25px', color:'green', }} /></button>
                  </div>
                  <div>
                  <button onClick={generatePDF} className="pdf-btn pdf-btn-primary ms-auto">
                  <FaFilePdf style={{height:'25px', width:'25px'}} />
                  </button>
                  </div>
                </div>
                <div className="col-lg-3 ms-auto mb-2">
                  <div className="input-blocks">
                    {" "}
                    <ul className="table-top-head">
                      <li>
                        <OverlayTrigger
                          placement="top"
                          overlay={renderExcelTooltip}
                        >
                          <Link
                            data-bs-toggle="modal"
                            data-bs-target="#add-units"
                            data-bs-placement="top"
                          >
                            <FcBarChart size={24} />
                          </Link>
                        </OverlayTrigger>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {data.length > 0 && (
                <>
                  <div
                    className="table-responsive"
                    style={{ overflowX: "auto" }}
                  >
                    {/* LEGEND  */}
                    <div className="col-lg-5 d-flex justify-content-between">
                      <div className="container d-flex align-items-center">
                        <h5>Achievement Percentage: &nbsp;</h5>
                        <div className="d-flex justify-content-between">
                          <div className="d-flex align-items-center">
                            <span
                              className="badge me-2"
                              style={{ backgroundColor: "red" }}
                            >
                              &nbsp;
                            </span>
                            <span>Below 85% &nbsp;</span>
                          </div>
                          <div className="d-flex align-items-center">
                            <span
                              className="badge text-dark me-2"
                              style={{ backgroundColor: "yellow" }}
                            >
                              &nbsp;
                            </span>
                            <span>85% - 99% &nbsp;</span>
                          </div>
                          <div className="d-flex align-items-center">
                            <span
                              className="badge me-2"
                              style={{ backgroundColor: "#70e000" }}
                            >
                              &nbsp;
                            </span>
                            <span>100% and above</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <br></br>
                    {/* LEGEND  */}


                  

<div className="table-wrapper" style={{ display: "flex", overflow: "auto" }}>
  <table className="table table-bordered datanew">
    <thead>
      <tr>
        <th className="sticky-column" rowSpan="2" style={{ backgroundColor: "#0E103D", color: "#fff", width: '200px' }}>
          Name
        </th>
        <th  rowSpan="2" style={{ backgroundColor: "#d8db09", color: "#fff", width: '200px' }}>
          Prev Year Ach
        </th>
        {months.map((month) => (
          <React.Fragment key={month}>
            <th
              colSpan="5"
              className="text-center fixed-header"
              style={{
                backgroundColor: "#0E103D",
                color: "#fff",
                width: "1000px", 
              }}
            >
              {month}
            </th>
          </React.Fragment>
        ))}
      </tr>
      <tr>
 
        {months.map((month) => (
          <React.Fragment key={month}>
            <th style={{ width: "200px", backgroundColor: "#a4b9c4", color: "#000000" }}>
              Target
            </th>
            <th style={{ width: "200px", backgroundColor: "#fffef2", color: "#000000" }}>
              Achievement
            </th>
            <th style={{ width: "200px", backgroundColor: "lightgreen", color: "#000000" }}>
              Achievement %
            </th>
            <th style={{ width: "200px", backgroundColor: "#fffef2", color: "#000000" }}>
              Pending Order
            </th>
            <th style={{ width: "200px", backgroundColor: "#f0f0f0", color: "#000000" }}>
              Balance
            </th>
          </React.Fragment>
        ))}
      </tr>
    </thead>
    <tbody>
      {displayedEntries.map((entry) => {
        const [customer, name] = entry.split("|");
        const prvYearAch = prvData.find((item) => item.Name === name)?.PrvYearA || '';
        return (
          <tr key={entry}>
            <td className={`sticky-column ${name === 'Total' ? 'total-row' : ''}`}>
              {name}
            </td>
            <td>
              {prvYearAch}
            </td>
            {months.map((month) => {
              const monthData = data.find(({ Customer, Name, Month }) =>
                Customer === customer && Name === name && Month === month
              ) || {};
              return (
                <React.Fragment key={month}>
                  <td className={name === 'Total' ? 'total-row custom-tColor right-align' : 'custom-tColor right-align'} style={{ width: '200px' }}>
                    {monthData.Transaction}
                  </td>
                  <td className={name === 'Total' ? 'total-row right-align' : 'right-align'} style={{ width: '200px' }}>
                    {monthData.Achievement}
                  </td>
                  <td className={name === 'Total' ? 'total-row right-align' : 'right-align'} style={{ width: '200px', backgroundColor: (() => {
                      const percentage = parseFloat(monthData.AchievementPercentage);
                      if (percentage > 100) return '#70e000';
                      if (percentage >= 85 && percentage <= 99.99) return 'yellow';
                      return 'red';
                    })() }}>
                    {/* {parseFloat(monthData.AchievementPercentage).toFixed(2)}% */}
                    {isNaN( parseFloat(  monthData.AchievementPercentage  ) )? "0.00": parseFloat( monthData.AchievementPercentage ).toFixed(2)} %
                  </td>
                  <td className={name === 'Total' ? 'total-row right-align' : 'right-align'} style={{ width: '200px' }}>
                    {monthData.PendingSo}
                  </td>
                  <td className={name === 'Total' ? 'total-row right-align' : 'right-align'} style={{ width: '200px' }}>
                    {monthData.Balance}
                  </td>
                </React.Fragment>
              );
            })}
          </tr>
        );
      })}
    </tbody>
  </table>
</div>


                  </div>
                  <div style={{ display: "flex", justifyContent: "flex-end" }}>
                    <Pagination
                      className="pagination mt-3"
                      current={currentPage}
                      total={totalPages * rowsPerPage}
                      pageSize={rowsPerPage}
                      onChange={handlePageChange}
                    />
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      <ResGraph graphData={graphData} company={selectedOption.label} />
    </div>
  );
};

export default QtyMonthlyReport;

// -------------------------------------------------------------------------
