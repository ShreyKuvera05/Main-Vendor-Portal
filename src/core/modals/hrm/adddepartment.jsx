/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom/dist";
import TextEditor from "../../../feature-module/inventory/texteditor";
import Select from "react-select";

const AddDepartment = ({ loadData }) => {
  const [formData, setFormData] = useState({});
  const [selectedHod, setSelectedHod] = useState({});
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    if (loadData && Object.keys(loadData).length > 0) {
      setFormData(loadData);
      const hod = {
        value: loadData.HodVal,
        label: loadData.name,
      };
      setSelectedHod(hod);
      setIsChecked(loadData.status === 1);
    }
  }, [loadData]);
  const hodlist = [
    { value: 1, label: "Mitchum Daniel" },
    { value: 2, label: "Susan Lopez" },
    { value: 3, label: "Robert Grossman" },
    { value: 4, label: "Janet Hembre" },
    { value: 5, label: "Russell Belle" },
    { value: 6, label: "Susan Moore" },
    { value: 7, label: "Lance Jackson" },
    { value: 8, label: "Mitchum Daniel" },
    { value: 9, label: "Susan Moore" },
    { value: 10, label: "Lance Jackson" },
    { value: 11, label: "Robert Grossman" },
  ];
  // =========================inputHandlers=============
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSelectChange = (selectedOption) => {
    setSelectedHod(selectedOption);
    setFormData({
      ...formData,
      name: selectedOption.label,
      HodVal: selectedOption.value,
    });
  };

  const handleCheckBoxChange = (e) => {
    setIsChecked(e.target.checked);
  };
  // =========================inputHandlers=============
  const handleSubmit = (e) => {
    e.preventDefault();
    const submitData = {
      ...formData,
      status: isChecked ? 1 : 0,
    };
    console.log(JSON.stringify(submitData));
  };
  return (
    <div>
      {/* Add Department */}
      <div className="modal fade" id="add-department">
        <div className="modal-dialog modal-dialog-centered custom-modal-two">
          <div className="modal-content">
            <div className="page-wrapper-new p-0">
              <div className="content">
                <div className="modal-header border-0 custom-modal-header">
                  <div className="page-title">
                    <h4>Add Department</h4>
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
                        <div className="mb-3">
                          <label className="form-label">Department Name</label>
                          <input
                            type="text"
                            className="form-control"
                            onChange={handleInputChange}
                            name="department"
                            value={formData.department}
                          />
                        </div>
                      </div>
                      <div className="col-lg-12">
                        <div className="mb-3">
                          <label className="form-label">HOD</label>
                          <Select
                            className="select"
                            value={selectedHod}
                            onChange={handleSelectChange}
                            options={hodlist}
                            placeholder="Newest"
                          />
                        </div>
                      </div>
                      <div className="col-lg-12">
                        <div className="mb-3 summer-description-box">
                          <label className="form-label">Description</label>
                          <div id="summernote" /> <TextEditor />
                        </div>
                      </div>
                      <div className="input-blocks m-0">
                        <div className="status-toggle modal-status d-flex justify-content-between align-items-center">
                          <span className="status-label">Status</span>
                          <input
                            type="checkbox"
                            id="user5"
                            className="check"
                            checked={isChecked}
                            onChange={handleCheckBoxChange}
                          />
                          <label htmlFor="user5" className="checktoggle">
                            {" "}
                          </label>
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
                      <Link
                        to="#"
                        className="btn btn-submit"
                        onClick={handleSubmit}
                      >
                        Save Changes
                      </Link>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* /Add Department */}
    </div>
  );
};

export default AddDepartment;
