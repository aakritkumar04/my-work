import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useState , useEffect } from "react";
import axios from "axios";



export const Nav3 = (props) => {
    const {name} = useParams();
    // console.log(name);
    const navigate = useNavigate();
    var [subgredditdata, setsubgredditdata] = useState([]);

  var [curruser, setcurruser] = useState({
    firstname: "",
    lastname: "",
    username: "",
    email: "",
    age: "",
    contact: "",
    pass: "",
    About: "",
  });

  useEffect(() => {
    axios
      .post("http://localhost:4000/api/getdata", { store: str })
      .then((res) => {
        var getdata = res.data.message;
        setcurruser(getdata);
      })
      .catch((err) => {
        console.log(err);
      });
  },[]);

  // var [currsubgredditdata,currsetsubgredditdata] = useState({
  //   username : curruser.username,
  //   name : "",
  //   followers : "",
  //   post : "",
  //   description : "",
  //   date : new Date(),
  //   tags : [],
  //   bannedKeywords : []    
  // })

  const str = window.localStorage.getItem("localstr");
  

  useEffect(() => {
    axios
      .post("http://localhost:4000/api/getsubgredditdata", { store: str })
      .then((res) => {
        var gredditdata = res.data.message;
        setsubgredditdata(gredditdata);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
    


  return (
    <div className="row my-5">
      <div className="col-4"></div>
      <div className="col-6">
        <ul class="nav nav-tabs">
          <li class="nav-item">
            <a class={"nav-link " + props.user} aria-current="page" onClick={()=>{navigate("/submodule/"+name)}}>
              Users
            </a>
          </li>
          <li class="nav-item">
            <a class={"nav-link " + props.join} onClick={()=>{navigate("/joining/"+name)}}>
              Joining
            </a>
          </li>
          <li class="nav-item">
            <a class={"nav-link " + props.stats} onClick={()=>{navigate("/stats/" + name)}}>
              Stats
            </a>
          </li>
          <li class="nav-item">
            <a class={"nav-link " + props.report} onClick={()=>{navigate("/reportpage/" + name)}}>
              Reports
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};
