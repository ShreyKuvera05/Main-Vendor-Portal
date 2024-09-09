import React, { useState, useEffect } from "react";
import Table from "../../core/pagination/datatable";
import Select from "react-select";
import toast from "react-hot-toast";
import ReactLoader from "../../common/ReactLoader";
import Export2Excel from "../../common/Resuable/Export2Excel";
import { useReactToPrint } from "react-to-print";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { FaFilePdf } from "react-icons/fa6";




const QTargetVsAchivement = () => {
  // const url = process.env.REACT_APP_PRO_BASEURL;
  // const port = process.env.REACT_APP_PRO_PORT;
  const url = localStorage.getItem("Url");
  const port = localStorage.getItem("Port");
  const comp = process.env.REACT_APP_PRO_COMP;
  const fy = process.env.REACT_APP_PRO_FY;
  const storedData = sessionStorage.getItem("Data");
  const userData = JSON.parse(storedData);

  const [open, setOpen] = useState(false);
  const [customerList, setCustomerList] = useState([]);
  const [selectedOption, setSelectedOption] = useState({
    value: null,
    label: "Select Customer",
  });
  const [tableData, setTableData] = useState([]);


  const columns = [
    {
      title: "SrNo",
      dataIndex: "Code",
      key: "Code",
    },
    {
      title: "Customer",
      dataIndex: "Customer",
      key: "Customer",
    },
 
    {
      title: "Name",
      dataIndex: "Name",
      key: "Name",
    },
    {
      title: "Prev Year Ach",
      dataIndex: "PrvYearA",
      key: "PrvYearA",
    
    },
    {
      title: "Target",
      dataIndex: "Targ",
      key: "Targ",
      className: "right-align",
    },
    {
      title: "Achieved",
      dataIndex: "Ach",
      key: "Ach",
      className: "right-align",
    },
    {
      title: "Achievement %",
      dataIndex: "AchP",
      key: "AchP",
      className: "right-align",
      render: (text) => `${parseFloat(text).toFixed(2)}%`,
    },
    {
      title: "Pending So",
      dataIndex: "PendSo",
      key: "PendSo",
      className: "right-align",
    },
  ];



  //   -----------------------------Handlers-------------------------------------
  const handleSelectChange = (selectedOption) =>
    setSelectedOption(selectedOption);

  //   -----------------------------Handlers-------------------------------------

  //   --------------------------------Funtion&ApiCalls-----------------------
  const getCustomerList = async () => {
    setOpen(true);
    try {
      const response = await fetch(
        `${url}:${port}/api/values/GetAccMasterList?Comp=${comp}&FY=${fy}&Ucode=${userData[0].AccCode}`
      );
      const result = await response.json();
      if (result.Status === 1) {
        setOpen(false);
        const listData = result.Data;
        const formattedData = listData.map((item) => ({
          value: item.AccCode,
          label: item.AccName,
        }));
        setCustomerList(formattedData);
      } else {
        setOpen(false);
        toast.error("Failed in retreving Data");
      }
    } catch (error) {
      setOpen(false);
      console.log(error);
    }
  };
  useEffect(() => {
    getCustomerList();
  }, []);

  const getTableData = async () => {
    setOpen(true);
    try {
      // console.log( `${url}:${port}/api/values/QtyTargetVsAchvRpt?Comp=${comp}&FY=${fy}&AccCode=${selectedOption.value}&EmpCode=${userData[0].AccCode}`)
      const response = await fetch(
        `${url}:${port}/api/values/QtyTargetVsAchvRpt?Comp=${comp}&FY=${fy}&AccCode=${selectedOption.value}&EmpCode=${userData[0].AccCode}`);
      const result = await response.json();
      // console.log(result,"result of  qty target achivment")
      if (result.Status === 1) {
        setOpen(false);
        setTableData(result.Data);
      } else {
        setOpen(false);
        setTableData([]);
        toast.error("Failed in retreving Data");
      }
    } catch (error) {
      setOpen(false);
      console.log(error);
    }
  };
  useEffect(() => {
    if (selectedOption.value !== null) {
      getTableData();
    }
  }, [selectedOption.value]);

  const rowClassName = (record) => {
    return record.Name.includes("Total") ? "total-row" : "";
  };


//-----pdf  export  function -----------------

  const exportToPDF = () => {
    const doc = new jsPDF("p", "pt", "a4"); 
    const tableColumn = columns.map((col) => col.title);
    const tableRows = tableData.map((data) =>
      columns.map((col) => data[col.dataIndex])
    );

    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 20,
      styles: { fontSize: 8, cellPadding: 4 },
      theme: 'grid'
    });

    doc.save("Qty Target Yearly (Luxuria).pdf");
  };



  return (
    <div>
      <ReactLoader open={open} />
      <div className="page-wrapper">
        <div className="content">
          <div className="page-header">
            <div className="add-item d-flex">
              <div className="page-title">
                <h4>Quantity</h4>
                <h6>Quantity Target vs Achivement Report</h6>
              </div>
           
            </div>
          </div>
          <div className="card table-list-card">
            <div className="card-body p-2 mt-3" >
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
                    <Export2Excel tableData={tableData} />
                  </div>

                  <div>
                  <button onClick={exportToPDF} className="pdf-btn pdf-btn-primary ms-auto">
                  <FaFilePdf style={{height:'25px', width:'25px'}} />
                  </button>
                  </div>
              
                </div>
              </div>
              <div className="table-responsive"  >
                {tableData.length > 0 && (
                  <Table
                    columns={columns}
                    dataSource={tableData}
                    scroll={{ x: 1300, y: 240 }}
                    rowClassName={rowClassName}
          
                  />
                )}
               
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QTargetVsAchivement;
