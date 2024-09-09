import React, { useState, useEffect } from "react";
import ReactLoader from "../../common/ReactLoader";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import toast from "react-hot-toast";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import Table from "../../core/pagination/datatable";
import { useNavigate } from "react-router-dom";
import { all_routes } from "../../Router/all_routes";
import Export2Excel from "../../common/Resuable/Export2Excel";
import ResSelect from "../../common/Resuable/ResSelect";
import { FaFilePdf } from "react-icons/fa6";


const AgingReceivable = () => {
  const { REACT_APP_PRO_COMP: comp, REACT_APP_PRO_FY: fy } = process.env;
  const url = localStorage.getItem("Url");
  const port = localStorage.getItem("Port");
  const userData = JSON.parse(sessionStorage.getItem("Data"));
  const [open, setOpen] = useState(false);
  const [customerList, setCustomerList] = useState([]);
  const [columns, setColumns] = useState([]);
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
          result.Data.map((ele) => ({
            value: ele.AccCode ,
            label: ele.AccName,
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
  const fetchTableData = async (e) => {
  if(e){
    e.preventDefault()
  }
   
    let fromDate = moment(dates.fromDate).format("DD-MMM-YYYY");
    let toDate = moment(dates.toDate).format("DD-MMM-YYYY");
    const details = selectedProduct.Customer;
    const compc = selectedProduct.Company;

    
    try {
      setOpen(true);
      const response = await fetch(
        `${url}:${port}/api/values/GetAgeingReceivable?MasterType=${2}&MasterCode=${details.value}&MasterName=${details.label}&StartDate=${fromDate}&EndDate=${toDate}&CompCode=${compc.value}&FY=${fy}&AccCode=${details.value}&EmpCode=${userData[0].AccCode}`);

      const result = await response.json();
      if (result.Status === 1) {
        setOpen(false);
        const headers = result.Data.Header;
        const data = result.Data.Data;
        const newColumns = [
          {
            title: 'Total Amount',
            dataIndex: 'TotAmtD',
            key: 'TotAmtD',
          },
          ...Object.keys(headers)
            .filter((key) => key.startsWith("Slab"))
            .map((key, index) => ({
              title: headers[key],
              dataIndex: `Slab${index + 1}D`,
              key: `Slab${index + 1}D`,
            })),
        ];
        console.log(newColumns, "columns")
        const newDataSource = data.map((item, index) => {
          let newItem = {};
          Object.keys(item).forEach((key) => {
            if (!["Code", "Name", "NSlab"].includes(key)) {
              newItem[key] = item[key];
            }
          });
          newItem.key = index;
          return newItem;
        });
        setColumns(newColumns);
        setTableData(newDataSource);
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

  // -------------------------------------API CALLS AND FUNCTIONSS ---------------

  const generatePDF = () => {
    // Create a new jsPDF document
    const doc = new jsPDF('landscape', 'mm', 'a4');
    
    // Define table columns based on your columns state
    const tableColumn = columns.map(col => ({
      title: col.title,
      dataKey: col.dataIndex
    }));
  
 
    
    // Static data for demonstration
    const tableRows = tableData.map((data) =>
      columns.map((col) => data[col.dataIndex])
    );
    // Debugging: Log the table rows to ensure they are correct
    console.log('Table Rows:', tableRows);
  
    // Define column styles
    const columnStyles = tableColumn.reduce((styles, column) => {
      styles[column.dataKey] = { cellWidth: 'auto' }; 
      return styles;
    }, {});
  
    // Generate the PDF with autoTable
    try {
      autoTable(doc, {
        head: [tableColumn.map(col => col.title)], 
        body: tableRows, 
        startY: 30, 
        theme: 'grid', 
        headStyles: {
          fillColor: "#0E103D", 
          textColor: "#fff" 
        },
        styles: {
          overflow: 'linebreak', 
          cellWidth: 'wrap',
          halign: 'center',
          textColor: "#000"
        },
        columnStyles: columnStyles, 
        margin: { top: 40 }, 
        didDrawPage: (data) => {
    
          doc.text('Aging Receivable Report', data.settings.margin.left, 15);
        }
      });
  
      // Save the PDF file
      doc.save("AgingReceivableReport.pdf");
    } catch (error) {
      
      console.error('Error generating PDF:', error);
    }
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
                  <h4>Ageing </h4>
                  <h6>Ageing Receivable Report</h6>
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
                              autoComplete="off"
                              showYearDropdown
                              showMonthDropdown
                              dropdownMode="select"
                              selected={dates.fromDate}
                              onChange={(date) =>
                                handleDateChange("fromDate", date)
                              }
                              dateFormat="dd-MMM-yyyy" 
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
                              autoComplete="off"
                              id="toDate"
                              selected={dates.toDate}
                              onChange={(date) =>
                                handleDateChange("toDate", date)
                              }
                              dateFormat="dd-MMM-yyyy" 
                              isClearable
                              placeholderText="Select To date"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="col-md-2 col-sm-4 col-6 d-flex justify-content-between ">
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
                      <Table
                        columns={columns}
                        dataSource={tableData}
                        bordered
                      />
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

export default AgingReceivable;
