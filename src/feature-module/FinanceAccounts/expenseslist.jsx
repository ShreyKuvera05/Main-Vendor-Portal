import React, { useState } from "react";
import Breadcrumbs from "../../core/breadcrumbs";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { Badge } from "antd";
import Table from "../../core/pagination/datatable";
import { all_routes } from "../../Router/all_routes";
import { Edit, Eye, Trash2 } from "feather-icons-react/build/IconComponents";
import AddExpense from "./AddExpense";
import TableFilters from "../../core/pagination/tableFilters";

const ExpensesList = () => {
  const route = all_routes;
  const [filteredData, setFilteredData] = useState(null);
  const [sendData, setSendData] = useState([]);

  const handleEdit = (data) => {
    const statusVal = data.status === "Active" ? 1 : 0;
    const finalData = {
      ...data,
      status: statusVal,
    };
    setSendData(finalData);
  };
  const columns = [
    {
      title: "Category name",
      dataIndex: "categoryName",
      key: "categoryName",
    },
    {
      title: "Reference",
      dataIndex: "reference",
      key: "reference",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) =>
        status.includes("Active") ? (
          <Badge status="success" text={status} />
        ) : (
          <Badge status="error" text={status} />
        ),
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Expense For",
      dataIndex: "expenseFor",
      key: "expenseFor",
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
      category: 2,
      categoryName: "Foods & Snacks",
      reference: "PT001",
      date: "19 Jan 2023",
      status: "Active",
      amount: "$550",
      description: "Employee Vehicle",
      expenseFor: "Company B",
    },
    {
      key: "2",
      category: 3,
      categoryName: "Employee Benefits",
      reference: "PT002",
      date: "27 Jan 2023",
      status: "Active",
      amount: "$570",
      description: "Employee Foods",
      expenseFor: "Company A",
    },
    {
      key: "3",
      category: 2,
      categoryName: "Foods & Snacks",
      reference: "PT003",
      date: "03 Feb 2023",
      status: "Active",
      amount: "$400",
      description: "Office Vehicle",
      expenseFor: "Company C",
    },
    {
      key: "4",
      category: 3,
      categoryName: "Employee Benefits",
      reference: "PT004",
      date: "17 Feb 2023",
      status: "Inactive",
      amount: "$750",
      description: "Employee Foods",
      expenseFor: "Company D",
    },
    {
      key: "5",
      category: 2,
      categoryName: "Foods & Snacks",
      reference: "PT005",
      date: "14 Mar 2023",
      status: "Inactive",
      amount: "$470",
      description: "Employee Vehicle",
      expenseFor: "Company B",
    },
    {
      key: "6",
      category: 3,
      categoryName: "Employee Benefits",
      reference: "PT006",
      date: "28 Mar 2023",
      status: "Active",
      amount: "$200",
      description: "Employee Foods",
      expenseFor: "Company A",
    },
    {
      key: "7",
      category: 2,
      categoryName: "Foods & Snacks",
      reference: "PT007",
      date: "06 Apr 2023",
      status: "Inactive",
      amount: "$380",
      description: "Office Vehicle",
      expenseFor: "Company D",
    },
    {
      key: "8",
      category: 3,
      categoryName: "Employee Benefits",
      reference: "PT008",
      date: "19 Apr 2023",
      status: "Active",
      amount: "$620",
      description: "Employee Foods",
      expenseFor: "Company C",
    },
    {
      key: "9",
      category: 2,
      categoryName: "Foods & Snacks",
      reference: "PT009",
      date: "08 May 2023",
      status: "Inactive",
      amount: "$430",
      description: "Employee Vehicle",
      expenseFor: "Company A",
    },
    {
      key: "10",
      category: 3,
      categoryName: "Employee Benefits",
      reference: "PT010",
      date: "23 May 2023",
      status: "Active",
      amount: "$120",
      description: "Employee Foods",
      expenseFor: "Company B",
    },
    {
      key: "11",
      category: 3,
      categoryName: "Employee Benefits",
      reference: "PT011",
      date: "24 Nov 2023",
      status: "Inactive",
      amount: "$620",
      description: "Office Vehicle",
      expenseFor: "Company C",
    },
    {
      key: "12",
      category: 2,
      categoryName: "Foods & Snacks",
      reference: "PT012",
      date: "19 Nov 2023",
      status: "Active",
      amount: "$430",
      description: "Employee Foods",
      expenseFor: "Company D",
    },
  ];

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
  const search = (value) => {
    const filteredData = dataSource.filter((o) =>
      Object.keys(o).some((k) =>
        String(o[k]).toLowerCase().includes(value.toLowerCase())
      )
    );
    setFilteredData(filteredData);
  };
  return (
    <div>
      <div className="page-wrapper">
        <div className="content">
          <Breadcrumbs
            maintitle="Expense List"
            subtitle="Manage Your Expenses"
            addButton="Add New Expenses"
          />

          <div className="card table-list-card">
            <div className="card-body">
              <TableFilters
                columns={columns}
                tableData={dataSource}
                search={search}
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
      <AddExpense loadData={sendData} />
    </div>
  );
};

export default ExpensesList;

// {
//   /* <table className="table  datanew">
//                   <thead>
//                     <tr>
//                       <th className="no-sort">
//                         <label className="checkboxs">
//                           <input type="checkbox" id="select-all" />
//                           <span className="checkmarks" />
//                         </label>
//                       </th>
//                       <th>Category name</th>
//                       <th>Reference</th>
//                       <th>Date</th>
//                       <th>Status</th>
//                       <th>Amount</th>
//                       <th>Description</th>
//                       <th className="no-sort">Action</th>
//                     </tr>
//                   </thead>
//                   <tbody className="Expense-list-blk">
//                     <tr>
//                       <td>
//                         <label className="checkboxs">
//                           <input type="checkbox" />
//                           <span className="checkmarks" />
//                         </label>
//                       </td>
//                       <td>Employee Benefits</td>
//                       <td>PT001</td>
//                       <td>19 Jan 2023</td>
//                       <td>
//                         <span className="badge badge-linesuccess">Active</span>
//                       </td>
//                       <td>$550</td>
//                       <td>Employee Vehicle</td>
//                       <td className="action-table-data">
//                         <div className="edit-delete-action">
//                           <Link className="me-2 p-2 mb-0" to="#">
//                             <Eye className="action-eye" />
//                           </Link>
//                           <Link
//                             className="me-2 p-2 mb-0"
//                             data-bs-toggle="modal"
//                             data-bs-target="#edit-units"
//                           >
//                             <i data-feather="edit" className="feather-edit" />
//                           </Link>
//                           <Link className="me-3 confirm-text p-2 mb-0" to="#">
//                             <i
//                               data-feather="trash-2"
//                               className="feather-trash-2"
//                               onClick={confirmText}
//                             />
//                           </Link>
//                         </div>
//                       </td>
//                     </tr>
//                     <tr>
//                       <td>
//                         <label className="checkboxs">
//                           <input type="checkbox" />
//                           <span className="checkmarks" />
//                         </label>
//                       </td>
//                       <td>Foods &amp; Snacks</td>
//                       <td>PT002</td>
//                       <td>27 Jan 2023</td>
//                       <td>
//                         <span className="badge badge-linesuccess">Active</span>
//                       </td>
//                       <td>$570</td>
//                       <td>Employee Foods</td>
//                       <td className="action-table-data">
//                         <div className="edit-delete-action">
//                           <Link className="me-2 p-2 mb-0" to="#">
//                             <Eye className="action-eye" />
//                           </Link>
//                           <Link
//                             className="me-2 p-2 mb-0"
//                             data-bs-toggle="modal"
//                             data-bs-target="#edit-units"
//                           >
//                             <i data-feather="edit" className="feather-edit" />
//                           </Link>
//                           <Link className="me-3 confirm-text p-2 mb-0" to="#">
//                             <i
//                               data-feather="trash-2"
//                               className="feather-trash-2"
//                               onClick={confirmText}
//                             />
//                           </Link>
//                         </div>
//                       </td>
//                     </tr>
//                     <tr>
//                       <td>
//                         <label className="checkboxs">
//                           <input type="checkbox" />
//                           <span className="checkmarks" />
//                         </label>
//                       </td>
//                       <td>Entertainment</td>
//                       <td>PT003</td>
//                       <td>03 Feb 2023</td>
//                       <td>
//                         <span className="badge badge-linesuccess">Active</span>
//                       </td>
//                       <td>$400</td>
//                       <td>Office Vehicle</td>
//                       <td className="action-table-data">
//                         <div className="edit-delete-action">
//                           <Link className="me-2 p-2 mb-0" to="#">
//                             <Eye className="action-eye" />
//                           </Link>
//                           <Link
//                             className="me-2 p-2 mb-0"
//                             data-bs-toggle="modal"
//                             data-bs-target="#edit-units"
//                           >
//                             <i data-feather="edit" className="feather-edit" />
//                           </Link>
//                           <Link className="me-3 confirm-text p-2 mb-0" to="#">
//                             <i
//                               data-feather="trash-2"
//                               className="feather-trash-2"
//                               onClick={confirmText}
//                             />
//                           </Link>
//                         </div>
//                       </td>
//                     </tr>
//                     <tr>
//                       <td>
//                         <label className="checkboxs">
//                           <input type="checkbox" />
//                           <span className="checkmarks" />
//                         </label>
//                       </td>
//                       <td>Office Expenses &amp; Postage </td>
//                       <td>PT004</td>
//                       <td>17 Feb 2023</td>
//                       <td>
//                         <span className="badge badge-linedanger">Inactive</span>
//                       </td>
//                       <td>$750</td>
//                       <td>Employee Foods</td>
//                       <td className="action-table-data">
//                         <div className="edit-delete-action">
//                           <Link className="me-2 p-2 mb-0" to="#">
//                             <Eye className="action-eye" />
//                           </Link>
//                           <Link
//                             className="me-2 p-2 mb-0"
//                             data-bs-toggle="modal"
//                             data-bs-target="#edit-units"
//                           >
//                             <i data-feather="edit" className="feather-edit" />
//                           </Link>
//                           <Link className="me-3 confirm-text p-2 mb-0" to="#">
//                             <i
//                               data-feather="trash-2"
//                               className="feather-trash-2"
//                               onClick={confirmText}
//                             />
//                           </Link>
//                         </div>
//                       </td>
//                     </tr>
//                     <tr>
//                       <td>
//                         <label className="checkboxs">
//                           <input type="checkbox" />
//                           <span className="checkmarks" />
//                         </label>
//                       </td>
//                       <td>Employee Benefits</td>
//                       <td>PT005</td>
//                       <td>14 Mar 2023</td>
//                       <td>
//                         <span className="badge badge-linedanger">Inactive</span>
//                       </td>
//                       <td>$470</td>
//                       <td>Employee Vehicle</td>
//                       <td className="action-table-data">
//                         <div className="edit-delete-action">
//                           <Link className="me-2 p-2 mb-0" to="#">
//                             <Eye className="action-eye" />
//                           </Link>
//                           <Link
//                             className="me-2 p-2 mb-0"
//                             data-bs-toggle="modal"
//                             data-bs-target="#edit-units"
//                           >
//                             <i data-feather="edit" className="feather-edit" />
//                           </Link>
//                           <Link className="me-3 confirm-text p-2 mb-0" to="#">
//                             <i
//                               data-feather="trash-2"
//                               className="feather-trash-2"
//                               onClick={confirmText}
//                             />
//                           </Link>
//                         </div>
//                       </td>
//                     </tr>
//                     <tr>
//                       <td>
//                         <label className="checkboxs">
//                           <input type="checkbox" />
//                           <span className="checkmarks" />
//                         </label>
//                       </td>
//                       <td>Foods &amp; Snacks</td>
//                       <td>PT006</td>
//                       <td>28 Mar 2023</td>
//                       <td>
//                         <span className="badge badge-linesuccess">Active</span>
//                       </td>
//                       <td>$200</td>
//                       <td>Employee Foods</td>
//                       <td className="action-table-data">
//                         <div className="edit-delete-action">
//                           <Link className="me-2 p-2 mb-0" to="#">
//                             <Eye className="action-eye" />
//                           </Link>
//                           <Link
//                             className="me-2 p-2 mb-0"
//                             data-bs-toggle="modal"
//                             data-bs-target="#edit-units"
//                           >
//                             <i data-feather="edit" className="feather-edit" />
//                           </Link>
//                           <Link className="me-3 confirm-text p-2 mb-0" to="#">
//                             <i
//                               data-feather="trash-2"
//                               className="feather-trash-2"
//                               onClick={confirmText}
//                             />
//                           </Link>
//                         </div>
//                       </td>
//                     </tr>
//                     <tr>
//                       <td>
//                         <label className="checkboxs">
//                           <input type="checkbox" />
//                           <span className="checkmarks" />
//                         </label>
//                       </td>
//                       <td>Entertainment</td>
//                       <td>PT007</td>
//                       <td>06 Apr 2023</td>
//                       <td>
//                         <span className="badge badge-linedanger">Inactive</span>
//                       </td>
//                       <td>$380</td>
//                       <td>Office Vehicle</td>
//                       <td className="action-table-data">
//                         <div className="edit-delete-action">
//                           <Link className="me-2 p-2 mb-0" to="#">
//                             <Eye className="action-eye" />
//                           </Link>
//                           <Link
//                             className="me-2 p-2 mb-0"
//                             data-bs-toggle="modal"
//                             data-bs-target="#edit-units"
//                           >
//                             <i data-feather="edit" className="feather-edit" />
//                           </Link>
//                           <Link className="me-3 confirm-text p-2 mb-0" to="#">
//                             <i
//                               data-feather="trash-2"
//                               className="feather-trash-2"
//                               onClick={confirmText}
//                             />
//                           </Link>
//                         </div>
//                       </td>
//                     </tr>
//                     <tr>
//                       <td>
//                         <label className="checkboxs">
//                           <input type="checkbox" />
//                           <span className="checkmarks" />
//                         </label>
//                       </td>
//                       <td>Office Expenses &amp; Postage </td>
//                       <td>PT008</td>
//                       <td>19 Apr 2023</td>
//                       <td>
//                         <span className="badge badge-linesuccess">Active</span>
//                       </td>
//                       <td>$620</td>
//                       <td>Employee Foods</td>
//                       <td className="action-table-data">
//                         <div className="edit-delete-action">
//                           <Link className="me-2 p-2 mb-0" to="#">
//                             <Eye className="action-eye" />
//                           </Link>
//                           <Link
//                             className="me-2 p-2 mb-0"
//                             data-bs-toggle="modal"
//                             data-bs-target="#edit-units"
//                           >
//                             <i data-feather="edit" className="feather-edit" />
//                           </Link>
//                           <Link className="me-3 confirm-text p-2 mb-0" to="#">
//                             <i
//                               data-feather="trash-2"
//                               className="feather-trash-2"
//                               onClick={confirmText}
//                             />
//                           </Link>
//                         </div>
//                       </td>
//                     </tr>
//                     <tr>
//                       <td>
//                         <label className="checkboxs">
//                           <input type="checkbox" />
//                           <span className="checkmarks" />
//                         </label>
//                       </td>
//                       <td>Employee Benefits</td>
//                       <td>PT009</td>
//                       <td>08 May 2023</td>
//                       <td>
//                         <span className="badge badge-linedanger">Inactive</span>
//                       </td>
//                       <td>$430</td>
//                       <td>Employee Vehicle</td>
//                       <td className="action-table-data">
//                         <div className="edit-delete-action">
//                           <Link className="me-2 p-2 mb-0" to="#">
//                             <Eye className="action-eye" />
//                           </Link>
//                           <Link
//                             className="me-2 p-2 mb-0"
//                             data-bs-toggle="modal"
//                             data-bs-target="#edit-units"
//                           >
//                             <i data-feather="edit" className="feather-edit" />
//                           </Link>
//                           <Link className="me-3 confirm-text p-2 mb-0" to="#">
//                             <i
//                               data-feather="trash-2"
//                               className="feather-trash-2"
//                               onClick={confirmText}
//                             />
//                           </Link>
//                         </div>
//                       </td>
//                     </tr>
//                     <tr>
//                       <td>
//                         <label className="checkboxs">
//                           <input type="checkbox" />
//                           <span className="checkmarks" />
//                         </label>
//                       </td>
//                       <td>Foods &amp; Snacks</td>
//                       <td>PT010</td>
//                       <td>23 May 2023</td>
//                       <td>
//                         <span className="badge badge-linesuccess">Active</span>
//                       </td>
//                       <td>$120</td>
//                       <td>Employee Foods</td>
//                       <td className="action-table-data">
//                         <div className="edit-delete-action">
//                           <Link className="me-2 p-2 mb-0" to="#">
//                             <Eye className="action-eye" />
//                           </Link>
//                           <Link
//                             className="me-2 p-2 mb-0"
//                             data-bs-toggle="modal"
//                             data-bs-target="#edit-units"
//                           >
//                             <i data-feather="edit" className="feather-edit" />
//                           </Link>
//                           <Link className="me-3 confirm-text p-2 mb-0" to="#">
//                             <i
//                               data-feather="trash-2"
//                               className="feather-trash-2"
//                               onClick={confirmText}
//                             />
//                           </Link>
//                         </div>
//                       </td>
//                     </tr>
//                     <tr>
//                       <td>
//                         <label className="checkboxs">
//                           <input type="checkbox" />
//                           <span className="checkmarks" />
//                         </label>
//                       </td>
//                       <td>Entertainment</td>
//                       <td>PT011</td>
//                       <td>24 Nov 2023</td>
//                       <td>
//                         <span className="badge badge-linedanger">Inactive</span>
//                       </td>
//                       <td>$620</td>
//                       <td>Office Vehicle</td>
//                       <td className="action-table-data">
//                         <div className="edit-delete-action">
//                           <Link className="me-2 p-2 mb-0" to="#">
//                             <Eye className="action-eye" />
//                           </Link>
//                           <Link
//                             className="me-2 p-2 mb-0"
//                             data-bs-toggle="modal"
//                             data-bs-target="#edit-units"
//                           >
//                             <i data-feather="edit" className="feather-edit" />
//                           </Link>
//                           <Link className="me-3 confirm-text p-2 mb-0" to="#">
//                             <i
//                               data-feather="trash-2"
//                               className="feather-trash-2"
//                               onClick={confirmText}
//                             />
//                           </Link>
//                         </div>
//                       </td>
//                     </tr>
//                     <tr>
//                       <td>
//                         <label className="checkboxs">
//                           <input type="checkbox" />
//                           <span className="checkmarks" />
//                         </label>
//                       </td>
//                       <td>Office Expenses &amp; Postage </td>
//                       <td>PT012</td>
//                       <td>19 Nov 2023</td>
//                       <td>
//                         <span className="badge badge-linesuccess">Active</span>
//                       </td>
//                       <td>$430</td>
//                       <td>Employee Foods</td>
//                       <td className="action-table-data">
//                         <div className="edit-delete-action">
//                           <Link className="me-2 p-2 mb-0" to="#">
//                             <Eye className="action-eye" />
//                           </Link>
//                           <Link
//                             className="me-2 p-2 mb-0"
//                             data-bs-toggle="modal"
//                             data-bs-target="#edit-units"
//                           >
//                             <i data-feather="edit" className="feather-edit" />
//                           </Link>
//                           <Link className="me-3 confirm-text p-2 mb-0" to="#">
//                             <i
//                               data-feather="trash-2"
//                               className="feather-trash-2"
//                               onClick={confirmText}
//                             />
//                           </Link>
//                         </div>
//                       </td>
//                     </tr>
//                   </tbody>
//                 </table> */
// }
