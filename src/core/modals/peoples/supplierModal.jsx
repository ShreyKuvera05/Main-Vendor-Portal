/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import Select from "react-select";
import ImageWithBasePath from "../../img/imagewithbasebath";

const SupplierModal = ({ loadData }) => {
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (loadData && Object.keys(loadData).length > 0) {
      setFormData(loadData);
    }
  }, [loadData]);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const options1 = [
    { value: "Choose", label: "Choose" },
    { value: "Varrel", label: "Varrel" },
  ];

  const options2 = [
    { value: "Choose", label: "Choose" },
    { value: "Germany", label: "Germany" },
    { value: "Mexico", label: "Mexico" },
  ];

  const options3 = [{ value: "Varrel", label: "Varrel" }];

  const options4 = [
    { value: "Germany", label: "Germany" },
    { value: "France", label: "France" },
    { value: "Mexico", label: "Mexico" },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  const clearData = () => {
    console.log("dataCleared");
    setFormData({
      supplierName: "",
      code: "",
      email: "",
      phone: "",
      country: "",
      image: "",
    });
  };
  return (
    <div>
      {/* Add Supplier */}
      <div className="modal fade" id="add-units" onClick={clearData}>
        <div className="modal-dialog modal-dialog-centered custom-modal-two">
          <div className="modal-content">
            <div className="page-wrapper-new p-0">
              <div className="content">
                <div className="modal-header border-0 custom-modal-header">
                  <div className="page-title">
                    <h4>Add Supplier</h4>
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
                      <div className="col-lg-12">
                        <div className="new-employee-field">
                          <span>Avatar</span>
                          <div className="profile-pic-upload mb-2">
                            <div className="profile-pic">
                              <span>
                                <ImageWithBasePath
                                  src={formData.image}
                                  alt="Profile Photo"
                                  style={{ width: "100%", height: "100%" }}
                                />
                              </span>
                            </div>
                            <div className="input-blocks mb-0">
                              <div className="image-upload mb-0">
                                <input type="file" />
                                <div className="image-uploads">
                                  <h4>Change Image</h4>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-4">
                        <div className="input-blocks">
                          <label>Supplier Name</label>
                          <input
                            type="text"
                            className="form-control"
                            onChange={handleInputChange}
                            name="supplierName"
                            value={formData.supplierName}
                          />
                        </div>
                      </div>
                      <div className="col-lg-4">
                        <div className="input-blocks">
                          <label>Email</label>
                          <input
                            type="email"
                            className="form-control"
                            onChange={handleInputChange}
                            name="email"
                            value={formData.email}
                          />
                        </div>
                      </div>
                      <div className="col-lg-4">
                        <div className="input-blocks">
                          <label>Phone</label>
                          <input
                            type="text"
                            className="form-control"
                            onChange={handleInputChange}
                            name="phone"
                            value={formData.phone}
                          />
                        </div>
                      </div>
                      <div className="col-lg-12">
                        <div className="input-blocks">
                          <label>Address</label>
                          <input type="text" className="form-control" />
                        </div>
                      </div>
                      <div className="col-lg-6 col-sm-10 col-10">
                        <div className="input-blocks">
                          <label>City</label>
                          <Select className="select" options={options1} />
                        </div>
                      </div>
                      <div className="col-lg-6 col-sm-10 col-10">
                        <div className="input-blocks">
                          <label>Country</label>
                          <Select className="select" options={options2} />
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="mb-0 input-blocks">
                          <label className="form-label">Descriptions</label>
                          <textarea
                            className="form-control mb-1"
                            defaultValue={""}
                          />
                          <p>Maximum 600 Characters</p>
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
      {/* /Add Supplier */}
    </div>
  );
};

export default SupplierModal;
