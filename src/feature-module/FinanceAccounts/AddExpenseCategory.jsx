/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
const AddExpenseCategory = ({ loadData }) => {
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
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(JSON.stringify(formData));
  };
  return (
    <div className="modal fade" id="add-units">
      <div className="modal-dialog modal-dialog-centered custom-modal-two">
        <div className="modal-content">
          <div className="page-wrapper-new p-0">
            <div className="content">
              <div className="modal-header border-0 custom-modal-header">
                <div className="page-title">
                  <h4>Add Expense Category</h4>
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
                        <label className="form-label">Expense Name</label>
                        <input
                          type="text"
                          className="form-control"
                          onChange={handleInputChange}
                          name="categoryName"
                          value={formData.categoryName}
                        />
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
                            defaultValue={""}
                            onChange={handleInputChange}
                            name="description"
                            value={formData.description}
                          />
                        </div>
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
  );
};
export default AddExpenseCategory;
