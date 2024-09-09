import { ChevronUp, Info } from "feather-icons-react/build/IconComponents";
import ArrowLeft from "feather-icons-react/build/IconComponents/ArrowLeft";
import React, { useEffect, useState } from "react";
import { PlusCircle } from "react-feather";
import { Link } from "react-router-dom";
import ResDatePicker from "../../common/Resuable/ResDatePicker";
import { all_routes } from "../../Router/all_routes";
import { useDispatch, useSelector } from "react-redux";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { setToogleHeader } from "../../core/redux/action";
import ResSelect from "../../common/Resuable/ResSelect";
import { useLocation } from "react-router-dom";
import moment from "moment";
import toast from "react-hot-toast";
const AddEmployee = () => {
  const location = useLocation();
  const route = all_routes;
  const dispatch = useDispatch();
  const data = useSelector((state) => state.toggle_header);
  const [formData, setFormData] = useState({});
  const [dates, setDates] = useState({
    startDate: null,
    endDate: null,
  });
  const [selectedProduct, setSelectedProduct] = React.useState({
    Gender: null,
    BloodGroup: null,
    Country: null,
    Department: null,
    Designation: null,
    Nationality: null,
    Types: null,
  });
  const [errors, setErrors] = useState({});
  useEffect(() => {
    if (location.state !== null) {
      const getData = location.state.data;
      setFormData(getData);
      let gender = {
        value: getData.gender,
        label: getData.genderName,
      };
      let bloodgroup = {
        value: getData.BloodGroup,
        label: getData.BloodGroupName,
      };
      let country = {
        value: getData.country,
        label: getData.countryName,
      };
      let department = {
        value: getData.department,
        label: getData.departmentName,
      };
      let designation = {
        value: getData.designation,
        label: getData.designationName,
      };
      let nationality = {
        value: getData.nationality,
        label: getData.nationalityName,
      };
      let type = {
        value: getData.type,
        label: getData.typeName,
      };

      setSelectedProduct({
        Gender: gender,
        BloodGroup: bloodgroup,
        Country: country,
        Department: department,
        Designation: designation,
        Nationality: nationality,
        Type: type,
      });
    }
  }, [location]);

  const renderCollapseTooltip = (props) => (
    <Tooltip id="refresh-tooltip" {...props}>
      Collapse
    </Tooltip>
  );

  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };
  const [showConfirmPassword, setConfirmPassword] = useState(false);
  const handleToggleConfirmPassword = () => {
    setConfirmPassword((prevShowPassword) => !prevShowPassword);
  };

  // =============================================SELECT OPTIONS ==========================
  const gender = [
    { value: 1, label: "Choose" },
    { value: 2, label: "Male" },
    { value: 3, label: "Female" },
  ];
  const nationality = [
    { value: 1, label: "Choose" },
    { value: 2, label: "United Kingdom" },
    { value: 3, label: "India" },
  ];
  const types = [
    { value: 0, label: "Choose" },
    { value: 1, label: "Regular" },
  ];

  const departments = [
    { value: 0, label: "Choose" },
    { value: 1, label: "UI/UX" },
    { value: 2, label: "Support" },
    { value: 3, label: "HR" },
    { value: 4, label: "Engineering" },
  ];

  const designation = [
    { value: 0, label: "Choose" },
    { value: 1, label: "Designer" },
    { value: 2, label: "Developer" },
    { value: 3, label: "Tester" },
  ];

  const bloodgroup = [
    { value: 0, label: "Select" },
    { value: 1, label: "A+" },
    { value: 2, label: "A-" },
    { value: 3, label: "B-" },
    { value: 4, label: "O-" },
    { value: 5, label: "O-" },
    { value: 6, label: "AB-" },
    { value: 7, label: "AB-" },
  ];

  const country = [
    { value: 0, label: "Choose" },
    { value: 1, label: "United Kingdom" },
    { value: 2, label: "USA" },
  ];

  // =============================================SELECT OPTIONS ==========================

  // ====================================HANDLERS================================
  // --------inputFieldHandler-----
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };
  // --------inputFieldHandler-----

  // ----------SelectListHandler-------

  const handleSelectChange = (
    selectedOption,
    selectName,
    setSelectedProduct
  ) => {
    if (selectName === "Gender") {
      if (selectedOption !== null) {
        let gender = selectedOption;
        setFormData({
          ...formData,
          gender: gender.value,
          genderName: gender.label,
        });
      }
    }
    if (selectName === "BloodGroup") {
      if (selectedOption !== null) {
        let BloodGroup = selectedOption;
        setFormData({
          ...formData,
          BloodGroup: BloodGroup.value,
          BloodGroupName: BloodGroup.label,
        });
      }
    }
    if (selectName === "Country") {
      if (selectedOption !== null) {
        let country = selectedOption;
        setFormData({
          ...formData,
          country: country.value,
          countryName: country.label,
        });
      }
    }

    if (selectName === "Department") {
      if (selectedOption !== null) {
        let department = selectedOption;
        setFormData({
          ...formData,
          department: department.value,
          departmentName: department.label,
        });
      }
    }

    if (selectName === "Designation") {
      if (selectedOption !== null) {
        let designation = selectedOption;
        setFormData({
          ...formData,
          designation: designation.value,
          designationName: designation.label,
        });
      }
    }

    if (selectName === "Nationality") {
      if (selectedOption !== null) {
        let nationality = selectedOption;
        setFormData({
          ...formData,
          nationality: nationality.value,
          nationalityName: nationality.label,
        });
      }
    }

    if (selectName === "Types") {
      if (selectedOption !== null) {
        let types = selectedOption;
        setFormData({
          ...formData,
          types: types.value,
          typesName: types.label,
        });
      }
    }
    setSelectedProduct((prevSelectedValues) => ({
      ...prevSelectedValues,
      [selectName]: selectedOption,
    }));
  };
  // ----------SelectListHandler-------

  // ----------------DateHandler--------------
  const handleDateChange = (date, dateField) => {
    setDates((prevDates) => ({
      ...prevDates,
      [dateField]: date,
    }));
  };
  // ----------------DateHandler--------------

  // ====================================HANDLERS================================

  // ========================FORM VALIDATION ========================================
  const validateForm = () => {
    const newErrors = {};

    if (!formData.Phone) {
      newErrors.Phone = "Mobile number is required";
    } else if (!/^\d{10}$/.test(formData.Phone)) {
      newErrors.Phone = "Mobile number must be 10 digits";
    }

    if (!formData.EmailId) {
      newErrors.EmailId = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.EmailId)) {
      newErrors.EmailId = "Invalid email address";
    }
    if (formData.fPass !== formData.cnfPass) {
      newErrors.PasswordsMatch = "Passwords do not match";
    }
    if (formData.fName && !formData.fName.trim()) {
      newErrors.fName = "First Name is required";
    }
    if (formData.lName && !formData.lName.trim()) {
      newErrors.lName = "Last Name is required";
    }
    // if (!selectedRole.value) {
    //   setSelectedOptionError(true);
    // }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ===========================SUBMIT===================================
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      let startDate = moment(dates.startDate).format("DD/MM/YYYY");
      let endDate = moment(dates.endDate).format("DD/MM/YYYY");

      console.log(JSON.stringify(formData));
    } else {
      toast.error("Form Validation Failed");
    }
  };
  // ===========================SUBMIT===================================

  return (
    <div>
      <div className="page-wrapper">
        <div className="content">
          <div className="page-header">
            <div className="add-item d-flex">
              <div className="page-title">
                <h4>New Employee</h4>
                <h6>Create new Employee</h6>
              </div>
            </div>
            <ul className="table-top-head">
              <li>
                <div className="page-btn">
                  <Link to={route.employeegrid} className="btn btn-secondary">
                    <ArrowLeft className="me-2" />
                    Back to Employee List
                  </Link>
                </div>
              </li>
              <li>
                <OverlayTrigger placement="top" overlay={renderCollapseTooltip}>
                  <Link
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    id="collapse-header"
                    className={data ? "active" : ""}
                    onClick={() => {
                      dispatch(setToogleHeader(!data));
                    }}
                  >
                    <ChevronUp />
                  </Link>
                </OverlayTrigger>
              </li>
            </ul>
          </div>
          {/* /product list */}
          <form>
            <div className="card">
              <div className="card-body">
                <div className="new-employee-field">
                  <div className="card-title-head">
                    <h6>
                      <span>
                        <Info className="feather-edit" />
                      </span>
                      Employee Information
                    </h6>
                  </div>
                  <div className="profile-pic-upload">
                    <div className="profile-pic">
                      <span>
                        <PlusCircle className="plus-down-add" />
                        Profile Photo
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
                  <div className="row">
                    <div className="col-lg-4 col-md-6">
                      <div className="mb-3">
                        <label className="form-label">First Name</label>
                        <input
                          type="text"
                          className={`form-control ${
                            errors.fName && "is-invalid shakersss"
                          }`}
                          value={formData.fName}
                          name="fName"
                          onChange={handleInputChange}
                        />
                        {errors.fName && (
                          <div className="invalid-feedback">{errors.fName}</div>
                        )}
                      </div>
                    </div>
                    <div className="col-lg-4 col-md-6">
                      <div className="mb-3">
                        <label className="form-label">Last Name</label>
                        <input
                          type="text"
                          className={`form-control ${
                            errors.lName && "is-invalid shakersss"
                          }`}
                          value={formData.lName}
                          name="lName"
                          onChange={handleInputChange}
                        />
                        {errors.lName && (
                          <div className="invalid-feedback">{errors.lName}</div>
                        )}
                      </div>
                    </div>
                    <div className="col-lg-4 col-md-6">
                      <div className="mb-3">
                        <label className="form-label">Email</label>
                        <input
                          type="email"
                          className={`form-control ${
                            errors.EmailId && "is-invalid shakersss"
                          }`}
                          value={formData.EmailId}
                          name="EmailId"
                          onChange={handleInputChange}
                        />
                        {errors.EmailId && (
                          <div className="invalid-feedback">
                            {errors.EmailId}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="col-lg-4 col-md-6">
                      <div className="mb-3">
                        <label className="form-label">Contact Number</label>
                        <input
                          type="text"
                          className="form-control"
                          value={formData.Phone}
                          name="Phone"
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                    <div className="col-lg-4 col-md-6">
                      <div className="mb-3">
                        <label className="form-label">Emp Code</label>
                        <input
                          type="text"
                          className="form-control"
                          value={formData.empCode}
                          name="empCode"
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                    <div className="col-lg-4 col-md-6">
                      <ResDatePicker
                        labelName="Start Date"
                        value={dates.startDate}
                        onDateChange={(date) =>
                          handleDateChange(date, "startDate")
                        }
                      />
                    </div>
                    <div className="col-lg-4 col-md-6">
                      <div className="mb-3">
                        <label className="form-label">Gender</label>{" "}
                        <ResSelect
                          options={gender}
                          value={selectedProduct.Gender}
                          onChange={(selectedOption) =>
                            handleSelectChange(
                              selectedOption,
                              "Gender",
                              setSelectedProduct
                            )
                          }
                          id="select21"
                          isMulti={false}
                          placeholder="Gender"
                        />
                      </div>
                    </div>
                    <div className="col-lg-4 col-md-6">
                      <div className="mb-3">
                        <label className="form-label">Nationality</label>
                        <ResSelect
                          options={nationality}
                          value={selectedProduct.Nationality}
                          onChange={(selectedOption) =>
                            handleSelectChange(
                              selectedOption,
                              "Nationality",
                              setSelectedProduct
                            )
                          }
                          id="select21"
                          isMulti={false}
                          placeholder="Nationality"
                        />
                      </div>
                    </div>
                    <div className="col-lg-4 col-md-6">
                      <ResDatePicker
                        labelName="End Date"
                        value={dates.endDate}
                        onDateChange={(date) =>
                          handleDateChange(date, "endDate")
                        }
                      />
                    </div>
                    <div className="col-lg-4 col-md-6">
                      <div className="mb-3">
                        <div className="add-newplus">
                          <label className="form-label">Shift</label>
                          <Link to="#">
                            <span>
                              <PlusCircle className="plus-down-add" />
                              Add new
                            </span>
                          </Link>
                        </div>

                        <ResSelect
                          options={types}
                          value={selectedProduct.Types}
                          onChange={(selectedOption) =>
                            handleSelectChange(
                              selectedOption,
                              "Types",
                              setSelectedProduct
                            )
                          }
                          id="select21"
                          isMulti={false}
                          placeholder="Types"
                        />
                      </div>
                    </div>
                    <div className="col-lg-4 col-md-6">
                      <div className="mb-3">
                        <label className="form-label">Department</label>

                        <ResSelect
                          options={departments}
                          value={selectedProduct.Department}
                          onChange={(selectedOption) =>
                            handleSelectChange(
                              selectedOption,
                              "Department",
                              setSelectedProduct
                            )
                          }
                          id="select21"
                          isMulti={false}
                          placeholder="Department"
                        />
                      </div>
                    </div>
                    <div className="col-lg-4 col-md-6">
                      <div className="mb-3">
                        <label className="form-label">Designation</label>

                        <ResSelect
                          options={designation}
                          value={selectedProduct.Designation}
                          onChange={(selectedOption) =>
                            handleSelectChange(
                              selectedOption,
                              "Designation",
                              setSelectedProduct
                            )
                          }
                          id="select21"
                          isMulti={false}
                          placeholder="Designation"
                        />
                      </div>
                    </div>
                    <div className="col-lg-4 col-md-6">
                      <div className="mb-3">
                        <label className="form-label">Blood Group</label>
                        <ResSelect
                          options={bloodgroup}
                          value={selectedProduct.BloodGroup}
                          onChange={(selectedOption) =>
                            handleSelectChange(
                              selectedOption,
                              "BloodGroup",
                              setSelectedProduct
                            )
                          }
                          id="select21"
                          isMulti={false}
                          placeholder="BloodGroup"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="other-info">
                    <div className="card-title-head">
                      <h6>
                        <span>
                          <Info className="feather-edit" />
                        </span>
                        Other Information
                      </h6>
                    </div>
                    <div className="row">
                      <div className="col-lg-4 col-md-6">
                        <div className="mb-3">
                          <label className="form-label">Emergency No 1</label>
                          <input
                            type="text"
                            className="form-control"
                            value={formData.empNo1}
                            name="empNo1"
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                      <div className="col-lg-4 col-md-6">
                        <div className="mb-3">
                          <label className="form-label">Emergency No 2</label>
                          <input
                            type="text"
                            className="form-control"
                            value={formData.empNo2}
                            name="empNo2"
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                      <div className="col-lg-4 col-md-6"></div>
                      <div className="col-lg-4 col-md-6">
                        <div className="mb-3">
                          <label className="form-label">Address</label>
                          <input
                            type="text"
                            className="form-control"
                            value={formData.Address}
                            name="Address"
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                      <div className="col-lg-4 col-md-6">
                        <div className="mb-3">
                          <label className="form-label">Country</label>
                          <ResSelect
                            options={country}
                            value={selectedProduct.Country}
                            onChange={(selectedOption) =>
                              handleSelectChange(
                                selectedOption,
                                "Country",
                                setSelectedProduct
                              )
                            }
                            id="select21"
                            isMulti={false}
                            placeholder="Country"
                          />
                        </div>
                      </div>
                      <div className="col-lg-4 col-md-6">
                        <div className="mb-3">
                          <label className="form-label">State</label>
                          <input
                            type="text"
                            className="form-control"
                            value={formData.State}
                            name="State"
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                      <div className="col-lg-4 col-md-6">
                        <div className="mb-3">
                          <label className="form-label">City</label>
                          <input
                            type="text"
                            className="form-control"
                            value={formData.City}
                            name="City"
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                      <div className="col-lg-4 col-md-6">
                        <div className="mb-3">
                          <label className="form-label">Zipcode</label>
                          <input
                            type="text"
                            className="form-control"
                            value={formData.Zipcode}
                            name="Zipcode"
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="pass-info">
                    <div className="card-title-head">
                      <h6>
                        <span>
                          <Info />
                        </span>
                        Password
                      </h6>
                    </div>
                    <div className="row">
                      <div className="col-lg-4 col-md-6">
                        <div className="input-blocks mb-md-0 mb-sm-3">
                          <label>Password</label>
                          <div className="pass-group">
                            <input
                              type={showPassword ? "text" : "password"}
                              className="pass-input"
                              placeholder="Enter your password"
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
                      <div className="col-lg-4 col-md-6">
                        <div className="input-blocks mb-0">
                          <label>Confirm Password</label>
                          <div className="pass-group">
                            <input
                              type={showConfirmPassword ? "text" : "password"}
                              className="pass-input"
                              placeholder="Enter your password"
                            />
                            <span
                              className={`fas toggle-password ${
                                showConfirmPassword ? "fa-eye" : "fa-eye-slash"
                              }`}
                              onClick={handleToggleConfirmPassword}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* /product list */}
            <div className="text-end mb-3">
              <button type="button" className="btn btn-cancel me-2">
                Cancel
              </button>
              <Link to="#" className="btn btn-submit" onClick={handleSubmit}>
                Save Product
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddEmployee;
