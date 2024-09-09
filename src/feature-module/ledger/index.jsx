import React, { useState, useEffect } from "react";
import ReactLoader from "../../common/ReactLoader";
import toast from "react-hot-toast";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import Table from "../../core/pagination/datatable";
import { useNavigate } from "react-router-dom";
import { all_routes } from "../../Router/all_routes";
import Export2Excel from "../../common/Resuable/Export2Excel";
import ResSelect from "../../common/Resuable/ResSelect";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { FaFilePdf } from "react-icons/fa6";

const LedgerReport = () => {
  const navigate = useNavigate();
  const routes = all_routes;
  const { REACT_APP_PRO_COMP: comp, REACT_APP_PRO_FY: fy } = process.env;
  const url = localStorage.getItem("Url");
  const port = localStorage.getItem("Port");
  const userData = JSON.parse(sessionStorage.getItem("Data"));
  const [open, setOpen] = useState(false);
  const [customerList, setCustomerList] = useState([]);
  const [companyList, setCompanyList] = useState([]);
  const [selectedProduct, setSelectedProduct] = React.useState({
    Company: null,
    Customer: null,
  });
  const [dates, setDates] = useState({
    fromDate: null,
    toDate: null,
  });
  const [tableData, setTableData] = useState([]);
  const [balanceDetails, setBalanceDetails] = useState([]);

  // -----------------------------------------Handlers------------------------------

  const handleSelectionChange = (
    selectedOption,
    selectName,
    setSelectedProduct
  ) => {
    setSelectedProduct((prevSelectedValues) => ({
      ...prevSelectedValues,
      [selectName]: selectedOption,
    }));
  };

  const handleDateChange = (key, date) => {
    setDates((prevDates) => ({ ...prevDates, [key]: date }));
    setBalanceDetails([]);
  };

  // -----------------------------------------Handlers------------------------------

  // -------------------------------------API CALLS AND FUNCTIONSS ---------------
  const fetchCustomerList = async () => {
    try {
      setOpen(true);
      const response = await fetch(
        `${url}:${port}/api/values/GetAccMasterList?Comp=${comp}&FY=${fy}&Ucode=${userData[0].AccCode}`
      );
      const result = await response.json();
      if (result.Status === 1) {
        setOpen(false);
        setCustomerList(
          result.Data.map(({ AccCode, AccName }) => ({
            value: AccCode,
            label: AccName,
          }))
        );
      } else {
        setOpen(false);
        toast.error("Failed in retreving Data");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const fetchCompanyList = async () => {
    try {
      setOpen(true);
      const response = await fetch(
        `${url}:${port}/api/values/BusyCompList?Comp=${comp}&FY=${fy}`
      );
      const result = await response.json();
      if (result.Status === 1) {
        setOpen(false);
        setCompanyList(
          result.Data.map(({ CompName, CompCode }) => ({
            value: CompCode,
            label: CompName,
          }))
        );
      }
    } catch (err) {
      setOpen(false);
      toast.error("Failed in retreving Data");
    }
  };
  useEffect(() => {
    fetchCustomerList();
    fetchCompanyList();
  }, []);

  const fetchTableData = async () => {
    let fromDate = moment(dates.fromDate).format("DD-MMM-YYYY");
    let toDate = moment(dates.toDate).format("DD-MMM-YYYY");
    const details = selectedProduct.Customer;
    const company = selectedProduct.Company;
    try {
      setOpen(true);
      const response = await fetch(
        `${url}:${port}/api/values/AccountLedger?Comp=${company.value}&FY=${fy}&AccCode=${details.value}&AccName=${details.label}&FDate=${fromDate}&TDate=${toDate}&EmpCode=${userData[0].AccCode}`
      );

      const result = await response.json();
      if (result.Sucess === 1) {
        setOpen(false);
        const filteredData = result.Data.filter(
          (item) => item.Type.toLowerCase() !== "opbal"
        );
        setTableData(filteredData);
        setBalanceDetails([
          result.Data[0],
          result.Data[result.Data.length - 1],
        ]);
      } else {
        setOpen(false);
        toast.error("Failed in Retreiving Data");
      }
    } catch (err) {
      setOpen(false);
      toast.error("Failed in retrieving Data");
    }
  };

  useEffect(() => {
    if (
      selectedProduct.Customer !== null &&
      selectedProduct.Company !== null &&
      dates.fromDate &&
      dates.toDate
    ) {
      fetchTableData();
    } else {
      setTableData([]);
    }
  }, [dates, selectedProduct]);
  const columns = [
    {
      title: "Vch Code",
      dataIndex: "vchcode",
      key: "vchcode",
      className: "right-align",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Order Date",
      dataIndex: "dtorder",
      key: "dtorder",
    },
    {
      title: "Type",
      dataIndex: "Type",
      key: "Type",
    },
    {
      title: "Bill No",
      dataIndex: "BillNo",
      key: "BillNo",
      className: "right-align",
    },
    {
      title: "Account",
      dataIndex: "Account",
      key: "Account",
    },
    {
      title: "Value",
      dataIndex: "Value",
      key: "Value",
      className: "right-align",
      render: (text) => {
        const value = String(text);
        const color = value.includes("-") ? "red" : "green";
        return (
          <span style={{ color }}>
            <b>{value}</b>
          </span>
        );
      },
    },
    {
      title: "Credit",
      dataIndex: "Credit",
      key: "Credit",
      className: "right-align",
      render: (text) => (
        <span style={{ color: "#008000" }}>
          + <b>{text}</b>
        </span>
      ),
    },
    {
      title: "Debit",
      dataIndex: "debit",
      key: "debit",
      className: "right-align",
      render: (text) => (
        <span style={{ color: "red" }}>
          - <b>{text}</b>
        </span>
      ),
    },
    {
      title: "Balance",
      dataIndex: "Balance",
      key: "Balance",
      className: "right-align",
    },
    {
      title: "Shortnar",
      dataIndex: "Shortnar",
      key: "Shortnar",
    },
  ];

  // -------------------------------------API CALLS AND FUNCTIONSS ---------------

  
  // const generatePDF = () => {
  //   const doc = new jsPDF('landscape', 'mm', 'a3');
  
  //   // Add title
  //   doc.setFontSize(18);
  //   doc.text("Ledger Report", 14, 22);
  
  //   // Prepare table columns
  //   const tableColumns = columns.map(col => col.title);
    
  //   // Prepare table rows
   
  
  //   const tableRows = tableData.map((data) =>
  //     columns.map((col) => data[col.dataIndex])
  //   );
  //   // Generate PDF table
  //   autoTable(doc, {
  //     head: [tableColumns],
  //     body: tableRows,
  //     startY: 30,
  //     styles: {
  //       fontSize: 10,
  //     },
  //     margin: { horizontal: 10 },
  //   });
  
  //   // Add balances if available
  //   if (balanceDetails.length > 0) {
  //     doc.setFontSize(12);
  //     doc.text(
  //       `Opening Balance: ${balanceDetails[0].Balance}`,
  //       14,
  //       doc.autoTable.previous.finalY + 10
  //     );
  //     doc.text(
  //       `Closing Balance: ${balanceDetails[1].Balance}`,
  //       14,
  //       doc.autoTable.previous.finalY + 20
  //     );
  //   }
  
  //   // Save the PDF
  //   doc.save("Ledger_Report.pdf");
  // };
  


  const generatePDF = () => {
    const doc = new jsPDF('landscape', 'mm', 'a3');
  
    // Add title
    doc.setFontSize(18);
    doc.text("Ledger Report", 14, 22);
  
    // Prepare table columns
    const tableColumns = columns.map(col => col.title);
  
    // Prepare table rows with styling
    const tableRows = tableData.map((data) =>
      columns.map((col) => {
        const cellValue = data[col.dataIndex];
        const styles = {};
  
        // Apply color rules
        if (col.dataIndex === 'Value') {
          styles.textColor = cellValue < 0 ? [255, 0, 0] : [0, 128, 0]; 
        } else if (col.dataIndex === 'Credit') {
          styles.textColor = [0, 128, 0]; 
        } else if (col.dataIndex === 'debit') {
          styles.textColor = [255, 0, 0]; 
        }
  
        return {
          content: cellValue.toString(),
          styles,
        };
      })
    );
  
    // Generate PDF table
    autoTable(doc, {
      head: [tableColumns],
      body: tableRows.map(row => row.map(cell => cell.content)),
      startY: 30,
      styles: {
        fontSize: 10,
      },
      margin: { horizontal: 10 },
      didParseCell: (data) => {
        const colIndex = data.column.index;
        const rowIndex = data.row.index;
        const cell = tableRows[rowIndex][colIndex];
        if (cell && cell.styles) {
          data.cell.styles.textColor = cell.styles.textColor || 'black';
        }
      },
    });
  
    // Add balances if available
    if (balanceDetails.length > 0) {
      doc.setFontSize(12);
      doc.text(
        `Opening Balance: ${balanceDetails[0].Balance}`,
        14,
        doc.autoTable.previous.finalY + 10
      );
      doc.text(
        `Closing Balance: ${balanceDetails[1].Balance}`,
        14,
        doc.autoTable.previous.finalY + 20
      );
    }
  
    // Save the PDF
    doc.save("Ledger_Report.pdf");
  };
  
  
  


  return (
    <>
      <div>
        <ReactLoader open={open} />
        <div className="page-wrapper">
          <div className="content">
            <div className="page-header">
              <div className="add-item d-flex">
                <div className="page-title">
                  <h4>Ledger</h4>
                  <h6>Ledger Report</h6>
                </div>

              
              </div>
            </div>
            <div className="card table-list-card">
              <div className="card-body pt-4">
                <div className="row">
                  <div className="col-xl-6">
                    <div className="row">
                      <div
                        className="col-md-6 col-sm-3 col-6"
                        style={{ paddingLeft: "20px" }}
                      >
                        <div className="input-blocks" style={{ zIndex: "500" }}>
                          <ResSelect
                            options={customerList}
                            value={selectedProduct.Customer}
                            onChange={(selectedOption) =>
                              handleSelectionChange(
                                selectedOption,
                                "Customer",
                                setSelectedProduct
                              )
                            }
                            id="select21"
                            isMulti={false}
                            placeholder="Select Customer"
                          />
                        </div>
                      </div>
                      <div
                        className="col-md-6 col-sm-3 col-6"
                        style={{ paddingLeft: "20px" }}
                      >
                        <div className="input-blocks" style={{ zIndex: "500" }}>
                          <ResSelect
                            options={companyList}
                            value={selectedProduct.Company}
                            onChange={(selectedOption) =>
                              handleSelectionChange(
                                selectedOption,
                                "Company",
                                setSelectedProduct
                              )
                            }
                            id="select21"
                            isMulti={false}
                            placeholder="Select Company"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-6">
                    <div className="row">
                      <div className="col-md-5 col-sm-6 col-12">
                        <div className="input-blocks">
                          <div className="input-groupicon">
                            <DatePicker
                              id="fromDate"
                              showYearDropdown
                              showMonthDropdown
                              dropdownMode="select"
                              selected={dates.fromDate}
                              onChange={(date) =>
                                handleDateChange("fromDate", date)
                              }
                              dateFormat="dd-MMM-yyyy" // Correct date format
                              isClearable
                              placeholderText="Select From date"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="col-md-5 col-sm-6 col-12">
                        <div className="input-blocks">
                          <div className="input-groupicon">
                            <DatePicker
                              showYearDropdown
                              showMonthDropdown
                              dropdownMode="select"
                              id="toDate"
                              selected={dates.toDate}
                              onChange={(date) =>
                                handleDateChange("toDate", date)
                              }
                              dateFormat="dd-MMM-yyyy" // Correct date format
                              isClearable
                              placeholderText="Select To date"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="col-md-2 col-sm-4 col-6 d-flex justify-content-between">
                        <div className={userData[0].ExcelExp == 1 ? "input-blocks" : 'd-none'}>
                          <div className="input-groupicon">
                            <Export2Excel tableData={tableData} />
                          </div>
                        </div>  
                        <div>
                        <button onClick={generatePDF} className="pdf-btn pdf-btn-primary ms-auto">
                        <FaFilePdf style={{height:'25px', width:'25px'}} />
                        </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="table-responsive">
                  {tableData.length > 0 && (
                    <>
                      {balanceDetails.length > 0 && (
                        <div className="col-lg-12 pb-1 text-end">
                          <span
                            className="badge bg-outline-primary"
                            style={{ fontSize: "1rem" }}
                          >
                            OpeningBalance: {balanceDetails[0].Balance}
                          </span>
                        </div>
                      )}

                      <Table
                        columns={columns}
                        dataSource={tableData}
                        bordere
                        pagination={false}
                      />
                      {balanceDetails.length > 0 && (
                        <div className="col-lg-12 text-end">
                          <span
                            className="badge bg-outline-warning"
                            style={{ fontSize: "1rem" }}
                          >
                            ClosingBalance: {balanceDetails[1].Balance}
                          </span>
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LedgerReport;
