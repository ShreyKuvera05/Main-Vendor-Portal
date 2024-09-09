import React from "react";
import Table from "../../../core/pagination/datatable";
import { Link } from "react-router-dom";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { Edit, Eye, Trash2 } from "feather-icons-react/build/IconComponents";
import ImageWithBasePath from "../../../core/img/imagewithbasebath";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
const RecentTransactions = () => {
  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Reference",
      dataIndex: "reference",
      key: "reference",
    },
    {
      title: "Customer",
      dataIndex: "customer",
      key: "customer",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
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
  const dataSource = [
    {
      key: "1",
      date: "19 Jan 2023",
      reference: "INV/SL0101",
      customer: "Walk-in Customer",
      amount: "$1500.00",
    },
    {
      key: "2",
      date: "19 Jan 2023",
      reference: "INV/SL0102",
      customer: "Walk-in Customer",
      amount: "$1500.00",
    },
    {
      key: "3",
      date: "19 Jan 2023",
      reference: "INV/SL0103",
      customer: "Walk-in Customer",
      amount: "$1500.00",
    },
    {
      key: "4",
      date: "19 Jan 2023",
      reference: "INV/SL0104",
      customer: "Walk-in Customer",
      amount: "$1500.00",
    },
    {
      key: "5",
      date: "19 Jan 2023",
      reference: "INV/SL0105",
      customer: "Walk-in Customer",
      amount: "$1500.00",
    },
    {
      key: "6",
      date: "19 Jan 2023",
      reference: "INV/SL0106",
      customer: "Walk-in Customer",
      amount: "$1500.00",
    },
    {
      key: "7",
      date: "19 Jan 2023",
      reference: "INV/SL0107",
      customer: "Walk-in Customer",
      amount: "$1500.00",
    },
  ];
  const renderExcelTooltip = (props) => (
    <Tooltip id="excel-tooltip" {...props}>
      Excel
    </Tooltip>
  );
  const renderPrinterTooltip = (props) => (
    <Tooltip id="printer-tooltip" {...props}>
      Printer
    </Tooltip>
  );
  const renderTooltip = (props) => (
    <Tooltip id="pdf-tooltip" {...props}>
      Pdf
    </Tooltip>
  );
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
    <>
      <div
        className="modal fade pos-modal"
        id="recents"
        tabIndex={-1}
        aria-hidden="true"
      >
        <div
          className="modal-dialog modal-lg modal-dialog-centered"
          role="document"
        >
          <div className="modal-content">
            <div className="modal-header p-4">
              <h5 className="modal-title">Recent Transactions</h5>
              <button
                type="button"
                className="close"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="modal-body p-4">
              <div className="tabs-sets">
                <ul className="nav nav-tabs" id="myTab" role="tablist">
                  <li className="nav-item" role="presentation">
                    <button
                      className="nav-link active"
                      id="purchase-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#purchase"
                      type="button"
                      aria-controls="purchase"
                      aria-selected="true"
                      role="tab"
                    >
                      Purchase
                    </button>
                  </li>
                  <li className="nav-item" role="presentation">
                    <button
                      className="nav-link"
                      id="payment-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#payment"
                      type="button"
                      aria-controls="payment"
                      aria-selected="false"
                      role="tab"
                    >
                      Payment
                    </button>
                  </li>
                  <li className="nav-item" role="presentation">
                    <button
                      className="nav-link"
                      id="return-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#return"
                      type="button"
                      aria-controls="return"
                      aria-selected="false"
                      role="tab"
                    >
                      Return
                    </button>
                  </li>
                </ul>
                <div className="tab-content">
                  <div
                    className="tab-pane fade show active"
                    id="purchase"
                    role="tabpanel"
                    aria-labelledby="purchase-tab"
                  >
                    <div className="table-top">
                      <div className="search-set">
                        <div className="search-input">
                          <input
                            type="text"
                            placeholder="Search"
                            className="form-control form-control-sm formsearch"
                          />
                          <Link to className="btn btn-searchset">
                            <i
                              data-feather="search"
                              className="feather-search"
                            />
                          </Link>
                        </div>
                      </div>
                      <div className="wordset">
                        <ul>
                          <li>
                            <OverlayTrigger
                              placement="top"
                              overlay={renderTooltip}
                            >
                              <Link>
                                <ImageWithBasePath
                                  src="assets/img/icons/pdf.svg"
                                  alt="img"
                                />
                              </Link>
                            </OverlayTrigger>
                          </li>
                          <li>
                            <OverlayTrigger
                              placement="top"
                              overlay={renderExcelTooltip}
                            >
                              <Link
                                data-bs-toggle="tooltip"
                                data-bs-placement="top"
                              >
                                <ImageWithBasePath
                                  src="assets/img/icons/excel.svg"
                                  alt="img"
                                />
                              </Link>
                            </OverlayTrigger>
                          </li>
                          <li>
                            <OverlayTrigger
                              placement="top"
                              overlay={renderPrinterTooltip}
                            >
                              <Link
                                data-bs-toggle="tooltip"
                                data-bs-placement="top"
                              >
                                <i
                                  data-feather="printer"
                                  className="feather-printer"
                                />
                              </Link>
                            </OverlayTrigger>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="table-responsive">
                      <Table
                        dataSource={dataSource}
                        columns={columns}
                        className="table datanew"
                      />
                    </div>
                  </div>
                  <div className="tab-pane fade" id="payment" role="tabpanel">
                    <div className="table-top">
                      <div className="search-set">
                        <div className="search-input">
                          <input
                            type="text"
                            placeholder="Search"
                            className="form-control form-control-sm formsearch"
                          />
                          <Link to className="btn btn-searchset">
                            <i
                              data-feather="search"
                              className="feather-search"
                            />
                          </Link>
                        </div>
                      </div>
                      <div className="wordset">
                        <ul>
                          <li>
                            <OverlayTrigger
                              placement="top"
                              overlay={renderTooltip}
                            >
                              <Link>
                                <ImageWithBasePath
                                  src="assets/img/icons/pdf.svg"
                                  alt="img"
                                />
                              </Link>
                            </OverlayTrigger>
                          </li>
                          <li>
                            <OverlayTrigger
                              placement="top"
                              overlay={renderExcelTooltip}
                            >
                              <Link
                                data-bs-toggle="tooltip"
                                data-bs-placement="top"
                              >
                                <ImageWithBasePath
                                  src="assets/img/icons/excel.svg"
                                  alt="img"
                                />
                              </Link>
                            </OverlayTrigger>
                          </li>
                          <li>
                            <OverlayTrigger
                              placement="top"
                              overlay={renderPrinterTooltip}
                            >
                              <Link
                                data-bs-toggle="tooltip"
                                data-bs-placement="top"
                              >
                                <i
                                  data-feather="printer"
                                  className="feather-printer"
                                />
                              </Link>
                            </OverlayTrigger>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="table-responsive">
                      <Table
                        dataSource={dataSource}
                        columns={columns}
                        className="table datanew"
                      />
                    </div>
                  </div>
                  <div className="tab-pane fade" id="return" role="tabpanel">
                    <div className="table-top">
                      <div className="search-set">
                        <div className="search-input">
                          <input
                            type="text"
                            placeholder="Search"
                            className="form-control form-control-sm formsearch"
                          />
                          <Link to className="btn btn-searchset">
                            <i
                              data-feather="search"
                              className="feather-search"
                            />
                          </Link>
                        </div>
                      </div>
                      <div className="wordset">
                        <ul>
                          <li>
                            <OverlayTrigger
                              placement="top"
                              overlay={renderTooltip}
                            >
                              <Link>
                                <ImageWithBasePath
                                  src="assets/img/icons/pdf.svg"
                                  alt="img"
                                />
                              </Link>
                            </OverlayTrigger>
                          </li>
                          <li>
                            <OverlayTrigger
                              placement="top"
                              overlay={renderExcelTooltip}
                            >
                              <Link
                                data-bs-toggle="tooltip"
                                data-bs-placement="top"
                              >
                                <ImageWithBasePath
                                  src="assets/img/icons/excel.svg"
                                  alt="img"
                                />
                              </Link>
                            </OverlayTrigger>
                          </li>
                          <li>
                            <OverlayTrigger
                              placement="top"
                              overlay={renderPrinterTooltip}
                            >
                              <Link
                                data-bs-toggle="tooltip"
                                data-bs-placement="top"
                              >
                                <i
                                  data-feather="printer"
                                  className="feather-printer"
                                />
                              </Link>
                            </OverlayTrigger>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="table-responsive">
                      <Table
                        dataSource={dataSource}
                        columns={columns}
                        className="table datanew"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RecentTransactions;
