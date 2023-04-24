import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Nav from "./Nav";
import { Nav3 } from "./Nav3";
import Nav2 from "./Nav2";
import Chart from "chart.js/auto";
import { Line } from "react-chartjs-2";

const VisitStatReturn = (xaxis,yaxis)=>{
    
  return {
      labels: xaxis,
      datasets: [
        {
          label: 'Number of visits',
          fill: false,
          lineTension: 0.5,
          backgroundColor: 'white',
          borderColor: 'black',
          borderWidth: 2,
          data: yaxis,
        }
      ]
    }
}

export const Stats = () => {

  const str = window.localStorage.getItem("localstr");
  const { name } = useParams();
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

  useEffect(() => {
    axios
      .post("http://localhost:4000/api/getstat", {
        store: str,
        subgredditname: name,
      })
      .then((res) => {
        if (res) {
          const visdate = res.data.message.visdate;
          const postdate1 = res.data.message.postdate;
          const followdate1 = res.data.message.followdate
          const blre1 = res.data.message.report
          console.log(res);
          setstatdata(res.data.message);
          freq(visdate);
          freq2(postdate1);
          freq3(followdate1);
          freq4(blre1)
        }
      });
  }, []);

  const [statdata, setstatdata] = useState({});
  const [visitor, setvisitor] = useState([]);
  const [datevisitor, setdatevisitor] = useState([]);
  const [postlen,setpostlen] = useState([]);
  const [postdate,setpostdate] = useState([]);
  const [followdate,setfollowdate] = useState([]);
  const [followlen,setfollowlen] = useState([]);
  const [report,setreport] = useState([]);
  const [block,setblock] = useState([]);


  const freq = (arr) => {
    let s = new Set(arr);
    let a = [...s];

    let x = [];
    let y = [];
    a.forEach((val, index) => {
      x.push(val);
      y.push(
        arr.filter((e) => {
          return e === val;
        }).length
      );
    });

    setdatevisitor(x);
    setvisitor(y);
  };

  const freq2 = (arr) => {
    let s = new Set(arr);
    let a = [...s];

    let x = [];
    let y = [];
    a.forEach((val, index) => {
      x.push(val);
      y.push(
        arr.filter((e) => {
          return e === val;
        }).length
      );
    });

    setpostdate(x);
    setpostlen(y);
  };

  const freq3 = (arr)=>{
    let s = new Set(arr);
    let a = [...s];

    let x = [];
    let y = [];
    a.forEach((val, index) => {
      x.push(val);
      y.push(
        arr.filter((e) => {
          return e === val;
        }).length
      );
    });

    setfollowdate(x);
    setfollowlen(y);
  }

  const freq4 = (arr)=>{
    let s = new Set(arr);
    let a = [...s];

    let x = [];
    let y = [];
    a.forEach((val, index) => {
      x.push(val);
      y.push(
        arr.filter((e) => {
          return e === val;
        }).length
      );
    });

    setreport(x);
    setblock(y);
  }

  return (
    <div>
      <Nav2 />
      <Nav3 stats="active" />
      <div>
        <h1>VISITORS VS VISITORS DATE </h1>
      </div>
      <div>
        { visitor.length !== 0 ?
        <Line
                data={VisitStatReturn(datevisitor,visitor)}
                options={{
                title:{
                  display:true,
                  fontSize:20
                },
                legend:{
                  display:true,
                  position:'right'
                }
              }}
            />
            :
            ""}
      </div>
      <div>
        <h1>POST PER DAY</h1>
      </div>
      <div>
        { postlen.length !== 0 ?
        <Line
                data={VisitStatReturn(postdate,postlen)}
                options={{
                title:{
                  display:true,
                  fontSize:20
                },
                legend:{
                  display:true,
                  position:'right'
                }
              }}
            />
            :
            ""}
      </div>
      <div>
        <h1>GROWTH IN TERMS OF MEMBERS</h1>
      </div>
      <div>
        { postlen.length !== 0 ?
        <Line
                data={VisitStatReturn(followdate,followlen)}
                options={{
                title:{
                  display:true,
                  fontSize:20
                },
                legend:{
                  display:true,
                  position:'right'
                }
              }}
            />
            :
            ""}
      </div>
      <div>
        <h1>REPORT VS BLOCK</h1>
      </div>
      <div>
        { postlen.length !== 0 ?
        <Line
                data={VisitStatReturn(report,block)}
                options={{
                title:{
                  display:true,
                  fontSize:20
                },
                legend:{
                  display:true,
                  position:'right'
                }
              }}
            />
            :
            ""}
      </div>
    </div>
  );
};
