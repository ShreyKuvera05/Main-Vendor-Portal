import React, { useState } from "react";
import Breadcrumbs from "../../core/breadcrumbs";
import { Link } from "react-router-dom";
import { Filter, Sliders } from "react-feather";
import ImageWithBasePath from "../../core/img/imagewithbasebath";
import Select from "react-select";
import { Edit, Eye, Globe, Trash2, User } from "react-feather";
import { useSelector } from "react-redux";
import Table from "../../core/pagination/datatable";
import TableFilter from "../../core/pagination/tableFilters";
import CustomerModal from "../../core/modals/peoples/customerModal";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const Customers = () => {
  const data = useSelector((state) => state.customerdata);
  const [sendData, setSendData] = useState([]);
  const [filteredData, setFilteredData] = useState(null);

  const handleEdit = (data) => {
    setSendData(data);
  };
  const columns = [
    {
      title: "Customer Name",
      dataIndex: "CustomerName",
      sorter: (a, b) => a.CustomerName.length - b.CustomerName.length,
    },
    {
      title: "Code",
      dataIndex: "Code",
      sorter: (a, b) => a.Code.length - b.Code.length,
    },
    {
      title: "Customer",
      dataIndex: "Customer",
      sorter: (a, b) => a.Customer.length - b.Customer.length,
    },

    {
      title: "Email",
      dataIndex: "Email",
      sorter: (a, b) => a.Email.length - b.Email.length,
    },

    {
      title: "Phone",
      dataIndex: "Phone",
      sorter: (a, b) => a.Phone.length - b.Phone.length,
    },

    {
      title: "Country",
      dataIndex: "Country",
      sorter: (a, b) => a.Country.length - b.Country.length,
    },

    {
      title: "Action",
      render: (record) => (
        <td className="action-table-data">
          <div className="edit-delete-action">
            <div className="input-block add-lists"></div>

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

            <Link
              className="confirm-text p-2"
              to="#"
              onClick={showConfirmationAlert}
            >
              <Trash2 className="feather-trash-2" />
            </Link>
          </div>
        </td>
      ),
      sorter: (a, b) => a.createdby.length - b.createdby.length,
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
  const search = (value) => {
    const filteredData = data.filter((o) =>
      Object.keys(o).some((k) =>
        String(o[k]).toLowerCase().includes(value.toLowerCase())
      )
    );
    setFilteredData(filteredData);
  };
  return (
    <div className="page-wrapper">
      <div className="content">
        <Breadcrumbs
          maintitle="Customer List"
          subtitle="Manage Your Expense Category"
          addButton="Add New Customer"
        />

        <div className="card table-list-card">
          <div className="card-body">
            <TableFilter columns={columns} dataSource={data} search={search} />
            <div className="table-responsive">
              <Table columns={columns} dataSource={filteredData || data} />
            </div>
          </div>
        </div>
      </div>
      <CustomerModal loadData={sendData} />
    </div>
  );
};

export default Customers;
