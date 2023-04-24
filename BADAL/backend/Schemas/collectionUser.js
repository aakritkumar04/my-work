const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

// const collectionUser = new mongoose.Schema(
//     {
//         userId: String,
//         userPassword: String,
//         userName: String,
//         coreMember: String,
//         admin: String,
//         company: String,
//         ngo: String,
//         developer: String,
//         teamName: String
//     },
//     {
//         collection: "collectionUser",
//     }
// );

const collectionUser = new mongoose.Schema(
    {
        fname: String,
        lname : String,
        userName: String,
        email:String,
        age:Number,
        contactNumber:Number,
        userPassword:String
    },
    {
        collection: "collectionUser", 
    }

);
mongoose.model("collectionUser",collectionUser);