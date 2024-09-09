import React, { useState, useEffect } from "react";
import ReactLoader from "../../../common/ReactLoader";
import toast from "react-hot-toast";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import Table from "../../../core/pagination/datatable";
import Export2Excel from "../../../common/Resuable/Export2Excel";
import { Eye } from "feather-icons-react/build/IconComponents";
import { Link } from "react-router-dom";
import DetailedModal from "./detailedModal";

const POAndPendingPODetail = () => {
  const { REACT_APP_PRO_COMP: comp, REACT_APP_PRO_FY: fy } = process.env;
  const url = localStorage.getItem("Url");
  const port = localStorage.getItem("Port");
  const userData = JSON.parse(sessionStorage.getItem("Data"));
  const [open, setOpen] = useState(false);
  const [sendData, setSendData] = useState();

  const [dates, setDates] = useState({
    fromDate: null,
    toDate: null,
  });
  const [tableData, setTableData] = useState([]);
  const columns = [
    {
      title: "PO Number",
      dataIndex: "Code",
      key: "code",
    },
    {
      title: "PO Date",
      dataIndex: "PODate",
      key: "poDate",
    },
    {
      title: "Quantity",
      dataIndex: "Qty",
      key: "qty",
    },
    {
      title: "GR Quantity",
      dataIndex: "GrQty",
      key: "grQty",
    },
    {
      title: "Balance Quantity",
      dataIndex: "BalQty",
      key: "balQty",
    },
    {
      title: "Actions",
      // dataIndex: "actions",
      key: "actions",
      render: (record) => (
        <td className="action-table-data">
          <div className="edit-delete-action">
            <Link
              data-bs-toggle="modal"
              data-bs-target="#add-units"
              data-bs-placement="top"
              className="me-2 p-2"
              to="#"
              onClick={() => handleView(record)}
            >
              <Eye className="feather-view" />
            </Link>
          </div>
        </td>
      ),
    },
  ];
  // -----------------------------------------Handlers------------------------------
  const handleView = (data) => {
    const sData = {
      code: data.Code,
      fromDate: moment(dates.fromDate).format("DD-MMM-YYYY"),
      toDate: moment(dates.toDate).format("DD-MMM-YYYY"),
    };
    setSendData(sData);
  };
  // -----------------------------------------Handlers------------------------------
  const handleDateChange = (key, date) => {
    setDates((prevDates) => ({ ...prevDates, [key]: date }));
  };
  // -------------------------------------API CALLS AND FUNCTIONSS ---------------
  const fetchTableDate = async () => {
    let fromDate = moment(dates.fromDate).format("DD-MMM-YYYY");
    let toDate = moment(dates.toDate).format("DD-MMM-YYYY");
    try {
      setOpen(true);
      const response = await fetch(
        `${url}:${port}/api/values/POAndPendingPODetail?Acc=${
          userData[0].AccCode
        }&ItemGRP=${0}&FDate=${fromDate}&TDate=${toDate}&Pending=1&Rpt=2&comp=${comp}&FY=${fy}&Item=0&Summary=1&VchCode=0`
      );
      const result = await response.json();
      if (result.Status === 1) {
        setOpen(false);
        setTableData(result.Data);
      } else {
        setOpen(false);
        toast.error("Failed to Retreive Data");
      }
    } catch (err) {
      console.log(err);
    }
  };
  // -------------------------------------API CALLS AND FUNCTIONSS ---------------
  useEffect(() => {
    if (dates.fromDate && dates.toDate) {
      fetchTableDate();
    }
  }, [dates]);
  return (
    <>
      <div>
        <ReactLoader open={open} />
        <div className="page-wrapper">
          <div className="content">
            <div className="page-header">
              <div className="add-item d-flex">
                <div className="page-title">
                  <h4>Pending PO</h4>
                  <h6>PO and Pending PO details</h6>
                </div>
              </div>
            </div>
            <div className="card table-list-card">
              <div className="card-body pt-4">
                <div className="row">
                  {/* <div className="col-xl-6">
                    <div className="row">
                      <div
                        className="col-md-6 col-sm-3 col-6"
                        style={{ paddingLeft: "20px" }}
                      >
                        <div className="input-blocks" style={{ zIndex: "500" }}>
                          <ResSelect />
                        </div>
                      </div>
                      <div
                        className="col-md-6 col-sm-3 col-6"
                        style={{ paddingLeft: "20px" }}
                      >
                        <div className="input-blocks" style={{ zIndex: "500" }}>
                          <ResSelect />
                        </div>
                      </div>
                    </div>
                  </div> */}
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
                              autoComplete="off"
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
                              autoComplete="off"
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
                      <div className="col-md-2 col-sm-4 col-6">
                        <div className="input-blocks">
                          <div className="input-groupicon">
                            <Export2Excel tableData={tableData} />
                          </div>
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
        <DetailedModal data={sendData} />
      </div>
    </>
  );
};

export default POAndPendingPODetail;
