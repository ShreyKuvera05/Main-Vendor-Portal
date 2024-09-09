/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ResSelect from "../../common/Resuable/ResSelect";
import { DatePicker } from "antd";
import { all_routes } from "../../Router/all_routes";
import moment from "moment";
import ResCheckBox from "../../common/Resuable/ResCheckbox";
import { label } from "yet-another-react-lightbox";
const AddExpense = ({ loadData }) => {
  const route = all_routes;
  const [selectedDate, setSelectedDate] = useState(null);
  const [values, setValues] = useState({});
  const [selectedDateTwo, setSelectedDateTwo] = useState(null);
  const [selectedDateModal, setSelectedDateModal] = useState(null);
  const [formData, setFormData] = useState({});
  const [selectedProduct, setSelectedProduct] = React.useState({
    Category: null,
  });
  useEffect(() => {
    if (loadData && Object.keys(loadData).length > 0) {
      setFormData(loadData);
      let category = {
        value: loadData.category,
        label: loadData.categoryName,
      };
      setSelectedProduct({
        Category: category,
      });
      setValues({
        Status: loadData.status,
      });
    }
  }, [loadData]);

  const optionsModalOne = [
    { value: 1, label: "Choose" },
    { value: 2, label: "Foods & Snacks" },
    { value: 3, label: "Employee Benefits" },
  ];
  //   ============================================Handlers=========================================
  const handleDateChange = (date) => {
    setSelectedDate(date);
    let formattedDate = moment(date).format("DD/MM/YYYY");
    console.log("formattedDate: ", formattedDate);
    setFormData({
      ...formData,
      startDate: formattedDate,
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSelectChange = (
    selectedOption,
    selectName,
    setSelectedProduct
  ) => {
    if (selectName === "Category") {
      if (selectedOption !== null) {
        let category = selectedOption;
        setFormData({
          ...formData,
          category: category.value,
          categoryName: category.label,
        });
      }
    }
    setSelectedProduct((prevSelectedValues) => ({
      ...prevSelectedValues,
      [selectName]: selectedOption,
    }));
  };
  const handleValueChange = (id, newValue) => {
    setValues((prevValues) => ({
      ...prevValues,
      [id]: newValue,
    }));
  };
  //   ============================================Handlers=========================================
  const handleSubmit = (e) => {
    e.preventDefault();
    let submitData = {
      ...formData,
      status: parseInt(values.Status) || 0,
    };
    console.log("submitData: ", JSON.stringify(submitData));
  };

  return (
    <div className="modal fade" id="add-units">
      <div className="modal-dialog modal-dialog-centered custom-modal-two">
        <div className="modal-content">
          <div className="page-wrapper-new p-0">
            <div className="content">
              <div className="modal-header border-0 custom-modal-header">
                <div className="page-title">
                  <h4>Add Expense</h4>
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
                <div className="row">
                  <div className="col-lg-6">
                    <div className="mb-3">
                      <label className="form-label">Expense Category</label>

                      <ResSelect
                        options={optionsModalOne}
                        value={selectedProduct.Category}
                        onChange={(selectedOption) =>
                          handleSelectChange(
                            selectedOption,
                            "Category",
                            setSelectedProduct
                          )
                        }
                        id="select21"
                        isMulti={false}
                        placeholder="Category"
                      />
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
                    <div className="mb-3">
                      <label className="form-label">Amount</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="$"
                        onChange={handleInputChange}
                        name="amount"
                        value={formData.amount}
                      />
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="mb-3">
                      <label className="form-label">Reference</label>
                      <input
                        type="text"
                        className="form-control"
                        onChange={handleInputChange}
                        name="reference"
                        value={formData.reference}
                      />
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="mb-3">
                      <label className="form-label">Expense For</label>
                      <input
                        type="text"
                        className="form-control"
                        onChange={handleInputChange}
                        name="expenseFor"
                        value={formData.expenseFor}
                      />
                      <span className="unlimited-text">0 for Unlimited</span>
                    </div>
                  </div>
                  {/* Editor */}
                  <div className="col-md-12">
                    <div className="edit-add card">
                      <div className="edit-add">
                        <label className="form-label">Description</label>
                      </div>
                      <div className="card-body-list input-blocks mb-0">
                        <textarea
                          className="form-control"
                          onChange={handleInputChange}
                          name="description"
                          value={formData.description}
                        />
                      </div>
                      <p>Maximum 600 Characters</p>
                    </div>
                    <div className="input-blocks">
                      <ResCheckBox
                        labelName="Status"
                        showLabel="NO"
                        headName="Status"
                        id="Status"
                        initialValue={values.Status}
                        onValueChange={handleValueChange}
                      />
                    </div>
                  </div>
                  {/* /Editor */}
                </div>
                <div className="modal-footer-btn">
                  <Link
                    to="#"
                    className="btn btn-cancel me-2"
                    data-bs-dismiss="modal"
                  >
                    Cancel
                  </Link>
                  <Link
                    to="#"
                    className="btn btn-submit"
                    onClick={handleSubmit}
                  >
                    Submit
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AddExpense;
