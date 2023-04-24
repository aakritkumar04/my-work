const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const collectionModule = new mongoose.Schema(
    {
        projectObjectId: {type:ObjectId,ref:"collectionProject"},
        moduleCreatedBy:{type:ObjectId,ref:"collectionUser"},
        assignedTeam: {type:ObjectId,ref:"collectionTeam"},
        moduleDateCreated: Date,
        moduleName: String,
        moduleDescription: String,
        moduleDateStart: Date,
        moduleDateEnd: Date,
        skillsRequired: [{type: String}],
        totalDevTimeRequired: Number, 
        moduleComplexity: Number,
        gitlabLink: {type: String},
        numberOfTask: Number,
        additionalInformation: [{type: String}]
    },
    {
        collection: "collectionModule",
    }
);


mongoose.model("collectionModule",collectionModule);