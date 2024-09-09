import React, { useState } from "react";
import Select from "react-select";
import ImageWithBasePath from "../../core/img/imagewithbasebath";
import { Filter, Sliders, User, Phone, Eye, Trash2 } from "react-feather";

import { Link } from "react-router-dom";
import Breadcrumbs from "../../core/breadcrumbs";
import Table from "../../core/pagination/datatable";
import withReactContent from "sweetalert2-react-content";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import { all_routes } from "../../Router/all_routes";
import Edit from "feather-icons-react/build/IconComponents/Edit";
import ReactLoader from "../../common/ReactLoader";
const MaterialDispatch = () => {
  const route = all_routes;
  const data = useSelector((state) => state.product_list);

  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const toggleFilterVisibility = () => {
    setIsFilterVisible((prevVisibility) => !prevVisibility);
  };
  const options = [
    { value: "sortByDate", label: "Sort by Date" },
    { value: "Newest", label: "Newest" },
    { value: "Oldest", label: "Oldest" },
  ];

  const optionsCalls = [
    { value: "all", label: "All Calls" },
    { value: "missed", label: "Missed Calls" },
    { value: "outgoing", label: "Outgoing Calls" },
    { value: "incoming", label: "Incoming Calls" },
  ];

  const optionsNames = [
    { value: "thomas", label: "Thomas" },
    { value: "rose", label: "Rose" },
  ];

  const columns = [
    {
      title: "Product",
      dataIndex: "product",
      render: (text, record) => (
        <span className="productimgname">
          <Link to="/profile" className="product-img stock-img">
            <ImageWithBasePath alt="" src={record.productImage} />
          </Link>
          <Link to="/profile">{text}</Link>
        </span>
      ),
      sorter: (a, b) => a.product.length - b.product.length,
    },
    {
      title: "SKU",
      dataIndex: "sku",
      sorter: (a, b) => a.sku.length - b.sku.length,
    },

    {
      title: "Category",
      dataIndex: "category",
      sorter: (a, b) => a.category.length - b.category.length,
    },

    {
      title: "Brand",
      dataIndex: "brand",
      sorter: (a, b) => a.brand.length - b.brand.length,
    },
    {
      title: "Price",
      dataIndex: "price",
      sorter: (a, b) => a.price.length - b.price.length,
    },
    {
      title: "Unit",
      dataIndex: "unit",
      sorter: (a, b) => a.unit.length - b.unit.length,
    },
    {
      title: "Qty",
      dataIndex: "qty",
      sorter: (a, b) => a.qty.length - b.qty.length,
    },

    {
      title: "Created By",
      dataIndex: "createdby",
      render: (text, record) => (
        <span className="userimgname">
          <Link to="/profile" className="product-img">
            <ImageWithBasePath alt="" src={record.img} />
          </Link>
          <Link to="/profile">{text}</Link>
        </span>
      ),
      sorter: (a, b) => a.createdby.length - b.createdby.length,
    },
    {
      title: "Action",
      dataIndex: "action",
      render: () => (
        <td className="action-table-data">
          <div className="edit-delete-action">
            <div className="input-block add-lists"></div>
            <Link className="me-2 p-2" to={route.productdetails}>
              <Eye className="feather-view" />
            </Link>
            <Link className="me-2 p-2" to={route.editproduct}>
              <Edit className="feather-edit" />
            </Link>
            <Link
              className="confirm-text p-2"
              to="#"
              onClick={showConfirmationAlert}
            >
              <Trash2 className="feather-trash-2" />
            </Link>
          </div>
        </td>
      ),
      sorter: (a, b) => a.createdby.length - b.createdby.length,
    },
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
  return (
    <div className="page-wrapper">
      <div className="content">
        <Breadcrumbs maintitle="Call History" subtitle="Manage your products" />
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
              <div className="form-sort">
                <Sliders className="info-img" />
                <Select
                  className="select stylewidth"
                  options={options}
                  placeholder="Sort By Date"
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
                  <div className="col-lg-12 col-sm-12">
                    <div className="row">
                      <div className="col-lg-3 col-sm-6 col-12">
                        <div className="input-blocks">
                          <User className="info-img" />
                          <Select
                            className="select"
                            options={optionsNames}
                            placeholder="Choose Name"
                          />
                        </div>
                      </div>
                      <div className="col-lg-3 col-sm-6 col-12">
                        <div className="input-blocks">
                          <Phone className="info-img" />
                          <Select
                            className="select"
                            options={optionsCalls}
                            placeholder="Choose Calls"
                          />
                        </div>
                      </div>
                      <div className="col-lg-6 col-sm-6 col-12">
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
              </div>
            </div>
            {/* /Filter */}
            <div className="table-responsive">
              <Table columns={columns} dataSource={data} />
            </div>
          </div>
        </div>
        {/* /product list */}
      </div>
    </div>
  );
};

export default MaterialDispatch;
