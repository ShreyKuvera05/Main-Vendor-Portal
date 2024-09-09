import React from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { all_routes } from "../../Router/all_routes";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { Link } from "react-router-dom";
import ImageWithBasePath from "../img/imagewithbasebath";
import { RotateCcw } from "feather-icons-react/build/IconComponents";
import { setToogleHeader } from "../redux/action";
import { ChevronUp } from "react-feather";

const FilterFunc = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.toggle_header);
  const renderTooltip = (props) => (
    <Tooltip id="pdf-tooltip" {...props}>
      Pdf
    </Tooltip>
  );
  const renderExcelTooltip = (props) => (
    <Tooltip id="excel-tooltip" {...props}>
      Excel
    </Tooltip>
  );
  const renderPrinterTooltip = (props) => (
    <Tooltip id="printer-tooltip" {...props}>
      Printer
    </Tooltip>
  );
  const renderRefreshTooltip = (props) => (
    <Tooltip id="refresh-tooltip" {...props}>
      Refresh
    </Tooltip>
  );
  const renderCollapseTooltip = (props) => (
    <Tooltip id="refresh-tooltip" {...props}>
      Collapse
    </Tooltip>
  );
  return (
    <ul className="table-top-head">
      <li>
        <OverlayTrigger placement="top" overlay={renderTooltip}>
          <Link>
            <ImageWithBasePath src="assets/img/icons/pdf.svg" alt="img" />
          </Link>
        </OverlayTrigger>
      </li>
      <li>
        <OverlayTrigger placement="top" overlay={renderExcelTooltip}>
          <Link data-bs-toggle="tooltip" data-bs-placement="top">
            <ImageWithBasePath src="assets/img/icons/excel.svg" alt="img" />
          </Link>
        </OverlayTrigger>
      </li>
      <li>
        <OverlayTrigger placement="top" overlay={renderPrinterTooltip}>
          <Link data-bs-toggle="tooltip" data-bs-placement="top">
            <i data-feather="printer" className="feather-printer" />
          </Link>
        </OverlayTrigger>
      </li>
      <li>
        <OverlayTrigger placement="top" overlay={renderRefreshTooltip}>
          <Link data-bs-toggle="tooltip" data-bs-placement="top">
            <RotateCcw />
          </Link>
        </OverlayTrigger>
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
  );
};
export default FilterFunc;
