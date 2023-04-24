const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const collectionTeam = new mongoose.Schema(
    {
        teamName: String,
        teamMemberObjectId:[{type:ObjectId,ref:"collectionUser"}],
        skills: [{type: String}],
        teamLogo: String,
        totalDevTimePerMonth: Number, 
        numberOfActiveProject: Number,
        completedProject: Number
    },
    {
        collection: "collectionTeam",
    }
);


mongoose.model("collectionTeam",collectionTeam);