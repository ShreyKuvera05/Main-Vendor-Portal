/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ImageWithBasePath from "../../../core/img/imagewithbasebath";
import Table from "../../../core/pagination/datatable";

const PrintReceipt = ({ receiptData }) => {
  const [itemDetails, setItemDetails] = useState([]);
  const [allDetails, setAllDetails] = useState({});

  useEffect(() => {
    if (receiptData && Object.keys(receiptData).length > 0) {
      setItemDetails(receiptData.itemDetails);
      setAllDetails(receiptData.allDetails);
    }
  }, [receiptData]);
  const dataSource = [
    {
      key: "1",
      item: "Red Nike Laser",
      price: "$50",
      quantity: "3",
      total: "$150",
    },
    {
      key: "2",
      item: "Iphone 14",
      price: "$50",
      quantity: "2",
      total: "$100",
    },
    {
      key: "3",
      item: "Apple Series 8",
      price: "$50",
      quantity: "3",
      total: "$150",
    },
  ];

  const columns = [
    {
      title: "# Item",
      dataIndex: "item",
      key: "item",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Qty",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Total",
      dataIndex: "total",
      key: "total",
      align: "right",
    },
  ];
  return (
    <div
      className="modal fade modal-default"
      id="print-receipt"
      aria-labelledby="print-receipt"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="d-flex justify-content-end">
            <button
              type="button"
              className="close p-0"
              data-bs-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">×</span>
            </button>
          </div>
          <div className="modal-body">
            <div className="icon-head text-center">
              <Link to="#">
                <ImageWithBasePath
                  src="assets/img/logo.png"
                  width={100}
                  height={30}
                  alt="Receipt Logo"
                />
              </Link>
            </div>
            <div className="text-center info text-center">
              <h6>Dreamguys Technologies Pvt Ltd.,</h6>
              <p className="mb-0">Phone Number: +1 5656665656</p>
              <p className="mb-0">
                Email:{" "}
                <Link to="mailto:example@gmail.com">example@gmail.com</Link>
              </p>
            </div>
            <div className="tax-invoice">
              <h6 className="text-center">Tax Invoice</h6>
              <div className="row">
                <div className="col-sm-12 col-md-6">
                  <div className="invoice-user-name">
                    <span>Name: </span>
                    <span>John Doe</span>
                  </div>
                  <div className="invoice-user-name">
                    <span>Invoice No: </span>
                    <span>CS132453</span>
                  </div>
                </div>
                <div className="col-sm-12 col-md-6">
                  <div className="invoice-user-name">
                    <span>Customer Id: </span>
                    <span>#LL93784</span>
                  </div>
                  <div className="invoice-user-name">
                    <span>Date: </span>
                    <span>01.07.2022</span>
                  </div>
                </div>
              </div>
            </div>

            {/* <Table
              dataSource={dataSource}
              columns={columns}
              pagination={false}
            /> */}
            <table className="table-borderless w-100 table-fit">
              <thead>
                <tr>
                  <th> Item</th>
                  <th>Price</th>
                  <th>Qty</th>
                  <th className="text-end">Total</th>
                </tr>
              </thead>
              <tbody>
                {itemDetails.map((item, index) => {
                  const price = parseFloat(
                    item.price.replace("$", "").replace(",", "")
                  );
                  const quantity = parseInt(item.quantity);

                  const total = price * quantity;

                  return (
                    <tr key={index}>
                      <td>
                        {index + 1}. {item.item}
                      </td>

                      <td>{item.price}</td>
                      <td>{item.quantity}</td>
                      <td className="text-end">${total.toFixed(2)}</td>
                    </tr>
                  );
                })}
                <tr>
                  <td colSpan={4}>
                    <table className="table-borderless w-100 table-fit">
                      <tbody>
                        <tr>
                          <td>Sub Total :</td>
                          <td className="text-end">{allDetails.subTotal}</td>
                        </tr>
                        <tr>
                          <td>Discount :</td>
                          <td className="text-end">-{allDetails.discount}</td>
                        </tr>
                        <tr>
                          <td>Shipping :</td>
                          <td className="text-end">{allDetails.shipping}</td>
                        </tr>
                        <tr>
                          <td>Tax (5%) :</td>
                          <td className="text-end">{allDetails.tax}</td>
                        </tr>
                        <tr>
                          <td>Total Bill :</td>
                          <td className="text-end">{allDetails.total}</td>
                        </tr>
                        <tr>
                          <td>Due :</td>
                          <td className="text-end">$0.00</td>
                        </tr>
                        <tr>
                          <td>Total Payable :</td>
                          <td className="text-end">{allDetails.total}</td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="text-center invoice-bar">
              <p>
                **VAT against this challan is payable through central
                registration. Thank you for your business!
              </p>
              <Link to="#">
                <ImageWithBasePath
                  src="assets/img/barcode/barcode-03.jpg"
                  alt="Barcode"
                />
              </Link>
              <p>Sale 31</p>
              <p>Thank You For Shopping With Us. Please Come Again</p>
              <Link to="#" className="btn btn-primary">
                Print Receipt
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default PrintReceipt;
