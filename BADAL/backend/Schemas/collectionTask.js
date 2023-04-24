const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const collectionTask = new mongoose.Schema(
    {
        moduleObjectId:{type:ObjectId,ref:"collectionModule"},
        projectObjectId:{type:ObjectId,ref:"collectionProject"},
        taskCreatedBy:{type:ObjectId,ref:"collectionUser"},
        taskDateCreated: Date,
        taskAssigned: String,
        taskCompleted: String,
        taskDescription: String,
        gitlabLink: String,
        assignedUserObjectId:{type:ObjectId,ref:"collectionUser"},
    },
    {
        collection: "collectionTask",
    }
);


mongoose.model("collectionTask",collectionTask);