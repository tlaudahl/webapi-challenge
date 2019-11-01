const projectModel = require('../data/helpers/projectModel');
const express = require('express');
const router = express.Router();

router.use(express.json());

router.get('/', (req, res) => {
    projectModel.get()
    .then(projects => {
        res.status(200).json(projects)
    })
    .catch(err => res.status(500).json({ error: "Projects could not be retrieved from the database" }))
})

router.get('/:id', (req, res) => {
    const id = req.params.id;
    projectModel.get(id)
    .then(project => {
        if(project) {
            res.status(200).json(project)
        } else {
            res.status(404).json({ error: "Project with that ID could not be found" })
        }
    })
    .catch(err => {
        res.status(500).json({ error: "Project could not be retrieved" })
    })
})

router.get('/:id/actions', validateProjectId, (req, res) => {
    const id = req.params.id;

    projectModel.getProjectActions(id)
    .then(actions => {
        res.status(200).json(actions)
    })
    .catch(err => res.status(500).json({ error: "Project actions could not be retrieved" }))
})

router.post('/', (req, res) => {
    const { name, description } = req.body;

    if(!name || !description) {
        res.status(400).json({ error: "Please provide both a name and a description for the project" })
    } else {
        projectModel.insert(req.body)
        .then(project => res.status(201).json(project))
        .catch(err => res.status(500).json({ error: "The project could not be added to the database" }))
    }
})

router.put('/:id', (req, res) => {
    const id = req.params.id;
    const { name, description } = req.body;
    if(!name || !description) {
        res.status(400).json({ error: "Please provide both a name and description while updating"})
    } else {
        projectModel.update(id, req.body)
        .then(project => {
            if(project) {
                res.status(200).json(project)
            } else {
                res.status(404).json({ error: "Project with that ID could not be found"})
            }
        })
        .catch(err => res.status(500).json({ error: "Project could not be updated" }))
    }
})

router.delete('/:id', validateProjectId, (req, res) => {
    const id = req.params.id;

    projectModel.remove(id)
    .then(project => {
        res.status(200).json(project)
    })
    .catch(err => res.status(500).json({ error: "Project could not be deleted from the database" }))
})

// middleware

function validateProjectId(req, res, next) {
    const id = req.params.id;
    projectModel.get(id)
    .then(project => {
        if(project) {
            next();
        } else {
            res.status(404).json({ error: "Project with that ID could not be found" })
        }
    })
}


module.exports = router;