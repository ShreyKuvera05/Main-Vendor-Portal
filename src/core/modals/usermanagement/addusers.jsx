/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import { PlusCircle } from "feather-icons-react/build/IconComponents";
import { Link } from "react-router-dom";
import Select from "react-select";
import { toast } from "react-hot-toast";
import ImageWithBasePath from "../../img/imagewithbasebath";

const AddUsers = ({ ReceiveData }) => {
  const [formData, setFormData] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [errors, setErrors] = useState({});
  const [selectedRole, setSelectedRole] = useState({});
  const [selectedOptionError, setSelectedOptionError] = useState(false);

  useEffect(() => {
    if (ReceiveData && Object.keys(ReceiveData).length > 0) {
      const role = {
        value: ReceiveData.role,
        label: ReceiveData.roleName,
      };
      setIsChecked(ReceiveData.status === 1);
      setSelectedRole(role);
      setFormData(ReceiveData);
    }
  }, [ReceiveData]);

  //   =====================================Input Handlers============================================
  // ==========Normal Inputs==============
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };
  // =========SearchInputs===================
  const handleSearchInputChange = (e) => {
    let value = e.target.value.replace(/\D/, "");
    if (value.length > 10) {
      value = value.slice(0, 10);
    }
    setSearchInput(value);

    if (value.length === 10) {
      handleSearch(value);
    } else {
      setFormData({
        userName: "",
        Phone: "",
        Email: "",
        fPass: "",
        cnfPass: "",
        Desc: "",
      });
      setSelectedRole({});
    }
  };

  // ==========Select Input handler=============
  const handleRoleChange = (selectedOption) => {
    setSelectedRole(selectedOption);
    setSelectedOptionError(false);
    setFormData((prevState) => ({
      ...prevState,
      role: selectedOption.value,
      roleName: selectedOption.label,
    }));
  };

  const handleCheckboxChange = (e) => {
    setIsChecked(e.target.checked);
  };

  // =============================================================================================

  const status = [
    { value: 1, label: "Manager" },
    { value: 2, label: "Admin" },
    { value: 3, label: "Developer" },
    { value: 4, label: "Designer" },
    { value: 5, label: "Analyst" },
    { value: 6, label: "Engineer" },
    { value: 7, label: "Coordinator" },
    { value: 8, label: "Specialist" },
    { value: 9, label: "Consultant" },
    { value: 10, label: "Supervisor" },
  ];

  const handleSearch = (phoneNumber) => {
    const foundUser = Data.find((user) => user.Phone === phoneNumber);
    if (foundUser) {
      toast.success("User Found");
      setFormData(foundUser);
      console.log("foundUser: ", foundUser);
      const statusVal = foundUser.status === "Active" ? 1 : 0;
      setIsChecked(statusVal);
      const role = {
        value: foundUser.role,
        label: foundUser.roleName,
      };
      setSelectedRole(role);
    } else {
      toast.error("User not found");
    }
  };
  const handleTogglePassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };
  const [showConfirmPassword, setConfirmPassword] = useState(false);

  const handleToggleConfirmPassword = () => {
    setConfirmPassword((prevShowPassword) => !prevShowPassword);
  };
  const validateForm = () => {
    const newErrors = {};

    if (!formData.Phone) {
      newErrors.Phone = "Mobile number is required";
    } else if (!/^\d{10}$/.test(formData.Phone)) {
      newErrors.Phone = "Mobile number must be 10 digits";
    }

    if (!formData.Email) {
      newErrors.Email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.Email)) {
      newErrors.Email = "Invalid email address";
    }
    if (formData.fPass !== formData.cnfPass) {
      newErrors.PasswordsMatch = "Passwords do not match";
    }
    if (!selectedRole.value) {
      setSelectedOptionError(true);
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log(JSON.stringify(formData));
      setFormData({
        userName: "",
        Phone: "",
        Email: "",
        fPass: "",
        cnfPass: "",
      });
      setSelectedRole({});
      setIsChecked(false);
    } else {
      toast.error("Form Validation Failed");
    }
  };

  const Data = [
    {
      userName: "JohnDoe",
      Phone: "5551234567",
      Email: "johndoe@example.com",
      fPass: "password123",
      cnfPass: "password123",
      role: 1,
      roleName: "Manager",
      Desc: "xyz",
      status: "Inactive",
      img: "assets/img/profiles/profile.png",
    },
    {
      userName: "JaneSmith",
      Phone: "5559876543",
      Email: "janesmith@example.com",
      fPass: "letmein",
      cnfPass: "letmein",
      role: 2,
      Desc: "xyz",
      roleName: "Admin",
      status: "Active",
      img: "assets/img/profiles/profile-01.png",
    },
    {
      userName: "MikeJohnson",
      Phone: "5555555555",
      Email: "mike@example.com",
      fPass: "securepass",
      cnfPass: "securepass",
      role: 3,
      Desc: "xyz",
      roleName: "Developer",
      status: "Inactive",
      img: "assets/img/profiles/profile-02.png",
    },
    {
      userName: "EmilyBrown",
      Phone: "5551112222",
      Email: "emilybrown@example.com",
      fPass: "password",
      Desc: "xyz",
      cnfPass: "password",
      status: "Active",
      role: 4,
      roleName: "Designer",
      img: "assets/img/profiles/profile-03.png",
    },
    {
      userName: "DavidWilson",
      Phone: "5554443333",
      Email: "david@example.com",
      fPass: "davidpass",
      status: "Active",
      cnfPass: "davidpass",
      role: 5,
      Desc: "xyz",
      roleName: "Analyst",
      img: "assets/img/profiles/profile.png",
    },
    {
      userName: "SarahLee",
      status: "Inactive",
      Phone: "5557778888",
      Email: "sarahlee@example.com",
      fPass: "ilovesarah",
      cnfPass: "ilovesarah",
      role: 6,
      Desc: "xyz",
      roleName: "Engineer",
      img: "assets/img/profiles/profile-03.png",
    },
    {
      userName: "ChrisTaylor",
      Phone: "5556669999",
      Email: "chris@example.com",
      status: "Active",
      fPass: "chrispass",
      cnfPass: "chrispass",
      role: 7,
      Desc: "xyz",
      roleName: "Coordinator",
      img: "assets/img/profiles/profile-02.png",
    },
    {
      userName: "AmandaJones",
      Phone: "5552223333",
      Email: "amanda@example.com",
      fPass: "amandapassword",
      status: "Inactive",
      cnfPass: "amandapassword",
      role: 8,
      Desc: "xyz",
      roleName: "Specialist",
      img: "assets/img/profiles/profile-01.png",
    },
    {
      userName: "MarkDavis",
      status: "Active",
      Phone: "5558887777",
      Email: "mark@example.com",
      fPass: "markpass",
      cnfPass: "markpass",
      role: 9,
      Desc: "xyz",
      roleName: "Consultant",
      img: "assets/img/profiles/profile.png",
    },
    {
      userName: "LauraWhite",
      Phone: "5553334444",
      Email: "laura@example.com",
      status: "Active",
      fPass: "laurapass",
      cnfPass: "laurapass",
      role: 10,
      Desc: "xyz",
      roleName: "Supervisor",
      img: "assets/img/profiles/profile-03.png",
    },
  ];

  const close = () => {
    setFormData({
      userName: "",
      Phone: "",
      Email: "",
      fPass: "",
      cnfPass: "",
      Desc: "",
    });
    setSelectedRole({});
    setSearchInput("");
    setErrors({});
    setIsChecked(false);
    setSelectedOptionError(false);
  };

  return (
    <div>
      <div
        className="modal fade"
        id="add-units"
        onClick={close}
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered custom-modal-two">
          <div className="modal-content">
            <div className="page-wrapper-new p-0">
              <div className="content">
                <div className="modal-header border-0 custom-modal-header">
                  <div className="row justify-content-center">
                    <div className="col-md-6">
                      {" "}
                      {/* Adjust the column width as needed */}
                      <div className="search-set">
                        <div className="search-input">
                          <input
                            type="text"
                            placeholder="Search by Mobile Number"
                            className="form-control form-control-sm formsearch  rounded-pill"
                            value={searchInput}
                            onChange={handleSearchInputChange}
                          />
                          <Link to className="btn btn-searchset">
                            <i
                              data-feather="search"
                              className="feather-search"
                            />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
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
                                {formData.img !== undefined &&
                                formData.img !== "" ? (
                                  <ImageWithBasePath
                                    src={formData.img}
                                    alt="profile"
                                    style={{ width: "100%", height: "100%" }}
                                  />
                                ) : (
                                  <span>
                                    {" "}
                                    <PlusCircle className="plus-down-add" />{" "}
                                    Profile Photo{" "}
                                  </span>
                                )}
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
                      <div className="col-lg-6">
                        <div className="input-blocks">
                          <label>User Name</label>
                          <input
                            type="text"
                            className="form-control"
                            value={formData.userName}
                            name="userName"
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="input-blocks">
                          <label>Phone</label>
                          <input
                            type="text"
                            className={`form-control ${
                              errors.Phone && "is-invalid shakersss"
                            }`}
                            value={formData.Phone}
                            name="Phone"
                            onChange={handleInputChange}
                          />
                          {errors.Phone && (
                            <div className="invalid-feedback">
                              {errors.Phone}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="input-blocks">
                          <label>Email</label>
                          <input
                            type="email"
                            className={`form-control ${
                              errors.Email && "is-invalid shakersss"
                            }`}
                            value={formData.Email}
                            name="Email"
                            onChange={handleInputChange}
                          />
                          {errors.Email && (
                            <div className="invalid-feedback">
                              {errors.Email}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="input-blocks">
                          <label>Role</label>

                          <Select
                            className={`select ${
                              selectedOptionError && "is-invalid"
                            }`}
                            value={selectedRole}
                            options={status}
                            onChange={handleRoleChange}
                            placeholder="Choose Status"
                          />
                          {selectedOptionError && (
                            <div className="invalid-feedback">
                              Role is required
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="input-blocks">
                          <label>Password</label>
                          <div className="pass-group">
                            <input
                              type={showPassword ? "text" : "password"}
                              className="pass-input"
                              placeholder="Enter your password"
                              value={formData.fPass}
                              name="fPass"
                              onChange={handleInputChange}
                            />
                            <span
                              className={`fas toggle-password ${
                                showPassword ? "fa-eye" : "fa-eye-slash"
                              }`}
                              onClick={handleTogglePassword}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="input-blocks">
                          <label>Confirm Passworrd</label>
                          <div className="pass-group">
                            <input
                              type={showConfirmPassword ? "text" : "password"}
                              className={`pass-input ${
                                errors.PasswordsMatch && "is-invalid shakersss"
                              }`}
                              placeholder="Enter your password"
                              value={formData.cnfPass}
                              name="cnfPass"
                              onChange={handleInputChange}
                            />
                            {errors.PasswordsMatch && (
                              <div className="invalid-feedback">
                                {errors.PasswordsMatch}
                              </div>
                            )}
                            <span
                              className={`fas toggle-password ${
                                showConfirmPassword ? "fa-eye" : "fa-eye-slash"
                              }`}
                              onClick={handleToggleConfirmPassword}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-12">
                        <div className="mb-0 input-blocks">
                          <label className="form-label">Descriptions</label>
                          <textarea
                            className="form-control mb-1"
                            name="Desc"
                            value={formData.Desc}
                            onChange={handleInputChange}
                          />
                          <p>Maximum 600 Characters</p>
                        </div>
                      </div>
                      <br></br>
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
                    </div>
                    <div className="modal-footer-btn">
                      <button
                        type="button"
                        className="btn btn-cancel me-2"
                        data-bs-dismiss="modal"
                        onClick={close}
                      >
                        Cancel
                      </button>
                      <Link
                        to="#"
                        className="btn btn-submit"
                        onClick={handleSubmit}
                      >
                        Submit
                      </Link>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* /Add User */}
    </div>
  );
};

export default AddUsers;
