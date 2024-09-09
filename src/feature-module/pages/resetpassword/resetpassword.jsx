import React, { useState } from "react";
import ImageWithBasePath from "../../../core/img/imagewithbasebath";
import { Link } from "react-router-dom";
import { all_routes } from "../../../Router/all_routes";
import ReactLoader from "../../../common/ReactLoader";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
const Resetpassword = () => {
  const { REACT_APP_PRO_COMP: comp, REACT_APP_PRO_FY: fy } = process.env;
  const url = localStorage.getItem("Url");
  const port = localStorage.getItem("Port");
  const userData = JSON.parse(sessionStorage.getItem("Data"));
  const route = all_routes;
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({});
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const navigate = useNavigate();

  const togglePasswordVisibility = (passwordType) => {
    if (passwordType === "oldPassword") {
      setShowOldPassword((prevState) => !prevState);
    } else if (passwordType === "newPassword") {
      setShowNewPassword((prevState) => !prevState);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault;
    try {
      setOpen(true);
      const response = await fetch(
        `${url}:${port}/api/values/ChangePassword?Comp=${comp}&FY=${fy}&UID=${userData[0].UserName}&Pwd=${formData.oldPassword}&NPwd=${formData.newPassword}`
      );
     

      const result = await response.json();
      const status = parseInt(result.Data[0].Result);
      if (status === 1) {
        setOpen(false);
        toast.success("Password Change Succesfully");
        navigate(route.signin);
      } else {
        setOpen(false);
        toast.error("Invalid User ID or Password");
        setFormData({
          newPassword: "",
        });
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <ReactLoader open={open} />
      <div className="main-wrapper">
        <div className="account-content">
          <div className="login-wrapper reset-pass-wrap bg-img">
            <div className="login-content">
              <form action="success-3">
                <div className="login-userset">
                  <div className="login-logo logo-normal">
                    <ImageWithBasePath src="assets/img/logo.png" alt="img" />
                  </div>
                  <Link to={route.dashboard} className="login-logo logo-white">
                    <ImageWithBasePath src="assets/img/logox.png" alt />
                  </Link>
                  <div className="login-userheading">
                    <h3>Reset password?</h3>
                    <h4>
                      Enter New Password &amp; Confirm Password to get inside
                    </h4>
                  </div>
                  <div className="form-login">
                    <label> Old Password</label>
                    <div className="pass-group">
                      <input
                        type={showOldPassword ? "text" : "password"}
                        className="pass-input"
                        value={formData.oldPassword}
                        name="oldPassword"
                        onChange={handleInputChange}
                      />
                      <span
                        className={`fas toggle-password ${
                          showOldPassword ? "fa-eye" : "fa-eye-slash"
                        }`}
                        onClick={() => togglePasswordVisibility("oldPassword")}
                      />
                    </div>
                  </div>
                  <div className="form-login">
                    <label>New Password</label>
                    <div className="pass-group">
                      <input
                        type={showNewPassword ? "text" : "password"}
                        className="pass-inputs"
                        value={formData.newPassword}
                        name="newPassword"
                        onChange={handleInputChange}
                      />
                      <span
                        className={`fas toggle-passwords ${
                          showNewPassword ? "fa-eye" : "fa-eye-slash"
                        }`}
                        onClick={() => togglePasswordVisibility("newPassword")}
                      />
                    </div>
                  </div>

                  <div className="form-login">
                    <Link
                      to="#"
                      onClick={handlePasswordChange}
                      className="btn btn-login"
                    >
                      Change Password
                    </Link>
                  </div>

                  <div className="my-4 d-flex justify-content-center align-items-center copyright-text">
                    <p>
                      Copyright © 2024 Excellent Softwares. All rights reserved
                    </p>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Resetpassword;
