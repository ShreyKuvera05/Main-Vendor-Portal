/* eslint-disable react/prop-types */
import React, { useState, useEffect} from "react";
import Select from "react-select";
import jsPDF from "jspdf";
import "jspdf-autotable";
import toast from "react-hot-toast";
import ReactLoader from "../../common/ReactLoader";
import { Pagination } from "antd";
import { Link } from "react-router-dom";
import ResGraph from "../../common/Resuable/ResGraph";
import { FcBarChart } from "react-icons/fc";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { FaFilePdf } from "react-icons/fa6";
import { FaFileExcel } from "react-icons/fa6";
import ExcelJS from 'exceljs';
import FileSaver from "file-saver";


const TAmtvsAch = () => {
  const { REACT_APP_PRO_COMP: comp, REACT_APP_PRO_FY: fy } = process.env;
  const url = localStorage.getItem("Url");
  const port = localStorage.getItem("Port");
  const userData = JSON.parse(sessionStorage.getItem("Data"));
  const [open, setOpen] = useState(false);
  const [customerList, setCustomerList] = useState([]);
  const [prvData, setPrvData] = useState([])
  const [selectedOption, setSelectedOption] = useState({
    value: null,
    label: "Select Customer",
  });

  const [data, setData] = useState([]);
  const [graphData, setGraphData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 15;


console.log(prvData, "prvData")
  
  const renderExcelTooltip = (props) => (
    <Tooltip id="graph-tooltip" {...props}>
      Graph
    </Tooltip>
  );
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
      // console.log(`${url}:${port}/api/values/AmtTargetVsAchvRpt?Comp=${comp}&FY=${fy}&AccCode=${selectedOption.value}&EmpCode=${userData[0].AccCode}`)
      const response = await fetch(
        `${url}:${port}/api/values/AmtTargetVsAchvRpt?Comp=${comp}&FY=${fy}&AccCode=${selectedOption.value}&EmpCode=${userData[0].AccCode}`
      );

      const result = await response.json();
      // console.log(result, "result of total target")
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
      Jul: "July",
      Aug: "August",
      Sep: "September",
      Oct: "October",
      Nov: "November",
      Dec: "December",
      Jan: "January",
      Feb: "February",
      Mar: "March",
    };

    const keys = [
      "YearB",
      "AprT",
      "MayA",
      "JuneT",
      "JulyT",
      "AugB",
      "SepA",
      "OctAP",
      "NovSo",
      "DecT",
      "JanA",
      "FebAP",
      "MarSo",
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
          appppKey = month.slice(0, 4) + "AP";
          soKey = month.slice(0, 4) + "So";
          balKey = month.slice(0, 4) + "B";
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




  //-----react  pdf------------------------------
  const generatePDF = () => {
    const doc = new jsPDF("landscape", "mm", "a0");
    const tableColumn = [
      "Name",
      "Prev Year Ach",
      ...months.flatMap((month) => [
        `${month} Target`,
        `${month} Achievement`,
        `${month} Achievement %`,
        `${month} Pending Order`,
        `${month} Balance`,
      ]),
    ];

    const tableRows = displayedEntries.map((entry) => {
      const [customer, name] = entry.split("|");
      const rowData = [
        name,
        prvData.find((item) => item.Name === name)?.PrvYearA || "",
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
          parseFloat(monthData.AchievementPercentage).toFixed(2) + "%" || "",
          monthData.PendingSo || "",
          monthData.Balance || ""
        );
      });

      return rowData;
    });

    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      theme: "grid",
      styles: { fontSize: 6 },
    });

    doc.save("Target Amount.pdf");
  };





//---excel fun written  by Thakur Vivek
  
  const exportToExcel = async () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Sheet1");
  
    const firstHeaderRow = [
      "",
      "",
      ...months.flatMap((month) => [month, "", "", "", ""]),
    ];
  
    const secondHeaderRow = [
      "Name",
      "Prev Year Ach",
      ...months.flatMap(() => [
        "Target",
        "Achievement",
        "Achievement %",
        "Pending Order",
        "Balance",
      ]),
    ];
  
    // Define styles
    const headerStyle = {
      font: { bold: true, color: { argb: "FFFFFFFF" } },
      fill: { type: "pattern", pattern: "solid", fgColor: { argb: "FF0000FF" } },
      alignment: { horizontal: "center", vertical: "middle" },
    };
  
    const prevYearStyle = {
      font: { bold: true, color: { argb: "FFFFFFFF" } },
      fill: { type: "pattern", pattern: "solid", fgColor: { argb: "FFFFFF00" } },
      alignment: { horizontal: "center", vertical: "middle" },
    };
  
    // Add header rows
    worksheet.addRow(firstHeaderRow);
    worksheet.addRow(secondHeaderRow);
  
    // Apply styles to the first header row
    worksheet.getRow(1).eachCell((cell, colNumber) => {
      if (colNumber > 2) {
        cell.style = headerStyle;
      }
    });
  
    // Apply styles to the second header row
    worksheet.getRow(2).eachCell((cell, colNumber) => {
      if (colNumber === 2) {
        cell.style = prevYearStyle;
      } else {
        cell.style = headerStyle;
      }
    });
  
    // Add and style data rows
    displayedEntries.forEach((entry) => {
      const [customer, name] = entry.split("|");
      const rowData = [
        name,
        prvData.find((item) => item.Name === name)?.PrvYearA || "",
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
          parseFloat(monthData.AchievementPercentage).toFixed(2) + "%" || "",
          monthData.PendingSo || "",
          monthData.Balance || ""
        );
      });
  
      worksheet.addRow(rowData);
    });
  
    // Apply style to "Prev Year Ach" cells
    worksheet.getColumn(2).eachCell((cell, rowNumber) => {
      if (rowNumber > 2) {
        cell.style = prevYearStyle;
      }
    });
  
    // Merge cells for the first header row
    months.forEach((month, index) => {
      const colStart = 3 + index * 5;
      worksheet.mergeCells(1, colStart, 1, colStart + 4);
    });
  
    // Set row height and column width as needed
    worksheet.getRow(1).height = 20;
    worksheet.getRow(2).height = 20;
    worksheet.columns.forEach((column) => {
      column.width = 15;
    });
  
    // Save the workbook
    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
    FileSaver.saveAs(blob, "Target_Amount.xlsx");
  };
  





  return (
    <div>
      <ReactLoader open={open} />
      <div className="page-wrapper">
        <div className="content">
          <div className="page-header">
            <div className="add-item d-flex">
              <div className="page-title">
                <h4>Amount</h4>
                <h6>Target Amount vs Achievement</h6>
              </div>

         
            </div>
          </div>
          <div className="card table-list-card">
            <div className="card-body p-2 mt-3">
              <div className="row ">
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
              {/* //! antdd PAGINATION  */}
              {data.length > 0 && (
                <>
                
                  <div
                    className="table-responsive" 
                    style={{ overflowX: "auto" }}
                  >
                 
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
      



<div className="table-wrapper" style={{ display: "flex", overflow: "auto" }}>
  <table className="table table-bordered datanew">
    <thead>
      <tr>
        <th rowSpan="2" className="sticky-column" style={{ backgroundColor: "#0E103D", color: "#fff", width: '200px' }}>
          Name
        </th>
        <th rowSpan="2" className="" style={{ backgroundColor: "#d8db09", color: "#fff", width: '200px' }}>
          Prev Year Ach
        </th>
        {months.map((month) => (
          <React.Fragment key={month}>
            <th colSpan="5" className="text-center fixed-header" style={{ backgroundColor: "#0E103D", color: "#fff", paddingRight: '2px'}}>
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
        const [customer, name] = entry.split('|');
        return (
          <tr key={entry}>
     
            <td className={`sticky-column ${name === 'Total' ? 'total-row' : ''}`}>
              {name}
            </td>
         
            <td>
              {prvData.find(item => item.Name === name)?.PrvYearA}
            </td>
          
            {months.map((month) => {
              const monthData = data.find(({ Customer, Name, Month }) =>
                Customer === customer && Name === name && Month === month
              ) || {};
              return (
                <React.Fragment key={month}>
                  <td className={name === 'Total' ? 'total-row custom-tColor right-align' : 'custom-tColor right-align'}>
                    {monthData.Transaction}
                  </td>
                  <td className={name === 'Total' ? 'total-row right-align' : 'right-align'}>
                    {monthData.Achievement}
                  </td>
                  <td className={name === 'Total' ? 'total-row right-align' : 'right-align'} style={{ backgroundColor: (() => {
                      const percentage = parseFloat(monthData.AchievementPercentage);
                      if (percentage > 100) return '#70e000';
                      if (percentage >= 85 && percentage <= 99.99) return 'yellow';
                      return 'red';
                    })() }}>
                    {parseFloat(monthData.AchievementPercentage).toFixed(2)}%
                  </td>
                  <td className={name === 'Total' ? 'total-row right-align' : 'right-align'}>
                    {monthData.PendingSo}
                  </td>
                  <td className={name === 'Total' ? 'total-row right-align' : 'right-align'}>
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



              {/* //! antdd PAGINATION  */}
            </div>
          </div>
        </div>
      </div>
      <ResGraph graphData={graphData} company={selectedOption.label} />
    </div>
    
  );
};

export default TAmtvsAch;

// -------------------------------------------------------------------------
