const ticket = require('../models/ticket.model');

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
    const ticketToCreate = {title: req.body.title, number: 1, string: req.body.string};
    ticket.create(ticketToCreate)
    .then(ticket => {
        ticketToCreate._id = ticket.insertedId;
        res.status(200).json({error: false, data: ticketToCreate});
    })
    .catch(err => res.status(500).json({error: true, data: err.message}));
};

exports.change = function (req, res) {
    res.json({data: 'Data ' + req.params.id + ' ' + req.query.a}).status(200);
};

exports.updateStatus = function (req, res) {
    res.json({data: 'Data ' + req.params.id + ' ' + req.query.a}).status(200);
};

exports.delete = function (req, res) {
    res.json({data: 'Data ' + req.params.id + ' ' + req.query.a}).status(200);
};
