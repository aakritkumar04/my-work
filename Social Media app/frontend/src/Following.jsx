import axios from "axios";
import React , {useState} from "react";
import { useEffect } from "react";
import Nav2 from "./Nav2.jsx";

export const Following = () => {
    const [following,setfollowing] = useState([]);

    const str = window.localStorage.getItem("localstr");

    useEffect(()=>{
        axios.post("http://localhost:4000/api/getfollowinglist",{store : str})
        .then((res)=>{
            setfollowing(res.data.message);
        }).catch((err)=>{
            console.log(err);
        })
    })

    const Delete = (e)=>{
        console.log(e)
        axios.post("http://localhost:4000/api/deletefollowing" , {store : str , username : e})
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
            {following.map((value,index)=>{
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