import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Signup = () => {
  const navigate = useNavigate();
  const [data, setdata] = useState({
    fname: "",
    lname: "",
    userName: "",
    email: "",
    age: "",
    contactNumber: "",
    userPassword: ""
  });


  let name, value;
  const change = (e) => {
    name = e.target.name;
    value = e.target.value;
    setdata({ ...data, [name]: value });
  };

  const signup = (e)=>{
    e.preventDefault();
    axios.post("http://localhost:5030/signup", {fname:data.fname,lname:data.lname,userName:data.userName,email:data.email,age:data.age,contactNumber:data.contactNumber,userPassword:data.userPassword})
    .then((res)=>{
        if(res.data.num === 1)
        {
            alert(res.data.message);
        }
        else
        {
            alert(res.data.message);
            navigate("/");
        }
    }).catch((err)=>{
        console.log(err);
    })
  }

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
                  <p class=" mb-5">Register Here!</p>
                  <div class="mb-3">
                    <label class="form-label">
                        First Name
                    </label>
                    <input
                      name="fname"
                      type="text"
                      class="form-control"
                      id="fname"
                      placeholder="First Name"
                      onChange={change}
                      value={data.fname}
                    />
                  </div>
                  <div class="mb-3">
                    <label for="text" class="form-label">
                      Last Name
                    </label>
                    <input
                      name="lname"
                      type="text"
                      class="form-control"
                      id="lname"
                      placeholder="Last Name"
                      onChange={change}
                      value={data.lname}
                    />
                  </div>
                  <div class="mb-3">
                    <label for="text" class="form-label">
                        User Name
                    </label>
                    <input
                      name="userName"
                      type="text"
                      class="form-control"
                      id="userName"
                      placeholder="User Name"
                      onChange={change}
                      value={data.userName}
                    />
                  </div>
                  <div class="mb-3">
                    <label for="email" class="form-label">
                      Email
                    </label>
                    <input
                      name="email"
                      type="email"
                      class="form-control"
                      id="email"
                      placeholder="name@example.com"
                      onChange={change}
                      value={data.email}
                    />
                  </div>
                  <div class="mb-3">
                    <label for="text" class="form-label">
                      Age
                    </label>
                    <input
                      name="age"
                      type="number"
                      class="form-control"
                      id="age"
                      placeholder="Age"
                      onChange={change}
                      value={data.age}
                    />
                  </div>
                  <div class="mb-3">
                    <label for="text" class="form-label">
                      Contact Number
                    </label>
                    <input
                      name="contactNumber"
                      type="number"
                      class="form-control"
                      id="contactNumber"
                      placeholder="Contact Number"
                      onChange={change}
                      value={data.contactNumber}
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
                      id="userPassword"
                      placeholder="*******"
                      onChange={change}
                      value={data.userPassword}
                    />
                  </div>

                  <div class="d-grid">
                    <button
                      class="btn btn-outline-dark"
                      type="submit"
                      onClick={signup}
                    >
                      SignUp
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
