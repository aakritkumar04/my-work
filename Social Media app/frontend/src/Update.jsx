import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const Update = () => {
    const navigate = useNavigate();
  const [finaluser,setfinaluser] = useState({
    firstname:'',
    lastname:'',
    username:'',
    email: '',
    age:'',
    contact:'',
    pass:'',
    About : ''
  });

  const str = window.localStorage.getItem("localstr");
  useEffect(() => {
        axios.post("http://localhost:4000/api/getdata",{store : str}).then((res) => {
          var getdata = res.data.message;
          setfinaluser(getdata);
        })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  let name, value;
  const handleSubmit = (e) => {
    name = e.target.name;
    value = e.target.value;
    setfinaluser({ ...finaluser, [name]: value });
  };

  const handleClick = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:4000/api/update", {store:str,user:finaluser})
      .then((res) => {
        if (res.data.message === 1) {
            console.log("Updated");
            navigate("/profile");
        }
        else{
            alert("Please try again after sometime");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <form>
      <div class="container rounded bg-white mt-5 mb-5">
        <div class="row">
          <div class="col-md-3 border-right">
            <div class="d-flex flex-column align-items-center text-center p-3 py-5">
              <img
                class="rounded-circle mt-5"
                width="150px"
                src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"
                alt="profile pic"
              />
              <h5 style={{color:"black",fontFamily:"inerit"}}>{finaluser.username}</h5>
              <h5 style={{color:"black",fontFamily:"inerit"}}>{finaluser.email}</h5>
            </div>
          </div>
          <div class="col-md-5 border-right">
            <div class="p-3 py-5">
              <div class="d-flex justify-content-between align-items-center mb-3">
                <h4 class="text-right">Profile Settings</h4>
              </div>
              <div class="row mt-2">
                <div class="col-md-6">
                  <label class="labels">Name</label>
                  <input
                    type="text"
                    name="firstname"
                    class="form-control"
                    placeholder="first name"
                    value={finaluser.firstname}
                    onChange={handleSubmit}
                  />
                </div>
                <div class="col-md-6">
                  <label class="labels">Surname</label>
                  <input
                    name="lastname"
                    type="text"
                    class="form-control"
                    value={finaluser.lastname}
                    placeholder="surname"
                    onChange={handleSubmit}
                  />
                </div>
              </div>
              <div class="row mt-3">
                <div class="col-md-12">
                  <label class="labels">Contact</label>
                  <input
                    name="contact"
                    type="text"
                    class="form-control"
                    placeholder="enter phone number"
                    value={finaluser.contact}
                    onChange={handleSubmit}
                  />
                </div>
              </div>
              <div class="row mt-3">
                <div class="col-md-6">
                  <label class="labels">age</label>
                  <input
                    name="age"
                    type="text"
                    class="form-control"
                    placeholder="age"
                    value={finaluser.age}
                    onChange={handleSubmit}
                  />
                </div>
                <div class="col-md-6">
                  <label class="labels">About</label>
                  <input
                    name="About"
                    type="text"
                    class="form-control"
                    placeholder="About"
                    value={finaluser.About}
                    onChange={handleSubmit}
                  />
                </div>
                <div class="mt-5 text-center">
                  <button
                    class="btn btn-primary profile-button"
                    onClick={handleClick}
                    type="submit"
                  >
                    Save Profile
                  </button>
                <button onClick={() => {navigate("/profile")}}>Back</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};
