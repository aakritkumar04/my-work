import React , {useState} from 'react';
import {Login} from "./Login.jsx";
import {Register} from "./Register.jsx";
import {Profile} from "./Profile.jsx";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import {Update} from "./Update.jsx";
import { Followers } from './Followers.jsx';
import { Following } from './Following.jsx';
import Nav2 from './Nav2.jsx';
import { OtherProfile } from './otherprofile.jsx';
import { Subgreddit } from './subgreddit.jsx';
import { Submodule } from './submodule.jsx';
import { Joining } from './Joining.jsx';
import { Othersubmodule } from './othersubmodule.jsx';
import { Home } from './Home.jsx';
import { ReportPage } from './ReportPage.jsx';
import { Stats } from './Stats.jsx';


function App() {

    const [currform,setcurrform] = useState('login');
    const toggleForm = (formName) => {
    setcurrform(formName);
    }

    return(
      <div>
        <BrowserRouter>
            <Routes>
              <Route
                exact path="/"
                element={currform === "login" ? <Login onFormSwitch={ toggleForm }/> : <Register onFormSwitch={ toggleForm } />}
              />
              <Route
                path="/profile"
                element={<Profile />}
              />
              <Route
              path="/update"
              element={<Update/>}
              />
              <Route 
              path='/subgreddit'
              element={<Subgreddit />}
              />
              <Route 
              path='/followers'
              element={<Followers />}
              />
              <Route 
              path='/following'
              element={<Following />}
              />
              <Route 
              path='/otherprofile/:username'
              element={<OtherProfile />}
              />
              <Route 
              path='/submodule/:name'
              element={<Submodule />}
              />
              <Route 
              path='/joining/:name'
              element={<Joining />}
              />
              <Route 
              path='/othersubmodule/:name'
              element={<Othersubmodule />}
              />
              <Route 
              path='/home'
              element={<Home />}
              />
              <Route 
              path='/reportpage/:name'
              element={<ReportPage />}
              />
              <Route 
              path='/stats/:name'
              element={<Stats />}
              />
            </Routes>
            
        </BrowserRouter>
      </div>
      );
}

export default App;
