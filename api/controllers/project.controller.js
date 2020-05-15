const { validationResult } = require('express-validator');
const projectModel = require('../models/project.model');
const projectService = require('../services/project.service');

exports.getAll = (req, res) => {
    projectModel.getAll()
    .then(projects => {
        if (!projects || projects.length == 0) {
            return res.status(204).json({error: false, data: `No projects`});
        }
        res.status(200).json({error: false, data: projects});
    })
    .catch(err => res.status(500).json({error: true, data: err.message}));
};

exports.getOne = (req, res) => {
    projectModel.getOne(req.params.id)
    .then(project => {
        if (!project) {
            return res.status(404).json({error: true, data: `Project ${req.params.id} not found`});
        }
        res.status(200).json({error: false, data: project});
    })
    .catch(err => res.status(500).json({error: true, data: err.message}));
};

exports.create = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({error: true, data: errors.array()});
    }
    const projectToCreate = projectService.projectToCreate(req.body);
    projectModel.create(projectToCreate)
    .then(project => {
        projectToCreate._id = project.insertedId;
        res.status(200).json({error: false, data: projectToCreate});
    })
    .catch(err => res.status(500).json({error: true, data: err.message}));
};

exports.change = function (req, res) {
    const projectToEdit = projectService.projectToEdit(req.body);
    projectModel.update(projectToEdit, req.params.id)
    .then(project => {
        if (!project) {
            return res.status(404).json({error: true, data: `Record (ID: ${req.params.id}) was not found`});
        }
        projectToEdit._id = project.insertedId;
        res.status(200).json({error: false, data: projectToEdit});
    })
    .catch(err => res.status(500).json({error: true, data: err.message}));
};

exports.delete = function (req, res) {
    projectModel.delete(req.params.id)
    .then(projectDeleted => {
        if (projectDeleted.deletedCount === 0) {
            return res.status(404).json({error: true, data: `Record (ID: ${req.params.id}) was not found`});
        }
        res.status(200).json({error: false, data: `${projectDeleted.deletedCount} record (ID: ${req.params.id}) was deleted`});
    })
    .catch(err => res.status(500).json({error: true, data: err.message}));
};
