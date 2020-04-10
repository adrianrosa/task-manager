const { validationResult } = require('express-validator');
const ticket = require('../models/ticket.model');
const ticketService = require('../services/ticket.service');

exports.getAll = (req, res) => {
    ticket.getAll()
    .then(tickets => {
        res.status(200).json({error: false, data: tickets});
    })
    .catch(err => res.status(500).json({error: true, data: err.message}));
};

exports.getOne = (req, res) => {
    ticket.getOne(req.params.id)
    .then(ticket => {
        if (!ticket) {
            res.status(404).json({error: true, data: `Ticket ${req.params.id} not found`});
        }
        res.status(200).json({error: false, data: ticket});
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
        ticketToEdit._id = ticket.insertedId;
        res.status(200).json({error: false, data: ticketToEdit});
    })
    .catch(err => res.status(500).json({error: true, data: err.message}));
};

exports.updateStatus = function (req, res) {
    if (!ticketService.performTransition(req.body.status, req.body.newStatus)) {
        res.status(500).json({error: true, data: `Change status not allowed ${req.body.status} -> ${req.body.newStatus}`});
    }
    const ticketToUpdate = {status: req.body.newStatus};
    ticket.update(ticketToUpdate, req.params.id)
    .then(ticket => {
        ticketToUpdate._id = ticket.insertedId;
        res.status(200).json({error: false, data: ticketToUpdate});
    })
    .catch(err => res.status(500).json({error: true, data: err.message}));
};

exports.delete = function (req, res) {
    ticket.delete(req.params.id)
    .then(ticketDeleted => {
        if (ticketDeleted.deletedCount === 0) {
            res.status(404).json({error: true, data: `Record (ID: ${req.params.id}) was not found`});
        }
        res.status(200).json({error: false, data: `${ticketDeleted.deletedCount} record (ID: ${req.params.id}) was deleted`});
    })
    .catch(err => res.status(500).json({error: true, data: err.message}));
};
