/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import Select from "react-select";
import ImageWithBasePath from "../../img/imagewithbasebath";
import { Link } from "react-router-dom";

const CustomerModal = ({ loadData }) => {
  const [formData, setFormData] = useState({});
  useEffect(() => {
    if (loadData && Object.keys(loadData).length > 0) {
      setFormData(loadData);
    }
  }, [loadData]);
  const countriesOptions = [
    { value: "choose", label: "Choose" },
    { value: "unitedKingdom", label: "United Kingdom" },
    { value: "unitedStates", label: "United States" },
  ];

  const varrelOptions = [{ value: "varrel", label: "Varrel" }];

  const germanyOptions = [
    { value: "germany", label: "Germany" },
    { value: "unitedStates", label: "United States" },
  ];
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };
  return (
    <>
      {/* Add Customer */}
      <div className="modal fade" id="add-units">
        <div className="modal-dialog modal-dialog-centered custom-modal-two">
          <div className="modal-content">
            <div className="page-wrapper-new p-0">
              <div className="content">
                <div className="modal-header border-0 custom-modal-header">
                  <div className="page-title">
                    <h4>Add Customer</h4>
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
                    <div className="modal-title-head people-cust-avatar">
                      <h6>Avatar</h6>
                    </div>
                    <div className="new-employee-field">
                      <div className="profile-pic-upload">
                        <div className="profile-pic">
                          <span>
                            <i
                              data-feather="plus-circle"
                              className="plus-down-add"
                            />{" "}
                            Add Image
                          </span>
                        </div>
                        <div className="mb-3">
                          <div className="image-upload mb-0">
                            <input type="file" />
                            <div className="image-uploads">
                              <h4>Change Image</h4>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-lg-4 pe-0">
                        <div className="mb-3">
                          <label className="form-label">Customer Name</label>
                          <input
                            type="text"
                            className="form-control"
                            name="CustomerName"
                            value={formData.CustomerName}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                      <div className="col-lg-4 pe-0">
                        <div className="mb-3">
                          <label className="form-label">Email</label>
                          <input
                            type="email"
                            className="form-control"
                            name="Email"
                            value={formData.Email}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                      <div className="col-lg-4 pe-0">
                        <div className="input-blocks">
                          <label className="mb-2">Phone</label>
                          <input
                            className="form-control form-control-lg group_formcontrol"
                            id="phone"
                            type="text"
                            name="Phone"
                            value={formData.Phone}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                      <div className="col-lg-12 pe-0">
                        <div className="mb-3">
                          <label className="form-label">Address</label>
                          <input
                            type="text"
                            className="form-control"
                            name="Address"
                            value={formData.Address}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                      <div className="col-lg-6 pe-0">
                        <div className="mb-3">
                          <label className="form-label">City</label>
                          <input
                            type="text"
                            className="form-control"
                            name="City"
                            value={formData.City}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                      <div className="col-lg-6 pe-0">
                        <div className="mb-3">
                          <label className="form-label">Country</label>
                          <Select
                            className="select"
                            options={countriesOptions}
                          />
                        </div>
                      </div>
                      <div className="col-lg-12">
                        <div className="mb-3 input-blocks">
                          <label className="form-label">Descriptions</label>
                          <textarea
                            className="form-control mb-1"
                            defaultValue={""}
                          />
                          <p>Maximum 60 Characters</p>
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
                        Submit
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* /Add Customer */}
    </>
  );
};

export default CustomerModal;
