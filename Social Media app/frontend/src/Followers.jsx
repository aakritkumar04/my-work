import React , {useState} from "react";
import { useEffect } from "react";
import axios from "axios";
import Nav2 from "./Nav2.jsx";

export const Followers = () => {
    const [follower,setfollower] = useState([]);
    const str = window.localStorage.getItem("localstr");
    useEffect(()=>{
        axios.post("http://localhost:4000/api/getfollowerlist",{store : str})
        .then((res)=>{
            setfollower(res.data.message);
        }).catch((err)=>{
            console.log(err);
        })
    })

    const Delete = (e)=>{
        axios.post("http://localhost:4000/api/deletefollowers" , {store : str , username : e})
        .then((val)=>{
            window.location.reload();
        })
        .catch((err)=>{
            console.log(err)
        })
    }

    return (
        <div>
            <Nav2/>
            {follower.map((value,index)=>{
                return (
                    <div>
                        <a type="submit" href={"/otherprofile/" + value}>{value}</a>
                        <button type="submit" onClick={()=>{Delete(value)}}>remove</button>
                    </div>
                )
            })}
        </div>
    );
}