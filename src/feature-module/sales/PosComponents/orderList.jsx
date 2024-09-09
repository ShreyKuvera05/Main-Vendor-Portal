/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import ImageWithBasePath from "../../../core/img/imagewithbasebath";
import { Link } from "react-router-dom";
import { MoreVertical, Trash2, UserPlus, Edit } from "react-feather";
import PlusCircle from "feather-icons-react/build/IconComponents/PlusCircle";
import MinusCircle from "feather-icons-react/build/IconComponents/MinusCircle";
import Select from "react-select";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

const OrderList = ({
  cartItems,
  removeFromCart,
  calculatePaymentData,
  removeAllFromcart,
}) => {
  const [quantities, setQuantities] = useState({});
  const [subtotal, setSubtotal] = useState(0);
  const [tax, setTax] = useState(0);
  const [shippingPrice, setShippingPrice] = useState(0);
  const [discountPrice, setDiscountPrice] = useState(0);
  const [total, setTotal] = useState(0);
  // ================================INCREMENT AND DECREMENT============================
  const increaseQuantity = (Pid) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [Pid]: (prevQuantities[Pid] || 1) + 1,
    }));
  };

  const decreaseQuantity = (Pid) => {
    if (quantities[Pid] > 1) {
      setQuantities((prevQuantities) => ({
        ...prevQuantities,
        [Pid]: prevQuantities[Pid] - 1,
      }));
    }
  };

  const customers = [
    { value: "walkInCustomer", label: "Walk in Customer" },
    { value: "john", label: "John" },
    { value: "smith", label: "Smith" },
    { value: "ana", label: "Ana" },
    { value: "elza", label: "Elza" },
  ];
  const products = [
    { value: "walkInCustomer", label: "Walk in Customer" },
    { value: "john", label: "John" },
    { value: "smith", label: "Smith" },
    { value: "ana", label: "Ana" },
    { value: "elza", label: "Elza" },
  ];

  // ======================Order Total Calculation================================

  // useEffect(() => {
  //   // Calculate subtotal
  //   const subtotalValue = cartItems.reduce((acc, item) => acc + item.price, 0);
  //   setSubtotal(subtotalValue);

  //   const taxValue = subtotalValue * 0.05; // 5% tax
  //   const shippingValue = 25; // Fixed shipping cost
  //   const discountValue = subtotalValue * 0.1; // 10% discount
  //   const totalValue = subtotalValue + taxValue + shippingValue - discountValue;

  //   setTax(taxValue);
  //   setShippingPrice(shippingValue);
  //   setDiscountPrice(discountValue);
  //   setTotal(totalValue);
  // }, [cartItems]);

  useEffect(() => {
    // Initialize total values
    let subtotalValue = 0;
    let taxValue = 0;
    let shippingValue = 0;
    let discountValue = 0;

    // Calculate total values based on quantities
    cartItems.forEach((item) => {
      const itemQuantity = quantities[item.Pid] || 1;
      subtotalValue += item.price * itemQuantity;
    });

    taxValue = subtotalValue * 0.05; // 5% tax
    shippingValue = 25; // Fixed shipping cost
    discountValue = subtotalValue * 0.1; // 10% discount

    const totalValue = subtotalValue + taxValue + shippingValue - discountValue;

    // Update state with calculated values
    setSubtotal(subtotalValue);
    setTax(taxValue);
    setShippingPrice(shippingValue);
    setDiscountPrice(discountValue);
    setTotal(totalValue);
  }, [cartItems, quantities]);
  // const handlePayment = () => {
  //   let paymentData = [];

  //   cartItems.forEach((item) => {
  //     const itemQuantity = quantities[item.Pid] || 1;
  //     const subtotalValue = item.price * itemQuantity;
  //     const taxValue = subtotalValue * 0.05; // 5% tax
  //     const shippingValue = 25; // Fixed shipping cost
  //     const discountValue = subtotalValue * 0.1; // 10% discount
  //     const totalValue =
  //       subtotalValue + taxValue + shippingValue - discountValue;

  //     const itemPaymentData = {
  //       Pid: item.Pid,
  //       item: item.name,
  //       image: item.image,
  //       price: `$${item.price}`,
  //       quantity: itemQuantity,
  //       total: `$${total.toFixed(2)}`,
  //       subTotal: `$${subtotal.toFixed(2)}`,
  //       discount: `$${discountPrice.toFixed(2)}`,
  //       tax: `$${tax.toFixed(2)}`,
  //       shipping: `$${shippingPrice.toFixed(2)}`,
  //     };

  //     paymentData.push(itemPaymentData);
  //   });

  //   calculatePaymentData(paymentData);
  // };
  const handlePayment = () => {
    let paymentData = {
      allDetails: {
        total: 0,
        subTotal: 0,
        discount: 0,
        tax: 0,
        shipping: 0,
      },
      itemDetails: [],
    };

    cartItems.forEach((item) => {
      const itemQuantity = quantities[item.Pid] || 1;
      const subtotalValue = item.price * itemQuantity;
      const taxValue                                                                                                                                                                                                                                                                              = subtotalValue * 0.05; // 5% tax
      const shippingValue = 25; // Fixed shipping cost
      const discountValue = subtotalValue * 0.1; // 10% discount
      const totalValue =
        subtotalValue + taxValue + shippingValue - discountValue;

      const itemPaymentData = {
        Pid: item.Pid,
        item: item.name,
        image: item.image,
        price: `$${item.price}`,
        quantity: itemQuantity,
      };

      paymentData.itemDetails.push(itemPaymentData);

      // Update allDetails
      paymentData.allDetails.total += totalValue;
      paymentData.allDetails.subTotal += subtotalValue;
      paymentData.allDetails.discount += discountValue;
      paymentData.allDetails.tax += taxValue;
      paymentData.allDetails.shipping += shippingValue;
    });

    // Format totals
    Object.keys(paymentData.allDetails).forEach((key) => {
      paymentData.allDetails[key] = `$${paymentData.allDetails[key].toFixed(
        2
      )}`;
    });

    calculatePaymentData(paymentData);
    // console.log(JSON.stringify(paymentData));
  };

  return (
    <>
      <div className="col-md-12 col-lg-4 ps-0">
        <aside className="product-order-list">
          <div className="head d-flex align-items-center justify-content-between w-100">
            <div className="">
              <h5>Order List</h5>
              <span>Transaction ID : #65565</span>
            </div>
            <div className="">
              <Link className="confirm-text" to="#">
                <Trash2 className="feather-16 text-danger me-1" />
              </Link>
              <Link to="#" className="text-default">
                <MoreVertical className="feather-16" />
              </Link>
            </div>
          </div>
          <div className="customer-info block-section">
            <h6>Customer Information</h6>
            <div className="input-block d-flex align-items-center">
              <div className="flex-grow-1">
                <Select
                  options={customers}
                  className="select"
                  placeholder="Select an option"
                />
              </div>
              <Link
                to="#"
                className="btn btn-primary btn-icon"
                data-bs-toggle="modal"
                data-bs-target="#create"
              >
                <UserPlus className="feather-16" />
              </Link>
            </div>
            <div className="input-block">
              <Select
                options={products}
                className="select"
                placeholder="Select an option"
              />
            </div>
          </div>
          <div className="product-added block-section">
            <div className="head-text d-flex align-items-center justify-content-between">
              <h6 className="d-flex align-items-center mb-0">
                Product Added<span className="count">{cartItems.length}</span>
              </h6>
              <Link
                to="#"
                className="d-flex align-items-center text-danger"
                onClick={removeAllFromcart}
              >
                <span className="me-1">
                  <i data-feather="x" className="feather-16" />
                </span>
                Clear all
              </Link>
            </div>
            <div className="product-wrap">
              {cartItems.map((item, index) => (
                <div
                  className="product-list d-flex align-items-center justify-content-between"
                  key={index}
                >
                  <div
                    className="d-flex align-items-center product-info"
                    data-bs-toggle="modal"
                    data-bs-target="#products"
                  >
                    <Link to="#" className="img-bg">
                      <ImageWithBasePath src={item.image} alt="Products" />
                    </Link>
                    <div className="info">
                      <span>{item.category}</span>
                      <h6>
                        <Link to="#">{item.name}</Link>
                      </h6>
                      <p>${item.price}</p>
                    </div>
                  </div>
                  {/* <div className="qty-item text-center">
                      <OverlayTrigger
                        placement="top"
                        overlay={<Tooltip id="tooltip-minus">Minus</Tooltip>}
                      >
                        <Link
                          to="#"
                          className="dec d-flex justify-content-center align-items-center"
                          onClick={decreaseQuantity}
                        >
                          <MinusCircle className="feather-14" />
                        </Link>
                      </OverlayTrigger>
                      <input
                        type="text"
                        className="form-control text-center"
                        name="qty"
                        readOnly
                        value={quantity}
                      />
                      <OverlayTrigger
                        placement="top"
                        overlay={<Tooltip id="tooltip-plus">Plus</Tooltip>}
                      >
                        <Link
                          to="#"
                          className="inc d-flex justify-content-center align-items-center"
                          onClick={increaseQuantity}
                        >
                          <PlusCircle className="feather-14" />
                        </Link>
                      </OverlayTrigger>
                    </div> */}
                  <div className="qty-item text-center">
                    <OverlayTrigger
                      placement="top"
                      overlay={
                        <Tooltip id={`tooltip-minus-${index}`}>Minus</Tooltip>
                      }
                    >
                      <Link
                        to="#"
                        className="dec d-flex justify-content-center align-items-center"
                        onClick={() => decreaseQuantity(item.Pid)}
                      >
                        <MinusCircle className="feather-14" />
                      </Link>
                    </OverlayTrigger>
                    <input
                      type="text"
                      className="form-control text-center"
                      name="qty"
                      readOnly
                      value={quantities[item.Pid] || 1}
                    />
                    <OverlayTrigger
                      placement="top"
                      overlay={
                        <Tooltip id={`tooltip-plus-${index}`}>Plus</Tooltip>
                      }
                    >
                      <Link
                        to="#"
                        className="inc d-flex justify-content-center align-items-center"
                        onClick={() => increaseQuantity(item.Pid)}
                      >
                        <PlusCircle className="feather-14" />
                      </Link>
                    </OverlayTrigger>
                  </div>
                  <div className="d-flex align-items-center action">
                    <Link
                      className="btn-icon edit-icon me-2"
                      to="#"
                      data-bs-toggle="modal"
                      data-bs-target="#edit-product"
                    >
                      <Edit className="feather-14" />
                    </Link>
                    <Link
                      className="btn-icon delete-icon confirm-text"
                      to="#"
                      onClick={() => removeFromCart(item.Pid)}
                    >
                      <Trash2 className="feather-14" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="block-section">
            {/* <div className="selling-info">
              <div className="row">
                <div className="col-12 col-sm-4">
                  <div className="input-block">
                    <label>Order Tax</label>
                    <Select
                      className="select"
                      options={gst}
                      placeholder="GST 5%"
                    />
                  </div>
                </div>
                <div className="col-12 col-sm-4">
                  <div className="input-block">
                    <label>Shipping</label>
                    <Select
                      className="select"
                      options={shipping}
                      placeholder="15"
                    />
                  </div>
                </div>
                <div className="col-12 col-sm-4">
                  <div className="input-block">
                    <label>Discount</label>
                    <Select
                      className="select"
                      options={discount}
                      placeholder="10%"
                    />
                  </div>
                </div>
              </div>
            </div> */}
            <div className="order-total">
              <table className="table table-responsive table-borderless">
                <tbody>
                  <tr>
                    <td>Sub Total</td>
                    <td className="text-end">${subtotal.toFixed(2)}</td>
                  </tr>
                  <tr>
                    <td>Tax (GST 5%)</td>
                    <td className="text-end">${tax.toFixed(2)}</td>
                  </tr>
                  <tr>
                    <td>Shipping</td>
                    <td className="text-end">${shippingPrice.toFixed(2)}</td>
                  </tr>
                  <tr>
                    <td>Sub Total</td>
                    <td className="text-end">${subtotal.toFixed(2)}</td>
                  </tr>
                  <tr>
                    <td className="danger">Discount (10%)</td>
                    <td className="danger text-end">
                      ${discountPrice.toFixed(2)}
                    </td>
                  </tr>
                  <tr>
                    <td>Total</td>
                    <td className="text-end">${total.toFixed(2)}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="block-section payment-method">
            <h6>Payment Method</h6>
            <div className="row d-flex align-items-center justify-content-center methods">
              <div className="col-md-6 col-lg-4 item">
                <div className="default-cover">
                  <Link to="#">
                    <ImageWithBasePath
                      src="assets/img/icons/cash-pay.svg"
                      alt="Payment Method"
                    />
                    <span>Cash</span>
                  </Link>
                </div>
              </div>
              <div className="col-md-6 col-lg-4 item">
                <div className="default-cover">
                  <Link to="#">
                    <ImageWithBasePath
                      src="assets/img/icons/credit-card.svg"
                      alt="Payment Method"
                    />
                    <span>Debit Card</span>
                  </Link>
                </div>
              </div>
              <div className="col-md-6 col-lg-4 item">
                <div className="default-cover">
                  <Link to="#">
                    <ImageWithBasePath
                      src="assets/img/icons/qr-scan.svg"
                      alt="Payment Method"
                    />
                    <span>Scan</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="d-grid btn-block">
            <Link className="btn btn-secondary" to="#">
              Grand Total : ${total.toFixed(2)}
            </Link>
          </div>
          <div className="btn-row d-sm-flex align-items-center justify-content-between">
            <Link
              to="#"
              className="btn btn-info btn-icon flex-fill"
              data-bs-toggle="modal"
              data-bs-target="#hold-order"
            >
              <span className="me-1 d-flex align-items-center">
                <i data-feather="pause" className="feather-16" />
              </span>
              Hold
            </Link>
            <Link to="#" className="btn btn-danger btn-icon flex-fill">
              <span className="me-1 d-flex align-items-center">
                <i data-feather="trash-2" className="feather-16" />
              </span>
              Void
            </Link>
            <Link
              to="#"
              className="btn btn-success btn-icon flex-fill"
              data-bs-toggle="modal"
              data-bs-target="#payment-completed"
              onClick={handlePayment}
            >
              <span className="me-1 d-flex align-items-center">
                <i data-feather="credit-card" className="feather-16" />
              </span>
              Payment
            </Link>
          </div>
        </aside>
      </div>
    </>
  );
};

export default OrderList;
