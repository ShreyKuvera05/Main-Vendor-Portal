import React, { useEffect, useState } from "react";
import CountUp from "react-countup";
import Chart from "react-apexcharts";
import { Link } from "react-router-dom";
import ImageWithBasePath from "../../core/img/imagewithbasebath";
import { ArrowRight } from "react-feather";
import { all_routes } from "../../Router/all_routes";
import ReactLoader from "../../common/ReactLoader";
import ResSelect from "../../common/Resuable/ResSelect";
import { Table } from "antd";

let AgnVal;
let SupVal;
let AgnVal1;
let SupVal1;
let CompYVal;
let CompItemVal;
let CompQVVal;
let SupRejectionTopNo;
let SupRejectionAqv;
const PurchaseDashboard = () => {
  const route = all_routes;
  const { REACT_APP_PRO_COMP: comp, REACT_APP_PRO_FY: fy } = process.env;
  const url = localStorage.getItem("Url");
  const port = localStorage.getItem("Port");
  const [open, setOpen] = useState(false);
  const [cardDetails, setCardDetails] = useState({});
  const [topSupplierList, setTopSupplierList] = useState([]);
  const [topItemList, setTopItemList] = useState([]);
  const [series, setSeries] = useState([]);
  const [options, setOptions] = useState({
    chart: {
      height: 350,
      type: "line",
      zoom: {
        enabled: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "straight",
    },
    title: {
      text: "Product Trends",
      align: "left",
    },
    grid: {
      row: {
        colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
        opacity: 0.5,
      },
    },
    xaxis: {
      categories: [], // Initialize as empty, will be set dynamically
    },
  });
  const [comparisonSeries, setComparisonSeries] = useState([]);
  const [comparisonOptions, setComparisonOptions] = useState({
    chart: {
      height: 350,
      type: "line",
      dropShadow: {
        enabled: true,
        color: "#000",
        top: 18,
        left: 7,
        blur: 10,
        opacity: 0.2,
      },
      zoom: {
        enabled: false,
      },
      toolbar: {
        show: false,
      },
    },
    colors: ["#77B6EA", "#545454"],
    dataLabels: {
      enabled: true,
    },
    stroke: {
      curve: "smooth",
    },
    title: {
      text: "Average High & Low",
      align: "left",
    },
    grid: {
      borderColor: "#e7e7e7",
      row: {
        colors: ["#f3f3f3", "transparent"],
        opacity: 0.5,
      },
    },
    markers: {
      size: 1,
    },
    xaxis: {
      categories: [],
      title: {
        text: "Category",
      },
    },
    yaxis: {
      title: {
        text: "Value",
      },
      min: 0, // Adjust these based on your data if needed
      max: 25000000, // Adjust these based on your data if needed
    },
    legend: {
      position: "top",
      horizontalAlign: "right",
      floating: true,
      offsetY: -25,
      offsetX: -5,
    },
  });
  const [topRejectionSuppliersList, setTopRejectionSuppliersList] = useState(
    []
  );
  const SupplierListColumns = [
    {
      title: "Name",
      dataIndex: "Name",
      key: "name",
    },
    {
      title: "Purchase Amount",
      dataIndex: "Val",
      key: "val",
      render: (text) => <span>{Number(text).toLocaleString()}</span>, // Format the number
    },
  ];
  const rejectionSupplierColumns = [
    {
      title: "Supplier Name",
      dataIndex: "Name",
      key: "name",
    },
    {
      title: "Rejection Value",
      dataIndex: "Val",
      key: "val",
    },
  ];
  // ? Select List Configuration all
  const [selectedProduct, setSelectedProduct] = React.useState({
    PurchaseDetailType: null,
    TopSupplierNo: null,
    TopSupplierComparison: null,
    TopItemNo: null,
    TopItemComparison: null,
    ComparisonYear: null,
    ComparisonItemType: null,
    CompItemComparison: null,
    TopRejectionSuppliers: null,
    TopRejectionAQV: null,
  });

  // * Select List hardcoded
  const purchaseDetailsFilter = [
    { value: 1, label: "Item Group" },
    { value: 2, label: "Fixed" },
    { value: 3, label: "Item Type" },
    { value: 4, label: "Item Brand" },
    { value: 5, label: "SubCategory" },
    { value: 6, label: "Item Clearance" },
    { value: 7, label: "Item Class" },
    { value: 8, label: "Item Monthly" },
  ];
  const TopSuppliersNoFilter = [
    { value: 10, label: "10" },
    { value: 20, label: "20" },
    { value: 30, label: "30" },
    { value: 40, label: "40" },
    { value: 50, label: "50" },
  ];
  const TopSupplierFilter = [
    { value: 1, label: "Against Value" },
    { value: 2, label: "Against Quantity" },
  ];
  const comparisonYearDetails = [
    { value: 2020, label: "2020" },
    { value: 2021, label: "2021" },
    { value: 2022, label: "2022" },
    { value: 2023, label: "2023" },
    { value: 2024, label: "2024" },
  ];

  const handleSelectChange = (
    selectedOption,
    selectName,
    setSelectedProduct
  ) => {
    if (selectName === "PurchaseDetailType") {
      if (selectedOption !== null) {
        const value = selectedOption.value;
        getPurchaseDetailsData(value);
      }
    }
    if (selectName === "TopSupplierNo") {
      if (selectedOption !== null) {
        const value = selectedOption.value;
        SupVal = value;
      }
    }
    if (selectName === "TopSupplierComparison") {
      if (selectedOption !== null) {
        const Val = selectedOption.value;
        AgnVal = Val;
      }
    }
    if (selectName === "TopItemNo") {
      if (selectedOption !== null) {
        const Val = selectedOption.value;
        SupVal1 = Val;
      }
    }
    if (selectName === "TopItemComparison") {
      if (selectedOption !== null) {
        const Val = selectedOption.value;
        AgnVal1 = Val;
      }
    }
    if (selectName === "ComparisonYear") {
      if (selectedOption !== null) {
        CompYVal = selectedOption.value;
      }
    }
    if (selectName === "ComparisonItemType") {
      if (selectedOption !== null) {
        CompItemVal = selectedOption.value;
      }
    }
    if (selectName === "CompItemComparison") {
      if (selectedOption !== null) {
        CompQVVal = selectedOption.value;
      }
    }
    if (selectName === "TopRejectionSuppliers") {
      if (selectedOption !== null) {
        console.log(selectedOption);
        SupRejectionTopNo = selectedOption.value;
      }
    }
    if (selectName === "TopRejectionAQV") {
      if (selectedOption !== null) {
        SupRejectionAqv = selectedOption.value;
      }
    }
    setSelectedProduct((prevSelectedValues) => ({
      ...prevSelectedValues,
      [selectName]: selectedOption,
    }));
  };
  // ? --------------------------------------------------------------------------------- //

  // ! API CALLS FUNCTIONS--------------------------------------------------
  const getCardData = async () => {
    try {
      setOpen(true);
      const response = await fetch(
        `${url}:${port}/api/values/GetPurchaseDBCard?Comp=${comp}&FY=${fy}`
      );
      const result = await response.json();
      if (result.Status === 1) {
        setOpen(false);
        setCardDetails(result.Data);
      } else {
        setOpen(false);
      }
    } catch (err) {
      setOpen(false);
      console.log(err);
    }
  };

  const getPurchaseDetailsData = async (value) => {
    try {
      setOpen(true);
      const response = await fetch(
        `${url}:${port}/api/values/GetPurhcaseDBPurchaseDet?Comp=${comp}&FY=${fy}&ShowWith=${
          value || 1
        }`
      );

      const result = await response.json();
      if (result.Status === 1) {
        setOpen(false);
        const categories = result.Data.map((item) => item.Name);
        const transformedData = result.Data.map((item) => parseFloat(item.Qty));

        setSeries([{ name: "Purchase Data", data: transformedData }]);
        setOptions((prevOptions) => ({
          ...prevOptions,
          xaxis: {
            ...prevOptions.xaxis,
            categories: categories,
          },
        }));
      } else {
        setOpen(false);
        console.error("Failed to fetch data");
      }
    } catch (err) {
      setOpen(false);
      console.error("Error fetching data", err);
    }
  };

  const getTopSuppliersData = async (value) => {
    try {
      setOpen(true);
      const response = await fetch(
        `${url}:${port}/api/values/GetPurchaseDBTopSupp?Comp=${comp}&FY=${fy}&TopNo=${
          SupVal || 10
        }&AgnQV=${AgnVal || 1}`
      );
      const result = await response.json();
      if (result.Status === 1) {
        setOpen(false);
        setTopSupplierList(result.Data);
      } else {
        setOpen(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getTopItemData = async (value) => {
    try {
      setOpen(true);
      const response = await fetch(
        `${url}:${port}/api/values/GetPurchaseDBTopItem?Comp=${comp}&FY=${fy}&TopNo=${
          SupVal1 || 10
        }&AgnQV=${AgnVal1 || 1}`
      );
      const result = await response.json();
      if (result.Status === 1) {
        setOpen(false);
        setTopItemList(result.Data);
      } else {
        setOpen(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getComparisonData = async () => {
    try {
      const response = await fetch(
        `${url}:${port}/api/values/GetPurchaseDBComperision?Comp=${comp}&FY=${fy}&CompY=${
          CompYVal || 2023
        }&ShowWith=${CompItemVal || 1}&QV=${CompQVVal || 1}`
      );
      const result = await response.json();
      if (result.Status === 1) {
        setOpen(false);
        const data = result.Data;

        const parsedSeries = data.Series.map((serie) => ({
          name: serie.Name,
          data: serie.Data[0].split(",").map(Number),
        }));

        setComparisonSeries(parsedSeries);
        setComparisonOptions((prevOptions) => ({
          ...prevOptions,
          xaxis: {
            ...prevOptions.xaxis,
            categories: data.XAxisCategories[0].split(","),
          },
        }));
      } else {
        setOpen(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getPurchaseTopRejectionSupplier = async () => {
    try {
      setOpen(true);
      const response = await fetch(
        `${url}:${port}/api/values/GetPurchaseDBTopRejectionSupplier?FY=${fy}&Comp=${comp}&TopNo=${
          SupRejectionTopNo || 10
        }&AgnQV=${SupRejectionAqv || 1}`
      );
      const result = await response.json();
      if (result.Status === 1) {
        setOpen(false);
        setTopRejectionSuppliersList(result.Data);
      }
    } catch (err) {
      console.log(err);
    }
  };
  // ! -------------------------------------------------------

  useEffect(() => {
    getCardData();
    getPurchaseDetailsData();
    getTopSuppliersData();
    getTopItemData();
    getComparisonData();
    getPurchaseTopRejectionSupplier();
  }, []);
  useEffect(() => {
    if (AgnVal !== "undefined" || SupVal !== "undefined") {
      getTopSuppliersData();
      getTopItemData();
    }
  }, [AgnVal, SupVal]);

  useEffect(() => {
    if (AgnVal1 !== "undefined" || SupVal1 !== "undefined") {
      getTopSuppliersData();
      getTopItemData();
    }
  }, [AgnVal1, SupVal1]);

  useEffect(() => {
    if (
      CompYVal !== "undefined" ||
      CompItemVal !== "undefined" ||
      CompQVVal !== "undefined"
    ) {
      getComparisonData();
    }
  }, [CompYVal, CompItemVal, CompQVVal]);

  useEffect(() => {
    if (SupRejectionTopNo !== undefined || SupRejectionAqv !== undefined) {
      getPurchaseTopRejectionSupplier();
    }
  }, [SupRejectionTopNo, SupRejectionAqv]);
  const cardData = [
    {
      id: 0,
      icon: "fas fa-users",
      title: "Total Supplier",
      count: cardDetails[0]?.TotSup,
      percentage: 100,
      bgColor: "l-bg-cherry",
      progressBarColor: "l-bg-cyan",
      // handleDivClick: handleDivClick,
    },
    {
      id: 5,
      icon: "fas fa-users",
      title: "Monthly Purchase",
      count: cardDetails[0]?.MPur,
      percentage: 22,
      bgColor: "l-bg-blue-dark",
      progressBarColor: "l-bg-green",
      // handleDivClick: handleDivClick,
    },
    {
      id: 6,
      icon: "fas fa-users",
      title: "Previous day Purchase",
      count: cardDetails[0]?.PrvPur,
      percentage: 33,
      bgColor: "l-bg-green-dark",
      progressBarColor: "l-bg-orange",
      // handleDivClick: handleDivClick,
    },
    {
      id: 7,
      icon: "fas fa-users",
      title: "Yearly purchase",
      count: cardDetails[0]?.YPur,
      percentage: 99,
      bgColor: "l-bg-orange-dark",
      progressBarColor: "l-bg-cyan",
      // handleDivClick: handleDivClick,
    },
  ];
  return (
    <div>
      <ReactLoader open={open} />s
      <div className="page-wrapper">
        <div className="content">
          <div className="container">
            <div className="row">
              {cardData.map((card) => (
                <div
                  key={card.id}
                  className="col-xl-3 col-lg-3 col-md-6 col-sm-6"
                  style={{ cursor: "pointer", color: "white" }}
                >
                  <div
                    className={`cardsx ${card.bgColor}`}
                    style={{ color: "white" }}
                  >
                    <div className="cardsx-statistic-3 p-4">
                      <div className="cardsx-icon cardsx-icon-large">
                        <i className={card.icon}></i>
                      </div>
                      <div className="mb-4">
                        <h5 className="cardsx-title mb-0">{card.title}</h5>
                      </div>
                      <div className="row align-items-center mb-2 d-flex">
                        <div className="col-8">
                          <h2 className="d-flex align-items-center mb-0 cardsx-title">
                            <CountUp end={card.count} />
                          </h2>
                        </div>
                        <div className="col-4 text-right">
                          <span>
                            {/* {card.percentage} <i className="fa fa-percent"></i> */}
                          </span>
                        </div>
                      </div>
                      {/* <div
                        className="progress mt-1"
                        data-height="8"
                        style={{ height: "8px" }}
                      >
                        <div
                          className={`progress-bar ${card.progressBarColor}`}
                          role="progressbar"
                          data-width={`${card.percentage}%`}
                          aria-valuenow={card.percentage}
                          aria-valuemin="0"
                          aria-valuemax="100"
                          style={{ width: `${card.percentage}%` }}
                        ></div>
                      </div> */}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* // ? First Cards */}
          <div className="row">
            {/* // ? Purchase Details Code  */}
            <div className="col-xl-8 col-sm-12 col-12 d-flex">
              <div className="card flex-fill">
                <div className="card-header d-flex justify-content-between align-items-center">
                  <h5 className="card-title mb-0">Purchase Details</h5>
                  <div className="graph-sets">
                    <div className="dropdown dropdown-wraper">
                      <ResSelect
                        options={purchaseDetailsFilter}
                        value={selectedProduct.PurchaseDetailType}
                        onChange={(selectedOption) =>
                          handleSelectChange(
                            selectedOption,
                            "PurchaseDetailType",
                            setSelectedProduct
                          )
                        }
                        id="select21"
                        isMulti={false}
                        placeholder="Item Group"
                      />
                    </div>
                  </div>
                </div>
                <div className="card-body">
                  <div id="sales_charts" />
                  <Chart
                    options={options}
                    series={series}
                    type="line"
                    height={350}
                  />
                </div>
              </div>
            </div>
            {/* // ? Top Suppliers Code  */}
            <div className="col-xl-4 col-sm-12 col-12 d-flex">
              <div className="card flex-fill default-cover mb-4">
                <div className="card-header d-flex justify-content-between align-items-center">
                  <div className="d-flex align-items-center">
                    <h4 className="card-title mb-0 me-2">Top </h4>
                    <ResSelect
                      options={TopSuppliersNoFilter}
                      value={selectedProduct.TopSupplierNo}
                      onChange={(selectedOption) =>
                        handleSelectChange(
                          selectedOption,
                          "TopSupplierNo",
                          setSelectedProduct
                        )
                      }
                      id="select21"
                      isMulti={false}
                      placeholder="10"
                    />
                    <h4 className="card-title mb-0 ms-2">Suppliers</h4>
                  </div>
                  <div className="view-all-link">
                    {/* <Link to="#" className="view-all d-flex align-items-center">
                      View All
                      <span className="ps-2 d-flex align-items-center">
                        <ArrowRight className="feather-16" />
                      </span>
                    </Link> */}
                    <ResSelect
                      options={TopSupplierFilter}
                      value={selectedProduct.TopSupplierComparison}
                      onChange={(selectedOption) =>
                        handleSelectChange(
                          selectedOption,
                          "TopSupplierComparison",
                          setSelectedProduct
                        )
                      }
                      id="select21"
                      isMulti={false}
                      placeholder="Against value"
                    />
                  </div>
                </div>

                <div className="card-body">
                  <div className="table-responsive">
                    <Table
                      columns={SupplierListColumns}
                      dataSource={topSupplierList}
                      rowKey="Name"
                      pagination={{ pageSize: 5 }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* // ! First Cards END */}
          {/* // ? Second Cards*/}
          <div className="row">
            {/* // ? Comparison Details */}
            <div className="col-xl-8 col-sm-12 col-12 d-flex">
              <div className="card flex-fill">
                <div className="card-header d-flex justify-content-between align-items-center">
                  <h5 className="card-title mb-0">Comparison Details</h5>
                  <div className="graph-sets">
                    <div className="dropdown dropdown-wraper">
                      <ResSelect
                        options={comparisonYearDetails}
                        value={selectedProduct.ComparisonYear}
                        onChange={(selectedOption) =>
                          handleSelectChange(
                            selectedOption,
                            "ComparisonYear",
                            setSelectedProduct
                          )
                        }
                        id="select21"
                        isMulti={false}
                        placeholder="2023"
                      />
                    </div>
                    <div className="dropdown dropdown-wraper">
                      <ResSelect
                        options={purchaseDetailsFilter}
                        value={selectedProduct.ComparisonItemType}
                        onChange={(selectedOption) =>
                          handleSelectChange(
                            selectedOption,
                            "ComparisonItemType",
                            setSelectedProduct
                          )
                        }
                        id="select21"
                        isMulti={false}
                        placeholder="Item Group"
                      />
                    </div>
                    <div className="dropdown dropdown-wraper">
                      <ResSelect
                        options={TopSupplierFilter}
                        value={selectedProduct.CompItemComparison}
                        onChange={(selectedOption) =>
                          handleSelectChange(
                            selectedOption,
                            "CompItemComparison",
                            setSelectedProduct
                          )
                        }
                        id="select21"
                        isMulti={false}
                        placeholder="Against value"
                      />
                    </div>
                  </div>
                </div>
                <div className="card-body">
                  <div id="sales_charts" />
                  <Chart
                    options={comparisonOptions}
                    series={comparisonSeries}
                    type="line"
                    height={350}
                  />
                </div>
              </div>
            </div>
            {/* // ? Top 10 items */}
            <div className="col-xl-4 col-sm-12 col-12 d-flex">
              <div className="card flex-fill">
                <div className="card-header d-flex justify-content-between align-items-center">
                  <div className="d-flex align-items-center">
                    <h4 className="card-title mb-0 me-2">Top </h4>
                    <ResSelect
                      options={TopSuppliersNoFilter}
                      value={selectedProduct.TopItemNo}
                      onChange={(selectedOption) =>
                        handleSelectChange(
                          selectedOption,
                          "TopItemNo",
                          setSelectedProduct
                        )
                      }
                      id="select21"
                      isMulti={false}
                      placeholder="10"
                    />
                    <h4 className="card-title mb-0 ms-2">Items</h4>
                  </div>
                  <div className="view-all-link">
                    <ResSelect
                      options={TopSupplierFilter}
                      value={selectedProduct.TopItemComparison}
                      onChange={(selectedOption) =>
                        handleSelectChange(
                          selectedOption,
                          "TopItemComparison",
                          setSelectedProduct
                        )
                      }
                      id="select21"
                      isMulti={false}
                      placeholder="Against value"
                    />
                  </div>
                </div>
                <div className="card-body">
                  <div className="table-responsive">
                    <Table
                      columns={SupplierListColumns}
                      dataSource={topItemList}
                      rowKey="Name"
                      pagination={{ pageSize: 5 }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* // ! Second Cards END */}

          {/* // ? Third Cards*/}
          <div className="row">
            {/* // ? Comparison Details */}
            <div className="col-xl-8 col-sm-12 col-12 d-flex">
              <div className="card flex-fill">
                <div className="card-header d-flex justify-content-between align-items-center">
                  <h5 className="card-title mb-0">Comparison Details</h5>
                  <div className="graph-sets">
                    <div className="dropdown dropdown-wraper">
                      <ResSelect
                        options={comparisonYearDetails}
                        value={selectedProduct.ComparisonYear}
                        onChange={(selectedOption) =>
                          handleSelectChange(
                            selectedOption,
                            "ComparisonYear",
                            setSelectedProduct
                          )
                        }
                        id="select21"
                        isMulti={false}
                        placeholder="2023"
                      />
                    </div>
                    <div className="dropdown dropdown-wraper">
                      <ResSelect
                        options={purchaseDetailsFilter}
                        value={selectedProduct.ComparisonItemType}
                        onChange={(selectedOption) =>
                          handleSelectChange(
                            selectedOption,
                            "ComparisonItemType",
                            setSelectedProduct
                          )
                        }
                        id="select21"
                        isMulti={false}
                        placeholder="Item Group"
                      />
                    </div>
                    <div className="dropdown dropdown-wraper">
                      <ResSelect
                        options={TopSupplierFilter}
                        value={selectedProduct.CompItemComparison}
                        onChange={(selectedOption) =>
                          handleSelectChange(
                            selectedOption,
                            "CompItemComparison",
                            setSelectedProduct
                          )
                        }
                        id="select21"
                        isMulti={false}
                        placeholder="Against value"
                      />
                    </div>
                  </div>
                </div>
                <div className="card-body">
                  <div id="sales_charts" />
                  <Chart
                    options={comparisonOptions}
                    series={comparisonSeries}
                    type="line"
                    height={350}
                  />
                </div>
              </div>
            </div>
            {/* // ? Top 10 items */}
            <div className="col-xl-4 col-sm-12 col-12 d-flex">
              <div className="card flex-fill">
                <div className="card-header d-flex justify-content-between align-items-center">
                  <div className="d-flex align-items-center">
                    <h4 className="card-title mb-0 me-2">Top </h4>
                    <ResSelect
                      options={TopSuppliersNoFilter}
                      value={selectedProduct.TopRejectionSuppliers}
                      onChange={(selectedOption) =>
                        handleSelectChange(
                          selectedOption,
                          "TopRejectionSuppliers",
                          setSelectedProduct
                        )
                      }
                      id="select21"
                      isMulti={false}
                      placeholder="10"
                    />
                    <h4 className="card-title mb-0 ms-2">
                      Rejection Suppliers
                    </h4>
                  </div>
                  <div className="view-all-link">
                    <ResSelect
                      options={TopSupplierFilter}
                      value={selectedProduct.TopRejectionAQV}
                      onChange={(selectedOption) =>
                        handleSelectChange(
                          selectedOption,
                          "TopRejectionAQV",
                          setSelectedProduct
                        )
                      }
                      id="select21"
                      isMulti={false}
                      placeholder="Against value"
                    />
                  </div>
                </div>
                <div className="card-body">
                  <div className="table-responsive">
                    <Table
                      columns={rejectionSupplierColumns}
                      dataSource={topRejectionSuppliersList}
                      rowKey="Name"
                      pagination={{ pageSize: 5 }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* // ! Thrid Cards END */}
        </div>
      </div>
    </div>
  );
};

export default PurchaseDashboard;
