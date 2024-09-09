import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Filter, Sliders } from "react-feather";
import Select from "react-select";
import { Globe, User } from "react-feather";
import ImageWithBasePath from "../../img/imagewithbasebath";
import Breadcrumbs from "../../breadcrumbs";
import Table from "../../pagination/datatable.jsx";
import AddWareHouse from "../addwarehouse.jsx";
import { Edit, Eye, Trash2 } from "feather-icons-react/build/IconComponents";

const WareHouses = () => {
  const [sendData, setSendData] = useState([]);
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const toggleFilterVisibility = () => {
    setIsFilterVisible((prevVisibility) => !prevVisibility);
  };

  const options = [
    { value: "sortByDate", label: "Sort by Date" },
    { value: "140923", label: "14 09 23" },
    { value: "110923", label: "11 09 23" },
  ];
  const optionsTwo = [
    { label: "Choose Store Name", value: "" },
    { label: "Benjamin", value: "Benjamin" },
    { label: "Ellen", value: "Ellen" },
    { label: "Freda", value: "Freda" },
    { label: "Kaitlin", value: "Kaitlin" },
  ];

  const countries = [
    { label: "Choose Country", value: "" },
    { label: "India", value: "India" },
    { label: "USA", value: "USA" },
  ];

  const warehouseData = [
    {
      key: "1",
      warehouse: "Legendary",
      contactPersonName: "Steven",
      contactPerson: 2,
      phone: "+1 45445 4454",
      totalProducts: "04",
      stock: "55",
      qty: "600",
      createdOn: "04 Aug 2023",
      status: "Active",
      countryName: "Egypt",
      country: 1,
      email: "Legendary@gmail.com",
    },
    {
      key: "2",
      warehouse: "Determined",
      contactPersonName: "Gravely",
      contactPerson: 3,
      phone: "+1 63728 3467",
      totalProducts: "04",
      stock: "60",
      qty: "300",
      createdOn: "18 Sep 2023",
      status: "Active",
      countryName: "United Kingdom",
      country: 2,
      email: "Determined@gmail.com",
    },
    {
      key: "3",
      warehouse: "Sincere",
      contactPersonName: "Kevin",
      contactPerson: 4,
      phone: "+1 95628 1036",
      totalProducts: "04",
      stock: "26",
      qty: "250",
      createdOn: "05 Oct 2023",
      status: "Active",
      countryName: "United States",
      country: 3,
      email: "Sincere@gmail.com",
    },
    {
      key: "4",
      warehouse: "Pretty",
      contactPersonName: "Alex",
      contactPerson: 1,
      phone: "+1 65730 1603",
      totalProducts: "04",
      stock: "47",
      qty: "400",
      createdOn: "21 Nov 2023",
      status: "Active",
      countryName: "Africa",
      country: 4,
      email: "Pretty@gmail.com",
    },
  ];

  const handleEdit = (data) => {
    const statusVal = data.status === "Active" ? 1 : 0;
    const updatedData = {
      ...data,
      status: statusVal,
    };
    setSendData(updatedData);
  };
  const columns = [
    {
      title: "Warehouse",
      dataIndex: "warehouse",
    },
    {
      title: "Contact Person",
      dataIndex: "contactPersonName",
      render: (text, record) => (
        <div className="userimgname">
          <Link to="#">{text}</Link>
        </div>
      ),
    },
    {
      title: "Phone",
      dataIndex: "phone",
    },
    {
      title: "Country",
      dataIndex: "countryName",
    },
    {
      title: "Total Products",
      dataIndex: "totalProducts",
    },
    {
      title: "Stock",
      dataIndex: "stock",
    },
    {
      title: "Qty",
      dataIndex: "qty",
    },
    {
      title: "Created On",
      dataIndex: "createdOn",
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (text) => <span className="badge badge-linesuccess">{text}</span>,
    },
    {
      title: "Actions",
      key: "actions",
      render: (record) => (
        <td className="action-table-data">
          <div className="edit-delete-action">
            <Link className="me-2 p-2" to="#">
              <Eye className="feather-view" />
            </Link>
            <Link
              className="me-2 p-2"
              to="#"
              data-bs-toggle="modal"
              data-bs-target="#add-units"
              onClick={() => handleEdit(record)}
            >
              <Edit className="feather-edit" />
            </Link>
            <Link className="confirm-text p-2" to="#">
              <Trash2 className="feather-trash-2" />
            </Link>
          </div>
        </td>
      ),
    },
  ];

  return (
    <div className="page-wrapper">
      <div className="content">
        <Breadcrumbs
          maintitle="Warehouse"
          subtitle="Manage Your Warehouse"
          addButton="Add New Warehouse"
        />

        {/* /product list */}
        <div className="card table-list-card">
          <div className="card-body">
            <div className="table-top">
              <div className="search-set">
                <div className="search-input">
                  <input
                    type="text"
                    placeholder="Search"
                    className="form-control form-control-sm formsearch"
                  />
                  <Link to className="btn btn-searchset">
                    <i data-feather="search" className="feather-search" />
                  </Link>
                </div>
              </div>
              <div className="search-path">
                <Link
                  className={`btn btn-filter ${
                    isFilterVisible ? "setclose" : ""
                  }`}
                  id="filter_search"
                >
                  <Filter
                    className="filter-icon"
                    onClick={toggleFilterVisibility}
                  />
                  <span onClick={toggleFilterVisibility}>
                    <ImageWithBasePath
                      src="assets/img/icons/closes.svg"
                      alt="img"
                    />
                  </span>
                </Link>
              </div>
              <div className="form-sort stylewidth">
                <Sliders className="info-img" />

                <Select
                  className="select "
                  options={options}
                  placeholder="Sort by Date"
                />
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
                        options={optionsTwo}
                        placeholder="Choose Store Name"
                      />
                    </div>
                  </div>
                  <div className="col-lg-3 col-sm-6 col-12">
                    <div className="input-blocks">
                      <Globe className="info-img" />
                      <Select
                        options={countries}
                        placeholder="Choose Country"
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
            <div className="table-responsive">
              <Table columns={columns} dataSource={warehouseData} />
            </div>
          </div>
        </div>
        {/* /product list */}
      </div>

      <div>
        {/* Add Warehouse */}
        <AddWareHouse loadData={sendData} />
        {/* /Add Warehouse */}
      </div>
    </div>
  );
};

export default WareHouses;
