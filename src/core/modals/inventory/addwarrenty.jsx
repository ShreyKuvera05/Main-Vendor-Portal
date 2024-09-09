/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Select from "react-select";
import { label } from "yet-another-react-lightbox";

const AddWarrenty = ({ loadData }) => {
  const [formData, setFormData] = useState({});
  const [selectedPeriod, setSelectedPeriod] = useState({});
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    if (loadData && Object.keys(loadData).length > 0) {
      setFormData(loadData);
      setIsChecked(loadData.status);
      const period = {
        value: loadData.period,
        label: loadData.periodName,
      };
      setSelectedPeriod(period);
    }
  }, [loadData]);

  const period = [
    { value: 1, label: "Choose" },
    { value: 2, label: "Month" },
    { value: 3, label: "Year" },
  ];

  // =============================== HANDLERS ==========================================
  const handleSelect = (selectedOption) => {
    setSelectedPeriod(selectedOption);
    setFormData((prevState) => ({
      ...prevState,
      period: selectedOption.value,
      periodName: selectedOption.label,
    }));
  };

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

  // =========================================================================================

  const handleSubmit = (e) => {
    e.preventDefault();
    let submitData = {
      ...formData,
      status: isChecked ? 1 : 0,
    };
    console.log(submitData);
  };

  return (
    <>
      {/* Add Warranty */}
      <div className="modal fade" id="add-units">
        <div className="modal-dialog modal-dialog-centered custom-modal-two">
          <div className="modal-content">
            <div className="page-wrapper-new p-0">
              <div className="content">
                <div className="modal-header border-0 custom-modal-header">
                  <div className="page-title">
                    <h4>Add Warrranty</h4>
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
                        value={formData.name}
                        name="name"
                      />
                    </div>
                    <div className="row">
                      <div className="col-lg-6">
                        <div className="mb-3">
                          <label className="form-label">Duration</label>
                          <input
                            type="text"
                            className="form-control"
                            onChange={handleInputChange}
                            value={formData.duration}
                            name="duration"
                          />
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="input-blocks">
                          <label className="form-label">Periods</label>

                          <Select
                            className="select"
                            options={period}
                            placeholder="Month"
                            value={selectedPeriod}
                            onChange={handleSelect}
                          />
                        </div>
                      </div>
                      <div className="col-lg-12">
                        <div className="mb-3 input-blocks">
                          <label className="form-label">Description</label>
                          <textarea
                            className="form-control"
                            onChange={handleInputChange}
                            value={formData.description}
                            name="description"
                          />
                        </div>
                      </div>
                    </div>
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
                        Create Warrenty
                      </Link>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* /Add Warranty */}
    </>
  );
};

export default AddWarrenty;
