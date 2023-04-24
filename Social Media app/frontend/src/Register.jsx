import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Nav from "./Nav.jsx";

export const Register = (props) => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    firstname: "",
    lastname: "",
    username: "",
    email: "",
    age: "",
    contact: "",
    pass: "",
    about: "",
  });

  let name, value;
  const handleSubmit = (e) => {
    name = e.target.name;
    value = e.target.value;
    setUser({ ...user, [name]: value });
  };

  const postdata = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:4000/api/register", user)
      .then((res) => {
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="register">
      <Nav />
      <form>
        <input
          name="firstname"
          value={user.firstname}
          onChange={handleSubmit}
          type="text"
          placeholder="First Name"
        />
        <input
          name="lastname"
          value={user.lastname}
          onChange={handleSubmit}
          type="text"
          placeholder="Last Name"
        />
        <input
          name="username"
          value={user.username}
          onChange={handleSubmit}
          type="text"
          placeholder="Username"
        />
        <input
          name="email"
          value={user.email}
          onChange={handleSubmit}
          type="email"
          placeholder="Email"
        />
        <input
          name="age"
          value={user.age}
          onChange={handleSubmit}
          type="text"
          placeholder="Age"
        />
        <input
          name="contact"
          value={user.contact}
          onChange={handleSubmit}
          type="number"
          placeholder="Contact"
        />
        <input
          name="pass"
          value={user.pass}
          onChange={handleSubmit}
          type="password"
          placeholder="Password"
        />
        <input
          name="about"
          value={user.about}
          onChange={handleSubmit}
          type="text"
          placeholder="About"
        />
        <button type="submit" onClick={postdata}>
          Register
        </button>
        <div className="my-class">
          <p
            style={{ color: "grey" }}
            className="link-btn"
            type="submit"
            onClick={() => props.onFormSwitch("login")}
          >
            Already have an account? Login here
          </p>
        </div>
      </form>
    </div>
  );
};
