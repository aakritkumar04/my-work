import axios from "axios";
import React, { useEffect,useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Nav2 from "./Nav2";
import { Nav3 } from "./Nav3";

export const ReportPage = ()=>{

    const {name} = useParams();
    const [reports,setreports] = useState([]);

    const str = window.localStorage.getItem("localstr");

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

    useEffect(()=>{
        axios.post("http://localhost:4000/api/allreport",{store:str , subgredditname : name})
        .then((res)=>{
            setreports(res.data.message);
        }).catch((err)=>{
            console.log(err);
        })
    },[])
    
    const ShowReports = (e)=>{
        const [flag,setflag] = useState(0);
        useEffect(()=>{
            axios.post("http://localhost:4000/api/checkignore" , {store : str , subgredditname : e.val.subgredditname, post : e.val.post , position : e.val.position , username : e.val.username , username1 : e.val.username1 , reason : e.val.reason})
            .then((res)=>{
                if(res.data.message.ignore === 1)
                {
                    setflag(1);
                }
                else
                {
                    setflag(0);
                }
            }).catch((err)=>{
                console.log(err)
            })
        },[])

        const Updateignore = ()=>{
            axios.post("http://localhost:4000/api/updateignore" , {store : str , subgredditname : e.val.subgredditname, post : e.val.post , position : e.val.position})
            .then((res)=>{
                if(res.data.message.ignore === 1)
                {
                    setflag(1);
                }
                else
                {
                    setflag(0);
                }
            }).catch((err)=>{
                console.log(err)
            })
        }

        const DeletePost = ()=>{
            axios.post("http://localhost:4000/api/removepost", {store : str ,reportindex : e.index , otherindex : e.val.position , subgredditname : e.val.subgredditname, post : e.val.post})
            .then((val)=>{
                navigate("/submodule/" + name)
            }).catch((err)=>{
                console.log(err)
            })
        }

        const BlockUser = ()=>{
            axios.post("http://localhost:4000/api/blockuser", {store : str ,reportindex : e.index , otherindex : e.val.position , subgredditname : e.val.subgredditname, post : e.val.post, username : e.val.username})
            .then((val)=>{
                if(val.data.message === 1)
                {
                    window.location.reload()
                }
            }).catch((err)=>{
                console.log(err)
            })
        }

        return(
            <div class="card my-5 w-50 ">
              <h5 class="card-header">
                  {e.val.username}
              </h5>
                <div class="card-body">
                    <h5 class="card-title">{e.val.subgredditname}</h5>
                    <p class="card-text">{e.val.post}</p>
                    <p class="card-text">{e.val.reason}</p>
                    <p class="card-text">REPORTED BY : {e.val.username1}</p>
                    {flag === 1 ? 
                        <div>
                        <button type="submit">Ignore</button>
                        <button type="submit" onClick={BlockUser} disabled="true">Block</button>
                        <button type="submit" onClick={DeletePost} disabled="true">Delete Post</button> </div> 
                        : 
                        <div>
                        <button type="submit" onClick={Updateignore}>Ignore</button>
                        <button type="submit" onClick={BlockUser}>Block</button>
                        <button type="submit" onClick={DeletePost}>Delete Post</button>
                        </div>
                    }
                    
                </div>
            </div>
        )
    }

    return(
        <div>
          <Nav2 />
          <Nav3 report="active"/>
            <div style={{color:"black"}}>
                {reports.map((val,index)=>{
                    return(
                        <ShowReports val={val} index={index}/>
                    )
                })}
            </div>
        </div>
    )
}