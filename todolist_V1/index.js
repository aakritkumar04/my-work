
const express = require("express");
const bodyP = require("body-parser");

const app = express();
app.use(bodyP.urlencoded({extended : true}));
app.set("view engine", "ejs");

var items = [];


app.listen(3000 , function(){
    console.log("Server has been initiated.....");
})

app.get("/" , function(req , res){
    var today = new Date();
    
    var options = {
        weekday :"long",
        day:"numeric",
        month:"long"
    }
    var day = today.toLocaleDateString("en-IN",options);

    res.render("index" , {kindofDay : day , newItems : items});
})

app.post("/" , function(req , res){
    var item = req.body.item_names;
    items.push(item);
    res.redirect("/");
})