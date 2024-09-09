import React, { useState, useEffect } from "react";
import Scrollbars from "react-custom-scrollbars-2";
import { Link, useLocation } from "react-router-dom";
import * as Icon from "react-feather";
import ReactLoader from "../../common/ReactLoader";

// import { SidebarData } from "../../core/json/siderbar_data";
import HorizontalSidebar from "./horizontalSidebar";
import CollapsedSidebar from "./collapsedSidebar";

const Sidebar = () => {
  const Location = useLocation();
  const userData = JSON.parse(sessionStorage.getItem("Data"));
  const [open, setOpen] = useState(false);
  const [subOpen, setSubopen] = useState("");
  const [subsidebar, setSubsidebar] = useState("");
  const [sidebarData, setSidebarData] = useState([]);

  useEffect(() => {
    setOpen(true);
    let ut = userData[0].UT;
    let purDb = userData[0].PurDB;
    console.log("purDb: ", purDb);

    let sidebarData = [];

    switch (ut) {
      case "supplier": {
        sidebarData = [
          {
            label: "Main",
            submenuOpen: true,
            showSubRoute: false,
            submenuHdr: "Main",
            submenuItems: [
              {
                label: "Dashboard",
                icon: <Icon.Grid />,
                submenu: false,
                showSubRoute: false,
                link: "/",
              },
            ],
          },
          {
            label: "Reports",
            submenuOpen: true,
            showSubRoute: false,
            submenuHdr: "Reports",
            submenuItems: [
              {
                label: "POAndPendingPODetail",
                link: "/POAndPendingPODetail",
                icon: <Icon.BarChart2 />,
                showSubRoute: false,
                submenu: false,
              },
            ],
          },
        ];
        break;
      }

      default: {
        let mainSubmenuItems = [
          {
            label: "Dashboard",
            icon: <Icon.Grid />,
            submenu: false,
            showSubRoute: false,
            link: "/",
          },
        ];

        if (purDb === 1) {
          mainSubmenuItems.push({
            label: "Purchase Dashboard",
            icon: <Icon.Grid />,
            submenu: false,
            showSubRoute: false,
            link: "/PurchaseDashboard",
          });
        }

        sidebarData = [
          {
            label: "Main",
            submenuOpen: true,
            showSubRoute: false,
            submenuHdr: "Main",
            submenuItems: mainSubmenuItems,
          },
          {
            label: "Reports",
            submenuOpen: true,
            showSubRoute: false,
            submenuHdr: "Reports",
            submenuItems: [
              {
                label: "Target Amount",
                link: "/targetAmountvsAchivement",
                icon: <Icon.BarChart2 />,
                showSubRoute: false,
                submenu: false,
              },
              {
                label: "Qty Target Yearly (Luxuria)",
                link: "/QTargetVsAchivement",
                icon: <Icon.BarChart2 />,
                showSubRoute: false,
                submenu: false,
              },
              {
                label: "Qty Target Monthly (Luxuria)",
                link: "/QtyMonthlyReport",
                icon: <Icon.BarChart2 />,
                showSubRoute: false,
                submenu: false,
              },
              {
                label: "Item Wise Monthly Sale",
                link: "/ItemWiseMonthly",
                icon: <Icon.BarChart2 />,
                showSubRoute: false,
                submenu: false,
              },
              {
                label: "Ageing Receivable",
                link: "/AgingReceivable",
                icon: <Icon.BarChart2 />,
                showSubRoute: false,
                submenu: false,
              },
              {
                label: "Ledger Report",
                link: "/LedgerReport",
                icon: <Icon.BarChart2 />,
                showSubRoute: false,
                submenu: false,
              },
              {
                label: "SchemDetails",
                link: "/SchemDetails",
                icon: <Icon.BarChart2 />,
                showSubRoute: false,
                submenu: false,
              },
            ],
          },
        ];
        break;
      }
    }
    setSidebarData(sidebarData);
    setOpen(false);
  }, []);

  const toggleSidebar = (title) => {
    if (title == subOpen) {
      setSubopen("");
    } else {
      setSubopen(title);
    }
  };

  const toggleSubsidebar = (subitem) => {
    if (subitem == subsidebar) {
      setSubsidebar("");
    } else {
      setSubsidebar(subitem);
    }
  };

  return (
    <div>
      <ReactLoader open={open} />
      <div className="sidebar" id="sidebar">
        <Scrollbars>
          <div className="sidebar-inner slimscroll">
            <div id="sidebar-menu" className="sidebar-menu">
              <ul>
                {sidebarData?.map((mainLabel, index) => (
                  <li className="submenu-open" key={index}>
                    <h6 className="submenu-hdr">{mainLabel?.label}</h6>

                    <ul>
                      {mainLabel?.submenuItems?.map((title, i) => {
                        let link_array = [];
                        title?.submenuItems?.map((link) => {
                          link_array?.push(link?.link);
                          if (link?.submenu) {
                            link?.submenuItems?.map((item) => {
                              link_array?.push(item?.link);
                            });
                          }
                          return link_array;
                        });
                        title.links = link_array;
                        return (
                          <>
                            <li className="submenu" key={i}>
                              <Link
                                to={title?.link}
                                onClick={() => toggleSidebar(title?.label)}
                                className={`${
                                  subOpen == title?.label ? "subdrop" : ""
                                } ${
                                  title?.links?.includes(Location.pathname)
                                    ? "active"
                                    : ""
                                }
                            `}
                              >
                                {/* <Grid /> */}
                                {title?.icon}
                                <span>{title?.label}</span>
                                <span
                                  className={title?.submenu ? "menu-arrow" : ""}
                                />
                              </Link>
                              <ul
                                style={{
                                  display:
                                    subOpen == title?.label ? "block" : "none",
                                }}
                              >
                                {title?.submenuItems?.map(
                                  (item, titleIndex) => (
                                    <li
                                      className="submenu submenu-two"
                                      key={titleIndex}
                                    >
                                      {/* {item.lebel} */}
                                      <Link
                                        to={item?.link}
                                        className={
                                          item?.submenuItems
                                            ?.map((link) => link?.link)
                                            .includes(Location.pathname) ||
                                          item?.link == Location.pathname
                                            ? "active"
                                            : ""
                                        }
                                        onClick={() => {
                                          toggleSubsidebar(item?.label);
                                        }}
                                      >
                                        {item?.label}
                                        <span
                                          className={
                                            item?.submenu ? "menu-arrow" : ""
                                          }
                                        />
                                      </Link>
                                      <ul
                                        style={{
                                          display:
                                            subsidebar == item?.label
                                              ? "block"
                                              : "none",
                                        }}
                                      >
                                        {item?.submenuItems?.map(
                                          (items, titleIndex) => (
                                            <li key={titleIndex}>
                                              {/* {item.lebel} */}
                                              <Link
                                                to={items?.link}
                                                className={`${
                                                  subsidebar == items?.label
                                                    ? "submenu-two subdrop"
                                                    : "submenu-two"
                                                } ${
                                                  items?.submenuItems
                                                    ?.map((link) => link.link)
                                                    .includes(
                                                      Location.pathname
                                                    ) ||
                                                  items?.link ==
                                                    Location.pathname
                                                    ? "active"
                                                    : ""
                                                }`}
                                              >
                                                {items?.label}
                                              </Link>
                                            </li>
                                          )
                                        )}
                                      </ul>
                                    </li>
                                  )
                                )}
                              </ul>
                            </li>
                          </>
                        );
                      })}
                    </ul>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Scrollbars>
      </div>
      <HorizontalSidebar />
      <CollapsedSidebar />
    </div>
  );
};

export default Sidebar;
