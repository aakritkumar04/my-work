// import React from "react";
import { SideNav } from "./SideNav";
import { FiMail } from "react-icons/fi";
import { RiGitlabLine } from "react-icons/ri";
import Logo from "./img/badal.png";
import * as React from "react";
import { styled } from "@mui/material/styles";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import TagFacesIcon from "@mui/icons-material/TagFaces";
import Grid from "@mui/material/Grid";
import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";
import "./projects.css";
import { useNavigate } from "react-router-dom";

export const Project = () => {
  const navigate = useNavigate();
  const tok = window.localStorage.getItem("token")
  useEffect(()=>{
    if(tok == 0)
    {
      navigate("/")
    }
  })

  const [userData,setuserData] = useState([]);

  useEffect(()=>{
    axios.post("http://localhost:5030/get-data",{tok:tok})
    .then((res)=>{
      setuserData(req.data.message);
      console.log(userData)
    })
    .catch((err)=>{
      console.log(err)
    })
  },[])

  const [usefulData, setusefulData] = useState({
    projectName: "",
    projectField: "",
    projectDescription: "",
    projectOwner: "",
    // projectManager: "",
    projectDateStart: "",
    projectDateEnd: "",
    skillsRequired: "",
    totalDevTimeRequired: "",
    numberOfModules: "",
    gitlabLink: "",
    logoProjectOrganization: "",
    logoProject: "",
  });

  let name, value;
  const change = (e) => {
    name = e.target.name;
    value = e.target.value;
    setusefulData({ ...usefulData, [name]: value });
  };

  const ProjAdd = () => {
    axios
      .post("http://localhost:5030/create-repo", {projectName:usefulData.projectName})
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    axios
      .post("http://localhost:5030/create-project-DB", usefulData)
      .then((res) => {
        console.log(res.data);
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const ModuleChart = ({ name, completed, assigned, unassigned }) => {
    const radius = 25;
    const circumference = 2 * Math.PI * radius;
    const completedPercent = completed / 100;
    const assignedPercent = assigned / 100;
    const unassignedPercent = unassigned / 100;
    const assignedOffset = completedPercent * circumference;
    const unassignedOffset =
      (completedPercent + assignedPercent) * circumference;

    // Calculate the partition angles
    const assignedAngle = assignedPercent * 360;
    const unassignedAngle = unassignedPercent * 360;
    const completedAngle = completedPercent * 360;

    // Calculate the partition paths
    const completedPath = describeArc(33, 30, radius, 0, completedAngle);
    const assignedPath = describeArc(
      33,
      30,
      radius,
      completedAngle,
      completedAngle + assignedAngle
    );
    const unassignedPath = describeArc(
      33,
      30,
      radius,
      completedAngle + assignedAngle,
      completedAngle + assignedAngle + unassignedAngle
    );

    return (
      <svg
        width="78"
        height="96"
        class="marginLeft1"
        style={{ display: "inline" }}
      >
        <circle
          cx="33"
          cy="30"
          r={radius}
          strokeWidth="1"
          stroke="#000000"
          fill="#F0FFF0"
        />
        <path d={completedPath} fill="#FFC300" />
        <path d={assignedPath} fill="#5A5A5A" />
        <path d={unassignedPath} fill="#FFF5EE" />
        <text x="0" y="70">
          {" "}
          {name}{" "}
        </text>
        <text x="0" y="90">
          {" "}
          {name}{" "}
        </text>
      </svg>
    );
  };

  // Helper function to describe an arc path
  function describeArc(x, y, radius, startAngle, endAngle) {
    const start = polarToCartesian(x, y, radius, endAngle);
    const end = polarToCartesian(x, y, radius, startAngle);
    const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
    return `M ${start.x} ${start.y} A ${radius} ${radius} 0 ${largeArcFlag} 0 ${end.x} ${end.y} L ${x} ${y} Z`;
  }

  // Helper function to convert polar coordinates to Cartesian coordinates
  function polarToCartesian(x, y, radius, angle) {
    const radians = ((angle - 90) * Math.PI) / 180;
    return {
      x: x + radius * Math.cos(radians),
      y: y + radius * Math.sin(radians),
    };
  }

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

  const ListItem = styled("li")(({ theme }) => ({
    margin: theme.spacing(0.5),
  }));

  useEffect(() => {
    fetch("http://localhost:5030/get-project-DB", {
        headers: {
            "Content-Type": "application/json",
        }
    }).then(res => res.json())
        .then(result => {
            console.log(result)
            setProjectData(result)
        })
  }, [])

  const [chipData, setChipData] = React.useState([]);

  const [moduleData, setModuleData] = React.useState([
    {
      key: 0,
      label: "Module 1",
      completed: "75",
      assigned: "15",
      unassigned: "10",
    },
    {
      key: 1,
      label: "Module 2",
      completed: "75",
      assigned: "15",
      unassigned: "10",
    },
    {
      key: 2,
      label: "Module 3",
      completed: "75",
      assigned: "15",
      unassigned: "10",
    },
    {
      key: 3,
      label: "Module 43",
      completed: "75",
      assigned: "15",
      unassigned: "10",
    },
  ]);

  const [projectData, setProjectData] = React.useState([]);

  const handleDelete = (chipToDelete) => () => {
    // setChipData((chips) =>
    // chips.filter((chip) => chip !== chipToDelete)
    // );
  };

  // Search Bar

  return (
    <div style={{ backgroundColor: "whitesmoke" }}>
      <header>
        <SideNav />
        <React.Fragment>
          <button
            type="button"
            class="block"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
          >
            + Add Project
          </button>
          <div
            class="modal fade"
            id="exampleModal"
            tabindex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <h1 class="modal-title fs-5" id="exampleModalLabel">
                    BADAL
                  </h1>
                  <button
                    type="button"
                    class="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div class="modal-body">
                  <form>
                    <input
                      value={usefulData.projectName}
                      onChange={change}
                      name="projectName"
                      type="text"
                      placeholder="Project Name"
                    />
                    <input
                      value={usefulData.projectField}
                      onChange={change}
                      name="projectField"
                      type="text"
                      placeholder="Field"
                    />
                    <input
                      value={usefulData.projectDescription}
                      onChange={change}
                      name="projectDescription"
                      type="text"
                      placeholder="Description"
                    />
                    <input
                      value={usefulData.projectOwner}
                      onChange={change}
                      name="projectOwner"
                      type="text"
                      placeholder="Owner"
                    />
                    <input
                      value={usefulData.skillsRequired}
                      onChange={change}
                      name="skillsRequired"
                      type="text"
                      placeholder="Skills"
                    />
                    <input
                      value={usefulData.totalDevTimeRequired}
                      onChange={change}
                      name="totalDevTimeRequired"
                      type="Number"
                      placeholder="Time"
                    />
                    {/* <input value={usefulData.projectManager} onChange={change} name="projectManager" type="text" placeholder="Manager"/> */}
                    <input
                      value={usefulData.projectDateStart}
                      onChange={change}
                      name="projectDateStart"
                      type="text"
                      placeholder="Start Date"
                    />
                    <input
                      value={usefulData.projectDateEnd}
                      onChange={change}
                      name="projectDateEnd"
                      type="text"
                      placeholder="End Date"
                    />
                    <input
                      value={usefulData.gitlabLink}
                      onChange={change}
                      name="gitlabLink"
                      type="text"
                      placeholder="GitLab Link"
                    />
                    <input
                      value={usefulData.logoProjectOrganization}
                      onChange={change}
                      name="logoProjectOrganization"
                      type="text"
                      placeholder="Project Organization"
                    />
                    <input
                      value={usefulData.logoProject}
                      onChange={change}
                      name="logoProject"
                      type="text"
                      placeholder="Logo"
                    />
                    <input
                      value={usefulData.numberOfModules}
                      onChange={change}
                      name="numberOfModules"
                      type="Number"
                      placeholder="Number of Modules"
                    />
                  </form>
                </div>
                <div class="modal-footer">
                  <button
                    type="button"
                    class="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    class="btn btn-primary"
                    onClick={ProjAdd}
                  >
                    Save changes
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div class="searchbarcss">
            <form class="example" action="/action_page.php">
              <input type="text" placeholder="Search.." name="search" />
              <button type="submit">
                <i class="fa fa-search"></i>
              </button>
              <button type="filter">
                <i class="fa fa-search"></i>
              </button>
            </form>
          </div>

          {projectData.map((project, index) => (
            <>
            <div key={index}>
              <Paper
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  flexWrap: "wrap",
                  listStyle: "none",
                  p: 0.5,
                  m: 4,
                  ml: 15,
                  mr: 15,
                }}
                component="ul"
                elevation={4}
              >
                <Grid sx={{ flexGrow: 1 }} container spacing={0}>
                  <Grid item xs={1} sx={{ border: "1px dashed grey" }}>
                    <img src={project.img} alt="Not Available" />
                  </Grid>
                  <Grid item xs sx={{ border: "1px dashed grey" }}>
                    <Item elevation={0} sx={{ textAlign: "left" }}>
                      {project.projectName}
                    </Item>
                    <p> {project.projectDescription} </p>
                    <Item elevation={0} sx={{ textAlign: "right" }}>
                      Date: {project.projectDateCreated.substring(0, 10)}
                    </Item>
                  </Grid>
                  <Grid item xs>
                    <Grid sx={{ flexGrow: 1 }} container spacing={0}>
                      <Grid item xs={20} sx={{ border: "1px dashed grey" }}>
                        <Item elevation={0} sx={{ textAlign: "left" }}>
                          <p class="mgn">Skills Required</p>
                          {project.skillsRequired[0].split(' ').map((data) => {
                            let icon;
                            if (data === "React") {
                              icon = <TagFacesIcon />;
                            }
                            return (
                              <>
                                <ListItem
                                  sx={{ display: "inline" }}
                                >
                                  <Chip
                                    icon={icon}
                                    label={data}
                                    onDelete={
                                      data === "React"
                                        ? undefined
                                        : handleDelete(data)
                                    }
                                  />
                                </ListItem>
                              </>
                            );
                          })}
                        </Item>
                      </Grid>

                      <Grid item xs>
                        <Grid sx={{ flexGrow: 1 }} container spacing={0}>
                          <Grid item xs={4} sx={{ border: "1px dashed grey" }}>
                            <Item elevation={0} sx={{ padding: 0 }}>
                              Total Dev Time
                            </Item>
                            <Item elevation={0} sx={{ padding: 0 }}>
                              Required
                            </Item>
                            <Item
                              elevation={0}
                              sx={{ fontSize: 40, padding: 0 }}
                            >
                              {project.totalDevTimeRequired}
                            </Item>
                            <Item elevation={0} sx={{ padding: 0 }}>
                              Hours
                            </Item>
                          </Grid>
                          <Grid item xs={1} sx={{ border: "1px dashed grey" }}>
                            <Item
                              elevation={0}
                              class="rotatetext MuiPaper-root MuiPaper-elevation MuiPaper-rounded MuiPaper-elevation0 css-12vq0h9-MuiPaper-root"
                            >
                              Status
                            </Item>
                          </Grid>
                          <Grid item xs sx={{ border: "1px dashed grey" }}>
                            <Item elevation={0}>Pie Chart</Item>
                            <div sx={{ display: "inline" }}>
                              {moduleData.map((data) => {
                                return (
                                  <ModuleChart
                                    name={data.label}
                                    completed={data.completed}
                                    assigned={data.assigned}
                                    unassigned={data.unassigned}
                                    sx={{ display: "inline" }}
                                  />
                                );
                              })}
                            </div>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={1.5} sx={{ border: "1px dashed grey" }}>
                    <img src={project.img} alt="Not Available" />
                  </Grid>
                </Grid>
              </Paper>
            </div>
            </>
          ))}
        </React.Fragment>
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
