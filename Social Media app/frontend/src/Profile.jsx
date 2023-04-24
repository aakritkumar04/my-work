import React, { useState } from "react";
import Nav2 from "./Nav2";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";

export const Profile = () => {
  const navigate = useNavigate();
  var [curruser, setcurruser] = useState({
    firstname: "",
    lastname: "",
    username: "",
    email: "",
    age: "",
    contact: "",
    pass: "",
    About: ""
  });

  var [profiledata,setprofiledata] = useState({
    username : "",
    followers : [],
    following : [],
  })

  const str = window.localStorage.getItem("localstr");
  useEffect(() => {
        axios.post("http://localhost:4000/api/getdata",{store : str}).then((res) => {
          if(res.data==="Token not found")
          {
            navigate("/");
          }
          var getdata = res.data.message;
          var pdata = res.data.profile;
          setcurruser(getdata);
          setprofiledata(pdata);
        })
      .catch((err) => {
        console.log(err);
      });
  }, []);


  const goingfollowers = () => {
    navigate("/followers");
  }

  const goingfollowing = () => {
    navigate("/following");
  }

  return (
    <div> 
      <Nav2 />
      <section class="h-100 gradient-custom-2">
        <div class="container py-5 h-100">
          <div class="row d-flex justify-content-center align-items-center h-100">
            <div class="col col-lg-9 col-xl-7">
              <div class="card">
                <div class="rounded-top text-white d-flex flex-row" style={{backgroundColor: "#000", height:"200px"}}>
                  <div class="ms-4 mt-5 d-flex flex-column" style={{width: "150px"}}>
                    <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-profiles/avatar-1.webp"
                      alt="Generic placeholder" class="img-fluid img-thumbnail mt-4 mb-2"
                      style={{width: "150px", zIndex: "1"}} />
                    <button type="button" class="btn btn-outline-dark" data-mdb-ripple-color="dark"
                      onClick={()=>{navigate("/update")}} style={{zIndex: "1"}}>
                      Edit profile
                    </button>
                  </div>
                  <div class="ms-3" style={{marginTop: "130px"}}>
                    <h5>{curruser.firstname + " " + curruser.lastname}</h5>
                  </div>
                </div>
                <div class="p-4 text-black" style={{backgroundColor: "#f8f9fa"}}>
                  <div class="d-flex justify-content-end text-center py-1">
                    <div>
                      <p class="mb-1 h5">4</p>
                      <p class="small text-muted mb-0">Photos</p>
                    </div>
                    <div class="px-3">
                      <p class="mb-1 h5" type="submit" onClick={goingfollowers}>{profiledata.followers.length}</p>
                      <p class="small text-muted mb-0">Followers</p>
                    </div>
                    <div>
                      <p class="mb-1 h5" type="submit" onClick={goingfollowing}>{profiledata.following.length}</p>
                      <p class="small text-muted mb-0">Following</p>
                    </div>
                  </div>
                </div>
                <div class="card-body p-4 text-black">
                  <div class="mb-5">
                    <p class="lead fw-normal mb-1">About</p>
                    <div class="p-4" style={{backgroundColor: "#f8f9fa"}}>
                      <p class="font-italic mb-1">{curruser.About}</p>
                    </div>
                  </div>
                  <div class="d-flex justify-content-between align-items-center mb-4">
                    <p class="lead fw-normal mb-0">Recent photos</p>
                    <p class="mb-0"><a href="#!" class="text-muted">Show all</a></p>
                  </div>
                  <div class="row g-2">
                    <div class="col mb-2">
                      <img src="https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(112).webp"
                        alt=" 1" class="w-100 rounded-3" />
                    </div>
                    <div class="col mb-2">
                      <img src="https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(107).webp"
                        alt=" 1" class="w-100 rounded-3" />
                    </div>
                  </div>
                  <div class="row g-2">
                    <div class="col">
                      <img src="https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(108).webp"
                        alt=" 1" class="w-100 rounded-3" />
                    </div>
                    <div class="col">
                      <img src="https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(114).webp"
                        alt="1" class="w-100 rounded-3" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
