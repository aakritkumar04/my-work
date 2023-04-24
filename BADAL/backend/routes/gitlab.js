const { json } = require('express');
const express = require('express');
const router = express.Router()
const mongoose = require('mongoose')
// const requireLogin = require('../middleware/protectedRoutes')
const collectionModule = mongoose.model('collectionModule')
const collectionProject = mongoose.model("collectionProject")
const collectionTask = mongoose.model('collectionTask')
const collectionTeam = mongoose.model('collectionTeam')
const collectionUser = mongoose.model('collectionUser')


const accessToken = 'glpat-KQs_k3PxM7Y9WnT447Cw';
const gitlabUrl = 'https://gitlab.com/api/v4/projects';
const visibility = 'private';


// Gitlab API
router.post('/create-repo', (req, res) => {
    console.log("I am Dora")
    console.log(req, "REQ")
    const projectName = req.body.projectName;

    fetch(`${gitlabUrl}?name=${projectName}&visibility=${visibility}`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
        },
    })
        .then(response => response.json())
        .then(data => res.json(data))
        .catch(error => res.status(500).json({ error: error.message }));
});


/*
Its Frontend

const ProjectName = 'my-new-repo';

fetch('/create-repo', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ ProjectName: ProjectName })
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error(error));

*/


router.delete('/delete-repo/:repoId', (req, res) => {
    const repoId = req.params.repoId;

    fetch(`${gitlabUrl}/${repoId}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
        }
    })
        .then(response => {
            if (response.ok) {
                res.status(204).send();
            } else {
                res.status(response.status).json({ error: 'Failed to delete repository' });
            }
        })
        .catch(error => res.status(500).json({ error: error.message }));
});


/*
Its Frontend

// Function to delete a GitLab repository
const deleteRepository = async (repoId) => {
try {
  const response = await fetch(`/repos/${repoId}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    }
  });

  if (response.ok) {
    console.log('Repository deleted successfully');
  } else {
    const data = await response.json();
    throw new Error(data.error);
  }
} catch (error) {
  console.error(error);
}
};

// Call the deleteRepository function with the ID of the repository you want to delete
deleteRepository(123);

*/


router.post('/pushFile-masterBranch', async (req, res) => {
    try {
        // Get the repository ID and module name from the request body
        const { repoId, moduleName, content } = req.body;

        // Create a new file with the module name in the repository
        const fileResponse = await fetch(`${gitlabUrl}/${repoId}/repository/files/${moduleName}`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                branch: 'master',
                commit_message: `Create module ${moduleName}`,
                content: content
            })
        });
        if (!fileResponse.ok) {
            const error = await fileResponse.json();
            console.error(error);
            throw new Error(`Failed to create module: ${error.message}`);
        }
        else {
            res.status(204).send();
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});



/*
Its Frontend

const moduleName = "mypage.html"
const content = "This will be inside the file"

fetch('/pushFile-masterBranch', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ repoId: repoId, moduleName: moduleName, content: content })
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error(error));

*/




router.post('/create-branch', async (req, res) => {
    try {
        const { branchName, repoId, commitSha } = req.body;

        let ref;
        if (commitSha) {
            ref = commitSha;
        } else {
            // Get information about the latest commit on the current branch
            const response = await fetch(`${gitlabUrl}/${repoId}/repository/commits`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'application/json'
                },
            });

            if (!response.ok) {
                const errorData = await response.json();
                res.status(400).json(errorData);
                return;
            }

            const commits = await response.json();
            const latestCommit = commits[0];
            ref = latestCommit.id;
        }

        // Use the reference to create the new branch
        const createBranchResponse = await fetch(`${gitlabUrl}/${repoId}/repository/branches`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                branch: branchName,
                ref
            })
        });

        if (createBranchResponse.ok) {
            const responseData = await createBranchResponse.json();
            res.status(200).json(responseData);
        } else {
            const errorData = await createBranchResponse.json();
            res.status(400).json(errorData);
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Something went wrong!' });
    }
});


/*
Its Frontend

const branchName = "MyFirstBranch"

fetch('/create-branch', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ repoId: repoId, branchName: branchName })
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error(error));

*/



router.post('/pushFile-customBranch', async (req, res) => {
    try {
        // Get the repository ID, branch name, module name, and content from the request body
        const { repoId, branchName, moduleName, content } = req.body;

        // Create a new file with the module name in the repository on the specified branch
        const fileResponse = await fetch(`${gitlabUrl}/${repoId}/repository/files/${moduleName}.js`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                branch: branchName,
                commit_message: `Create module ${moduleName}`,
                content: content
            })
        });

        if (!fileResponse.ok) {
            const error = await fileResponse.json();
            console.error(error);
            throw new Error(`Failed to create module: ${error.message}`);
        } else {
            res.status(204).send();
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});


/*
Its Frontend

const moduleName = "moduleName"
const content = "content"
const branchName = "MyFirstBranch"

fetch('/pushFile-customBranch', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ repoId: repoId, moduleName: moduleName, content: content , branchName: branchName })
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error(error));

*/


// creating an issue

projectId = "44187783";

router.post("/create_issue", (req, res) => {
    console.log("Hi")
    const issueTitle = req.body.issueTitle;
    const issueDescription = req.body.issueDescription;
    const issueLabels = req.body.issueLabels;
    fetch(`https://gitlab.com/api/v4/projects/${projectId}/issues`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            title: issueTitle,
            description: issueDescription,
            labels: issueLabels
        })
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP error: ${response.status}`);
            }
            return response.json();
        })
        .then((data) => {
            // console.log('Issue created:', data);
            res.send({ message: data });
        })
        .catch((error) => {
            console.error('Error creating issue:', error);
        });
});


/*
Its Frontend

const issueTitle = "Issue1",
const issueDescription = "First issue",
const issueLabels  = "No label"

fetch('/create_issue', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ issueTitle: issueTitle, issueDescription: issueDescription, issueLabels: issueLabels , branchName: branchName })
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error(error));

*/


// deleting an issue


router.delete("/delete_issue", (req, res) => {
    const issueId = req.body.issueId;
    fetch(`https://gitlab.com/api/v4/projects/${projectId}/issues/${issueId}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${accessToken}`,
        }
    })
        .then((response) => {
            console.log("Deleted issue");
            res.send({ message: "DELETED ISSUE" })
        })
});


/*
Its Frontend

const issueId = "1",

fetch('/create_issue', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ issueId: issueId })
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error(error));

*/


/*

// removing a file from the master branch 
router.delete("/removefile_master", (req,res)=>{
  const branchName1 = 'master';
  const filePath = req.body.path;
  fetch(`https://gitlab.com/api/v4/projects/${projectId}/repository/files/${encodeURIComponent(filePath)}?branch=${encodeURIComponent(branchName1)}&commit_message=File+removed`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    }
  })
  .then((response) => {
    console.log("Deleted file from master branch");
    res.send({message : "DELETED FILE"})
  })
});

*/


// deleting a branch from gitlab
router.delete("/delete_branch", (req, res) => {
    const branchName = req.body.branchName;
    fetch(`https://gitlab.com/api/v4/projects/${projectId}/repository/branches/${encodeURIComponent(branchName)}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${accessToken}`,
        }
    })
        .then((response) => {
            console.log("Deleted branch");
            res.send({ message: "DELETED BRANCH" })
        })

})

/*
Its Frontend

const delete_branch = "MyFirstBranch",

fetch('/create_issue', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ delete_branch: delete_branch })
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error(error));

*/



// adding a collaborator 
router.post('/add-collaborator', async (req, res) => {
    try {
        const { project_id, user_id, access_level } = req.body;

        const response = await fetch(`${gitlabUrl}/${project_id}/members`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            },
            body: JSON.stringify({ user_id, access_level })
        });

        const responseBody = await response.json();

        res.status(response.status).json(responseBody);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to add collaborator' });
    }
});



// removing a collaborator
router.delete('/remove-member', async (req, res) => {
    console.log("Here")
    const { project_id, user_id } = req.query;
    // console.log(req)
    try {
        const response = await fetch(`${gitlabUrl}/${project_id}/members/${user_id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            }
        });

        const responseBody = await response.json();

        res.status(response.status).json(responseBody);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to remove member' });
    }
});



module.exports = router;


// reading issue status
// merge req
// access control
