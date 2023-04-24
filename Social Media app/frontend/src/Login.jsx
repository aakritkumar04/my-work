import React , { useState } from "react";
import Nav from "./Nav.jsx";
import { useNavigate } from 'react-router-dom';
import { useEffect } from "react";
import axios from "axios";


export const Login = (props) => {
    const navigate = useNavigate();

    useEffect(()=>{
        if(window.localStorage.getItem("log") != null)
        {
            navigate("/profile");
        }
    });
    const [user,setUser] = useState({
        username:'',pass:''
    });

    let name , value;
    const change = (e) =>
    {
        name = e.target.name;
        value = e.target.value;
        setUser({...user,[name]:value});
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post("http://localhost:4000/api/login",user)
        .then((res)=>{
            if(res.data.messages === 1)
            {
                var storage = res.data.tok;
                window.localStorage.setItem("localstr",storage);
                navigate("/profile"); 
            }
            else if(res.data.messages === 12)
            {
                alert("Please register first!");
            }
            else{
                alert("Please check your password");
            }
        }).catch((err)=>{
            console.log(err);
        });
    }

    return (
        <div className="login justify-content-center">
            <Nav />
            <form>
                <input value={user.username} onChange={change} name="username" type="text" placeholder="Username"/>
                <input value={user.pass} onChange={change} name="pass" type="password" placeholder="Password"/>
                <button type="submit" onClick={handleSubmit}>Log in</button>
                <div className="my-class">
                    <p style={{color:"grey"}} className='link-btn' type="submit" onClick={() => props.onFormSwitch('register')}>Don't have an account? Register here</p>
                </div>
            </form>   
            
            <div className="signin">
                <h5>or sign in with :</h5>
                <i className="foot-icons fa-brands fa-twitter"></i>
                <i className="foot-icons fa-brands fa-apple"></i>
                <i className="foot-icons fa-brands fa-google"></i>
                <i className="foot-icons fa-brands fa-facebook"></i>
            </div>     
        </div>
    );
}
