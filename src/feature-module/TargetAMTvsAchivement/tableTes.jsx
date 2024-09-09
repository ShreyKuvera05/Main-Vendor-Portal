/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import Select from "react-select";
import { DatePicker, Table } from "antd";
import jsPDF from "jspdf";
import "jspdf-autotable";
import toast from "react-hot-toast";
import ReactLoader from "../../common/ReactLoader";
import moment from "moment";
const TableTes = () => {
  const {
    REACT_APP_PRO_BASEURL: url,
    REACT_APP_PRO_PORT: port,
    REACT_APP_PRO_COMP: comp,
    REACT_APP_PRO_FY: fy,
  } = process.env;
  const userData = JSON.parse(sessionStorage.getItem("Data"));
  const [open, setOpen] = useState(false);
  const [customerList, setCustomerList] = useState([]);
  const [selectedOption, setSelectedOption] = useState({});
  const [currentDate, setCurrentDate] = useState(
    moment().format("DD-MMM-YYYY")
  );
  const [data, setData] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [filteredData, setFilteredData] = useState([]);
  const [sortConfig, setSortConfig] = useState(null);
  const [filters, setFilters] = useState({});
  useEffect(() => {
    const intervalId = setInterval(
      () => setCurrentDate(moment().format("DD-MMM-YYYY")),
      1000
    );
    return () => clearInterval(intervalId);
  }, []);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    const formattedDate = moment(date).format("DD-MMM-YYYY");
    console.log("formattedDate: ", formattedDate);
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    doc
      .setFontSize(18)
      .text("Customer Data Report", 14, 22)
      .setFontSize(12)
      .text(`Generated on: ${currentDate}`, 14, 30);

    const columns = ["Customer", "Name", "Month", "Category", "Type"];
    const rows = data.map(({ key, Customer, Name, Month, category, type }) => [
      key,
      Customer,
      Name,
      Month,
      category,
      type,
    ]);

    doc.autoTable({
      startY: 35,
      head: [columns],
      body: rows,
      styles: {
        fontSize: 10,
        cellPadding: 3,
        halign: "center",
        valign: "middle",
      },
      headStyles: {
        fillColor: [0, 0, 128],
        textColor: [255, 255, 255],
        fontStyle: "bold",
      },
      bodyStyles: { fillColor: [245, 245, 245] },
      alternateRowStyles: { fillColor: [255, 255, 255] },
      columnStyles: {
        0: { halign: "center" },
        1: { halign: "left" },
        2: { halign: "left" },
        3: { halign: "right" },
        4: { halign: "center" },
      },
    });

    doc.save("data.pdf");
  };

  const fetchCustomerList = async () => {
    setOpen(true);
    try {
      const response = await fetch(
        `${url}:${port}/api/values/GetAccMasterList?Comp=${comp}&FY=${fy}&Ucode=${userData[0].AccCode}`
      );
      const result = await response.json();
      setOpen(false);
      if (result.Status === 1) {
        setCustomerList(
          result.Data.map(({ AccCode, AccName }) => ({
            value: AccCode,
            label: AccName,
          }))
        );
      } else {
        toast.error("Failed in retrieving Data");
      }
    } catch (error) {
      setOpen(false);
      console.error(error);
    }
  };

  useEffect(() => {
    fetchCustomerList();
  }, []);

  const handleSelectChange = (option) => setSelectedOption(option);

  const fetchTableData = async () => {
    setOpen(true);
    try {
      const response = await fetch(
        `${url}:${port}/api/values/AmtTargetVsAchvRpt?Comp=${comp}&FY=${fy}&AccCode=${selectedOption.value}`
      );
      const result = await response.json();
      setOpen(false);
      if (result.Status === 1) {
        setData(mapData(result.Data));
        setFilteredData(mapData(result.Data));
      } else {
        setData([]);
        toast.error("Failed in retrieving Data");
      }
    } catch (error) {
      setOpen(false);
      console.error(error);
    }
  };
  const handleSort = (key) => {
    let direction = "ascending";
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "ascending"
    ) {
      direction = "descending";
    }

    setSortConfig({ key, direction });
    const sortedData = [...filteredData].sort((a, b) => {
      if (a[key] < b[key]) {
        return direction === "ascending" ? -1 : 1;
      }
      if (a[key] > b[key]) {
        return direction === "ascending" ? 1 : -1;
      }
      return 0;
    });

    setFilteredData(sortedData);
  };

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    const newFilters = { ...filters, [name]: value };
    setFilters(newFilters);

    const filteredData = data.filter((item) => {
      return Object.keys(newFilters).every((key) => {
        if (!newFilters[key]) return true;
        return item[key]
          .toString()
          .toLowerCase()
          .includes(newFilters[key].toLowerCase());
      });
    });

    setFilteredData(filteredData);
  };
  useEffect(() => {
    if (selectedOption.value) fetchTableData();
  }, [selectedOption]);

  const mapData = (data) => {
    const monthMapping = {
      Apr: "April",
      May: "May",
      Jun: "June", // Update abbreviation for June
      Jul: "July", // Update abbreviation for July
      Aug: "August",
      Sep: "September",
      Oct: "October",
      Nov: "November",
      Dec: "December",
      Jan: "January",
      Feb: "February",
      Mar: "March",
    };

    // Extract and log the month names to ensure they are correctly mapped
    const keys = [
      "AprT",
      "MayA",
      "JuneT",
      "JulyT",
      "AugT",
      "SepA",
      "OctAP",
      "NovSo",
      "DecT",
      "JanA",
      "FebAP",
      "MarSo",
    ];

    const monthNames = keys.map((key) => {
      const abbrev = key.substring(0, 3);
      return monthMapping[abbrev];
    });

    const months = monthNames;
    return data.flatMap(({ Code, Customer, Name, ...rest }) =>
      months.map((month, index) => {
        let transactionKey, aprsKey, appppKey, soKey;
        if (month === "June" || month === "July") {
          transactionKey = month.slice(0, 4) + "T";
          aprsKey = month.slice(0, 4) + "A";
          appppKey = month.slice(0, 4) + "AP";
          soKey = month.slice(0, 4) + "So";
        } else {
          transactionKey = month.slice(0, 3) + "T";
          aprsKey = month.slice(0, 3) + "A";
          appppKey = month.slice(0, 3) + "AP";
          soKey = month.slice(0, 3) + "So";
        }

        return {
          key: Code,
          Customer,
          Name,
          Month: month,
          Transaction: rest[transactionKey],
          APRS: rest[aprsKey],
          APPPP: rest[appppKey],
          So: rest[soKey],
        };
      })
    );
  };

  const uniqueEntries = [
    ...new Set(data.map(({ Customer, Name }) => `${Customer}|${Name}`)),
  ];
  const months = [...new Set(data.map(({ Month }) => Month))];

  return (
    <div>
      <ReactLoader open={open} />
      <div className="page-wrapper">
        <div className="content">
          <div className="page-header">
            <div className="add-item d-flex">
              <div className="page-title">
                <h4>Amount</h4>
                <h6>Target Amount vs Achievement</h6>
              </div>
            </div>
          </div>
          <div className="card table-list-card">
            <div className="card-body pb-0 mt-4">
              <div className="row px-3">
                <div className="col-lg-3 col-md-6 col-12 mb-3">
                  <div
                    className="input-blocks d-flex align-items-center"
                    style={{ zIndex: "500" }}
                  >
                    <label htmlFor="customerSelect" className="me-2">
                      Customer:
                    </label>
                    <div className="col-lg-12">
                      <Select
                        id="customerSelect"
                        options={[
                          {
                            value: "",
                            label: "Choose Customer",
                            isDisabled: true,
                          },
                          ...customerList,
                        ]}
                        className="select"
                        value={selectedOption}
                        onChange={handleSelectChange}
                        placeholder="Choose Customer"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="table-responsive" style={{ overflowX: "auto" }}>
                {data.length > 0 && (
                  <>
                    <table className="table table-bordered datanew">
                      <thead>
                        <tr>
                          <th
                            rowSpan="2"
                            style={{
                              backgroundColor: "#5E5E5E",
                              color: "#fff",
                            }}
                          >
                            Customer
                          </th>
                          <th rowSpan="2">Name</th>
                          {months.map((month) => (
                            <th
                              colSpan="4"
                              key={month}
                              className="text-center"
                              style={{
                                backgroundColor: "#0E103D",
                                color: "#fff",
                              }}
                            >
                              {month}
                            </th>
                          ))}
                        </tr>
                        <tr>
                          {months.map((month) => (
                            <React.Fragment key={month}>
                          
                              <th
                                style={{
                                  width: "200px",
                                  backgroundColor: "#a4b9c4",
                                  color: "#000000",
                                }}
                              >
                                Target
                              </th>
                              <th
                                style={{
                                  width: "200px",
                                  backgroundColor: "#fffef2",
                                  color: "#000000",
                                }}
                              >
                                Achievement
                              </th>
                              <th
                                style={{
                                  width: "200px",
                                  backgroundColor: "#a4b9c4",
                                  color: "#000000",
                                }}
                              >
                                Achievement %
                              </th>
                              <th
                                style={{
                                  width: "200px",
                                  backgroundColor: "#fffef2",
                                  color: "#000000",
                                }}
                              >
                                Pending Order
                              </th>
                            </React.Fragment>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {uniqueEntries.map((entry) => {
                          const [customer, name] = entry.split("|");
                          return (
                            <tr key={entry}>
                              <td>{customer}</td>
                              <td>{name}</td>
                              {months.map((month) => {
                                const monthData =
                                  data.find(
                                    ({ Customer, Name, Month }) =>
                                      Customer === customer &&
                                      Name === name &&
                                      Month === month
                                  ) || {};
                                return (
                                  <React.Fragment key={month}>
                                    <td
                                      className="custom-tColor right-align"
                                      style={{ width: "200px" }}
                                    >
                                      {monthData.Transaction}
                                    </td>
                                    <td
                                      style={{ width: "200px" }}
                                      className="right-align"
                                    >
                                      {monthData.APRS}
                                    </td>
                                    <td
                                      style={{ width: "200px" }}
                                      className="right-align"
                                    >
                                      {monthData.APPPP}
                                    </td>
                                    <td
                                      style={{ width: "200px" }}
                                      className="right-align"
                                    >
                                      {monthData.So}
                                    </td>
                                  </React.Fragment>
                                );
                              })}
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                    {/* <table className="table table-bordered datanew">
                        <thead>
                          <tr>
                            <th
                              rowSpan="2"
                              style={{
                                backgroundColor: "#5E5E5E",
                                color: "#fff",
                              }}
                            >
                              Customer
                            </th>
                            <th rowSpan="2">
                              Name
                              <button onClick={() => handleSort("Name")}>
                                Sort
                              </button>
                              <input
                                type="text"
                                name="Name"
                                value={filters.Name || ""}
                                onChange={handleFilterChange}
                                placeholder="Filter"
                              />
                            </th>
                            {months.map((month) => (
                              <th
                                colSpan="4"
                                key={month}
                                className="text-center"
                                style={{
                                  backgroundColor: "#0E103D",
                                  color: "#fff",
                                }}
                              >
                                {month}
                              </th>
                            ))}
                          </tr>
                          <tr>
                            {months.map((month) => (
                              <React.Fragment key={month}>
                                <th
                                  style={{
                                    width: "200px",
                                    backgroundColor: "#a4b9c4",
                                    color: "#000000",
                                  }}
                                >
                                  Target
                                </th>
                                <th
                                  style={{
                                    width: "200px",
                                    backgroundColor: "#fffef2",
                                    color: "#000000",
                                  }}
                                >
                                  Achievement
                                </th>
                                <th
                                  style={{
                                    width: "200px",
                                    backgroundColor: "#a4b9c4",
                                    color: "#000000",
                                  }}
                                >
                                  Achievement %
                                </th>
                                <th
                                  style={{
                                    width: "200px",
                                    backgroundColor: "#fffef2",
                                    color: "#000000",
                                  }}
                                >
                                  Pending Order
                                </th>
                              </React.Fragment>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {uniqueEntries.map((entry) => {
                            const [customer, name] = entry.split("|");
                            return (
                              <tr key={entry}>
                                <td>{customer}</td>
                                <td>{name}</td>
                                {months.map((month) => {
                                  const monthData =
                                    filteredData.find(
                                      ({ Customer, Name, Month }) =>
                                        Customer === customer &&
                                        Name === name &&
                                        Month === month
                                    ) || {};
                                  return (
                                    <React.Fragment key={month}>
                                      <td
                                        className="custom-tColor"
                                        style={{ width: "200px" }}
                                      >
                                        {monthData.Transaction}
                                      </td>
                                      <td style={{ width: "200px" }}>
                                        {monthData.APRS}
                                      </td>
                                      <td style={{ width: "200px" }}>
                                        {monthData.APPPP}
                                      </td>
                                      <td style={{ width: "200px" }}>
                                        {monthData.So}
                                      </td>
                                    </React.Fragment>
                                  );
                                })}
                              </tr>
                            );
                          })}
                        </tbody>
                      </table> */}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TableTes;

// -------------------------------------------------------------------------
