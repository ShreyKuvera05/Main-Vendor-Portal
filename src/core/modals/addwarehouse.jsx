/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import Select from "react-select";
import { label } from "yet-another-react-lightbox";

const AddWareHouse = ({ loadData }) => {
  const [formData, setFormData] = useState({});
  const [isChecked, setIsChecked] = useState(false);
  const [selectedPerson, setSelectedPerson] = useState({});
  const [selectedCountry, setSelectedCountry] = useState({});

  // ============ receive loadData===============
  useEffect(() => {
    if (loadData && Object.keys(loadData).length > 0) {
      setFormData(loadData);
      const person = {
        value: loadData.contactPerson,
        label: loadData.contactPersonName,
      };
      setSelectedPerson(person);
      const country = {
        value: loadData.country,
        label: loadData.countryName,
      };
      setSelectedCountry(country);
      setIsChecked(loadData.status === 1);
    }
  }, [loadData]);
  // =========================================HANDLERS=======================================
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };
  const handleCheckboxChange = (e) => {
    setIsChecked(e.target.checked);
  };
  const handlePersonChange = (selectedOption) => {
    setSelectedPerson(selectedOption);
    setFormData((prevState) => ({
      ...prevState,
      contactPerson: selectedOption.value,
      contactPersonName: selectedOption.label,
    }));
  };
  const handleCountryChange = (selectedOption) => {
    setSelectedCountry(selectedOption);
    setFormData((prevState) => ({
      ...prevState,
      country: selectedOption.value,
      countryName: selectedOption.label,
    }));
  };

  const options1 = [
    { value: 1, label: "Alex" },
    { value: 2, label: "Steven" },
    { value: 3, label: "Gravely" },
    { value: 4, label: "Kevin" },
  ];

  const options2 = [
    { value: 1, label: "Egypt" },
    { value: 2, label: "United Kingdom" },
    { value: 3, label: "United States" },
    { value: 4, label: "Africa" },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    let submitData = {
      ...formData,
      status: isChecked,
    };
    console.log(submitData);
  };
  const close = () => {
    setFormData({
      key: "",
      warehouse: "",
      phone: "",
      totalProducts: "",
      stock: "",
      qty: "",
      createdOn: "",
      email: "",
    });
    setIsChecked(false);
    setSelectedPerson({});
    setSelectedCountry({});
  };
  return (
    <div className="modal fade" id="add-units">
      <div className="modal-dialog modal-dialog-centered custom-modal-two">
        <div className="modal-content">
          <div className="page-wrapper-new p-0">
            <div className="content">
              <div className="modal-header border-0 custom-modal-header">
                <div className="page-title">
                  <h4>Add Warehouse</h4>
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
                  <div className="modal-title-head">
                    <h6>
                      <span>
                        <i data-feather="info" className="feather-edit" />
                      </span>
                      Warehouse Info
                    </h6>
                  </div>
                  <div className="row">
                    <div className="col-lg-6">
                      <div className="mb-3">
                        <label className="form-label">Name</label>
                        <input
                          type="text"
                          className="form-control"
                          onChange={handleInputChange}
                          name="warehouse"
                          value={formData.warehouse}
                        />
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="input-blocks">
                        <label>Contact Person</label>
                        <Select
                          className="select"
                          options={options1}
                          value={selectedPerson}
                          onChange={handlePersonChange}
                        />
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="mb-3">
                        <label className="form-label">Phone Number</label>
                        <input
                          className="form-control"
                          name="phone"
                          type="text"
                          onChange={handleInputChange}
                          value={formData.phone}
                        />
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="mb-3">
                        <label className="form-label">Work Phone</label>
                        <input
                          type="text"
                          className="form-control"
                          onChange={handleInputChange}
                          value={formData.phone}
                          name="phone"
                        />
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <div className="mb-3">
                        <label className="form-label">Email</label>
                        <input
                          type="email"
                          className="form-control"
                          onChange={handleInputChange}
                          value={formData.email}
                          name="email"
                        />
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <div className="mb-0">
                        <div className="status-toggle modal-status d-flex justify-content-between align-items-center">
                          <span className="status-label">Status</span>
                          <input
                            type="checkbox"
                            id="user2"
                            className="check"
                            onChange={handleCheckboxChange}
                            checked={isChecked}
                          />
                          <label htmlFor="user2" className="checktoggle" />
                        </div>
                      </div>
                    </div>
                    <br></br>
                    <div className="modal-title-head">
                      <h6>
                        <span>
                          <i data-feather="map-pin" />
                        </span>
                        Others
                      </h6>
                    </div>

                    <div className="col-lg-6">
                      <div className="mb-3">
                        <label className="form-label">Total Products</label>
                        <input
                          type="text"
                          className="form-control"
                          onChange={handleInputChange}
                          name="totalProducts"
                          value={formData.totalProducts}
                        />
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="mb-3">
                        <label className="form-label">Stock</label>
                        <input
                          type="text"
                          className="form-control"
                          onChange={handleInputChange}
                          name="stock"
                          value={formData.stock}
                        />
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="mb-3">
                        <label className="form-label">Quantity</label>
                        <input
                          type="text"
                          className="form-control"
                          onChange={handleInputChange}
                          name="qty"
                          value={formData.qty}
                        />
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="input-blocks">
                        {" "}
                        <label>Country</label>{" "}
                        <Select
                          className="select"
                          options={options2}
                          onChange={handleCountryChange}
                          value={selectedCountry}
                        />{" "}
                      </div>
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
                    <button
                      type="submit"
                      className="btn btn-submit"
                      onClick={handleSubmit}
                    >
                      Create Warehouse
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AddWareHouse;
