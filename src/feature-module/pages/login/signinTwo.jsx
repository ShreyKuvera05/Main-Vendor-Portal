import React, { useState } from "react";
import ImageWithBasePath from "../../../core/img/imagewithbasebath";
import { Link } from "react-router-dom";
import { all_routes } from "../../../Router/all_routes";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import ReactLoader from "../../../common/ReactLoader";
// id: pearl9999
// pass: 1234
const SigninTwo = () => {
  const route = all_routes;
  // const url = process.env.REACT_APP_PRO_BASEURL;
  // const port = process.env.REACT_APP_PRO_PORT;
  const url = localStorage.getItem("Url");
  const port = localStorage.getItem("Port");
  const comp = process.env.REACT_APP_PRO_COMP;
  const fy = process.env.REACT_APP_PRO_FY;

  const [userData, setUserData] = useState([]);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const inputHandler = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const SignIn = async (e) => {
    e.preventDefault();
    try {
      setOpen(true);
      const response = await fetch(
        `${url}:${port}/api/values/ValidateUser?UName=${userData.userName}&uP=${userData.password}&Comp=${comp}&FY=${fy}`
      );

      const data = await response.json();

      if (Array.isArray(data) && data.length > 0 && data[0].VResult === "1") {
        setOpen(false);
        toast.success("Success");
        sessionStorage.setItem("Data", JSON.stringify(data));
        navigate(route.dashboard);
      } else {
        setOpen(false);
        toast.error("Invalid username or password");
        // setUserData({
        //   userName: "",
        //   password: "",
        // });
      }
    } catch (error) {
      // setOpen(false);
      toast.error("An error occurred");
    }
  };

  return (
    <div className="main-wrapper">
      <ReactLoader open={open} />
      <div className="account-content">
        <div className="login-wrapper col-lg-12">
          <div className="login-content" style={{ border: "2px solid black" }}>
            <form onSubmit={SignIn}>
              <div className="login-userset">
                <div className="login-logo logo-normal">
                  <ImageWithBasePath
                    src="assets/img/authentication/logox.jpg"
                    alt
                  />
                </div>
                <div className="login-userheading">
                  <h3>Sign In </h3>
                  <h4>
                    Access the Portal panel using your User Name and password.
                  </h4>
                </div>
                <div className="form-login">
                  <label>User Name</label>
                  <div className="form-addons">
                    <input
                      type="text"
                      className="form-control"
                      name="userName"
                      value={userData.userName}
                      onChange={inputHandler}
                      autoComplete="off"
                    />
                    <ImageWithBasePath
                      src="assets/img/icons/mail.svg"
                      alt="img"
                    />
                  </div>
                </div>
                <div className="form-login">
                  <label>Password </label>
                  <div className="pass-group">
                    <input
                      type="password"
                      className="pass-input"
                      autoComplete="off"
                      value={userData.password}
                      name="password"
                      onChange={inputHandler}
                    />
                    <span
                      className="fas toggle-password fa-eye-slash"
                      onClick={(e) => {
                        const target = e.target;
                        const input = target.previousElementSibling;
                        const type =
                          input.getAttribute("type") === "password"
                            ? "text"
                            : "password";
                        input.setAttribute("type", type);
                        target.classList.toggle("fa-eye-slash");
                        target.classList.toggle("fa-eye");
                      }}
                    />
                  </div>
                </div>
                <div className="form-login authentication-check">
                  <div className="row">
                    <div className="col-6">
                      <div className="custom-control custom-checkbox">
                        <label className="checkboxs ps-4 mb-0 pb-0 line-height-1">
                          <input type="checkbox" />
                          <span className="checkmarks" />
                          Remember me
                        </label>
                      </div>
                    </div>
                    <div className="col-6 text-end"></div>
                  </div>
                </div>
                <div className="form-login">
                  <Link to="#" className="btn btn-login" onClick={SignIn}>
                    Sign In
                  </Link>
                </div>

                <div className="form-sociallink">
                  <div className="my-4 d-flex justify-content-center align-items-center copyright-text">
                    <p>
                      Copyright © 2024 Excellent Softwares. All rights reserved
                    </p>
                  </div>
                </div>
              </div>
            </form>
          </div>
          {/* <div className="login-img mt-2">
            <img src="assets/img/authentication/logox.jpg" alt="img" />
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default SigninTwo;
