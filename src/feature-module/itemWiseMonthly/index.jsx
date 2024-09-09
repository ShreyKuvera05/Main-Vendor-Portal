/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';
import Select from "react-select";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import toast from "react-hot-toast";
import ReactLoader from "../../common/ReactLoader";
import { Pagination } from "antd";
import Export2Excel from "../../common/Resuable/Export2Excel";
import { FaFilePdf } from "react-icons/fa6";
// import * as XLSX from 'xlsx';
import { FaFileExcel } from "react-icons/fa6";



const ItemWiseMonthly = () => {
  const { REACT_APP_PRO_COMP: comp, REACT_APP_PRO_FY: fy } = process.env;
  const url = localStorage.getItem("Url");
  const port = localStorage.getItem("Port");
  const userData = JSON.parse(sessionStorage.getItem("Data"));
  const [open, setOpen] = useState(false);
  const [customerList, setCustomerList] = useState([]);
  const [selectedOption, setSelectedOption] = useState({
    value: null,
    label: "Select Customer",
  });

  const [data, setData] = useState([]);

  //   const [currentPage, setCurrentPage] = useState(1);
  //   const rowsPerPage = 10;

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
        `${url}:${port}/api/values/ItemTypeWiseMonthlySale?Comp=${comp}&FY=${fy}&AccCode=${selectedOption.value}&EmpCode=${userData[0].AccCode}`
      );

      const result = await response.json();
      if (result.Status === 1) {
        setData(mapData(result.Data));
        setOpen(false);
      } else {
        setOpen(false);
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
      QA1: "Quarter1",
      Jul: "July",
      Aug: "August",
      Sep: "September",
      QA2: "Quarter2",
      Oct: "October",
      Nov: "November",
      Dec: "December",
      QA3: "Quarter3",
      Jan: "January",
      Feb: "February",
      Mar: "March",
      QA4: "Quarter4",
    };

    const keys = [
      "YearA",
      "AprA",
      "MayA",
      "JuneA",
      "QA1",
      "JulyA",
      "AugA",
      "SepA",
      "QA2",
      "OctA",
      "NovA",
      "DecA",
      "QA3",
      "JanA",
      "FebA",
      "MarA",
      "QA4",
    ];

    const monthNames = keys.map((key) => {
      const abbrev = key.startsWith("YearA")
        ? key.substring(0, 4)
        : key.substring(0, 3);
      return monthMapping[abbrev];
    });

    const months = monthNames;
    return data.flatMap(({ Code, Customer, Name, ...rest }) =>
      months.map((month, index) => {
        let aprsKey, soKey;
        if (month === "June" || month === "July" || month === "Year") {
          aprsKey = month.slice(0, 4) + "A";
          soKey = month.slice(0, 4) + "SO";
        } else if (month === "Quarter1") {
          aprsKey = month.slice(0, 1) + "A1";
          soKey = month.slice(0, 1) + "SO1";
        } else if (month === "Quarter2") {
          aprsKey = month.slice(0, 1) + "A2";
          soKey = month.slice(0, 1) + "SO2";
        } else if (month === "Quarter3") {
          aprsKey = month.slice(0, 1) + "A3";
          soKey = month.slice(0, 1) + "SO3";
        } else if (month === "Quarter4") {
          aprsKey = month.slice(0, 1) + "A4";
          soKey = month.slice(0, 1) + "SO4";
        } else {
          aprsKey = month.slice(0, 3) + "A";
          soKey = month.slice(0, 3) + "SO";
        }

        return {
          key: Code,
          Customer,
          Name,
          Month: month,
          Achievement: rest[aprsKey],
          PendingSo: rest[soKey],
        };
      })
    );
  };

  const uniqueEntries = [
    ...new Set(data.map(({ Customer, Name }) => `${Customer}|${Name}`)),
  ];
  const months = [...new Set(data.map(({ Month }) => Month))];

  //   const totalPages = Math.ceil(uniqueEntries.length / rowsPerPage);
  //   const displayedEntries = uniqueEntries.slice(
  //     (currentPage - 1) * rowsPerPage,
  //     currentPage * rowsPerPage
  //   );
  const displayedEntries = uniqueEntries;

  //   const handlePageChange = (pageNumber) => {
  //     setCurrentPage(pageNumber);
  //   };



const generatePDF = () => {
  const doc = new jsPDF('landscape', 'mm', 'a1'); 
  
  // Define table columns
  const tableColumn = [
    { title: "Name", dataKey: "name" },
    ...months.flatMap(month => [
      { title: `${month} Achievement`, dataKey: `${month}_Achievement` },
      { title: `${month} Pending Order`, dataKey: `${month}_PendingOrder` }
    ])
  ];
  
  // Create table rows
  const tableRows = displayedEntries.map(entry => {
    const [customer, name] = entry.split("|");
    const row = { name };
    
    months.forEach(month => {
      const monthData = data.find(d => d.Customer === customer && d.Name === name && d.Month === month) || {};
      row[`${month}_Achievement`] = monthData.Achievement || '';
      row[`${month}_PendingOrder`] = monthData.PendingSo || '';
    });
    
    return row;
  });

  // Debugging output to check tableRows
  console.log('Table Rows:', tableRows);

  // Define column styles with dynamic width adjustment
  const columnStyles = tableColumn.reduce((styles, column) => {
    styles[column.dataKey] = { cellWidth: 30 }; // Adjust cellWidth as needed
    return styles;
  }, {});
  
  // Generate PDF
  autoTable(doc, {
    head: [tableColumn.map(col => col.title)],
    body: tableRows.map(row => tableColumn.map(col => row[col.dataKey] || '')),
    startY: 20,
    theme: 'grid',
    headStyles: {
      fillColor: "#0E103D",
      textColor: "#fff"
    },
    styles: {
      overflow: 'linebreak',
      cellWidth: 'auto', // Adjust this as needed
      halign: 'center'
    },
    columnStyles,
    margin: { top: 20 },
    pageBreak: 'auto'
  });
  
  doc.save("ItemWiseMonthlyReport.pdf");
};





//---excel fun written  by Thakur Vivek
const exportToExcel = async () => {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('ItemWiseMonthlyReport');

  // Define the first header row (grouped headers for each month)
  const firstHeaderRow = ['Name'];
  months.forEach(month => {
    firstHeaderRow.push(month, ''); 
  });

  // Define the second header row (sub-headers for Achievement and Pending Order)
  const secondHeaderRow = ['']; 
  months.forEach(() => {
    secondHeaderRow.push('Achievement', 'Pending Order');
  });

  // Add headers to worksheet
  worksheet.addRow(firstHeaderRow);
  worksheet.addRow(secondHeaderRow);

  // Apply styles to the first header row
  worksheet.getRow(1).eachCell((cell, colNumber) => {
    if (colNumber === 1) {
      cell.value = 'Name'; 
    }
    cell.font = { bold: true, color: { argb: 'FFFFFFFF' } };
    cell.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FF0000FF' }
    };
    cell.alignment = { horizontal: 'center', vertical: 'middle' };
  });

  // Apply styles to the second header row
  worksheet.getRow(2).eachCell((cell, colNumber) => {
    cell.font = { bold: true };
    cell.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FFCCCCCC' }
    };
    cell.alignment = { horizontal: 'center', vertical: 'middle' };
  });

  // Merge cells for the first header row (grouping months)
  months.forEach((month, index) => {
    const colStart = 2 + index * 2;
    worksheet.mergeCells(1, colStart, 1, colStart + 1);
  });

  // Add data rows
  displayedEntries.forEach(entry => {
    const [customer, name] = entry.split('|');
    const rowData = [name];

    months.forEach(month => {
      const monthData = data.find(d => d.Customer === customer && d.Name === name && d.Month === month) || {};
      rowData.push(monthData.Achievement || '', monthData.PendingSo || '');
    });

    worksheet.addRow(rowData);
  });

  // Set column widths if needed
  worksheet.columns = [
    { width: 20 }, 
    ...months.flatMap(() => [
      { width: 15 }, 
      { width: 15 }  
    ])
  ];

  // Export the workbook to Excel
  const buffer = await workbook.xlsx.writeBuffer();
  saveAs(new Blob([buffer]), 'ItemWiseMonthlyReport.xlsx');
};



  return (
    <div>
      <ReactLoader open={open} />
      <div className="page-wrapper">
        <div className="content">
          <div className="page-header">
            <div className="add-item d-flex">
              <div className="page-title">
                <h4>Item</h4>
                <h6>Item Wise Monthly Sale Report</h6>
              </div>
        
            </div>
          </div>
          <div className="card table-list-card">
            <div className="card-body p-2 mt-3">
              <div className="row">
                <div className="col-lg-6">
                  <div className="input-blocks" style={{ zIndex: "500" }}>
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
                    {/* <Export2Excel tableData={data} /> */}
                    <button onClick={exportToExcel} className="btn btn-sucess"><FaFileExcel style={{height:'25px', width:'25px', color:'green', }} /></button>
          
                  </div>
                  <div>
                  <button onClick={generatePDF} className="pdf-btn pdf-btn-primary ms-auto">
                  <FaFilePdf style={{height:'25px', width:'25px'}} />
                  </button>
                  </div>
                </div>
              </div>

              {data.length > 0 && (
                <>
                  <div
                    className="table-responsive"
                    style={{ overflowX: "auto" }}
                  >
                    <br></br>
                    <div
                      className="table-wrapper"
                      style={{ display: "flex", overflow: "auto" }}
                    >
                      <table className="table table-bordered datanew">
                        <thead>
                          <tr>
                            <th rowSpan="2" className="sticky-column">
                              Name
                            </th>
                            {months.map((month) => (
                              <th
                                colSpan="2"
                                key={month}
                                className="text-center fixed-header"
                                style={{
                                  backgroundColor: "#0E103D",
                                  color: "#fff",
                                }}
                              >
                                {month}
                              </th>
                            ))}
                          </tr>
                          <tr>
                            {months.map((month) => (
                              <React.Fragment key={month}>
                                <th
                                  style={{
                                    width: "200px",
                                    backgroundColor: "#fffef2",
                                    color: "#000000",
                                  }}
                                >
                                  Achievement
                                </th>

                                <th
                                  style={{
                                    width: "200px",
                                    backgroundColor: "#fffef2",
                                    color: "#000000",
                                  }}
                                >
                                  Pending Order
                                </th>
                              </React.Fragment>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {displayedEntries.map((entry) => {
                            const [customer, name] = entry.split("|");
                            return (
                              <tr key={entry}>
                                <td
                                  className={`sticky-column ${
                                    name === "Total" ? "total-row" : ""
                                  }`}
                                >
                                  {name}
                                </td>
                                {months.map((month) => {
                                  const monthData =
                                    data.find(
                                      ({ Customer, Name, Month }) =>
                                        Customer === customer &&
                                        Name === name &&
                                        Month === month
                                    ) || {};
                                  console.log(monthData);
                                  return (
                                    <React.Fragment key={month}>
                                      <td
                                        className={
                                          name === "Total"
                                            ? "total-row right-align"
                                            : "right-align"
                                        }
                                        style={{ width: "200px" }}
                                      >
                                        {monthData.Achievement}
                                      </td>

                                      <td
                                        className={
                                          name === "Total"
                                            ? "total-row right-align"
                                            : "right-align"
                                        }
                                        style={{ width: "200px" }}
                                      >
                                        {monthData.PendingSo}
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
                  {/* <div style={{ display: "flex", justifyContent: "flex-end" }}>
                    <Pagination
                      className="pagination mt-3"
                      current={currentPage}
                      total={totalPages * rowsPerPage}
                      pageSize={rowsPerPage}
                      onChange={handlePageChange}
                    />
                  </div> */}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemWiseMonthly;

// -------------------------------------------------------------------------
