/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const AddVariant = ({ loadData }) => {
  const [formData, setFormData] = useState({});
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    if (loadData && Object.keys(loadData).length > 0) {
      setFormData(loadData);
      setIsChecked(loadData.status === 1);
    }
  }, [loadData]);

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
  const handleSubmit = (e) => {
    e.preventDefault();
    let submitData = {
      ...formData,
      status: isChecked ? 1 : 0,
    };
    console.log(submitData);
  };

  const clearData = () => {
    setFormData({
      variant: "",
      values: "",
      createdon: "",
      id: "",
    });
    setIsChecked(false);
  };
  return (
    <>
      {/* Add Unit */}
      <div className="modal fade" id="add-units" onClick={clearData}>
        <div className="modal-dialog modal-dialog-centered custom-modal-two">
          <div className="modal-content">
            <div className="page-wrapper-new p-0">
              <div className="content">
                <div className="modal-header border-0 custom-modal-header">
                  <div className="page-title">
                    <h4>Create Attributes</h4>
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
                    <div className="mb-3">
                      <label className="form-label">Name</label>
                      <input
                        type="text"
                        className="form-control"
                        onChange={handleInputChange}
                        name="variant"
                        value={formData.variant}
                      />
                    </div>
                    <div className="input-blocks">
                      <label className="form-label">Variant</label>

                      <span className="tag-text">
                        Enter value separated by comma
                      </span>
                      <input
                        type="text"
                        className="form-control"
                        onChange={handleInputChange}
                        name="values"
                        value={formData.values}
                      />
                    </div>
                    <div className="mb-0">
                      <div className="status-toggle modal-status d-flex justify-content-between align-items-center">
                        <span className="status-label">Status</span>
                        <input
                          type="checkbox"
                          id="user2"
                          className="check"
                          checked={isChecked}
                          onChange={handleCheckboxChange}
                        />
                        <label htmlFor="user2" className="checktoggle" />
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
                        Create Attributes
                      </Link>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* /Add Unit */}
    </>
  );
};

export default AddVariant;
