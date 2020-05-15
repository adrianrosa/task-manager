const { validationResult } = require('express-validator');
const ticket = require('../models/ticket.model');
const ticketService = require('../services/ticket.service');

exports.getAll = (req, res) => {
    ticket.getAll()
    .then(tickets => {
        if (!tickets || tickets.length == 0) {
            return res.status(204).json({error: false, data: `No tickets`});
        }
        res.status(200).json({error: false, data: tickets});
    })
    .catch(err => res.status(500).json({error: true, data: err.message}));
};

exports.getOne = (req, res) => {
    ticket.getOne(req.params.id)
    .then(ticket => {
        if (!ticket) {
            return res.status(404).json({error: true, data: `Ticket ${req.params.id} not found`});
        }
        res.status(200).json({error: false, data: ticket});
    })
    .catch(err => res.status(500).json({error: true, data: err.message}));
};

exports.getByProject = (req, res) => {
    ticket.getByProject(req.params.id)
    .then(result => {
        if (!result || result.length == 0) {
            return res.status(204).json({error: false, data: `No tickets with project ID ${req.params.id}`});
        }
        return res.status(200).json({error: false, data: result});
    })
    .catch(err => res.status(500).json({error: true, data: err.message}));
};

exports.getByStatus = (req, res) => {
    ticket.getByStatus(req.params.id)
    .then(result => {
        if (!result || result.length == 0) {
            return res.status(204).json({error: false, data: `No tickets with status ID ${req.params.id}`});
        }
        return res.status(200).json({error: false, data: result});
    })
    .catch(err => res.status(500).json({error: true, data: err.message}));
};

exports.create = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({error: true, data: errors.array()});
    }
    const ticketToCreate = ticketService.ticketToCreate(req.body);
    ticket.create(ticketToCreate)
    .then(ticket => {
        ticketToCreate._id = ticket.insertedId;
        res.status(200).json({error: false, data: ticketToCreate});
    })
    .catch(err => res.status(500).json({error: true, data: err.message}));
};

exports.change = function (req, res) {
    const ticketToEdit = ticketService.ticketToEdit(req.body);
    ticket.update(ticketToEdit, req.params.id)
    .then(ticket => {
        if (!ticket) {
            return res.status(404).json({error: true, data: `Ticket ${req.params.id} not found`});
        }
        ticketToEdit._id = ticket.insertedId;
        res.status(200).json({error: false, data: ticketToEdit});
    })
    .catch(err => res.status(500).json({error: true, data: err.message}));
};

exports.updateStatus = function (req, res) {
    ticket.getOne(req.params.id)
    .then(ticketRecord => {
        if (!ticketRecord) {
            return res.status(404).json({error: true, data: `Ticket ${req.params.id} not found`});
        }
        if (!ticketService.performTransition(ticketRecord.status.name, req.body.new_status)) {
            return res.status(403).json({error: true, data: `Change status not allowed ${ticketRecord.status} -> ${req.body.new_status}`});
        }
        const ticketToUpdate = {status: {id: req.body.id_status, name: req.body.new_status}};
        ticket.update(ticketToUpdate, req.params.id)
        .then(ticket => {
            ticketToUpdate._id = ticket.insertedId;
            res.status(200).json({error: false, data: ticketToUpdate});
        })
        .catch(err => res.status(500).json({error: true, data: err.message}));
    })
    .catch(err => res.status(500).json({error: true, data: err.message}));
};

exports.delete = function (req, res) {
    ticket.delete(req.params.id)
    .then(ticketDeleted => {
        if (ticketDeleted.deletedCount === 0) {
            return res.status(404).json({error: true, data: `Record (ID: ${req.params.id}) was not found`});
        }
        res.status(200).json({error: false, data: `${ticketDeleted.deletedCount} record (ID: ${req.params.id}) was deleted`});
    })
    .catch(err => res.status(500).json({error: true, data: err.message}));
};
