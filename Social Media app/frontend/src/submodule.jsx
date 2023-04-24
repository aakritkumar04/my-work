import React from "react";
import Nav2 from "./Nav2.jsx";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Nav3 } from "./Nav3.jsx";


export const Submodule = () => {
  const navigate = useNavigate();
  const [curruser, setcurruser] = useState({
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
        axios
          .post("http://localhost:4000/api/othersubgredditdata", {
            store: str,
            name: name,
            username: curruser.username,
          })
          .then((res) => {
            if (res.data.condtion === -1) {
              alert("DOES NOT EXIST");
              navigate("/profile");
            }
            var gredditdata = res.data.message;
            setsubgredditdata(gredditdata);
            setpostdata(gredditdata.post); // for post data
            setpostusers(gredditdata.postuser);
            var exist = res.data.condition;
            setexists(exist);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);


  useEffect(()=>{
    axios.post("http://localhost:4000/api/checkblock" , {store : str , username : curruser.username, subgredditname : name})
    .then((val)=>{
      if(val.data.message === 1)
      {
        alert("You have been blocked by the moderator");
        navigate("/home")
      }
    })
  },[])

  var [subgredditdata, setsubgredditdata] = useState({});
  var [exists, setexists] = useState(false);
  var [pending, setpending] = useState(false);

  const str = window.localStorage.getItem("localstr");

  useEffect(() => {
    axios
      .post("http://localhost:4000/api/checkpending", { store: str, name: name })
      .then((res) => {
        if (res.data.message) {
          setpending(true);
        } else {
          setpending(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const pendingreq = () => {
    axios
      .post("http://localhost:4000/api/pendingdata", {
        store: str,
        subgredditname: name,
      })
      .then((res) => {
        console.log(res.data.message);
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };



  const { name } = useParams();

  // post data and comments from here to
  const [post, setpost] = useState("");
  const [postdata, setpostdata] = useState([]);
  const [postusers, setpostusers] = useState([]);

  let value;
  const handleSubmit = (e) => {
    value = e.target.value;
    setpost(value);
  };

  const newpost = () => {
    axios
      .post("http://localhost:4000/api/newpost", {
        store: str,
        name: name,
        post: post,
        username: curruser.username,
      })
      .then((res) => {
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const Report = (e)=>{
    const [report,setreport] = useState("");

    let valuee;
    const Changereport = (e) => {
      valuee = e.target.value;
      setreport(valuee);
    };

    const GotoReport = ()=>{
      axios.post("http://localhost:4000/api/report" , {store : str , post : e.value, username : postusers[e.index], reason : report , subgredditname : name , position : e.index , username1 : curruser.username})
      .then((res)=>{
        window.location.reload();
      }).catch((err)=>{
        console.log(err);
      })
    }

    return (
      <div>
          <button
            type="button"
            class="btn btn-primary"
            data-bs-toggle="modal"
            data-bs-target={"#reportModal" + e.index}
          >
            Report this post
          </button>

          <div
            class="modal fade"
            id={"reportModal" + e.index}
            tabindex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                <h6 style={{color : "black"}}>Why do you want to report this post?</h6>
                <button
                    type="button"
                    class="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div class="modal-footer">
                  <input onChange={Changereport} value={report} />
                  <button
                    type="button"
                    class="btn btn-primary"
                    onClick={GotoReport}
                  >
                    Send report
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
    )
  }



  const Important = (e) => {
    // console.log(e)
    const [showcomments, setshowcomments] = useState([]);
    const [comment, setcomment] = useState("");
    const [upvoting,setupvoting] = useState(1);
    const [downvoting,setdownvoting] = useState(1);
    const [upvotelength,setupvotelength] = useState(0);


    axios
      .post("http://localhost:4000/api/allcomments", {
        store: str,
        subgredditdata: name,
        index: e.index,
      })
      .then((res) => {
        setshowcomments(res.data.message);
      })
      .catch((err) => {
        console.log(err);
      });


    useEffect(()=>{
      axios.post("http://localhost:4000/api/allupvotes" , {store : str, username : curruser.username , index : e.index , post : e.val , subgredditname : name})
      .then((val)=>{
        setupvoting(val.data.message)
      }).catch((err)=>{
        console.log(err)
      })
    },[])
    

    let cval;
    const handleComment = (e) => {
      cval = e.target.value;
      setcomment(cval);
    };

    const upvote = ()=>{
      axios.post("http://localhost:4000/api/upvotes", {store : str, username : curruser.username , index : e.index , post : e.val , subgredditname : name})
      .then((res)=>{
        setupvoting(res.data.message);
        setupvotelength(res.data.len);
        window.location.reload();
      }).catch((err)=>{
        console.log(err)
      })
    }

    const downvote = ()=>{

    }

    const postcomments = (e) => {
      console.log(e);
      axios
        .post("http://localhost:4000/api/newcomments", {
          store: str,
          post: e.val,
          subgredditname: name,
          comment: comment,
          index: e.index,
        })
        .then((res) => {
          // console.log(res.data.message);
          setupvotelength(res.data.len)
        })
        .catch((err) => {
          console.log(err);
        });
    };

    return (
      <div>
        <Report index={e.index} value={e.val} />
        <button
          type="button"
          class="btn btn-primary"
          data-bs-toggle="modal"
          data-bs-target={"#commentsModal" + e.index}
        >
          Comments
        </button>

        {/* {upvoting === 1 ? <div><button onClick={upvote}><i class="fa-solid fa-heart"></i></button> <p>{upvotelength}</p></div> : <div><button onClick={upvote}><i class="fa-regular fa-heart"></i></button> <p>{upvotelength}</p> </div>}

        <button onClick={downvote}><i class="fa-solid fa-thumbs-down"></i></button>
        <button onClick={downvote}><i class="fa-regular fa-thumbs-down"></i></button> */}

        <div
          class="modal fade"
          id={"commentsModal" + e.index}
          tabindex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
              <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body" style={{color:"black"}}>
                {showcomments.map((value, indexing) => {
                  return <p>{value}</p>;
                })}
                
              </div>

              <div class="modal-footer">
              <input
                  class="modal-title fs-5"
                  id="exampleModalLabel"
                  placeholder="Comment"
                  name="name"
                  value={comment}
                  onChange={handleComment}
                />
                <button
                  type="button"
                  class="btn btn-primary"
                  onClick={() => {
                    postcomments({ val: e.val, index: e.index });
                  }}
                >
                  ---o
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // HERE
  return (
    <div>
      <Nav2 />
      <div>
        {curruser.username === subgredditdata.username ? <Nav3 user="active" /> : <div></div>}
      </div>
      <div>
        {curruser.username === subgredditdata.username ? (
          <button>JOINED</button>
        ) : exists ? (
          <button>JOINED</button>
        ) : (
          <button onClick={pendingreq} disabled={pending}>
            {pending ? "PENDING" : "JOIN"}
          </button>
        )}
      </div>

      {/* new data for posting */}
      {postdata.map((val, index) => {
        if(val === null)
        {
          return(
            <div>
            </div>
          )
        }
        return (
          <div>
            <div class="card" style={{ width: "18rem" }}>
              <div class="card-body">
                <h5 class="card-title" style={{ color: "black" }}>
                  {postusers[index]}
                </h5>
                <p class="card-text" style={{ color: "black" }}>
                  {val}
                </p>
              </div>
              {/* {important({val : val , index : index})} */}
              <Important val={val} index={index} />
            </div>
          </div>
        );
      })}

      <button
        type="button"
        class="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Add new post
      </button>

      <div>
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
                  placeholder="Post"
                  name="name"
                  value={post}
                  onChange={handleSubmit}
                />
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button type="button" class="btn btn-primary" onClick={newpost}>
                  Save changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
