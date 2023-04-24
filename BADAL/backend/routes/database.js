const { json } = require('express');
const express = require('express');
const router = express.Router()
const mongoose = require('mongoose')
// const requireLogin = require('../middleware/protectedRoutes')
const collectionModule = new mongoose.model('collectionModule')
const collectionProject = new mongoose.model("collectionProject")
const collectionTask = new mongoose.model('collectionTask')
const collectionTeam = new mongoose.model('collectionTeam')
const collectionUser =  new mongoose.model('collectionUser')


// MongoDB API
router.post('/create-project-DB', (req, res) => {
    // Create a new instance of the collectionProject model
    const newProject = new collectionProject({
        projectCreatedBy: req.body.projectCreatedBy ? ObjectId(req.body.projectCreatedBy) : null,
        projectDateCreated: new Date(),
        projectName: req.body.projectName,
        projectField: req.body.projectField,
        projectDescription: req.body.projectDescription,
        projectOwner: req.body.projectOwner,
        projectManager: req.body.projectManager ? ObjectId(req.body.projectManager) : null,
        projectDateStart: req.body.projectDateStart,
        projectDateEnd: req.body.projectDateEnd,
        skillsRequired: req.body.skillsRequired,
        totalDevTimeRequired: req.body.totalDevTimeRequired,
        numberOfModules: req.body.numberOfModules,
        gitlabLink: req.body.gitlabLink,
        logoProjectOrganization: req.body.logoProjectOrganization,
        logoProject: req.body.logoProject,
    });

    // Save the new project to the collectionProject collection
    newProject.save((err) => {
        if (err) {
            console.log(err);
            res.status(500).send('An error occurred while saving the project to the database.');
        } else {
            console.log("New project added to collectionProject collection!");
            res.status(200).send('New project added to collectionProject collection!');
        }
    });
});


router.put('/edit-project-DB', (req, res) => {
    const id = req.query.id;

    const updatedProject = {
        projectCreatedBy: req.body.projectCreatedBy ? ObjectId(req.body.projectCreatedBy) : null,
        projectDateCreated: new Date(req.body.projectDateCreated),
        projectName: req.body.projectName,
        projectField: req.body.projectField,
        projectDescription: req.body.projectDescription,
        projectOwner: req.body.projectOwner,
        projectManager: req.body.projectManager ? ObjectId(req.body.projectManager) : null,
        projectDateStart: new Date(req.body.projectDateStart),
        projectDateEnd: new Date(req.body.projectDateEnd),
        skillsRequired: req.body.skillsRequired,
        totalDevTimeRequired: req.body.totalDevTimeRequired,
        numberOfModules: req.body.numberOfModules,
        gitlabLink: req.body.gitlabLink,
        logoProjectOrganization: req.body.logoProjectOrganization,
        logoProject: req.body.logoProject,
    };

    collectionProject.findByIdAndUpdate(id, updatedProject, { new: true }, (err, project) => {
        if (err) {
            console.log(err);
            res.status(500).send('An error occurred while updating the project.');
        } else if (!project) {
            res.status(404).send('Project not found.');
        } else {
            console.log("Project updated!");
            res.status(200).send('Project updated!');
        }
    });
});



router.post('/create-module-DB', (req, res) => {
    // Create a new instance of the collectionModule model
    const newModule = new collectionModule({
        projectObjectId: req.body.projectObjectId ? ObjectId(req.body.projectObjectId) : null,
        moduleCreatedBy: req.body.moduleCreatedBy ? ObjectId(req.body.moduleCreatedBy) : null,
        assignedTeam: req.body.assignedTeam ? ObjectId(req.body.assignedTeam) : null,
        moduleDateCreated: new Date(req.body.moduleDateCreated),
        moduleName: req.body.moduleName,
        moduleDescription: req.body.moduleDescription,
        moduleDateStart: new Date(req.body.moduleDateStart),
        moduleDateEnd: new Date(req.body.moduleDateEnd),
        skillsRequired: req.body.skillsRequired,
        totalDevTimeRequired: req.body.totalDevTimeRequired,
        moduleComplexity: req.body.moduleComplexity,
        gitlabLink: req.body.gitlabLink,
        numberOfTask: req.body.numberOfTask,
        additionalInformation: req.body.additionalInformation
    });

    // Save the new module to the collectionModule collection
    newModule.save((err) => {
        if (err) {
            console.log(err);
            res.status(500).send('An error occurred while saving the module to the database.');
        } else {
            console.log("New module added to collectionModule collection!");
            res.status(200).send('New module added to collectionModule collection!');
        }
    });
});



router.put('/edit-module-DB', (req, res) => {
    const id = req.query.id;

    const updatedModule = {
        projectObjectId: req.body.projectObjectId ? ObjectId(req.body.projectObjectId) : null,
        moduleCreatedBy: req.body.moduleCreatedBy ? ObjectId(req.body.moduleCreatedBy) : null,
        assignedTeam: req.body.assignedTeam ? ObjectId(req.body.assignedTeam) : null,
        moduleDateCreated: new Date(req.body.moduleDateCreated),
        moduleName: req.body.moduleName,
        moduleDescription: req.body.moduleDescription,
        moduleDateStart: new Date(req.body.moduleDateStart),
        moduleDateEnd: new Date(req.body.moduleDateEnd),
        skillsRequired: req.body.skillsRequired,
        totalDevTimeRequired: req.body.totalDevTimeRequired,
        moduleComplexity: req.body.moduleComplexity,
        gitlabLink: req.body.gitlabLink,
        numberOfTask: req.body.numberOfTask,
        additionalInformation: req.body.additionalInformation
    };

    collectionModule.findByIdAndUpdate(id, updatedModule, { new: true }, (err, module) => {
        if (err) {
            console.log(err);
            res.status(500).send('An error occurred while updating the module in the database.');
        } else if (!module) {
            res.status(404).send('The module with the specified ID could not be found.');
        } else {
            console.log(`Module with ID ${req.query.id} updated in collectionModule collection!`);
            res.status(200).send(`Module with ID ${req.query.id} updated in collectionModule collection!`);
        }
    });

});




router.post('/create-task-DB', (req, res) => {
    // Create a new instance of the collectionTask model
    const newTask = new collectionTask({
        moduleObjectId: req.body.moduleObjectId ? ObjectId(req.body.moduleObjectId) : null,
        projectObjectId: req.body.projectObjectId ? ObjectId(req.body.projectObjectId) : null,
        taskCreatedBy: req.body.taskCreatedBy ? ObjectId(req.body.taskCreatedBy) : null,
        taskDateCreated: new Date(),
        taskAssigned: req.body.taskAssigned,
        taskCompleted: req.body.taskCompleted,
        taskDescription: req.body.taskDescription,
        gitlabLink: req.body.gitlabLink,
        assignedUserObjectId: req.body.assignedUserObjectId ? ObjectId(req.body.assignedUserObjectId) : null
    });

    // Save the new task to the collectionTask collection
    newTask.save((err) => {
        if (err) {
            console.log(err);
            res.status(500).send('An error occurred while saving the task to the database.');
        } else {
            console.log("New task added to collectionTask collection!");
            res.status(200).send('New task added to collectionTask collection!');
        }
    });
});


router.put('/edit-task-DB', (req, res) => {
    const id = req.query.id;

    const updatedTask = {
        moduleObjectId: req.body.moduleObjectId ? ObjectId(req.body.moduleObjectId) : null,
        projectObjectId: req.body.projectObjectId ? ObjectId(req.body.projectObjectId) : null,
        taskCreatedBy: req.body.taskCreatedBy ? ObjectId(req.body.taskCreatedBy) : null,
        taskAssigned: req.body.taskAssigned,
        taskCompleted: req.body.taskCompleted,
        taskDescription: req.body.taskDescription,
        gitlabLink: req.body.gitlabLink,
        assignedUserObjectId: req.body.assignedUserObjectId ? ObjectId(req.body.assignedUserObjectId) : null
    };

    collectionTask.findByIdAndUpdate(id, updatedTask, { new: true }, (err, task) => {
        if (err) {
            console.log(err);
            res.status(500).send('An error occurred while updating the task in the database.');
        } else if (!task) {
            res.status(404).send('The task with the specified ID could not be found.');
        } else {
            console.log(`Task with ID ${req.query.id} updated in collectionTask collection!`);
            res.status(200).send(`Task with ID ${req.query.id} updated in collectionTask collection!`);
        }
    });

});



router.post('/create-team-DB', (req, res) => {
    // Create a new instance of the collectionTeam model
    const newTeam = new collectionTeam({
        teamName: req.body.teamName,
        teamMemberObjectId: req.body.teamMemberObjectId ? req.body.teamMemberObjectId.map(memberId => ObjectId(memberId)) : null,
        skills: req.body.skills,
        teamLogo: req.body.teamLogo,
        totalDevTimePerMonth: req.body.totalDevTimePerMonth,
        numberOfActiveProject: req.body.numberOfActiveProject,
        completedProject: req.body.completedProject
    });

    // Save the new team to the collectionTeam collection
    newTeam.save((err) => {
        if (err) {
            console.log(err);
            res.status(500).send('An error occurred while saving the team to the database.');
        } else {
            console.log("New team added to collectionTeam collection!");
            res.status(200).send('New team added to collectionTeam collection!');
        }
    });
});


router.put('/edit-team-DB', (req, res) => {
    const id = req.query.id;

    const updatedTeam = {
        teamName: req.body.teamName,
        teamMemberObjectId: req.body.teamMemberObjectId ? req.body.teamMemberObjectId.map(memberId => ObjectId(memberId)) : null,
        skills: req.body.skills,
        teamLogo: req.body.teamLogo,
        totalDevTimePerMonth: req.body.totalDevTimePerMonth,
        numberOfActiveProject: req.body.numberOfActiveProject,
        completedProject: req.body.completedProject
    };

    collectionTeam.findByIdAndUpdate(id, updatedTeam, { new: true }, (err, team) => {
        if (err) {
            console.log(err);
            res.status(500).send('An error occurred while updating the team in the database.');
        } else if (!team) {
            res.status(404).send('The team with the specified ID could not be found.');
        } else {
            console.log(`Team with ID ${req.query.id} updated in collectionTeam collection!`);
            res.status(200).send(`Team with ID ${req.query.id} updated in collectionTeam collection!`);
        }
    });

});


router.post('/create-user-DB', (req, res) => {
    // Create a new instance of the collectionUser model
    const newUser = new collectionUser({
        userId: req.body.userId,
        userPassword: hash,
        userName: req.body.userName,
        coreMember: req.body.coreMember,
        admin: req.body.admin,
        company: req.body.company,
        ngo: req.body.ngo,
        developer: req.body.developer,
        teamName: req.body.teamName
    });

    // Save the new user to the collectionUser collection
    newUser.save((err) => {
        if (err) {
            console.log(err);
            res.status(500).send('An error occurred while saving the user to the database.');
        } else {
            console.log("New user added to collectionUser collection!");
            res.status(200).send('New user added to collectionUser collection!');
        }
    });
});



// Route to get all projects from MongoDB
router.get("/get-project-DB", async (req, res) => {
    try {
        const {userName} = req.body.userName
        collectionProject.find({userName : userName}, function(err,us){
            if(err)
            {
                console.log(err)
            }
            else
            {
                console.log(us)
            }
        })
        res.json(projects);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


module.exports = router;