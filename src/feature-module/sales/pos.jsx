import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  RefreshCcw,
  RotateCw,
  ShoppingCart,
} from "feather-icons-react/build/IconComponents";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import toast from "react-hot-toast";
import Categories from "./PosComponents/categories";
import Products from "./PosComponents/products";
import OrderList from "./PosComponents/orderList";
import RecentTransactions from "./PosComponents/RecentTransactions";
import Orders from "./PosComponents/Orders";
import PrintReceipt from "./PosComponents/printReceipt";
import PaymentCompleted from "./PosComponents/paymentCompleted";
import ProductModal from "./PosComponents/productModal";
import CreateUser from "./PosComponents/createUser";
import Hold from "./PosComponents/Hold";
import EditProduct from "./PosComponents/EditProduct";

const Pos = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [receiptData, setReceiptData] = useState([]);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const add2Cart = (product) => {
    const isDuplicate = cartItems.some((item) => item.name === product.name);

    if (isDuplicate) {
      toast.error("This product is already in the cart.");
    } else {
      // toast.success("Product Added to cart");
      setCartItems([...cartItems, product]);
    }
  };

  const removeFromCart = (productId) => {
    const updatedCartItems = cartItems.filter((item) => item.Pid !== productId);
    setCartItems(updatedCartItems);
  };
  const removeAllFromcart = () => {
    setCartItems([]);
  };

  const calculatePaymentData = (data) => {
    setReceiptData(data);
  };

  return (
    <div>
      <div className="page-wrapper pos-pg-wrapper ms-0">
        <div className="content pos-design p-0">
          <div className="btn-row d-sm-flex align-items-center">
            <Link
              to="#"
              className="btn btn-secondary mb-xs-3"
              data-bs-toggle="modal"
              data-bs-target="#orders"
            >
              <span className="me-1 d-flex align-items-center">
                <ShoppingCart className="feather-16" />
              </span>
              View Orders
            </Link>
            <Link to="#" className="btn btn-info">
              <span className="me-1 d-flex align-items-center">
                <RotateCw className="feather-16" />
              </span>
              Reset
            </Link>
            <Link
              to="#"
              className="btn btn-primary"
              data-bs-toggle="modal"
              data-bs-target="#recents"
            >
              <span className="me-1 d-flex align-items-center">
                <RefreshCcw className="feather-16" />
              </span>
              Transaction
            </Link>
          </div>
          <div className="row align-items-start pos-wrapper">
            <div className="col-md-12 col-lg-8">
              <div className="pos-categories tabs_wrapper">
                <h5>Categories</h5>
                <p>Select From Below Categories</p>
                <Categories onCategoryClick={handleCategoryClick} />
                <div className="pos-products">
                  <div className="d-flex align-items-center justify-content-between">
                    <h5 className="mb-3">Products</h5>
                  </div>
                  <div className="tabs_container">
                    <div className="tab_content active" data-tab="all">
                      <Products
                        selectedCategory={selectedCategory}
                        add2Cart={add2Cart}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <OrderList
              cartItems={cartItems}
              removeFromCart={removeFromCart}
              calculatePaymentData={calculatePaymentData}
              removeAllFromcart={removeAllFromcart}
            />
          </div>
        </div>
      </div>
      <PaymentCompleted />
      <PrintReceipt receiptData={receiptData} />
      <ProductModal />
      <CreateUser />
      <Hold />
      <EditProduct />
      <RecentTransactions />
      <Orders />
    </div>
  );
};

export default Pos;
