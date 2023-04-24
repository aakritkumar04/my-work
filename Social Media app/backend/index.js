const mongoose = require("mongoose");
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const { response } = require("express");
const app = express();
app.use(express.json());
app.use(cors());
// const secretkey = "iamaakritkumarfrominternational";
mongoose.set('strictQuery', false);
const DB = "mongodb+srv://aakrit:DKIbVWBtBGBhMtd7@cluster0.wpe5avv.mongodb.net/test?retryWrites=true&w=majority";

mongoose.connect(DB).then(() => {
    console.log("connection succesful");
}).catch((err) => {
    console.log(err)
});
const secretkey = "mynameisaakritkumariamfromiiithyderabad";
const userSchema = {
    firstname: String,
    firstname: { type: String, required: true },
    lastname: String,
    lastname: { type: String, required: true },
    username: String,
    username: { type: String, required: true, unique: true },
    email: String,
    email: { type: String, required: true, unique: true },
    age: String,
    contact: String,
    pass: String,
    pass: { type: String, required: true },
    About: String
}

const profileSchema = {
    username: String,
    followers: [String],
    following: [String]
}

const subgredditSchema = {
    username : String,
    name : String,
    followers : [String],
    post : [String],
    postuser : [String],
    description : String,
    date : Date,
    tags : [String],
    bannedKeywords : [String],
    upvote : [{
        thing : String,
        postindex : Number,
        username : String
    }],
    downvote : [{
        thing : String,
        postindex : Number,
        username : String
    }]
}

const joinrequestSchema = {
    subgredditname : String,
    username : String
}

const commentSchema = {
    subgredditname : String,
    index : Number,
    post : String,
    comment : [String]
}

const reportSchema = {
    subgredditname : String,
    post : String,
    username : String,
    username1 : String,
    reason : String,
    position : Number,
    ignore : Number,
    index : Number
}

const BlockSchema = {
    subgredditname : String,
    blockuser : [String]
}


const StatsSchema = {
    subgredditname : String,
    posts : [String],
    postdate : [String],
    visdate : [String],
    visitors : [String],
    followers : [String],
    followdate : [String],
    report : [String],
    block : [String]
}

const stats = new mongoose.model("stats",StatsSchema)
const Subgreddit = new mongoose.model("subgreddit",subgredditSchema);
const User = new mongoose.model("users", userSchema);
const profile = new mongoose.model("profiledata", profileSchema);
const Join = new mongoose.model("joinrequest", joinrequestSchema);
const comments = new mongoose.model("comments",commentSchema);
const report = new mongoose.model("report",reportSchema);
const block = new mongoose.model("block",BlockSchema);

app.get('/', function (req, res) {
    res.send("Hello it works!");
});

app.post("/api/register", function (req, res) {
    bcrypt.hash(req.body.pass, 10, function (err, hash) {
        const newUser = new User({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            username: req.body.username,
            email: req.body.email,
            age: req.body.age,
            contact: req.body.contact,
            pass: hash,
            About: req.body.about
        });

        const newProfile = new profile({
            username: req.body.username,
        });

        newUser.save(function (err) {
            if (err) {
                console.log(err);
            } else {
                newProfile.save().then(() => {
                    console.log("Saved user");
                    res.send({ message: 1 });
                }).catch((err) => {
                    console.log(err);
                });
            }
        });
    });
});

app.post("/api/login", function (req, res) {
    const { username, pass } = req.body;
    User.findOne({ username: username }, (err, us) => {
        if (err) {
            res.send({ messages: 12 })
        } else {
            if (us) {
                bcrypt.compare(pass, us.pass, function (err, result) {
                    if (result == true) {
                        const token = jwt.sign(us.toJSON(), secretkey);
                        const tosend = { messages: 1, tok: token };
                        res.send(tosend);
                    }
                    else {
                        res.send({ messages: 0 });
                    }
                });
            } else {
                res.send({ messages: 12 });
            }
        }
    });
});

const authorization = function (req, res, next) {
    const token = req.body.store;
    if (token) {
        try {
            const decode = jwt.verify(token, secretkey);

            req.body.decode = decode;
            next();
        } catch (err) {
            console.log(err);
        }
    } else {
        res.send("Token not found");
        console.log("Authorization Error");
    }
};

app.post("/api/update", authorization, function (req, res) {
    const data = req.body.user;
    User.findOneAndUpdate({ username: data.username }, data, (err, us) => {
        if (err) {
            console.log("THIS IS AN UPDATE ERROR IN SERVER");
            console.log(err);
            return res.send({ message: 0 });
        }
        else {
            return res.send({ message: 1 });
        }
    });
});


app.post("/api/getdata", authorization, (req, res) => {
    const user = req.body.decode;
    User.findOne({ username: user.username }, (err, us) => {
        if (err) {
            res.send({ message: 0 });
            console.log(err);
        }
        else {
            if (us) {
                profile.findOne({ username: user.username }, (err, ds) => {
                    if (err) {
                        res.send(err);
                    }
                    else {
                        res.send({ message: us, profile: ds });
                    }
                })
            }
        }
    })
})

app.post("/api/getdataotherprofile",authorization,(req, res) => {
    const user = req.body.name;
    User.findOne({ username: user }, (err, us) => {
        if (err) {
            res.send({ message: 0 });
            console.log(err);
        }
        else {
            if (us) {
                profile.findOne({ username: user }, (err, ds) => {
                    if (err) {
                        res.send(err);
                    }
                    else {
                        res.send({ message: us, profile: ds });
                    }
                })
            }
        }
    })
})

app.post("/api/followerandfollowing", authorization, (req, response) => {
    const token = req.body.decode.username;
    const username = req.body.username;

    profile.findOne({ username: username }).then((res) => {
        res.followers.push(token);
        res.save().then(() => {
            profile.findOne({ username: token }).then((res) => {
                res.following.push(username);
                res.save();
                response.send({message : true});
            });
        }).catch((err) => {
            console.log(err);
        });
    })
})

app.post("/api/unfollowing", authorization, (req, response) => {
    const token = req.body.decode.username;
    const username = req.body.username;

    profile.findOne({ username: username }).then((res) => {
        res.followers.splice(res.followers.indexOf(token),1);
        res.save().then(() => {
            profile.findOne({ username: token }).then((res) => {
                res.following.splice(res.following.indexOf(username),1);
                res.save();
                response.send({message : true});
            });
        }).catch((err) => {
            console.log(err);
        });
    })
})

app.post("/api/checkfollowers",authorization,(req, response) => {
    const token = req.body.decode.username;
    const username = req.body.username;
    profile.findOne({ username: token }).then((res) => {
        if(res.following.includes(username))
        {
            response.send({message : true});
        }
        else
        {
            response.send({message : false});
        }
    })
})

app.post("/api/getfollowinglist",authorization,(req,response)=>{
    const token = req.body.decode.username;
    profile.findOne({ username: token }).then((res) => {
        response.send({message : res.following});
    })
})

app.post("/api/getfollowerlist",authorization,(req,response)=>{
    const token = req.body.decode.username;
    profile.findOne({ username: token }).then((res) => {
        response.send({message : res.followers});
    })
})

app.post("/api/getsubgredditdata",authorization,(req,response)=>{
    Subgreddit.find({username : req.body.decode.username})
    .then((val)=>{
        response.send({message : val});
    }).catch((err)=>{
        console.log(err);
        response.send({message : []});
    })
})

app.post("/api/postsubgredditdata",authorization,(req,response)=>{
    const token = req.body.decode.username;
    const data = req.body.val;
    const newsubgredditdata = new Subgreddit({
        username : token,
        name : data.name.trim(),
        description : data.description,
        date : data.date,
        tags : data.tags,
        bannedKeywords : data.bannedKeywords
    })
    newsubgredditdata.save().then(()=>{
        response.send({message : 0});
        console.log("newsubgredditdata saved");
    }).catch((err)=>{
        console.log(err);
    })
})

app.post("/api/pendingdata",authorization,(req,response)=>{
    const token = req.body.decode.username;
    const subgredditname = req.body.subgredditname;
    const newjoin = new Join({
        subgredditname : subgredditname,
        username : token
    })

    newjoin.save().then(()=>{
        response.send({message : 1});
    }).catch((err)=>{
        console.log(err);
    })
})

app.post("/api/othersubgredditdata",authorization,(req,res)=>{
    const name = req.body.name;
    Subgreddit.findOne({name : req.body.name})
    .then((val)=>{
        if(val === null)
        {
            res.send({
                condition: -1,
            })
            return 
        }
        var exist = val.followers.includes(req.body.decode.username);
        res.send({message: val , condition : exist});
    }).catch((err)=>{
        console.log(err);
        res.send({message : []});
    })
})

app.post("/api/checkpending",authorization,(req,res)=>{
    const username = req.body.decode.username;
    const name = req.body.name;
    Join.find({subgredditname : name})
    .then((val)=>{
        var exist = val.filter((e)=>{
            return e.username === username
        });
        var retval = exist.length === 0 ? null : exist[0];
        res.send({message : retval});
    })
})

app.post("/api/getjoiningdata" ,authorization,(req,res)=>{
    Join.find({subgredditname : req.body.name})
    .then((val)=>{
        res.send(val);
    }).catch((err)=>{
        console.log(err);
    })
})

app.post("/api/acceptuser" , authorization , (req,response)=>{
    const data = req.body.data;
    const username = data.username;
    const subgredditname = data.subgredditname;
    Subgreddit.findOne({name : subgredditname})
    .then((res)=>{
        res.followers.push(username);
        res.save();
        stats.findOne({subgredditname : subgredditname})
        .then((val)=>{
            val.followers.push(username);
            const date = new Date();
            const month = date.getMonth();
            const year = date.getFullYear();
            const day = date.getDate();

            let s = day + "-" + month + "-" + year

            val.followdate.push(s);
            val.save();

        })
        Join.findOneAndDelete({subgredditname : subgredditname , username : username},(err,us)=>{
            if(err){
                console.log("Error in Rejecting user");
            }
        });
        response.send({message : 1});
    }).catch((err)=>{
        console.log(err);
    })
})

app.post("/api/rejectuser",authorization,(req,res)=>{
    const data = req.body.data;
    const username = data.username;
    const subgredditname = data.subgredditname;
    Subgreddit.findOne({name : subgredditname})
    .then((val)=>{
        Join.findOneAndDelete({subgredditname : subgredditname , username : username},(err,us)=>{
            if(err){
                console.log("Error in Rejecting user");
            }
            res.send({message:1})
        })
    }).catch((err)=>{
        console.log(err);
    })
})

app.post("/api/newpost",authorization,(req,res)=>{
    const data = req.body.post;
    const name = req.body.name;
    const username = req.body.username;
    Subgreddit.findOne({name : name})
    .then((val)=>{
        // const data2 = data.split(" ");
        // data2.map((mankind,angles)=>{
        //     data2[angles] = mankind.trim();
        // })
        // console.log(data2)
        // val.post.push(data)
        let data2 = [String];
        data2 = data.split(" ");
        val.postuser.push(username);
        // if(val.post != null){
            val.bannedKeywords.map((value,index)=>{
                data2.map((v,i)=>{
                    if(v === value)
                    {
                        data2[i] = '*'
                    }
                })
            })
        // }
        
        val.post.push(data2.join(" "))
        val.save()

        stats.findOne({subgredditname : name})
        .then((stat)=>{
            stat.posts.push(data2.join(" "));
            const date = new Date();
            const month = date.getMonth();
            const year = date.getFullYear();
            const day = date.getDate();

            let s = day + "-" + month + "-" + year

            stat.postdate.push(s) ,
            stat.save();
        })
        res.send({message : val});
    }).catch((err)=>{
        console.log(err);
    })
})

app.post("/api/newcomments",authorization,(req,res)=>{
    const subgredditname = req.body.subgredditname;
    const comment = req.body.comment;
    const post = req.body.post;
    const index = req.body.index;
    comments.findOne({
        subgredditname : subgredditname,
        post : post,
        index : index
    }).then((val)=>{
        val == null ? comments.create({
            subgredditname : subgredditname,
            post : post,
            index : index,
            comment : [comment]
        }) : val.comment.push(comment), val.save();
    }).catch((err)=>{
        console.log(err);
    })
    res.send({message : 1});
})

app.post("/api/search",authorization,(req,res)=>{
    const string = req.body.string;
    Subgreddit.find({name : {
        $regex:string, 
        $options:"i",
    }}).then((val)=>{
        res.send({message : val});
    }).catch((err)=>{
        console.log(err);
    })
})

app.post("/api/allcomments", authorization ,(req,response)=>{
    const subgredditname = req.body.subgredditdata;
    const index = req.body.index;
    comments.findOne({subgredditname : subgredditname , index : index})
    .then((res)=>{
        if(res == null)
        {
            response.send({message : []})
            return 
        }
        response.send({message : res.comment});
    }).catch((err)=>{
        console.log(err);
    })
})

app.post("/api/report",authorization,(req,res)=>{
    const post = req.body.post;
    const subgredditname = req.body.subgredditname;
    const position = req.body.position;
    const username = req.body.username;
    const reason = req.body.reason;
    const username1 = req.body.username1;
    const reportme = new report({
        post : post,
        username : username,
        reason : reason,
        username1 : username1,
        subgredditname : subgredditname,
        position : position,
        ignore : 0
    })
        stats.findOne({subgredditname : subgredditname})
            .then((val)=>{
                val.report.push(username),
                val.save();
            }).catch((err)=>{
                console.log(err);
            })
    reportme.save().then(()=>{
        res.send("done");
    }).catch((err)=>{
        console.log(err);
    })
})

app.post("/api/checkignore",authorization,(req,res)=>{
    const position = req.body.position;
    const post = req.body.post;
    const username = req.body.username;
    const username1 = req.body.username1;
    const reason = req.body.reason;
    const subgredditname = req.body.subgredditname;
    report.findOne({subgredditname: subgredditname , position : position , post : post , username : username , username1 : username1 , reason : reason})
    .then((val)=>{
        res.send({message : val})
    }).catch((err)=>{
        console.log(err)
    })
})

app.post("/api/updateignore",authorization,(req,res)=>{
    const position = req.body.position;
    const post = req.body.post;
    const subgredditname = req.body.subgredditname;
    report.findOne({subgredditname: subgredditname , position : position , post : post})
    .then((val)=>{
        val.ignore = 1 ,
        val.save();
        res.send({message : val})
    }).catch((err)=>{
        console.log(err)
    })
})

app.post("/api/blockuser",authorization,(req,res)=>{
    const subgredditname = req.body.subgredditname;
    const username = req.body.username;
    console.log(username);
    const reportindex = req.body.otherindex;
    block.findOne({subgredditname : subgredditname})
    .then((val)=>{
        if(val)
        {
            stats.findOne({subgredditname : subgredditname})
            .then((val)=>{
                val.block.push(username),
                val.save();
            }).catch((err)=>{
                console.log(err);
            })

            val.blockuser.push(username);
            val.save();
            report.findOne({position : reportindex}).then((value)=>{
                value.delete();
                Subgreddit.findOne({name : subgredditname})
                .then((value2)=>{
                    value2.postuser[reportindex] = null; 
                    value2.followers.splice(value2.followers.indexOf(username),1),
                    value2.save();
                })
            })
        }
        else
        {
            stats.findOne({subgredditname : subgredditname})
            .then((val)=>{
                val.block.push(username);
                val.save();
            }).catch((err)=>{
                console.log(err);
            })

            const newblock = new block({
                subgredditname : subgredditname
            })
            newblock.blockuser.push(username) ,
            newblock.save();
            report.findOne({position : reportindex}).then((value)=>{
                value.delete() , 
                value.save();
                Subgreddit.findOne({name : subgredditname})
                .then((value2)=>{
                    value2.postuser[reportindex] = "User Not Found";
                    value2.followers.splice(value2.followers.indexOf(username),1),
                    value2.save();
                })
            })

        }
        res.send({message : 1});
    }).catch((err)=>{
        console.log(err)
    })
    
})

app.post("/api/checkblock" , authorization , (req,res)=>{
    const subgredditname = req.body.subgredditname;
    const username = req.body.decode.username;
    block.findOne({subgredditname : subgredditname})
    .then((val)=>{
        if(val != null)
        {
            val.blockuser.map((value,index)=>{
                if(value === username)
                {
                    res.send({message : 1})
                }
            })
        }
        else
        {
            res.send()
        }
    }).catch((err)=>{
        console.log(err)
    })
})

app.post("/api/allreport",authorization,(req,res)=>{
    const subgredditname = req.body.subgredditname;
    report.find({subgredditname : subgredditname})
    .then((val)=>{
        res.send({message : val});
    }).catch((err)=>{
        console.log(err);
    })
})

app.post("/api/removepost" , authorization , (req,res)=>{
    const subgredditname = req.body.subgredditname;
    const reportindex = req.body.reportindex;
    const otherindex = req.body.otherindex;
    const post = req.body.post;
    Subgreddit.findOne({name : subgredditname})
    .then((val)=>{
        val.post[otherindex] = null;
        val.postuser[otherindex] = null;
        val.save();
        // console.log(val.post[otherindex])
        // val.save();
        comments.findOneAndDelete({subgredditname : subgredditname,index : otherindex},(err,us)=>
        {
            if(err)
            {
                console.log(err)
            }
            else
            {
                report.findOneAndDelete({subgredditname : subgredditname , post : post} , (err,us)=>{
                    if(err)
                    {
                        console.log(err)
                    }
                })
            }
        })
        res.send({message : 1})
    })
    .catch((err)=>{
        console.log(err)
    })
})

app.post("/api/checkexists", authorization , (req,res)=>{
    const subgredditdata = req.body.subgredditdata;
    const username = req.body.username;
    const exists = subgredditdata.followers.includes(username);
    res.send({message : exists})
})


app.post("/api/upvotes",authorization,(req,res)=>{
    const subgredditname = req.body.subgredditname;
    const post = req.body.post;
    const postindex = req.body.index;
    const username = req.body.username;
    var flag = 1;
    Subgreddit.findOne({name : subgredditname})
    .then((val)=>{
        if(val.upvote.length === 0)
        {
            val.upvote.push({thing : post , postindex : postindex , username : username}) ,
            flag = 1;
        }
        else
        {
            val.upvote.map((value,index)=>{
                if(value.thing === post && value.postindex === postindex && value.username === username)
                {
                    flag = 0;

                }
            })

            let arr = val.upvote.filter((value)=>{
                return !(value.thing === post && value.postindex === postindex && value.username === username)
            })
            val.upvote = arr;
            val.save();
        }
        val.upvote.push({thing : post , postindex : postindex , username : username});
        if(flag){
            val.save()
            res.send({message : 1 , len : val.upvote.length});
        }
        else
        {
            res.send({message : 0 , len : val.upvote.length});
        }

    })
})

app.post("/api/allupvotes",authorization,(req,res)=>{
    const subgredditname = req.body.subgredditname;
    const post = req.body.post;
    const postindex = req.body.index;
    const username = req.body.username;
    var flag = 1;
    Subgreddit.findOne({name : subgredditname})
    .then((val)=>{
        if(val.upvote.length === 0)
        {
            flag = 1;
        }
        else
        {
            val.upvote.map((value,index)=>{
                if(value.thing === post && value.postindex === postindex && value.username === username)
                {
                    flag = 0;
                }
            })
        }
        if(flag)
        {
            res.send({message : 0 , len : val.upvote.length});
        }
        else
        {
            res.send({message : 1 , len : val.upvote.length});
        }
    }).catch((err)=>{
        console.log(err);
    })
})

app.post("/api/stats",authorization,(req,res)=>{
    const subgredditname = req.body.subgredditname;
    const username = req.body.decode.username;
    stats.findOne({subgredditname : subgredditname})
    .then((val)=>{
        if(val)
        {
            const date = new Date();
            const month = date.getMonth();
            const year = date.getFullYear();
            const day = date.getDate();

            let s = day + "-" + month + "-" + year

            val.visdate.push(s);
            val.visitors.push(username),
            val.save();
        }
        else
        {
            const newstats = new stats(
            {
                subgredditname : subgredditname

            })
            const date = new Date();
            const month = date.getMonth();
            const year = date.getFullYear();
            const day = date.getDate();

            let s = day + "-" + month + "-" + year

            newstats.visdate.push(s);
            newstats.visitors.push(username),
            newstats.save();
        }
    })
})

app.post("/api/getstat",authorization,(req,res)=>{
    const subgredditname = req.body.subgredditname;
    stats.findOne({subgredditname : subgredditname})
    .then((val)=>{
        res.send({message : val})
    })
    .catch((err)=>{
        console.log(err)
    })
})

app.post("/api/removesubgreddit",authorization,(req,res)=>{
    // console.log(req.body.subgredditname)
    Subgreddit.findOne({name : req.body.subgredditname})
    .then((val)=>{
        val.delete();
    }).catch((err)=>{
        console.log(err)
    })
})


app.post("/api/deletefollowing",authorization,(req,res)=>{
    const currusername = req.body.decode.username;
    const username = req.body.username
    profile.findOne({username : currusername})
    .then((val)=>{
        val.following.splice(username,1);
        val.save();
    })
    .catch((err)=>{
        console.log(err)
    })
})

app.post("/api/deletefollowers",authorization,(req,res)=>{
    const currusername = req.body.decode.username;
    const username = req.body.username;
    profile.findOne({username : currusername})
    .then((val)=>{
        val.followers.splice(username,1);
        val.save();
    })
    .catch((err)=>{
        console.log(err)
    })
})





app.listen(4000, () => {
    console.log('server activated');
});