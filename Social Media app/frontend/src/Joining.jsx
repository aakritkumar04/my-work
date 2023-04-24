import React from "react";
import { useParams } from "react-router-dom";
import { Nav3 } from "./Nav3";
import Nav2 from "./Nav2"; 
import axios from "axios";
import { useEffect , useState} from "react";

export const Joining = ()=>{
  const str = window.localStorage.getItem("localstr");
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
  var [currsubgreddit,setcurrsubgreddit] = useState([]);

  useEffect(() => {
    axios.post("http://localhost:4000/api/getjoiningdata" , {store  : str , name : name})
    .then((res)=>{
      setsubgredditdata(res.data);
    }).catch((err)=>{
      console.log(err);
    })
  },[])

    const {name} = useParams();

    const acceptdata = (e)=>{
      axios.post("http://localhost:4000/api/acceptuser" , {store : str , data : {username : e , subgredditname : name}})
      .then((res)=>{
        console.log(res.data.message);
        window.location.reload();
      }).catch((err)=>{
        console.log(err);
      })
    }

    const rejectdata = (e)=>{
      axios.post("http://localhost:4000/api/rejectuser" , {store : str , data : {username : e , subgredditname : name}})
      .then((res)=>{
        window.location.reload();
      }).catch((err)=>{
        console.log(err);
      })
    }

    useEffect(()=>{
      axios.post("http://localhost:4000/api/getsubgredditdata", {
          store: str,
        })
        .then((res) => {
          if(res.data.condtion === -1)
          {
            alert("DOES NOT EXIST");
            // navigate("/profile");
          }
          var gredditdata = res.data.message;
          var newdata = gredditdata.filter((e)=>{
            return e.name === name;
          })
          setcurrsubgreddit(newdata);
        })
        .catch((err) => {
          console.log(err);
        });
    },[])


    return (
        <div>
          <Nav2 />
          <div>
            <Nav3 join="active"/>
          </div>
          <div>
            <h1>FOLLOWERS</h1>
            {currsubgreddit.map((res,index)=>{
              return (
                <div>
                  <h5>{res.followers}</h5>
                  <br/>
                </div>
              )
            })}
          </div>
          <div>
            <h1>PENDING</h1>
            {subgredditdata.map((val,index)=>{
              return (
                <div>
                  <h5>{val.username}</h5>
                  <button onClick={()=>{acceptdata(val.username)}}>Accept</button>
                  <button onClick={()=>{rejectdata(val.username)}}>Reject</button>
                </div>
              )
            })}
          </div>
        </div>
    );
}