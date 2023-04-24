import React, { useEffect } from "react";
import { SideNav } from "./SideNav";
import { FiMail } from "react-icons/fi";
import { RiGitlabLine } from "react-icons/ri";
import Logo from "./img/badal.png";
import { useNavigate } from "react-router-dom";

export const Home = () => {
  const navigate = useNavigate();
  var tok = window.localStorage.getItem("token")
  useEffect(()=>{
    if(tok == 0)
    {
      navigate("/")
    }
  })
  

  return (
    <div style={{ backgroundColor: "whitesmoke" }}>
      <header>
        <SideNav />
      </header>
      <footer
        className="d-flex fixed-bottom"
        style={{ backgroundColor: "whitesmoke", padding: "10px" }}
      >
        <p className="ms-auto" style={{ color: "#A9A9A9" }}>
          2023 © Copyright Raj Reddy Center For Technology And Society (RCTS).
          All Rights Reserved
        </p>
        <FiMail
          className="ms-auto"
          style={{ fontSize: "20px", cursor: "grab", color: "##71797E" }}
        />{" "}
        {/* <motion.img whileTap={{ scale: 0.6}} src="<FiMail/>" className="w-10 h-10 min-w-[40] min-h-[40] drop-shadow-2xl ml-6 cursor-pointer " alt="mail"/> */}
        &nbsp;
        <RiGitlabLine
          className="me mr-2"
          style={{ fontSize: "20px", cursor: "grab", color: "##71797E" }}
        />
      </footer>
    </div>
  );
};
