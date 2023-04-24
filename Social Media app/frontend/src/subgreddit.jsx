import React from "react";
import Nav2 from "./Nav2.jsx";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const Subgreddit = () => {
  const navigate = useNavigate();
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
  }, []);

  var [subgredditdata, setsubgredditdata] = useState([]);

  var [newsubgredditdata, setnewsubgredditdata] = useState({
    username: curruser.username,
    name: "",
    followers: "",
    post: "",
    description: "",
    date: new Date(),
    tags: [],
    bannedKeywords: [],
  });

  const [tag, settag] = useState("");
  const [banned, setbanned] = useState("");

  let name, value;
  const handleSubmit = (e) => {
    name = e.target.name;
    value = e.target.value;
    setnewsubgredditdata({ ...newsubgredditdata, [name]: value });
  };

  const handleSubmit2 = () => {
    let value2 = tag.split(" ");
    for (var i = 0; i < value2.length; i++) {
      value2[i] = value2[i].trim();
      newsubgredditdata.tags.push(value2[i]);
    }
  };

  const handleSubmit3 = () => {
    let value2 = banned.split(" ");
    for (var i = 0; i < value2.length; i++) {
      value2[i] = value2[i].trim();
      newsubgredditdata.bannedKeywords.push(value2[i]);
      console.log(value2[i]);
    }
  };

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

  const postdata = () => {
    handleSubmit2();
    handleSubmit3();
    axios
      .post("http://localhost:4000/api/postsubgredditdata", {
        store: str,
        val: newsubgredditdata,
      })
      .then((res) => {
        if (res.data.message === 0) {
          alert("Subgreddit data saved");
          window.location.reload();
        } else {
          alert("Subgreddit data not saved");
          window.location.reload();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const removesubgreddit = (e) => {
    axios
      .post("http://localhost:4000/api/removesubgreddit", {
        store: str,
        subgredditname: e.name,
      })
      .then((val) => {
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <Nav2 />
      <div>
        <div>
          <h1>{curruser.username} subgreddit page</h1>
          {subgredditdata.map((val, index) => {
            return (
              <div class="card" style={{ width: "18rem" }}>
                <div class="card-body">
                  <h5
                    class="card-title"
                    style={{ color: "black" }}
                    onClick={() => {
                      navigate("/othersubmodule/" + val.name);
                    }}
                    type="submit"
                  >
                    {val.name}{" "}
                  </h5>
                  <a
                    class="card-title"
                    type="submit"
                    onClick={() => {
                      removesubgreddit(val);
                    }}
                  >
                    X
                  </a>
                  <p class="card-text" style={{ color: "black" }}>
                    {val.description}
                  </p>
                  <p class="card-text" style={{ color: "black" }}>
                    {val.date}
                  </p>
                  <p class="card-text" style={{ color: "black" }}>
                    {val.bannedKeywords + ","}
                  </p>
                  <p class="card-text" style={{ color: "black" }}>
                    {val.followers.length}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <button
        type="button"
        class="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Add new subgreddit
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
              <input
                class="modal-title fs-5"
                id="exampleModalLabel"
                placeholder="Title"
                name="name"
                value={newsubgredditdata.name}
                onChange={handleSubmit}
              />
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <input
                class="modal-title fs-5"
                id="exampleModalLabel"
                placeholder="Description"
                name="description"
                value={newsubgredditdata.description}
                onChange={handleSubmit}
              />
            </div>
            <div class="modal-body">
              <input
                class="modal-title fs-5"
                id="exampleModalLabel"
                placeholder="Tags"
                name="tags"
                value={tag}
                onChange={(e) => {
                  settag(e.target.value);
                }}
              />
            </div>
            <div class="modal-body">
              <input
                class="modal-title fs-5"
                id="exampleModalLabel"
                placeholder="Banned Keywords"
                name="bannedkeywords"
                value={banned}
                onChange={(e) => {
                  setbanned(e.target.value);
                }}
              />
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button type="button" class="btn btn-primary" onClick={postdata}>
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
