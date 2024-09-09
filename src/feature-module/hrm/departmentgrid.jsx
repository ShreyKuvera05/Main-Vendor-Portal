import React, { useState } from "react";
import ImageWithBasePath from "../../core/img/imagewithbasebath";
import { Link } from "react-router-dom/dist";
import { all_routes } from "../../Router/all_routes";
import {
  Edit,
  FileText,
  MoreVertical,
  PlusCircle,
  Trash2,
  Users,
} from "feather-icons-react/build/IconComponents";
import AddDepartment from "../../core/modals/hrm/adddepartment";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import FilterFunc from "../../core/pagination/Filter";

const DepartmentGrid = () => {
  const route = all_routes;
  const dispatch = useDispatch();
  const data = useSelector((state) => state.toggle_header);

  const [sendData, setSendData] = useState([]);
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

  const DepData = {
    employees: [
      {
        department: "UI/UX",
        status: "active",
        name: "Mitchum Daniel",
        profilePic: "assets/img/users/user-01.jpg",
        totalMembers: 7,
        teamMembers: [
          "assets/img/users/user-01.jpg",
          "assets/img/users/user-02.jpg",
          "assets/img/users/user-03.jpg",
          "assets/img/users/user-04.jpg",
        ],
        HodVal: 1,
      },
      {
        department: "HR",
        status: "active",
        name: "Susan Lopez",
        profilePic: "assets/img/users/user-02.jpg",
        totalMembers: 5,
        teamMembers: [
          "assets/img/users/user-03.jpg",
          "assets/img/users/user-04.jpg",
          "assets/img/users/user-05.jpg",
        ],
        HodVal: 2,
      },
      {
        department: "Admin",
        status: "inactive",
        name: "Robert Grossman",
        profilePic: "assets/img/users/user-03.jpg",
        totalMembers: 6,
        teamMembers: [
          "assets/img/users/user-03.jpg",
          "assets/img/users/user-04.jpg",
          "assets/img/users/user-06.jpg",
          "assets/img/users/user-05.jpg",
        ],
        HodVal: 3,
      },
      {
        department: "Admin",
        status: "active",
        name: "Janet Hembre",
        profilePic: "assets/img/users/user-06.jpg",
        totalMembers: 4,
        teamMembers: [
          "assets/img/users/user-03.jpg",
          "assets/img/users/user-04.jpg",
          "assets/img/users/user-06.jpg",
          "assets/img/users/user-05.jpg",
        ],
        HodVal: 4,
      },
      {
        department: "Technician",
        status: "inactive",
        name: "Russell Belle",
        profilePic: "assets/img/users/user-04.jpg",
        totalMembers: 8,
        teamMembers: [
          "assets/img/users/user-03.jpg",
          "assets/img/users/user-04.jpg",
          "assets/img/users/user-06.jpg",
          "assets/img/users/user-05.jpg",
        ],
        HodVal: 5,
      },
      {
        department: "Engineering",
        status: "inactive",
        name: "Susan Moore",
        profilePic: "assets/img/users/user-07.jpg",
        totalMembers: 10,
        teamMembers: [
          "assets/img/users/user-03.jpg",
          "assets/img/users/user-04.jpg",
          "assets/img/users/user-06.jpg",
          "assets/img/users/user-09.jpg",
          "assets/img/users/user-05.jpg",
        ],
        HodVal: 6,
      },
      {
        department: "Admin",
        status: "inactive",
        name: "Lance Jackson",
        profilePic: "assets/img/users/user-08.jpg",
        totalMembers: 3,
        teamMembers: [
          "assets/img/users/user-03.jpg",
          "assets/img/users/user-04.jpg",
          "assets/img/users/user-06.jpg",
          "assets/img/users/user-05.jpg",
        ],
        HodVal: 7,
      },
      {
        department: "PHP Development",
        status: "inactive",
        name: "Mitchum Daniel",
        profilePic: "assets/img/users/user-11.jpg",
        totalMembers: 9,
        teamMembers: [
          "assets/img/users/user-03.jpg",
          "assets/img/users/user-04.jpg",
          "assets/img/users/user-06.jpg",
          "assets/img/users/user-05.jpg",
        ],
        HodVal: 1,
      },
      {
        department: "React",
        status: "active",
        name: "Susan Moore",
        profilePic: "assets/img/users/user-12.jpg",
        totalMembers: 7,
        teamMembers: [
          "assets/img/users/user-03.jpg",
          "assets/img/users/user-04.jpg",
          "assets/img/users/user-06.jpg",
          "assets/img/users/user-05.jpg",
        ],
        HodVal: 6,
      },
      {
        department: "Angular",
        status: "active",
        name: "Lance Jackson",
        profilePic: "assets/img/users/user-09.jpg",
        totalMembers: 7,
        teamMembers: [
          "assets/img/users/user-03.jpg",
          "assets/img/users/user-04.jpg",
          "assets/img/users/user-06.jpg",
          "assets/img/users/user-05.jpg",
        ],
        HodVal: 7,
      },
      {
        department: "NodeJS",
        status: "active",
        name: "Robert Grossman",
        profilePic: "assets/img/users/user-13.jpg",
        totalMembers: 7,
        teamMembers: [
          "assets/img/users/user-03.jpg",
          "assets/img/users/user-04.jpg",
          "assets/img/users/user-06.jpg",
          "assets/img/users/user-05.jpg",
        ],
        HodVal: 3,
      },
    ],
  };

  const handleEdit = (data) => {
    const statusVal = data.status === "active" ? 1 : 0;
    const submitData = {
      ...data,
      status: statusVal,
    };
    setSendData(submitData);
  };

  return (
    <div>
      <div className="page-wrapper">
        <div className="content">
          <div className="page-header">
            <div className="add-item d-flex">
              <div className="page-title">
                <h4>Department</h4>
                <h6>Manage your departments</h6>
              </div>
            </div>
            <FilterFunc />
            <div className="page-btn">
              <Link
                to="#"
                className="btn btn-added"
                data-bs-toggle="modal"
                data-bs-target="#add-department"
              >
                <PlusCircle className="me-2" />
                Add New Department
              </Link>
            </div>
          </div>
          {/* /product list */}
          <div className="card">
            <div className="card-body pb-0">
              <div className="table-top table-top-new">
                <div className="search-set mb-0">
                  <div className="total-employees">
                    <h6>
                      <Users />
                      Total Employees <span>21</span>
                    </h6>
                  </div>
                  {/* <div className="search-input">
                    <Link to="" className="btn btn-searchset">
                      <i data-feather="search" className="feather-search" />
                    </Link>
                    <input type="search" className="form-control" />
                  </div> */}
                </div>
                {/* <div className="search-path d-flex align-items-center search-path-new">
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
                    <Link to={route.departmentgrid} className="btn-list">
                      <List />
                    </Link>
                    <Link to={route.departmentgrid} className="btn-grid active">
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
                </div> */}
              </div>
              {/* /Filter */}
              {/* <div
                className={`card${isFilterVisible ? " visible" : ""}`}
                id="filter_inputs"
                style={{ display: isFilterVisible ? "block" : "none" }}
              >
                <div className="card-body pb-0">
                  <div className="row">
                    <div className="col-lg-3 col-sm-6 col-12">
                      <div className="input-blocks">
                        <FileText className="info-img" />
                        <Select
                          className="select"
                          options={departmentsector}
                          placeholder="Choose"
                        />
                      </div>
                    </div>
                    <div className="col-lg-3 col-sm-6 col-12">
                      <div className="input-blocks">
                        <Users className="info-img" />
                        <Select
                          className="select"
                          options={hodlist}
                          placeholder="Choose HOD"
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
              </div> */}
              {/* /Filter */}
            </div>
          </div>
          {/* /product list */}
          <div className="employee-grid-widget">
            <div className="row">
              {DepData.employees.map((employee, index) => (
                <div
                  className="col-xxl-3 col-xl-4 col-lg-6 col-md-6"
                  key={index}
                >
                  <div className="employee-grid-profile">
                    <div className="profile-head">
                      <div className="dep-name">
                        <h5
                          className={
                            employee.status === "active" ? "active" : "inactive"
                          }
                        >
                          {employee.department}
                        </h5>
                      </div>
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
                                to="#"
                                className="dropdown-item"
                                data-bs-toggle="modal"
                                data-bs-target="#add-department"
                                onClick={() => handleEdit(employee)}
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
                    <div className="profile-info department-profile-info">
                      <div className="profile-pic">
                        <ImageWithBasePath src={employee.profilePic} alt="" />
                      </div>
                      <h4>{employee.name}</h4>
                    </div>
                    <ul className="team-members">
                      <li>Total Members: {employee.totalMembers}</li>
                      <li>
                        <ul>
                          {employee.teamMembers.map((member, memberIndex) => (
                            <li key={memberIndex}>
                              <Link to="#">
                                <ImageWithBasePath src={member} alt="" />
                              </Link>
                            </li>
                          ))}
                        </ul>
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
      <AddDepartment loadData={sendData} />
    </div>
  );
};

export default DepartmentGrid;
