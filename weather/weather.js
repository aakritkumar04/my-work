const express = require("express");
const https = require("https");
const bodyP = require("body-parser");

var app = express();
app.use(bodyP.urlencoded({extended : true}));

app.get("/" , function(req , res){
    res.sendFile(__dirname + "/weather.html");
});

app.post("/new" , function(req , res){
    var city = req.body.cityName;
    var api = "b5a0cb1d1a86ba4d4530bcbc909ce357";
    var unit = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + api + "&units=" + unit;

    https.get(url , function(response){
        console.log(response.statusCode);
        response.on("data" , function(data){
            // console.log(data);
            const weatherData = JSON.parse(data);
            // console.log(weatherData);
            const weathertemp = weatherData.main.temp;
            const weatherDesp = weatherData.weather[0].description;
            // console.log(weathertemp);
            // console.log(weatherDesp);
            const image = weatherData.weather[0].icon;
            const imgurl = "http://openweathermap.org/img/wn/" + image + "@2x.png";
            res.write("<h1>The temperature in " + city + " is " + weathertemp + "</h1>");
            res.write("<h3>The weather of " + city + " is : " + weatherDesp + "</h3>");
            res.write("<img src=" + imgurl + ">");
            res.send();
        });
    });
})

app.listen(3000 , function(){
    console.log("Listening......");
});


