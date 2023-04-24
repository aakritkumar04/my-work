import React from "react";
import { AiOutlineHome } from "react-icons/ai";
import { HiChartSquareBar } from "react-icons/hi";
import { HiOutlineSquares2X2 } from "react-icons/hi2";
import { RiTeamLine } from "react-icons/ri";
import { BiLogOutCircle } from "react-icons/bi";
import { BsPersonWorkspace } from "react-icons/bs";
import { RiUserSettingsLine } from "react-icons/ri";
import Logo from "./img/badal.png";
import { motion } from "framer-motion";
import { useNavigate, useParams } from "react-router-dom";

export const SideNav = () => {
  const navigate = useNavigate();
  // const {page} = useParams();
  return (
    <div>
      <nav class="navbar navbar-dark">
        <div class="container-fluid">
          <motion.button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasDarkNavbar"
            aria-controls="offcanvasDarkNavbar"
            aria-label="Toggle navigation"
            style={{ backgroundColor: "grey" }}
            whileTap={{ scale: 0.6 }}
          >
            <span class="navbar-toggler-icon"></span>
          </motion.button>
          {/* <h1>{page}</h1> */}
          <motion.img
            whileTap={{ scale: 0.6 }}
            src={Logo}
            className="drop-shadow-2xl"
            alt="logo"
            width={80}
            height={50}
            style={{ cursor: "grab" }}
          />
          <div
            class="offcanvas offcanvas-start text-bg-dark"
            tabindex="1"
            id="offcanvasDarkNavbar"
            aria-labelledby="offcanvasDarkNavbarLabel"
          >
            <div class="offcanvas-header">
              <h5 class="offcanvas-title" id="offcanvasDarkNavbarLabel">
                Badal
              </h5>
              <button
                type="button"
                class="btn-close btn-close-white"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
              ></button>
            </div>
            <br></br>
            <div class="offcanvas-body">
              <ul
                class="navbar-nav justify-content-end flex-grow-1 pe-3"
                style={{ fontSize: "20px" }}
              >
                <li class="nav-item" style={{ cursor: "grab" }}>
                  <motion.a
                    whileTap={{ scale: 0.9 }}
                    className="nav-link"
                    aria-current="page"
                    href="/home"
                  >
                    <AiOutlineHome /> &nbsp; Home
                  </motion.a>
                </li>
                <hr></hr>
                <li class="nav-item" style={{ cursor: "grab" }}>
                  <motion.a
                    whileTap={{ scale: 0.9 }}
                    class="nav-link"
                    href="/dashboard"
                  >
                    <HiChartSquareBar /> &nbsp; Dashboard
                  </motion.a>
                </li>
                <hr></hr>
                <li class="nav-item" style={{ cursor: "grab" }}>
                  <motion.a
                    whileTap={{ scale: 0.9 }}
                    class="nav-link"
                    href="/projects"
                  >
                    <HiOutlineSquares2X2 /> &nbsp; Projects
                  </motion.a>
                </li>
                <hr></hr>
                <li class="nav-item" style={{ cursor: "grab" }}>
                  <motion.a
                    whileTap={{ scale: 0.9 }}
                    class="nav-link"
                    href="/teams"
                  >
                    <RiTeamLine /> &nbsp; Teams
                  </motion.a>
                </li>
                <hr></hr>
                <li class="nav-item" style={{ cursor: "grab" }}>
                  <motion.a
                    whileTap={{ scale: 0.9 }}
                    class="nav-link"
                    href="/workspace"
                  >
                    <BsPersonWorkspace /> &nbsp; Workspace
                  </motion.a>
                </li>
                <hr></hr>
                <li class="nav-item" style={{ cursor: "grab" }}>
                  <a onClick={()=>{localStorage.removeItem("token");navigate("/");}}>
                    <motion.a whileTap={{ scale: 0.9 }} class="nav-link">
                      <BiLogOutCircle /> &nbsp; Sign Out
                    </motion.a>
                  </a>
                </li>
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <li class="nav-item" style={{ cursor: "grab" }}>
                  <motion.a
                    whileTap={{ scale: 0.9 }}
                    class="nav-link"
                    href="/profile"
                  >
                    <RiUserSettingsLine /> &nbsp; Profile Settings
                  </motion.a>
                </li>
                <li class="nav-item" style={{ cursor: "grab" }}>
                  <motion.a
                    whileTap={{ scale: 0.9 }}
                    className="nav-link"
                    style={{ fontSize: "13px" }}
                  >
                    Privacy
                  </motion.a>
                  <motion.a
                    whileTap={{ scale: 0.9 }}
                    className="nav-link"
                    style={{ fontSize: "13px" }}
                  >
                    Terms
                  </motion.a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};
