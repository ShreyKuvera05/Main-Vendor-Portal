import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Header from "../InitialPage/Sidebar/Header";
import Sidebar from "../InitialPage/Sidebar/Sidebar";
import { pagesRoute, posRoutes, publicRoutes } from "./router.link";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import ThemeSettings from "../InitialPage/themeSettings";
import { Toaster, toast } from "react-hot-toast";
import Loader from "../feature-module/loader/loader";

import "../style/css/styles.css";
import { PrivateRoute } from "../feature-module/pages/login/PrivateRoute";
const AllRoutes = () => {
  const serverUrl = process.env.REACT_APP_PRO_BASEURL;
  const serverPort = process.env.REACT_APP_PRO_PORT;

  // const serverUrl = "http://103.76.138.106";
  // const serverPort = "9090";

  // const localUrl = process.env.REACT_APP_PRO_STATICURL;
  // const localPort = process.env.REACT_APP_PRO_STATICPORT;

  const localUrl = "http://103.76.138.106";
  const localPort = "9090";

  const localExcellentUrl = "http://103.194.9.31";
  const localExcellentPort = "12011";

  const currentPath = window.location.hostname || "";

  useEffect(() => {
    if (currentPath === "172.16.16.4") {
      localStorage.setItem("Url", localUrl);
      localStorage.setItem("Port", localPort);
      // console.log(localUrl + ":" + localPort, "Local URL");
    } else if (currentPath === "103.76.138.106") {
      // main external server
      localStorage.setItem("Url", serverUrl);
      localStorage.setItem("Port", serverPort);
      // console.log(serverUrl + ":" + serverPort, "Server URL");
    } else {
      localStorage.setItem("Url", serverUrl);
      localStorage.setItem("Port", serverPort);
    }
  }, [currentPath]);

  const data = useSelector((state) => state.toggle_header);
  // const layoutStyles = useSelector((state) => state.layoutstyledata);
  const HeaderLayout = () => (
    <div className={`main-wrapper ${data ? "header-collapse" : ""}`}>
      <Header />
      <Sidebar />
      <Outlet />
      {/* <ThemeSettings /> */}
    </div>
  );

  const Authpages = () => (
    <div className={data ? "header-collapse" : ""}>
      <Outlet />

      {/* <ThemeSettings /> */}
    </div>
  );

  const Pospages = () => (
    <div>
      <Header />
      <Outlet />

      {/* <ThemeSettings /> */}
    </div>
  );

  return (
    <div>
      <Routes>
        <Route path="/pos" element={<Pospages />}>
          {posRoutes.map((route, id) => (
            <Route path={route.path} element={route.element} key={id} />
          ))}
        </Route>

        <Route
          path={"/"}
          element={
            <PrivateRoute>
              <HeaderLayout />
            </PrivateRoute>
          }
        >
          {publicRoutes.map((route, id) => (
            <Route path={route.path} element={route.element} key={id} />
          ))}
        </Route>

        <Route path={"/"} element={<Authpages />}>
          {pagesRoute.map((route, id) => (
            <Route path={route.path} element={route.element} key={id} />
          ))}
        </Route>
      </Routes>
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
};
export default AllRoutes;
