import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const navigate = useNavigate();
  window.localStorage.setItem("token",0)

  const [profileData, setprofileData] = useState({
    userName: "",
    userPassword: "",
  });

  let name, value;
  const change = (e) => {
    name = e.target.name;
    value = e.target.value;
    setprofileData({ ...profileData, [name]: value });
  };

  const checkdata = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5030/signin", { profileData: profileData })
      .then((res) => {
        const ans = res.data.message;
        console.log(ans);
        if (ans === 1) {
          localStorage.setItem("token", res.data.tok);
          navigate("/home");
        } else if (ans === 11) {
          alert("Incorrect Password!");
          window.location.reload();
        } else if (ans === 10) {
          alert("Please fill login and password!");
        } else if (ans === 0 || ans === 12) {
          alert("Please register first!");
          window.location.reload();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div class="vh-100 d-flex justify-content-center align-items-center">
      <div class="container">
        <div class="row d-flex justify-content-center">
          <div class="col-12 col-md-8 col-lg-6">
            <div class="border border-3 border-primary"></div>
            <div class="card bg-white shadow-lg">
              <div class="card-body p-5">
                <form class="mb-3 mt-md-4">
                  <h2 class="fw-bold mb-2 text-uppercase ">BADAL</h2>
                  <p class=" mb-5">Please enter your login and password!</p>
                  <div class="mb-3">
                    <label class="form-label">Username</label>
                    <input
                      name="userName"
                      type="text"
                      class="form-control"
                      id="username"
                      placeholder="Username"
                      onChange={change}
                      value={profileData.userName}
                    />
                  </div>
                  <div class="mb-3">
                    <label for="password" class="form-label">
                      Password
                    </label>
                    <input
                      name="userPassword"
                      type="password"
                      class="form-control"
                      id="password"
                      placeholder="*******"
                      onChange={change}
                      value={profileData.userPassword}
                    />
                  </div>
                  <p class="small">
                    <a class="text-primary" href="forget-password.html">
                      Forgot password?
                    </a>
                  </p>
                  <div class="d-grid">
                    <button
                      class="btn btn-outline-dark"
                      type="submit"
                      onClick={checkdata}
                    >
                      Login
                    </button>
                  </div>
                </form>
                <div>
                  <p class="mb-0  text-center">
                    Don't have an account?{" "}
                    <a href="signup" class="text-primary fw-bold">
                      Sign Up
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
