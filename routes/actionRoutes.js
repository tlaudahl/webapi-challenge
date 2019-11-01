const actionModel = require('../data/helpers/actionModel');
const express = require('express');
const router = express.Router();

router.use(express.json());

router.get('/', (req, res) => {
    actionModel.get()
    .then(actions => res.status(200).json(actions))
    .catch(err => res.status(500).json({ error: "Actions could not be retrieved from the database" }))
})

router.get('/:id', (req, res) => {
    const id = req.params.id;

    actionModel.get(id)
    .then(action => {
        if(action) {
            res.status(200).json(action)
        } else {
            res.status(404).json({ error: "Action with that ID could not be found" })
        }
    })
})

router.post('/', (req, res) => {
    const { project_id, description, notes } = req.body;
    if(!project_id) {
        res.status(400).json({ error: "Please provide a project id" })
    } else if (!description) {
        res.status(400).json({ error: "Please provide a description for the action" })
    } else if (!notes) {
        res.status(400).json({ error: "Please provide notes for the action" })
    } else {
        actionModel.insert(req.body)
        .then(action => {
            if(action) {
                res.status(201).json(action)
            } else {
                res.status(404).json({ error: "Project with that ID could not be found" })
            }
        })
        .catch(err => res.status(500).json({ error: "Action could not be updated" }))
    }
})


router.put('/:id', (req, res) => {
    const id = req.params.id;
    actionModel.update(id, req.body)
    .then(action => res.status(200).json(action))
    .catch(err => res.status(500).json({ error: "Action could not be updated" }))
})

router.delete('/:id', (req, res) => {
    const id = req.params.id;

    actionModel.remove(id)
    .then(action => res.status(200).json(action))
    .catch(err => res.status(500).json({ error: "Action could not be deleted" }))
})

module.exports = router;