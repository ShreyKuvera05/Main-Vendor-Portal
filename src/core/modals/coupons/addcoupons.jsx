/* eslint-disable react/prop-types */
import { DatePicker } from "antd";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ResCheckBox from "../../../common/Resuable/ResCheckbox";
import ResSelect from "../../../common/Resuable/ResSelect";
const AddCoupons = ({ loadData }) => {
  const [formData, setFormData] = useState({});
  const [values, setValues] = useState({});
  const [selectedProduct, setSelectedProduct] = React.useState({
    Type: null,
    Product: null,
  });
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedDate1, setSelectedDate1] = useState(new Date());

  useEffect(() => {
    if (loadData && Object.keys(loadData).length > 0) {
      setFormData(loadData);
      let type = {
        value: loadData.type,
        label: loadData.typeName,
      };
      let product = {
        value: loadData.product,
        label: loadData.productName,
      };

      setSelectedProduct({
        Type: type,
        Product: product,
      });
      setValues({
        OncePerCustomer: loadData.OncePerCustomer,
        Status: loadData.status,
      });
    }
  }, [loadData]);

  // =====================SELECTPTIONSSSSS========================
  const price = [
    { value: 1, label: "Choose Type" },
    { value: 2, label: "Fixed" },
    { value: 3, label: "Percentage" },
  ];
  const list = [
    { value: 1, label: "Choose" },
    { value: 2, label: "Nike Jordan" },
    { value: 3, label: "Amazon Echo Dot" },
  ];
  // =====================SELECTPTIONSSSSS========================

  // ===========================================HANDLERS===============================
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
  const handleDateChange1 = (date) => {
    setSelectedDate1(date);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };
  const handleValueChange = (id, newValue) => {
    setValues((prevValues) => ({
      ...prevValues,
      [id]: newValue,
    }));
  };
  const handleSelectChange = (
    selectedOption,
    selectName,
    setSelectedProduct
  ) => {
    if (selectName === "Type") {
      if (selectedOption !== null) {
        let type = selectedOption;
        setFormData({
          ...formData,
          type: type.value,
          typeName: type.label,
        });
      }
    }
    if (selectName === "Product") {
      if (selectedOption !== null) {
        let product = selectedOption;
        setFormData({
          ...formData,
          product: product.value,
          productName: product.label,
        });
      }
    }
    setSelectedProduct((prevSelectedValues) => ({
      ...prevSelectedValues,
      [selectName]: selectedOption,
    }));
  };

  // =================================f==========HANDLERS===============================
  const handleSubmit = (e) => {
    e.preventDefault();
    let submitData = {
      ...formData,
      OncePerCustomer: parseInt(values.OncePerCustomer || 0),
      Status: parseInt(values.Status || 0),
    };
    console.log(JSON.stringify(submitData));
  };
  return (
    <div>
      {/* Add coupons */}
      <div className="modal fade" id="add-units">
        <div className="modal-dialog modal-dialog-centered custom-modal-two">
          <div className="modal-content">
            <div className="page-wrapper-new p-0">
              <div className="content">
                <div className="modal-header border-0 custom-modal-header">
                  <div className="page-title">
                    <h4>Add Coupons</h4>
                  </div>
                  <button
                    type="button"
                    className="close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  >
                    <span aria-hidden="true">×</span>
                  </button>
                </div>
                <div className="modal-body custom-modal-body">
                  <form>
                    <div className="row">
                      <div className="col-lg-6">
                        <div className="mb-3">
                          <label className="form-label">Name</label>
                          <input
                            type="text"
                            className="form-control"
                            value={formData.name}
                            name="name"
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="mb-3">
                          <label className="form-label">Code</label>
                          <input
                            type="text"
                            className="form-control"
                            value={formData.code}
                            name="code"
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="mb-3">
                          <label className="form-label">Type</label>
                          <ResSelect
                            options={price}
                            value={selectedProduct.Type}
                            onChange={(selectedOption) =>
                              handleSelectChange(
                                selectedOption,
                                "Type",
                                setSelectedProduct
                              )
                            }
                            id="select21"
                            isMulti={false}
                            placeholder="Type"
                          />
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="mb-3">
                          <label className="form-label">Discount</label>
                          <input
                            type="text"
                            className="form-control"
                            value={formData.discount}
                            name="discount"
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                      <div className="col-lg-12">
                        <div className="mb-3">
                          <label className="form-label"> Limit</label>
                          <input
                            type="text"
                            className="form-control"
                            value={formData.limit}
                            name="limit"
                            onChange={handleInputChange}
                          />
                          <span className="unlimited-text">
                            0 for Unlimited
                          </span>
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="input-blocks">
                          <label>Start Date</label>
                          <div className="input-groupicon calender-input">
                            <DatePicker
                              selected={selectedDate}
                              onChange={handleDateChange}
                              type="date"
                              className="filterdatepicker"
                              dateFormat="dd-MM-yyyy"
                              placeholder="20-2-2024"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="input-blocks">
                          <label>End Date</label>
                          <div className="input-groupicon calender-input">
                            <DatePicker
                              selected={selectedDate1}
                              onChange={handleDateChange1}
                              type="date"
                              className="filterdatepicker"
                              dateFormat="dd-MM-yyyy"
                              placeholder="20-2-2024"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="input-blocks">
                        <ResCheckBox
                          showLabel="Yes"
                          labelName="Once Per Customer"
                          headName="All Products"
                          id="OncePerCustomer"
                          initialValue={values.OncePerCustomer}
                          onValueChange={handleValueChange}
                        />
                        <ResSelect
                          options={list}
                          value={selectedProduct.Product}
                          onChange={(selectedOption) =>
                            handleSelectChange(
                              selectedOption,
                              "Product",
                              setSelectedProduct
                            )
                          }
                          id="select21"
                          isMulti={false}
                          placeholder="Product"
                        />
                      </div>
                      <div className="input-blocks m-0">
                        <ResCheckBox
                          headName="Status"
                          showLabel="no"
                          id="Status"
                          initialValue={values.Status}
                          onValueChange={handleValueChange}
                        />
                      </div>
                    </div>
                    <div className="modal-footer-btn">
                      <button
                        type="button"
                        className="btn btn-cancel me-2"
                        data-bs-dismiss="modal"
                      >
                        Cancel
                      </button>
                      <Link
                        to="#"
                        className="btn btn-submit"
                        onClick={handleSubmit}
                      >
                        Create Coupon
                      </Link>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* /Add Coupons */}
    </div>
  );
};

export default AddCoupons;
