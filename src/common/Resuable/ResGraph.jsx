/* eslint-disable react/prop-types */
import React from "react";
import Chart from "react-apexcharts";

const ResGraph = ({ graphData, company }) => {
  const series = [
    {
      name: "Yearly Percentage",
      data: graphData.map((item) => parseFloat(item.yearlyPercentage)),
    },
  ];

  const options = {
    chart: {
      type: "bar",
      height: 320,
      stacked: true,
      zoom: {
        enabled: true,
      },
    },
    responsive: [
      {
        breakpoint: 280,
        options: {
          legend: {
            position: "bottom",
            offsetY: 0,
          },
        },
      },
    ],
    plotOptions: {
      bar: {
        horizontal: false,
        borderRadius: 2,
        borderRadiusApplication: "end", // "around" / "end"
        borderRadiusWhenStacked: "all", // "all"/"last"
        columnWidth: "40%",
        colors: {
          ranges: [
            {
              from: 0,
              to: 84,
              color: "#FF0000", // Red
            },
            {
              from: 85,
              to: 99,
              color: "#FFFF00", // Yellow
            },
            {
              from: 100,
              to: Infinity,
              color: "#008000", // Green
            },
          ],
        },
      },
    },
    xaxis: {
      categories: graphData.map((item) => item.label),
    },
    title: {
      text: "Yearly Achievement % Data",
      align: "center",
    },
  };

  return (
    <div>
      <div className="modal fade" id="add-units" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            <div className="page-wrapper-new p-0">
              <div className="content">
                <div className="modal-header border-0 custom-modal-header">
                  <h5 className="text-center" style={{ textAlign: "center" }}>
                    {company}
                  </h5>
                </div>
                <div className="modal-body custom-modal-body">
                  <div className="card-body">
                    <div id="sales_charts" />
                    <Chart
                      options={options}
                      series={series}
                      type="bar"
                      height={320}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResGraph;
