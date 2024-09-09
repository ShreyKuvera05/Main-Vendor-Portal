import React, { useState } from "react";
import { Link } from "react-router-dom";
import { PlusCircle } from "feather-icons-react/build/IconComponents";
import { useDispatch, useSelector } from "react-redux";
import AddCoupons from "../../core/modals/coupons/addcoupons";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import Table from "../../core/pagination/datatable";
import { Badge } from "antd";
import { Edit, Eye, Trash2 } from "feather-icons-react/build/IconComponents";
import TableFilters from "../../core/pagination/tableFilters";

const Coupons = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.toggle_header);
  const [filteredData, setFilteredData] = useState(null);
  const [sendData, setSendData] = useState([]);

  const TableData = [
    {
      key: "1",
      name: "Coupons 21",
      code: "Christmas",
      type: 2,
      typeName: "Fixed",
      product: 2,
      productName: "Nike Jordan",
      discount: "$20",
      limit: "04",
      used: "01",
      valid: "04 Jan 2023",
      status: "Active",
      OncePerCustomer: "No",
    },
    {
      key: "2",
      name: "First Offer",
      code: "First Offer",
      type: 3,
      typeName: "Percentage",
      product: 2,
      productName: "Nike Jordan",
      discount: "10%",
      limit: "47",
      used: "10",
      valid: "15 Feb 2023",
      status: "InActive",
      OncePerCustomer: "Yes",
    },
    {
      key: "3",
      name: "Offer 40",
      code: "40% Offer",
      type: 3,
      typeName: "Percentage",
      product: 2,
      productName: "Nike Jordan",
      discount: "$20",
      limit: "21",
      used: "14",
      valid: "08 Apr 2023",
      status: "Inactive",
      OncePerCustomer: "No",
    },
    {
      key: "4",
      name: "Subscription",
      code: "FirstSub01",
      type: 2,
      typeName: "Fixed",
      product: 2,
      productName: "Nike Jordan",
      discount: "$20",
      limit: "09",
      used: "07",
      valid: "12 Aug 2023",
      status: "Active",
      OncePerCustomer: "Yes",
    },
  ];
  const handleEdit = (data) => {
    const statusVal = data.status === "Active" ? 1 : 0;
    const opcVal = data.OncePerCustomer === "Yes" ? 1 : 0;
    let finalData = {
      ...data,
      status: statusVal,
      OncePerCustomer: opcVal,
    };
    setSendData(finalData);
  };
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Code",
      dataIndex: "code",
      render: (text) => <Badge status="error" text={text} />,
    },
    {
      title: "Type",
      dataIndex: "typeName",
    },
    {
      title: "Discount",
      dataIndex: "discount",
    },
    {
      title: "Limit",
      dataIndex: "limit",
    },
    {
      title: "Used",
      dataIndex: "used",
    },
    {
      title: "Valid",
      dataIndex: "valid",
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (text) =>
        text.includes("Active") ? (
          <Badge status="success" text={text} />
        ) : (
          <Badge status="error" text={text} />
        ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (record) => (
        <td className="action-table-data">
          <div className="edit-delete-action">
            <Link className="me-2 p-2" to="#">
              <Eye className="feather-view" />
            </Link>
            <Link
              className="me-2 p-2"
              to="#"
              data-bs-toggle="modal"
              data-bs-target="#add-units"
              onClick={() => handleEdit(record)}
            >
              <Edit className="feather-edit" />
            </Link>
            <Link className="confirm-text p-2" to="#">
              <Trash2
                className="feather-trash-2"
                onClick={showConfirmationAlert}
              />
            </Link>
          </div>
        </td>
      ),
    },
  ];
  const search = (value) => {
    const filteredData = TableData.filter((o) =>
      Object.keys(o).some((k) =>
        String(o[k]).toLowerCase().includes(value.toLowerCase())
      )
    );
    setFilteredData(filteredData);
  };
  const MySwal = withReactContent(Swal);

  const showConfirmationAlert = () => {
    MySwal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      showCancelButton: true,
      confirmButtonColor: "#00ff00",
      confirmButtonText: "Yes, delete it!",
      cancelButtonColor: "#ff0000",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        MySwal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          className: "btn btn-success",
          confirmButtonText: "OK",
          customClass: {
            confirmButton: "btn btn-success",
          },
        });
      } else {
        MySwal.close();
      }
    });
  };
  return (
    <div>
      <div className="page-wrapper">
        <div className="content">
          <div className="page-header">
            <div className="add-item d-flex">
              <div className="page-title">
                <h4>Coupons</h4>
                <h6>Manage Your Coupons</h6>
              </div>
            </div>
            <div className="page-btn">
              <Link
                to="#"
                className="btn btn-added"
                data-bs-toggle="modal"
                data-bs-target="#add-units"
              >
                <PlusCircle className="me-2" />
                Add New Coupons
              </Link>
            </div>
          </div>
          <div className="card table-list-card">
            <div className="card-body">
              <TableFilters
                search={search}
                columns={columns}
                tableData={TableData}
              />
              <div className="table-responsive">
                <Table
                  columns={columns}
                  dataSource={filteredData || TableData}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <AddCoupons loadData={sendData} />
    </div>
  );
};

export default Coupons;
