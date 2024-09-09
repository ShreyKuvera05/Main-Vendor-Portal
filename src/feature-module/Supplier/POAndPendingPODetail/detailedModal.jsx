/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import Table from "../../../core/pagination/datatable";
import { CloseButton } from "react-bootstrap";
import ReactLoader from "../../../common/ReactLoader";

const DetailedModal = ({ data }) => {
  const userData = JSON.parse(sessionStorage.getItem("Data"));
  const { REACT_APP_PRO_COMP: comp, REACT_APP_PRO_FY: fy } = process.env;
  const url = localStorage.getItem("Url");
  const port = localStorage.getItem("Port");
  const [open, setOpen] = useState(false);
  const [tableData, setTableData] = useState([]);
  const columns = [
    // {
    //   title: "Supplier",
    //   dataIndex: "Supplier",
    //   key: "supplier",
    // },
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
    // {
    //   title: "Code String",
    //   dataIndex: "Codestr",
    //   key: "codestr",
    // },
    {
      title: "Name",
      dataIndex: "Name",
      key: "name",
    },
    {
      title: "Quantity",
      dataIndex: "Qty",
      key: "qty",
    },
    {
      title: "GR Quantity",
      dataIndex: "GRQty",
      key: "grQty",
    },
    {
      title: "Balance Quantity",
      dataIndex: "BalQty",
      key: "balQty",
    },
    {
      title: "Is Close",
      dataIndex: "IsClose",
      key: "isClose",
    },
  ];
  const fetchTableData = async () => {
    try {
      setOpen(true);
      const response = await fetch(
        `${url}:${port}/api/values/POAndPendingPODetail?Acc=${
          userData[0].AccCode
        }&ItemGRP=${0}&FDate=${data.fromDate}&TDate=${
          data.toDate
        }&Pending=1&Rpt=2&comp=${comp}&FY=${fy}&Item=0&Summary=0&VchCode=${
          data.code
        }`
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
      setOpen(false);
      console.log(err);
    }
  };
  useEffect(() => {
    if (data !== undefined) {
      fetchTableData();
    }
  }, [data]);
  return (
    <div>
      <ReactLoader open={open} />
      <div className="modal fade" id="add-units" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            <div className="page-wrapper-new p-0">
              <div className="content">
                <div className="modal-header border-0 custom-modal-header">
                  <h5 className="text-end"></h5>
                </div>
                <div className="modal-body custom-modal-body">
                  <div className="table-responsive">
                    <Table columns={columns} dataSource={tableData} bordered />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailedModal;
