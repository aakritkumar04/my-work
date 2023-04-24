const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types


const collectionProject = new mongoose.Schema(
    {
        projectCreatedBy:{type:ObjectId,ref:"collectionUser"},
        projectDateCreated: Date,
        projectName: String,
        projectField: String,
        projectDescription: String,
        projectOwner: String,
        projectManager: {type:ObjectId,ref:"collectionUser"},
        projectDateStart: String,
        projectDateEnd: String,
        skillsRequired: String,
        totalDevTimeRequired: Number, 
        numberOfModules: Number, 
        gitlabLink: String,
        logoProjectOrganization: String,
        logoProject: String
    },
    {
        collection: "collectionProject",
    }
);


mongoose.model("collectionProject",collectionProject);