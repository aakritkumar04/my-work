import React from "react";
import { useNavigate } from 'react-router-dom';

function Nav2()
{
    const navigate = useNavigate();
    return (
        <div>
            <nav class="navbar navbar-expand-lg navbar-light bg-light">
                <div class="container-fluid">
                  <div class="navbar-brand">Greddiit <i class="fa-brands fa-reddit"></i></div>
                  <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                  </button>
                    <div class="collapse navbar-collapse" id="navbarContent">
                        <ul class="navbar-nav ms-auto">
                            <li class="nav-item" onClick={() => {navigate("/subgreddit")}}>
                                <i style={{color:'black'}} class="fa-solid fa-home"></i>
                                <h4 style={{color:'black'}} type="submit">MySubgreddit</h4>
                            </li>
                            <li class="nav-item" type="submit" onClick={() => {navigate("/profile")}}>
                                <i style={{color:'black'}} class="fa-solid fa-user"></i>
                            </li>
                            <li class="nav-item" type="submit" onClick={() => {navigate("/home")}}>
                                <i style={{color:'black'}} class="fa-solid fa-cloud"></i>
                                <p style={{color:'black'}}>Subgreddit</p>
                            </li>
                            <li class="nav-item" onClick={() => {window.localStorage.removeItem("localstr");window.localStorage.removeItem("log");navigate("/")}} type="submit">
                                <h4>Logout</h4>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    );
}

export default Nav2;