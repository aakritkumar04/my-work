import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Project } from "./Projects.jsx"
import { Home } from "./Home.jsx";
import { Login } from "./Login.jsx"
import { Signup } from "./Signup.jsx";



export const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route
            exact path="/"
            element={<Login />}
          />
          <Route
            path="/signup"
            element={<Signup />}
          />
          <Route
            path="/home"
            element={<Home />}
          />
          <Route
            path="/dashboard"
            element={<Home />}
          />
          <Route
            path="/projects"
            element={<Project />}
          />
          <Route
            path="/teams"
            element={<Home />}
          />
          <Route
            path="/workspace"
            element={<Home />}
          />
          <Route
            path="/profile"
            element={<Home />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  )

}