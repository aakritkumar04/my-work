import React from "react";
import Nav2 from "./Nav2";
import axios from "axios";
import { useState , useEffect } from "react";
import { useNavigate } from "react-router-dom";
export const Home = ()=>{
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

  const str = window.localStorage.getItem("localstr");
  const [change,setchange] = useState("");
  const [subgredditdata,setsubgredditdata] = useState([]);
  const [change2,setchange2] = useState([]);

  const handleSubmit = (e)=>{
    var val = e.target.value;
    setchange(val);
  }

  const handleSubmit2 = (e)=>{
    var val = e.target.value;
    setchange2(val);
  }

    const search = ()=>{
        axios.post("http://localhost:4000/api/search",{store : str , string : change})
        .then((res)=>{
            setsubgredditdata(res.data.message);
        }).catch((err)=>{
            console.log(err);
        })
    }

    const [sortbyname,setsortbyname] = useState(0);
    const [sortbydate,setsortbydate] = useState(0);
    const [sortbynamedes,setsortbynamedes] = useState(0);

    const handlechange = (e)=>{

      if(sortbyname === 0)
      {
        setsubgredditdata(subgredditdata.sort((a,b)=>{
          return a.name.localeCompare(b.name);
        }))
      }
      setsortbyname((sortbyname + 1)%2);
    }

    const handlechange2 = (e)=>{

      if(sortbyname === 0)
      {
        setsubgredditdata(subgredditdata.sort((a,b)=>{
          return a.name.localeCompare(b.name);
        }))
      }
      subgredditdata.reverse();
      setsortbynamedes((sortbynamedes + 1)%2);
    }

    const handlechange3 = (e)=>{
      
      if(sortbyname === 0)
      {
        setsubgredditdata(subgredditdata.sort((a,b)=>{
          const date1 = new Date(a.date);
          const time1 = date1.getTime();
          const date2 = new Date(b.date);
          const time2 = date2.getTime();
          return time1-time2;
        }))
      }
      setsortbydate((sortbydate + 1)%2);
    }

    const searchtag = ()=>{
      axios.post("http://localhost:4000/api/searchtag",{store : str , })
      .then((val)=>{

      }).catch((err)=>{
        console.log(err)
      })
    }

    return(
        <div>
            <Nav2/>
            <div class="input-group">
              <div class="form-outline">
                <input id="search-focus" type={search} onChange={handleSubmit} value={change} className="form-control" />
                <label class="form-label" for="form1">Search</label>
              </div>
              <button type="button" class="btn btn-primary">
                <i class="fas fa-search"onClick={search}></i>
              </button>
              <div>
                {
                    subgredditdata.length === 0 ?
                    ""
                    :
                    subgredditdata.map((val,index)=>{
                      return(
                        <h5 type="submit" onClick={()=>{navigate("/othersubmodule/" + subgredditdata[index].name)}}>{subgredditdata[index].name}</h5>
                      )
                    })
                }
              </div>
              <div class="md-4">
                <input type={"checkbox"} onChange={handlechange}/>
                <label>Sort by name</label>
                <input type={"checkbox"} onChange={handlechange2}/>
                <label>Sort by name(descending)</label>
                <input type={"checkbox"} onChange={handlechange3}/>
                <label>Sort by date</label>
                <div>
                  <label>Find by tagname</label>
                  <input type={search} onChange={handleSubmit2} value={change2}/>
                  <button type="button" class="btn btn-primary">
                    <i class="fas fa-search"onClick={searchtag}></i>
                  </button>
                </div>
              </div>
            </div>
        </div>
    )
}