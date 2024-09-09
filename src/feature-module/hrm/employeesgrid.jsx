import React from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { all_routes } from "../../Router/all_routes";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { Link } from "react-router-dom";
import ImageWithBasePath from "../../core/img/imagewithbasebath";
import {
  Edit,
  Grid,
  List,
  MoreVertical,
  PlusCircle,
  RotateCcw,
  Trash2,
} from "feather-icons-react/build/IconComponents";
import { setToogleHeader } from "../../core/redux/action";
import {
  ChevronUp,
  Filter,
  Sliders,
  StopCircle,
  User,
  Users,
} from "react-feather";
import Select from "react-select";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import FilterFunc from "../../core/pagination/Filter";

const EmployeesGrid = () => {
  const route = all_routes;

  const dispatch = useDispatch();
  const data = useSelector((state) => state.toggle_header);
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const toggleFilterVisibility = () => {
    setIsFilterVisible((prevVisibility) => !prevVisibility);
  };
  const oldandlatestvalue = [
    { value: "date", label: "Sort by Date" },
    { value: "newest", label: "Newest" },
    { value: "oldest", label: "Oldest" },
  ];
  const status = [
    { value: "Choose Status", label: "Choose Status" },
    { value: "Active", label: "Active" },
    { value: "Inactive", label: "Inactive" },
  ];

  const names = [
    { value: "Choose Name", label: "Choose Name" },
    { value: "Mitchum Daniel", label: "Mitchum Daniel" },
    { value: "Susan Lopez", label: "Susan Lopez" },
    { value: "Robert Grossman", label: "Robert Grossman" },
    { value: "Janet Hembre", label: "Janet Hembre" },
  ];

  const MySwal = withReactContent(Swal);
  const showConfirmationAlert = () => {
    MySwal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      showCancelButton: true,
      confirmButtonColor: "#00ff00",
      confirmButtonText: "Yes, delete it!",
      cancelButtonColor: "#ff0000",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        MySwal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          className: "btn btn-success",
          confirmButtonText: "OK",
          customClass: {
            confirmButton: "btn btn-success",
          },
        });
      } else {
        MySwal.close();
      }
    });
  };
  const EmployeeData = [
    {
      id: 1,
      fName: "ABC",
      lName: "DEF",
      EmailId: "x@gmail.com",
      Phone: "1234567890",
      empCode: "ES-001",
      gender: 2,
      genderName: "Male",
      nationality: 2,
      nationalityName: "United Kingdom",
      types: 1,
      typesName: "Regular",
      department: 1,
      departmentName: "UI/UX",
      designation: 1,
      designationName: "Designer",
      BloodGroup: 1,
      BloodGroupName: "A+",
      empNo1: "0987654321",
      empNo2: "1234098765",
      Address: "ada",
      country: 1,
      countryName: "United Kingdom",
      State: "NYC",
      City: "N",
      Zipcode: "110021",
    },
    {
      id: 2,
      fName: "John",
      lName: "Doe",
      EmailId: "john.doe@example.com",
      Phone: "9876543210",
      empCode: "ES-002",
      gender: 3,
      genderName: "Female",
      nationality: 3,
      nationalityName: "India",
      types: 1,
      typesName: "Regular",
      department: 2,
      departmentName: "Support",
      designation: 2,
      designationName: "Developer",
      BloodGroup: 2,
      BloodGroupName: "A-",
      empNo1: "9876543210",
      empNo2: "1234567890",
      Address: "123 Main Street",
      country: 2,
      countryName: "USA",
      State: "CA",
      City: "Los Angeles",
      Zipcode: "90001",
    },
    {
      id: 3,
      fName: "Alice",
      lName: "Smith",
      EmailId: "alice.smith@example.com",
      Phone: "9998887776",
      empCode: "ES-003",
      gender: 2,
      genderName: "Male",
      nationality: 2,
      nationalityName: "United Kingdom",
      types: 1,
      typesName: "Regular",
      department: 3,
      departmentName: "HR",
      designation: 3,
      designationName: "Tester",
      BloodGroup: 3,
      BloodGroupName: "B-",
      empNo1: "9988776655",
      empNo2: "5566778899",
      Address: "456 Oak Street",
      country: 1,
      countryName: "United Kingdom",
      State: "London",
      City: "Westminster",
      Zipcode: "W1A 1AA",
    },
    {
      id: 4,
      fName: "Emma",
      lName: "Brown",
      EmailId: "emma.brown@example.com",
      Phone: "1231231234",
      empCode: "ES-004",
      gender: 3,
      genderName: "Female",
      nationality: 1,
      nationalityName: "Choose",
      types: 1,
      typesName: "Regular",
      department: 4,
      departmentName: "Engineering",
      designation: 1,
      designationName: "Designer",
      BloodGroup: 4,
      BloodGroupName: "O-",
      empNo1: "9876123456",
      empNo2: "6543210987",
      Address: "789 Elm Street",
      country: 2,
      countryName: "USA",
      State: "CA",
      City: "San Francisco",
      Zipcode: "94103",
    },
    {
      id: 5,
      fName: "Michael",
      lName: "Johnson",
      EmailId: "michael.johnson@example.com",
      Phone: "5556667777",
      empCode: "ES-005",
      gender: 2,
      genderName: "Male",
      nationality: 2,
      nationalityName: "United Kingdom",
      types: 1,
      typesName: "Regular",
      department: 2,
      departmentName: "Support",
      designation: 2,
      designationName: "Developer",
      BloodGroup: 5,
      BloodGroupName: "O+",
      empNo1: "1122334455",
      empNo2: "5566778899",
      Address: "101 Pine Street",
      country: 1,
      countryName: "United Kingdom",
      State: "London",
      City: "Westminster",
      Zipcode: "W1A 1AA",
    },
    {
      id: 6,
      fName: "Sophia",
      lName: "Williams",
      EmailId: "sophia.williams@example.com",
      Phone: "7778889999",
      empCode: "ES-006",
      gender: 3,
      genderName: "Female",
      nationality: 2,
      nationalityName: "United Kingdom",
      types: 1,
      typesName: "Regular",
      department: 1,
      departmentName: "UI/UX",
      designation: 2,
      designationName: "Developer",
      BloodGroup: 6,
      BloodGroupName: "AB+",
      empNo1: "2233445566",
      empNo2: "6655443322",
      Address: "202 Maple Street",
      country: 1,
      countryName: "United Kingdom",
      State: "London",
      City: "Westminster",
      Zipcode: "W1A 1AA",
    },
    {
      id: 7,
      fName: "James",
      lName: "Jones",
      EmailId: "james.jones@example.com",
      Phone: "3334445555",
      empCode: "ES-007",
      gender: 2,
      genderName: "Male",
      nationality: 1,
      nationalityName: "Choose",
      types: 1,
      typesName: "Regular",
      department: 4,
      departmentName: "Engineering",
      designation: 3,
      designationName: "Tester",
      BloodGroup: 7,
      BloodGroupName: "AB-",
      empNo1: "7788990011",
      empNo2: "1122334455",
      Address: "303 Cedar Street",
      country: 1,
      countryName: "United Kingdom",
      State: "London",
      City: "Westminster",
      Zipcode: "W1A 1AA",
    },
    {
      id: 8,
      fName: "Olivia",
      lName: "Garcia",
      EmailId: "olivia.garcia@example.com",
      Phone: "6667778888",
      empCode: "ES-008",
      gender: 3,
      genderName: "Female",
      nationality: 2,
      nationalityName: "United Kingdom",
      types: 1,
      typesName: "Regular",
      department: 3,
      departmentName: "HR",
      designation: 3,
      designationName: "Tester",
      BloodGroup: 1,
      BloodGroupName: "A+",
      empNo1: "5544332211",
      empNo2: "9988776655",
      Address: "404 Elm Street",
      country: 1,
      countryName: "United Kingdom",
      State: "London",
      City: "Westminster",
      Zipcode: "W1A 1AA",
    },
  ];

  return (
    <div>
      <div className="page-wrapper">
        <div className="content">
          <div className="page-header">
            <div className="add-item d-flex">
              <div className="page-title">
                <h4>Employees</h4>
                <h6>Manage your employees</h6>
              </div>
            </div>
            <FilterFunc />
            <div className="page-btn">
              <Link to={route.addemployee} className="btn btn-added">
                <PlusCircle className="me-2" />
                Add New Employee
              </Link>
            </div>
          </div>
          {/* /product list */}
          <div className="card">
            <div className="card-body pb-0">
              <div className="table-top table-top-two table-top-new">
                <div className="search-set mb-0">
                  <div className="total-employees">
                    <h6>
                      <Users />
                      Total Employees <span>{EmployeeData.length}</span>
                    </h6>
                  </div>
                  <div className="search-input">
                    <Link to="" className="btn btn-searchset">
                      <i data-feather="search" className="feather-search" />
                    </Link>
                    <input type="search" className="form-control" />
                  </div>
                </div>
                <div className="search-path d-flex align-items-center search-path-new">
                  <div className="d-flex">
                    <Link className="btn btn-filter" id="filter_search">
                      <Filter
                        className="filter-icon"
                        onClick={toggleFilterVisibility}
                      />
                      <span>
                        <ImageWithBasePath
                          src="assets/img/icons/closes.svg"
                          alt="img"
                        />
                      </span>
                    </Link>
                    <Link to={route.employeelist} className="btn-list">
                      <List />
                    </Link>
                    <Link to={route.employeegrid} className="btn-grid active">
                      <Grid />
                    </Link>
                  </div>
                  <div className="form-sort">
                    <Sliders className="info-img" />
                    <Select
                      className="select"
                      options={oldandlatestvalue}
                      placeholder="Newest"
                    />
                  </div>
                </div>
              </div>
              {/* /Filter */}
              <div
                className={`card${isFilterVisible ? " visible" : ""}`}
                id="filter_inputs"
                style={{ display: isFilterVisible ? "block" : "none" }}
              >
                <div className="card-body pb-0">
                  <div className="row">
                    <div className="col-lg-3 col-sm-6 col-12">
                      <div className="input-blocks">
                        <User className="info-img" />
                        <Select
                          className="select"
                          options={names}
                          placeholder="Choose Name"
                        />
                      </div>
                    </div>
                    <div className="col-lg-3 col-sm-6 col-12">
                      <div className="input-blocks">
                        <StopCircle className="info-img" />

                        <Select
                          className="select"
                          options={status}
                          placeholder="Choose Status"
                        />
                      </div>
                    </div>
                    <div className="col-lg-3 col-sm-6 col-12 ms-auto">
                      <div className="input-blocks">
                        <Link className="btn btn-filters ms-auto">
                          {" "}
                          <i
                            data-feather="search"
                            className="feather-search"
                          />{" "}
                          Search{" "}
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* /Filter */}
            </div>
          </div>
          {/* /product list */}
          <div className="employee-grid-widget">
            <div className="row">
              {EmployeeData.map((employee, index) => (
                <div
                  key={index}
                  className="col-xxl-3 col-xl-4 col-lg-6 col-md-6"
                >
                  <div className="employee-grid-profile">
                    <div className="profile-head">
                      <label className="checkboxs">
                        <input type="checkbox" />
                        <span className="checkmarks" />
                      </label>
                      <div className="profile-head-action">
                        <div className="dropdown profile-action">
                          <Link
                            to="#"
                            className="action-icon dropdown-toggle"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                          >
                            <MoreVertical />
                          </Link>
                          <ul className="dropdown-menu">
                            <li>
                              <Link
                                to={route.addemployee}
                                className="dropdown-item"
                                state={{ data: employee }}
                              >
                                <Edit className="info-img" />
                                Edit
                              </Link>
                            </li>
                            <li>
                              <Link
                                to="#"
                                className="dropdown-item confirm-text mb-0"
                                onClick={showConfirmationAlert}
                              >
                                <Trash2 className="info-img" />
                                Delete
                              </Link>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className="profile-info">
                      <div
                        className={`profile-pic ${
                          employee.status === "Active" ? "active-profile" : ""
                        }`}
                      >
                        <ImageWithBasePath
                          src={`assets/img/users/user-${employee.id}.jpg`}
                          alt=""
                        />
                      </div>
                      <h5>EMP ID : {employee.empCode}</h5>
                      <h4>
                        {employee.fName} {employee.lName}
                      </h4>
                      <span>{employee.designationName}</span>
                    </div>
                    <ul className="department">
                      <li>
                        Joined
                        <span>{employee.joined}</span>
                      </li>
                      <li>
                        Department
                        <span>{employee.departmentName}</span>
                      </li>
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="container-fluid">
            <div className="row custom-pagination">
              <div className="col-md-12">
                <div className="paginations d-flex justify-content-end mb-3">
                  <span>
                    <i className="fas fa-chevron-left" />
                  </span>
                  <ul className="d-flex align-items-center page-wrap">
                    <li>
                      <Link to="#" className="active">
                        1
                      </Link>
                    </li>
                    <li>
                      <Link to="#">2</Link>
                    </li>
                    <li>
                      <Link to="#">3</Link>
                    </li>
                    <li>
                      <Link to="#">4</Link>
                    </li>
                  </ul>
                  <span>
                    <i className="fas fa-chevron-right" />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeesGrid;
