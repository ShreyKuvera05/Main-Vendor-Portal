import React, { useState } from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { Link } from "react-router-dom";
import ImageWithBasePath from "../../core/img/imagewithbasebath";
import { ChevronUp, RotateCcw } from "feather-icons-react/build/IconComponents";
import { setToogleHeader } from "../../core/redux/action";
import { useDispatch, useSelector } from "react-redux";
import {
  Filter,
  PlusCircle,
  Sliders,
  StopCircle,
  User,
  Zap,
} from "react-feather";
import { Edit, Eye, Trash2 } from "feather-icons-react/build/IconComponents";
import Select from "react-select";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import Table from "../../core/pagination/datatable";
import AddUsers from "../../core/modals/usermanagement/addusers";
import TableFilters from "../../core/pagination/tableFilters";

const Users = () => {
  const [sendData, setSendData] = useState([]);
  const [filteredData, setFilteredData] = useState(null);

  const oldandlatestvalue = [
    { value: "date", label: "Sort by Date" },
    { value: "newest", label: "Newest" },
    { value: "oldest", label: "Oldest" },
  ];
  const users = [
    { value: "Choose Name", label: "Choose Name" },
    { value: "Lilly", label: "Lilly" },
    { value: "Benjamin", label: "Benjamin" },
  ];
  const status = [
    { value: "Choose Name", label: "Choose Status" },
    { value: "Active", label: "Active" },
    { value: "InActive", label: "InActive" },
  ];
  const role = [
    { value: "Choose Role", label: "Choose Role" },
    { value: "AcStore Keeper", label: "Store Keeper" },
    { value: "Salesman", label: "Salesman" },
  ];

  const dispatch = useDispatch();
  const data = useSelector((state) => state.toggle_header);
  const dataSource = useSelector((state) => state.userlist_data);

  const handleEdit = (data) => {
    const statusVal = data.status === "Active" ? 1 : 0;
    console.log("statusVal: ", statusVal);
    const updatedData = {
      ...data,
      status: statusVal,
    };
    setSendData(updatedData);
  };
  const search = (value) => {
    const filteredData = dataSource.filter((o) =>
      Object.keys(o).some((k) =>
        String(o[k]).toLowerCase().includes(value.toLowerCase())
      )
    );
    setFilteredData(filteredData);
  };

  const columns = [
    {
      title: "User Name",
      dataIndex: "userName",
      render: (text, record) => (
        <span className="productimgname">
          <Link to="#" className="product-img stock-img">
            <ImageWithBasePath alt="" src={record.img} />
          </Link>
          {text}
        </span>
      ),
      sorter: (a, b) => a.userName.length - b.userName.length,
    },

    {
      title: "Phone",
      dataIndex: "Phone",
      sorter: (a, b) => a.Phone.length - b.Phone.length,
    },
    {
      title: "Email",
      dataIndex: "Email",
      sorter: (a, b) => a.Email.length - b.Email.length,
    },
    {
      title: "Role",
      dataIndex: "role",
      sorter: (a, b) => a.role.length - b.role.length,
    },
    {
      title: "Description",
      dataIndex: "Desc",
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (text) => (
        <div>
          {text === "Active" && (
            <span className="badge badge-linesuccess">{text}</span>
          )}
          {text === "Inactive" && (
            <span className="badge badge-linedanger">{text}</span>
          )}
        </div>
      ),
      sorter: (a, b) => a.status.length - b.status.length,
    },
    {
      title: "Actions",
      // dataIndex: "actions",
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
                <h4>User List</h4>
                <h6>Manage Your Users</h6>
              </div>
            </div>
            <div className="page-btn">
              <a
                to="#"
                className="btn btn-added"
                data-bs-toggle="modal"
                data-bs-target="#add-units"
              >
                <PlusCircle className="me-2" />
                Add New User
              </a>
            </div>
          </div>
          {/* /product list */}
          <div className="card table-list-card">
            <div className="card-body">
              <TableFilters
                search={search}
                columns={columns}
                tableData={dataSource}
              />
              <div className="table-responsive">
                <Table
                  columns={columns}
                  dataSource={filteredData || dataSource}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <AddUsers ReceiveData={sendData} />
    </div>
  );
};

export default Users;
