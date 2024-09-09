import React, { useState } from "react";
import { Link } from "react-router-dom";
import Breadcrumbs from "../../core/breadcrumbs";
import Swal from "sweetalert2";
import { Edit, Trash2 } from "feather-icons-react/build/IconComponents";
import TableFilters from "../../core/pagination/tableFilters";
import Table from "../../core/pagination/datatable";
import AddExpenseCategory from "./AddExpenseCategory";
const ExpenseCategory = () => {
  const [filteredData, setFilteredData] = useState(null);
  const [sendData, setSendData] = useState([]);
  const search = (value) => {
    const filteredData = dataSource.filter((o) =>
      Object.keys(o).some((k) =>
        String(o[k]).toLowerCase().includes(value.toLowerCase())
      )
    );
    setFilteredData(filteredData);
  };
  const confirmText = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      type: "warning",
      showCancelButton: !0,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      confirmButtonClass: "btn btn-primary",
      cancelButtonClass: "btn btn-danger ml-1",
      buttonsStyling: !1,
    }).then(function (t) {
      t.value &&
        Swal.fire({
          type: "success",
          title: "Deleted!",
          text: "Your file has been deleted.",
          confirmButtonClass: "btn btn-success",
        });
    });
  };
  const handleEdit = (data) => {
    setSendData(data);
  };
  const columns = [
    {
      title: "Category name",
      dataIndex: "categoryName",
      key: "categoryName",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Actions",
      key: "actions",
      render: (record) => (
        <td className="action-table-data">
          <div className="edit-delete-action">
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
              <Trash2 className="feather-trash-2" onClick={confirmText} />
            </Link>
          </div>
        </td>
      ),
    },
  ];
  const dataSource = [
    {
      key: "1",
      categoryName: "Employee Benefits",
      description: "Employee Vehicle",
    },
    {
      key: "2",
      categoryName: "Foods & Snacks",
      description: "Employee Foods",
    },
    {
      key: "3",
      categoryName: "Entertainment",
      description: "Employee Welfare",
    },
    {
      key: "4",
      categoryName: "Office Expenses & Postage",
      description: "Postal Expense",
    },
    {
      key: "5",
      categoryName: "Other Expenses",
      description: "Other Expenses",
    },
    {
      key: "6",
      categoryName: "Petrol",
      description: "Employee Cab",
    },
    {
      key: "7",
      categoryName: "Maintenance",
      description: "Office Maintenance",
    },
    {
      key: "8",
      categoryName: "Marketing",
      description: "Advertising Cost",
    },
    {
      key: "9",
      categoryName: "Printing & Stationery",
      description: "Stationery Expense",
    },
    {
      key: "10",
      categoryName: "Telephone Expense",
      description: "Telephone Cost",
    },
    {
      key: "11",
      categoryName: "Entertainment",
      description: "Office Vehicle",
    },
    {
      key: "12",
      categoryName: "Office Expenses & Postage",
      description: "Employee Foods",
    },
  ];

  return (
    <>
      <div>
        <div className="page-wrapper">
          <div className="content">
            <Breadcrumbs
              maintitle="Expense Category"
              subtitle="Manage Your Expense Category"
              addButton="Add Expenses Category"
            />
            {/* /product list */}
            <div className="card table-list-card">
              <div className="card-body">
                <TableFilters
                  columns={columns}
                  tableData={dataSource}
                  search={search}
                />
                <div className="table-responsive">
                  {/* <table className="table  datanew">
                    <thead>
                      <tr>
                        <th className="no-sort">
                          <label className="checkboxs">
                            <input type="checkbox" id="select-all" />
                            <span className="checkmarks" />
                          </label>
                        </th>
                        <th>Category name</th>
                        <th>Description</th>
                        <th className="no-sort">Action</th>
                      </tr>
                    </thead>
                    <tbody className="Expense-list-blk">
                      <tr>
                        <td>
                          <label className="checkboxs">
                            <input type="checkbox" />
                            <span className="checkmarks" />
                          </label>
                        </td>
                        <td>Employee Benefits</td>
                        <td>Employee Vehicle</td>
                        <td className="action-table-data">
                          <div className="edit-delete-action">
                            <Link
                              className="me-2 p-2 mb-0"
                              data-bs-toggle="modal"
                              data-bs-target="#edit-units"
                            >
                              <i data-feather="edit" className="feather-edit" />
                            </Link>
                            <Link className="me-0 confirm-text p-2 mb-0" to="#">
                              <i
                                data-feather="trash-2"
                                className="feather-trash-2"
                              />
                            </Link>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <label className="checkboxs">
                            <input type="checkbox" />
                            <span className="checkmarks" />
                          </label>
                        </td>
                        <td>Foods &amp; Snacks</td>
                        <td>Employee Foods</td>
                        <td className="action-table-data">
                          <div className="edit-delete-action">
                            <Link
                              className="me-2 p-2 mb-0"
                              data-bs-toggle="modal"
                              data-bs-target="#edit-units"
                            >
                              <i data-feather="edit" className="feather-edit" />
                            </Link>
                            <Link className="me-0 confirm-text p-2 mb-0" to="#">
                              <i
                                data-feather="trash-2"
                                className="feather-trash-2"
                                onClick={confirmText}
                              />
                            </Link>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <label className="checkboxs">
                            <input type="checkbox" />
                            <span className="checkmarks" />
                          </label>
                        </td>
                        <td>Entertainment</td>
                        <td>Employee Welfare</td>
                        <td className="action-table-data">
                          <div className="edit-delete-action">
                            <Link
                              className="me-2 p-2 mb-0"
                              data-bs-toggle="modal"
                              data-bs-target="#edit-units"
                            >
                              <i data-feather="edit" className="feather-edit" />
                            </Link>
                            <Link className="me-0 confirm-text p-2 mb-0" to="#">
                              <i
                                data-feather="trash-2"
                                className="feather-trash-2"
                                onClick={confirmText}
                              />
                            </Link>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <label className="checkboxs">
                            <input type="checkbox" />
                            <span className="checkmarks" />
                          </label>
                        </td>
                        <td>Office Expenses &amp; Postage </td>
                        <td>Postal Expense</td>
                        <td className="action-table-data">
                          <div className="edit-delete-action">
                            <Link
                              className="me-2 p-2 mb-0"
                              data-bs-toggle="modal"
                              data-bs-target="#edit-units"
                            >
                              <i data-feather="edit" className="feather-edit" />
                            </Link>
                            <Link className="me-0 confirm-text p-2 mb-0" to="#">
                              <i
                                data-feather="trash-2"
                                className="feather-trash-2"
                                onClick={confirmText}
                              />
                            </Link>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <label className="checkboxs">
                            <input type="checkbox" />
                            <span className="checkmarks" />
                          </label>
                        </td>
                        <td>Other Expenses</td>
                        <td>Other Expenses</td>
                        <td className="action-table-data">
                          <div className="edit-delete-action">
                            <Link
                              className="me-2 p-2 mb-0"
                              data-bs-toggle="modal"
                              data-bs-target="#edit-units"
                            >
                              <i data-feather="edit" className="feather-edit" />
                            </Link>
                            <Link className="me-0 confirm-text p-2 mb-0" to="#">
                              <i
                                data-feather="trash-2"
                                className="feather-trash-2"
                                onClick={confirmText}
                              />
                            </Link>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <label className="checkboxs">
                            <input type="checkbox" />
                            <span className="checkmarks" />
                          </label>
                        </td>
                        <td>Petrol</td>
                        <td>Employee Cab</td>
                        <td className="action-table-data">
                          <div className="edit-delete-action">
                            <Link
                              className="me-2 p-2 mb-0"
                              data-bs-toggle="modal"
                              data-bs-target="#edit-units"
                            >
                              <i data-feather="edit" className="feather-edit" />
                            </Link>
                            <Link className="me-0 confirm-text p-2 mb-0" to="#">
                              <i
                                data-feather="trash-2"
                                className="feather-trash-2"
                                onClick={confirmText}
                              />
                            </Link>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <label className="checkboxs">
                            <input type="checkbox" />
                            <span className="checkmarks" />
                          </label>
                        </td>
                        <td>Maintenance</td>
                        <td>Office Maintenance</td>
                        <td className="action-table-data">
                          <div className="edit-delete-action">
                            <Link
                              className="me-2 p-2 mb-0"
                              data-bs-toggle="modal"
                              data-bs-target="#edit-units"
                            >
                              <i data-feather="edit" className="feather-edit" />
                            </Link>
                            <Link className="me-0 confirm-text p-2 mb-0" to="#">
                              <i
                                data-feather="trash-2"
                                className="feather-trash-2"
                                onClick={confirmText}
                              />
                            </Link>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <label className="checkboxs">
                            <input type="checkbox" />
                            <span className="checkmarks" />
                          </label>
                        </td>
                        <td>Marketing</td>
                        <td>Advertising Cost</td>
                        <td className="action-table-data">
                          <div className="edit-delete-action">
                            <Link
                              className="me-2 p-2 mb-0"
                              data-bs-toggle="modal"
                              data-bs-target="#edit-units"
                            >
                              <i data-feather="edit" className="feather-edit" />
                            </Link>
                            <Link className="me-0 confirm-text p-2 mb-0" to="#">
                              <i
                                data-feather="trash-2"
                                className="feather-trash-2"
                                onClick={confirmText}
                              />
                            </Link>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <label className="checkboxs">
                            <input type="checkbox" />
                            <span className="checkmarks" />
                          </label>
                        </td>
                        <td>Printing &amp; Stationery</td>
                        <td>Stationery Expense</td>
                        <td className="action-table-data">
                          <div className="edit-delete-action">
                            <Link
                              className="me-2 p-2 mb-0"
                              data-bs-toggle="modal"
                              data-bs-target="#edit-units"
                            >
                              <i data-feather="edit" className="feather-edit" />
                            </Link>
                            <Link className="me-0 confirm-text p-2 mb-0" to="#">
                              <i
                                data-feather="trash-2"
                                className="feather-trash-2"
                                onClick={confirmText}
                              />
                            </Link>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <label className="checkboxs">
                            <input type="checkbox" />
                            <span className="checkmarks" />
                          </label>
                        </td>
                        <td>Telephone Expense</td>
                        <td>Telephone Cost</td>
                        <td className="action-table-data">
                          <div className="edit-delete-action">
                            <Link
                              className="me-2 p-2 mb-0"
                              data-bs-toggle="modal"
                              data-bs-target="#edit-units"
                            >
                              <i data-feather="edit" className="feather-edit" />
                            </Link>
                            <Link className="me-0 confirm-text p-2 mb-0" to="#">
                              <i
                                data-feather="trash-2"
                                className="feather-trash-2"
                                onClick={confirmText}
                              />
                            </Link>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <label className="checkboxs">
                            <input type="checkbox" />
                            <span className="checkmarks" />
                          </label>
                        </td>
                        <td>Entertainment</td>
                        <td>Office Vehicle</td>
                        <td className="action-table-data">
                          <div className="edit-delete-action">
                            <Link
                              className="me-2 p-2 mb-0"
                              data-bs-toggle="modal"
                              data-bs-target="#edit-units"
                            >
                              <i data-feather="edit" className="feather-edit" />
                            </Link>
                            <Link className="me-0 confirm-text p-2 mb-0" to="#">
                              <i
                                data-feather="trash-2"
                                className="feather-trash-2"
                                onClick={confirmText}
                              />
                            </Link>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <label className="checkboxs">
                            <input type="checkbox" />
                            <span className="checkmarks" />
                          </label>
                        </td>
                        <td>Office Expenses &amp; Postage </td>
                        <td>Employee Foods</td>
                        <td className="action-table-data">
                          <div className="edit-delete-action">
                            <Link
                              className="me-2 p-2 mb-0"
                              data-bs-toggle="modal"
                              data-bs-target="#edit-units"
                            >
                              <i data-feather="edit" className="feather-edit" />
                            </Link>
                            <Link className="me-0 confirm-text p-2 mb-0" to="#">
                              <i
                                data-feather="trash-2"
                                className="feather-trash-2"
                                onClick={confirmText}
                              />
                            </Link>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table> */}
                  <Table
                    columns={columns}
                    dataSource={filteredData || dataSource}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <AddExpenseCategory loadData={sendData} />
      </div>
    </>
  );
};

export default ExpenseCategory;
