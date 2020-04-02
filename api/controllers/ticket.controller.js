const ticket = require('../models/ticket.model');

exports.getAll = function (req, res) {
    res.json({data: 'Data ' + req.params.id + ' ' + req.query.a}).status(200);
};

exports.getOne = function (req, res) {
    res.json({data: 'Data ' + req.params.id + ' ' + req.query.a}).status(200);
};

exports.create = function (req, res) {
    res.json({data: 'Data ' + req.params.id + ' ' + req.query.a}).status(200);
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
